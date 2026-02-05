 import { useEffect, useState } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Card, CardContent } from '@/components/ui/card';
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
 import { useToast } from '@/hooks/use-toast';
 import { Plus, Pencil, Trash2, Loader2, FolderTree } from 'lucide-react';
 import { EmptyState, ErrorState } from '@/components/ui/data-state';
 import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
 import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';
 import type { Tables } from '@/integrations/supabase/types';
 
 type Category = Tables<'categories'>;
 
 export default function CategoriesManagement() {
   const [categories, setCategories] = useState<Category[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
   const [isSaving, setIsSaving] = useState(false);
   const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; category: Category | null }>({ open: false, category: null });
   const [isDeleting, setIsDeleting] = useState(false);
   const { toast } = useToast();
   const { logActivity } = useAdminActivityLog();
 
   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
 
   const fetchCategories = async () => {
     setError(null);
     try {
       const { data, error: fetchError } = await supabase
         .from('categories')
         .select('*')
         .order('name');
       
       if (fetchError) {
         console.error('Error fetching categories:', fetchError);
         setError('Failed to load categories. Please check your permissions.');
         return;
       }
       setCategories(data || []);
     } catch (err) {
       console.error('Error:', err);
       setError('An unexpected error occurred.');
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchCategories();
   }, []);
 
   const resetForm = () => {
     setName('');
     setSlug('');
     setDescription('');
     setEditingCategory(null);
   };
 
   const generateSlug = (text: string) => {
     return text
       .toLowerCase()
       .replace(/[^a-z0-9]+/g, '-')
       .replace(/(^-|-$)/g, '');
   };
 
   const handleNameChange = (value: string) => {
     setName(value);
     if (!editingCategory) {
       setSlug(generateSlug(value));
     }
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSaving(true);
 
     const categoryData = { name, slug, description: description || null };
 
     try {
       if (editingCategory) {
         const { error } = await supabase
           .from('categories')
           .update(categoryData)
           .eq('id', editingCategory.id);
         
         if (error) throw error;
         toast({ title: 'Category updated successfully' });
         logActivity({
           action: 'update',
           entityType: 'settings',
           entityId: editingCategory.id,
           details: { type: 'category', name }
         });
       } else {
         const { data, error } = await supabase
           .from('categories')
           .insert(categoryData)
           .select('id')
           .single();
 
         if (error) throw error;
         toast({ title: 'Category created successfully' });
         logActivity({
           action: 'create',
           entityType: 'settings',
           entityId: data?.id,
           details: { type: 'category', name }
         });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchCategories();
     } catch (err: any) {
       toast({
         variant: 'destructive',
         title: 'Error',
         description: err.message || 'Failed to save category'
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async () => {
     const category = deleteConfirm.category;
     if (!category) return;
 
     setIsDeleting(true);
     try {
       const { error } = await supabase
         .from('categories')
         .delete()
         .eq('id', category.id);
 
       if (error) throw error;
       toast({ title: 'Category deleted successfully' });
       logActivity({
         action: 'delete',
         entityType: 'settings',
         entityId: category.id,
         details: { type: 'category', name: category.name }
       });
       fetchCategories();
     } catch (err: any) {
       toast({
         variant: 'destructive',
         title: 'Error',
         description: err.message || 'Failed to delete category. It may be in use by articles.'
       });
     } finally {
       setIsDeleting(false);
       setDeleteConfirm({ open: false, category: null });
     }
   };
 
   const openEditDialog = (category: Category) => {
     setEditingCategory(category);
     setName(category.name);
     setSlug(category.slug);
     setDescription(category.description || '');
     setIsDialogOpen(true);
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold font-heading">Categories</h1>
           <p className="text-muted-foreground mt-1">Manage news categories</p>
         </div>
         <Dialog open={isDialogOpen} onOpenChange={(open) => {
           setIsDialogOpen(open);
           if (!open) resetForm();
         }}>
           <DialogTrigger asChild>
             <Button className="btn-primary">
               <Plus className="mr-2 h-4 w-4" />
               New Category
             </Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>{editingCategory ? 'Edit' : 'Create'} Category</DialogTitle>
             </DialogHeader>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="name">Name</Label>
                 <Input
                   id="name"
                   value={name}
                   onChange={(e) => handleNameChange(e.target.value)}
                   placeholder="e.g., SACCO News"
                   required
                 />
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="slug">Slug</Label>
                 <Input
                   id="slug"
                   value={slug}
                   onChange={(e) => setSlug(e.target.value)}
                   placeholder="e.g., sacco-news"
                   required
                 />
                 <p className="text-xs text-muted-foreground">URL-friendly identifier</p>
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="description">Description (optional)</Label>
                 <Textarea
                   id="description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="Brief description of this category..."
                   rows={3}
                 />
               </div>
 
               <div className="flex justify-end gap-2 pt-4">
                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                   Cancel
                 </Button>
                 <Button type="submit" className="btn-primary" disabled={isSaving}>
                   {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {editingCategory ? 'Update' : 'Create'}
                 </Button>
               </div>
             </form>
           </DialogContent>
         </Dialog>
       </div>
 
       <Card className="border-border/50">
         <CardContent className="p-0">
           {isLoading ? (
             <div className="py-12 text-center">
               <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
             </div>
           ) : error ? (
             <ErrorState title="Failed to load categories" description={error} onRetry={fetchCategories} />
           ) : categories.length === 0 ? (
             <EmptyState
               icon={<FolderTree className="h-6 w-6 text-muted-foreground" />}
               title="No categories yet"
               description="Create categories to organize your news articles."
               action={{ label: 'Create Category', onClick: () => setIsDialogOpen(true) }}
             />
           ) : (
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Name</TableHead>
                   <TableHead>Slug</TableHead>
                   <TableHead>Description</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {categories.map((category) => (
                   <TableRow key={category.id}>
                     <TableCell className="font-medium">{category.name}</TableCell>
                     <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                     <TableCell className="max-w-xs truncate text-muted-foreground">
                       {category.description || '-'}
                     </TableCell>
                     <TableCell className="text-right">
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => openEditDialog(category)}
                       >
                         <Pencil className="h-4 w-4" />
                       </Button>
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => setDeleteConfirm({ open: true, category })}
                         className="text-destructive hover:text-destructive"
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
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
         onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
         title="Delete Category"
         description={`Are you sure you want to delete "${deleteConfirm.category?.name}"? Articles using this category will become uncategorized.`}
         confirmText="Delete"
         variant="destructive"
         onConfirm={handleDelete}
         isLoading={isDeleting}
       />
     </div>
   );
 }