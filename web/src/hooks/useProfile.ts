import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient";
import { userApi } from "../lib/api";
import { query } from "../constants/queries";
import type { PROFILE, UpdateProfile } from "../types/user";
import { useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

const useProfile = () => {
  const api = useApiClient();
  const { username } = useParams();
  const queryClient = useQueryClient();
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<PROFILE>({
    queryKey: [query.PROFILE, username],
    queryFn: async () => {
      const res = await userApi.getUserByUsername(api, username!);
      return res.data.user;
    },
    retry:false,
    // enabled: !!username,
    // staleTime:0,
    // gcTime:0,
  });

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: async (id: string) =>
      await userApi.followUser(api, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query.PROFILE, username] });
      queryClient.invalidateQueries({ queryKey: [query.CONVERSATIONS] });
      queryClient.invalidateQueries({ queryKey: [query.POST] });
    },
  });

    const [imageFile, setimageFile] = useState<File | null>(null);
    const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);

    const [updateProfile, setupdateProfile] = useState<UpdateProfile>({
      fullName: "",
      bio: "",
      location: "",
      image: "",
      bannerImage:"",
    });
  
    const { mutate, isPending:loadingUpdateing } = useMutation({
    mutationFn: async (data:UpdateProfile) =>{
      const formDate = new FormData();
      if (data.fullName) formDate.append("fullName", data.fullName);
      if (data.location) formDate.append("location", data.location);
      if (data.bio) formDate.append("bio", data.bio);
      if (imageFile) formDate.append("profileImage", imageFile); 
      if (bannerImageFile) formDate.append("bannerImage", bannerImageFile); 
      return await userApi.updateUser(api,formDate);
    },
    onSuccess: (res) => {
      setopenUpdateDialog(false);
      setimageFile(null);
      setBannerImageFile(null);
      setupdateProfile({fullName:"",location:"",bio:"",image:""});
      queryClient.invalidateQueries({ queryKey: [query.PROFILE, username] });
      queryClient.invalidateQueries({ queryKey: [query.AUTH_USER] });
      toast.success(res.data.message);
    },
    onError:(err)=>{
      toast.error(err.message)
    }
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setupdateProfile((prev)=> ({ ...prev, [name]:value }))
  }

    useEffect(() => {
      if (user) {
        setupdateProfile({
          fullName: user.fullName || "",
          bio: user.bio || "",
          location: user.location || "",
          image: user.profilePicture || "",
          bannerImage: user.bannerImage || "",
        });
      }
    }, [user]);

    const isDisable = ():boolean=>{
      return loadingUpdateing || (user?.fullName === updateProfile.fullName
      && user?.bio === updateProfile.bio && user?.location === updateProfile.location
      && !imageFile && !bannerImageFile
    )}

  return { 
    user,
    isLoading,
    error,
    refetch,
    isPending,
    toggleFollow,
    updateProfile,
    handleChange,
    isDisable,
    loadingUpdateing,
    saveData: ()=> mutate(updateProfile),
    openUpdateDialog,
    setopenUpdateDialog,
    setimageFile,
    setBannerImageFile
  };
};

export default useProfile;
