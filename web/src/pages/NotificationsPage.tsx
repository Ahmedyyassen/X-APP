import { LoaderCircle } from "lucide-react";
import Header from "../components/Header";
import useNotifications from "../hooks/useNotifications"
import NoNotificationFound from "../components/NoNotificationFound";
import type { Notification } from "../types/post";
import NotificationCard from "../components/NotificationCard";

const NotificationsPage = () => {
  const { notifications,deleteNoti,error,isLoading,refetch } = useNotifications();

   if (error) {
        return(
          <div className='flex flex-1 flex-col justify-center p-8 items-center'>
            <p className='text-gray-500 mb-4'>Failed to load notification</p>
            <button className='bg-blue-500 px-4 py-2 rounded-lg'
            onClick={()=> refetch()}>
              <p className='text-white font-semibold'>Retry</p>
            </button>
          </div>
        )}

  return (
    <>
    <div className="w-full h-screen overflow-auto border-gray-300 dark:border-gray-700">
        <Header title="Notifications" />
        { isLoading ? (
            <div className='flex flex-1 flex-col justify-center p-8 items-center'>
              <LoaderCircle className="animate-spin" size={64} color={"#1DA1F2"} />
              <p className='text-gray-500 mt-4'>Loading Notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <NoNotificationFound />
          ) : (
            <article className="border-x border-gray-300 dark:border-gray-700 overflow-y-auto">
            { notifications?.map((notification: Notification)=> (
              <NotificationCard 
              key={notification._id}
              notification={notification}
              onDelete={deleteNoti}
              />
            ))}
            </article>
          )}
    </div>
           
    </>
  )
}

export default NotificationsPage