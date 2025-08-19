import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient";
import { query } from "../constants/queries";
import { notificationApi } from "../lib/api";
import toast from "react-hot-toast";

const useNotifications = () => {

     const api = useApiClient();
    const queryClient = useQueryClient();

    const { data: notificationsData, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: [query.NOTIFICATIONS],
        queryFn: async()=> await notificationApi.getNotifications(api),
        select: (response)=> response.data.notifications,
    });

    const { mutate: deleteNotificationMutation } = useMutation({
        mutationFn: async(notificationId: string)=> 
          await notificationApi.deleteNotification(api, notificationId),
        onSuccess:()=> queryClient.invalidateQueries({queryKey: [query.NOTIFICATIONS]}),
        onError: (err)=>{
            return toast.error(err.message);
        }
    })

  return {
    notifications:notificationsData ?? [],
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNoti:(id:string)=> deleteNotificationMutation(id),
  }
}

export default useNotifications