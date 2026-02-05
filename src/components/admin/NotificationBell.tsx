 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Bell } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import { Badge } from '@/components/ui/badge';
 import { ScrollArea } from '@/components/ui/scroll-area';
 import { useRealtimeNotifications, AdminNotification } from '@/hooks/useRealtimeNotifications';
 import { format } from 'date-fns';
 
 export function NotificationBell() {
   const navigate = useNavigate();
   const { notifications, unreadCount, markAsRead, clearAll, isLoading } = useRealtimeNotifications();
   const [open, setOpen] = useState(false);
 
   const handleNotificationClick = (notification: AdminNotification) => {
     markAsRead(notification.id);
     if (notification.link) {
       navigate(notification.link);
     }
     setOpen(false);
   };
 
   const getNotificationIcon = (type: AdminNotification['type']) => {
     switch (type) {
       case 'submission':
         return '📝';
       case 'article':
         return '📰';
       case 'event':
         return '📅';
       default:
         return '🔔';
     }
   };
 
   return (
     <DropdownMenu open={open} onOpenChange={setOpen}>
       <DropdownMenuTrigger asChild>
         <Button variant="ghost" size="icon" className="relative">
           <Bell className="h-5 w-5" />
           {unreadCount > 0 && (
             <Badge 
               variant="destructive" 
               className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
             >
               {unreadCount > 9 ? '9+' : unreadCount}
             </Badge>
           )}
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end" className="w-80">
         <DropdownMenuLabel className="flex items-center justify-between">
           <span>Notifications</span>
           {notifications.length > 0 && (
             <Button
               variant="ghost"
               size="sm"
               className="text-xs h-auto py-1 px-2"
               onClick={(e) => {
                 e.preventDefault();
                 clearAll();
               }}
             >
               Mark all read
             </Button>
           )}
         </DropdownMenuLabel>
         <DropdownMenuSeparator />
         {isLoading ? (
           <div className="p-4 text-center text-muted-foreground text-sm">
             Loading...
           </div>
         ) : notifications.length === 0 ? (
           <div className="p-4 text-center text-muted-foreground text-sm">
             No notifications
           </div>
         ) : (
           <ScrollArea className="max-h-80">
             {notifications.map((notification) => (
               <DropdownMenuItem
                 key={notification.id}
                 onClick={() => handleNotificationClick(notification)}
                 className={`flex items-start gap-3 p-3 cursor-pointer ${
                   !notification.read ? 'bg-muted/50' : ''
                 }`}
               >
                 <span className="text-lg flex-shrink-0">
                   {getNotificationIcon(notification.type)}
                 </span>
                 <div className="flex-1 min-w-0">
                   <p className={`text-sm truncate ${!notification.read ? 'font-medium' : ''}`}>
                     {notification.message}
                   </p>
                   <p className="text-xs text-muted-foreground mt-0.5">
                     {format(notification.createdAt, 'MMM d, h:mm a')}
                   </p>
                 </div>
                 {!notification.read && (
                   <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                 )}
               </DropdownMenuItem>
             ))}
           </ScrollArea>
         )}
       </DropdownMenuContent>
     </DropdownMenu>
   );
 }