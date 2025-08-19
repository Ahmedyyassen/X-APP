import { Bell, Heart, MessageCircle, Trash, UserPlus } from "lucide-react";
import type { Notification } from "../types/post";
import { formatDate } from "../utils/formatters";

type NoticationCardProps={
    notification: Notification;
    onDelete: (notificationId: string)=> void;
}
const NotificationCard = ({notification,onDelete}:NoticationCardProps) => {

   const getNotificationText = () => {
    const name = `${notification.from.fullName}`
    switch (notification.type) {
      case "like":
        return `${name} liked your post`;
      case "comment":
        return `${name} commented on your post`;
      case "follow":
        return `${name} started following you`;
      default:
        return "";
    }
  };

    const getNotificationIcon = () => {
      switch (notification.type) {
        case "like":
          return <Heart name='heart' size={20} color={"#E0245E"}/>;
        case "comment":
          return <MessageCircle name='message-circle' size={20} color={"#1DA1F2"}/>;
        case "follow":
          return <UserPlus name='user-plus' size={20} color={"#17BF63"}/>;
        default:
          return <Bell name='bell' size={20} color={"#657786"}/>;
      }
  };

  return (
      <div className='border-b border-gray-300 dark:border-gray-700'>
      <div className='flex flex-row p-4 '>
          <div className='relative mr-3 shrink-0'>
              <img src={notification.from.profilePicture || ""}
                className='size-12 rounded-full object-cover' />
                <div className='absolute -bottom-1 -right-1 size-6 items-center justify-center'>
                  {getNotificationIcon()}
                </div>
          </div>
              <div className='flex flex-col flex-1'>
                  <div className='flex flex-row items-center justify-between mb-1'>
                    <div className='flex flex-1 flex-col '>
                        <div className='text-base leading-5 mb-1'>
                          <p className='font-semibold'>
                              {notification.from.fullName}
                          </p>
                            <p className='text-gray-500 text-xs'>
                                @{notification.from.username} 
                            </p>
                          </div>
                        <p className=' text-sm mb-2 ml-2 font-semibold mt-1'>{getNotificationText()}</p>
                    </div>

                <button className='ml-2 p-1 cursor-pointer transition-all hover:scale-120' onClick={()=> onDelete(notification._id)}>
                    <Trash name='trash' size={16} color={"#E0245E"} />
                </button>
            </div>
            
              {notification.post && (
                <div className='p-1 xl:p-3 mb-2 rounded-lg bg-blue-50 dark:bg-zinc-900'>
                  {notification.post?.content && (
                      <p className='text-sm font-semibold mb-2 line-clamp-2 whitespace-pre-wrap '>
                          {notification.post?.content}
                        </p>
                  )}
                  {notification.post?.image && (
                      <img src={notification.post?.image}
                      className='w-full h-32 rounded-lg mb-2 object-cover'
                      />
                  )}
                </div>
              )}

              {notification.comment && (
                <div className='bg-blue-50 rounded-lg p-3 mb-2 dark:bg-zinc-900'>
                    <p className='text-gray-600 dark:text-gray-300 text-xs mb-1'>Comment:</p>
                    <p className='text-gray-700 dark:text-gray-400 text-sm break-words'>
                      &ldquo;{notification.comment.content}&rdquo;
                    </p>
                </div>
              )}

              <p className='text-gray-400 text-xs'>{formatDate(notification.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard