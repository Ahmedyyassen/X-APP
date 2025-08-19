import { Calendar, CheckCircle, MapPin } from "lucide-react";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { Button } from "../components/ui/button";
import useProfile from "../hooks/useProfile";
import Loader from "../components/Loader";
import { useAppSelector } from "../hooks/useRedux";
import UpdateProfileDialog from "../components/UpdateProfileDialog";
import ProfileLoader from "../components/loaders/ProfileLoader";

const ProfilePage = () => {
  const {user:currentUser} = useAppSelector((sel) => sel.authSlice);
  const {
    user,
    isLoading,
    error,
    refetch,
    toggleFollow,
    isPending,
    handleChange,
    updateProfile,
    saveData,
    openUpdateDialog,
    setopenUpdateDialog,
    setimageFile,
    isDisable,
    loadingUpdateing,
    setBannerImageFile
  } = useProfile();

  const isOwn = user?._id === currentUser?._id;
  const isFollow = !!(
    currentUser &&
    Array.isArray(user?.followers) &&
    user.followers.includes(currentUser._id)
  );

  if (error) {
    return (
      <div className="flex flex-col p-8 items-center justify-center">
        <p className="text-gray-500 mb-4">Failed to load Profile</p>
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => refetch()}
        >
          <p className="text-white font-semibold">Retry</p>
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="border-x border-gray-300 dark:border-gray-700 w-full h-screen overflow-auto ">
        <Header title={user?.fullName as string} post={user?.posts.length} />
        {/* BANNER IMAGE */}
        { isLoading ? (
          <ProfileLoader />
        ) : (
        <div>
        {user?.bannerImage ? (
          <img
            src={user?.bannerImage}
            alt={user.username}
            className="w-full h-48 md:h-64 object-cover object-center"
          />
        ) : (
          <div className="w-full h-48 md:h-64 bg-gray-300 dark:bg-gray-400" />
        )}

        {/* USER INFORAMTION */}
        <div className="px-4 pb-4 border-b">
          <div className="flex flex-row justify-between items-end -mt-16 mb-4">
            <img
              src={user?.profilePicture || "/icon.png"}
              alt={user?.username || "User"}
              className="size-28 md:size-36 rounded-full border-4 border-gray-100 object-center object-cover"
            />
            {isOwn && (
              <Button
                onClick={() => setopenUpdateDialog(true)}
                className="border border-gray-300 px-6 py-2 rounded-full cursor-pointer transition-colors"
              >
                <p className="font-semibold">Edit profile</p>
              </Button>
            )}
          </div>

          <div className="mb-4">
            <div className="flex flex-row items-center mb-1">
              <p className="font-bold text-xl mr-1">{user?.fullName}</p>
              <CheckCircle
                name="check-circle"
                size={16}
                color={"#1DA1F2"}
                className="ml-1"
              />
              {!isOwn && (
                <button
                  disabled={isPending}
                  onClick={() => toggleFollow(user?._id as string)}
                  className={`ml-4 btn w-24 h-8 ${
                    isFollow ? "bg-white text-blue-400" : ""
                  }`}
                >
                  {isPending ? (
                    <Loader size={24} />
                  ) : isFollow ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>
            <p className="text-gray-500 mb-1">{user?.username}</p>
            <p className="text-gray-500 mb-1">
              {user?.bio || "No bio available"}
            </p>
            <div className="flex flex-row items-center mb-1">
              <MapPin name="map-pin" size={16} color={"#657786"} />
              <p className="text-gray-500 ml-2">
                {user?.location || "Location not specified"}
              </p>
            </div>

            <div className="flex flex-row items-center mb-1">
              <Calendar name="calendar" size={16} color={"#657786"} />
              <p className="text-gray-500 ml-2">
                Joined{" "}
                {new Date(user?.createdAt ?? "").toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex gap-1">
                <p className="font-bold">{user?.following?.length}</p>
                <p className="text-gray-500">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold ">{user?.followers?.length}</p>
                <p className="text-gray-500">Followers</p>
              </div>
            </div>
          </div>
        </div>
         </div>
        )}

        <section>
          <PostList username={user?.username} />
        </section>
      </div>

      {openUpdateDialog && 
      <UpdateProfileDialog
      open={openUpdateDialog}
      onClose={setopenUpdateDialog}
      handleChange={handleChange}
      updatedProfile={updateProfile}
      saveData={saveData}
      loading={loadingUpdateing}
      disable={isDisable}
      setimageFile={setimageFile}
      setBannerImageFile={setBannerImageFile}
       />}
    </>
  );
};

export default ProfilePage;
