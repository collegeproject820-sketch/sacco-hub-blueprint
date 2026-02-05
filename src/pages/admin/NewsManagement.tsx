import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Eye } from 'lucide-react';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/data-state';
import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';

type NewsPost = Tables<'news_posts'>;
type Category = Tables<'categories'>;

export default function NewsManagement() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; post: NewsPost | null }>({ open: false, post: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { logActivity } = useAdminActivityLog();

  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('<p>Start writing your article...</p>');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [{ data: postsData }, { data: categoriesData }] = await Promise.all([
        supabase.from('news_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);
      if (!postsData) {
        setError('Failed to load posts. Please check your permissions.');
        return;
      }
      setPosts(postsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('<p>Start writing your article...</p>');
    setCategoryId('');
    setFeaturedImage('');
    setIsPublished(false);
    setIsFeatured(false);
    setEditingPost(null);
  };

  const openEditDialog = (post: NewsPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setCategoryId(post.category_id || '');
    setFeaturedImage(post.featured_image || '');
    setIsPublished(post.is_published || false);
    setIsFeatured(post.is_featured || false);
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const postData = {
        title,
        slug: editingPost?.slug || generateSlug(title),
        excerpt,
        content,
        category_id: categoryId || null,
        featured_image: featuredImage || null,
        is_published: isPublished,
        is_featured: isFeatured,
        published_at: isPublished ? new Date().toISOString() : null,
      };

      if (editingPost) {
        const { error } = await supabase
          .from('news_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast({ title: 'Post updated successfully' });
        logActivity({
          action: 'update',
          entityType: 'news_post',
          entityId: editingPost.id,
          details: { title }
        });
      } else {
        const { data, error } = await supabase
          .from('news_posts')
          .insert(postData as TablesInsert<'news_posts'>)
          .select('id')
          .single();

        if (error) throw error;
        toast({ title: 'Post created successfully' });
        logActivity({
          action: 'create',
          entityType: 'news_post',
          entityId: data?.id,
          details: { title }
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const post = deleteConfirm.post;
    if (!post) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('news_posts').delete().eq('id', post.id);
      if (error) throw error;
      toast({ title: 'Post deleted successfully' });
      logActivity({
        action: 'delete',
        entityType: 'news_post',
        entityId: post.id,
        details: { title: post.title }
      });
      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({ open: false, post: null });
    }
  };

  const togglePublish = async (post: NewsPost) => {
    try {
      const newStatus = !post.is_published;
      const { error } = await supabase
        .from('news_posts')
        .update({ 
          is_published: newStatus,
          published_at: newStatus ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;
      toast({ title: `Post ${newStatus ? 'published' : 'unpublished'}` });
      logActivity({
        action: newStatus ? 'publish' : 'unpublish',
        entityType: 'news_post',
        entityId: post.id,
        details: { title: post.title }
      });
      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">News Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage news articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Brief summary)</Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A brief summary of the article..."
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your article..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ImageUpload
                value={featuredImage}
                onChange={setFeaturedImage}
                folder="news"
                label="Featured Image"
              />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingPost ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState message="Loading articles..." />
          ) : error ? (
            <ErrorState title="Failed to load posts" description={error} onRetry={fetchData} />
          ) : posts.length === 0 ? (
            <EmptyState 
              title="No articles yet"
              description="Create your first news article to get started."
              action={{ label: 'Create Article', onClick: () => setIsDialogOpen(true) }}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>{getCategoryName(post.category_id)}</TableCell>
                    <TableCell>
                      <Badge variant={post.is_published ? 'default' : 'secondary'}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {post.is_featured && (
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(post)}
                          title={post.is_published ? 'Unpublish' : 'Publish'}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(post)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm({ open: true, post })}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ open, post: deleteConfirm.post })}
        title="Delete Article"
        description={`Are you sure you want to delete "${deleteConfirm.post?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
