import { FaComment, FaHeart, FaRetweet, FaShare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/post";
import type { USER } from "../types/user";
import { formatDate, formatNumber } from "../utils/formatters";
import { useState } from "react";
import { LinkifyText } from "../helpers/linkifyText";
import PostOptions from "./PostOptions";

type Props = {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  isLiked: boolean;
  currentUser: USER;
  setOpenDelete: () => void;
  setOpenUpdate:() => void;
};
const PostCard = ({
  post,
  currentUser,
  isLiked,
  onLike,
  setOpenDelete,
  onComment,
  setOpenUpdate
}: Props) => {
  const navigate = useNavigate();
  const isOwnPost = currentUser && currentUser._id === post.user._id;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="brd cursor-pointer">
        {/*  post user detailes  */}
        <section className="flex justify-between items-center">
          <div className="flex p-4 pb-0">
            <img
              onClick={() => navigate(`profile/${post.user && post.user.username}`)}
              src={post?.user.profilePicture || "/icon.png"}
              className="rounded-full w-10 h-10 xl:w-14 xl:h-14 object-cover"
            />
            <div className="ml-2 flex shrink-0 items-center font-medium   ">
              <article className="flex flex-col">
                <span className="text-sm md:text-md">{post.user.fullName}</span>
                <span className="text-xs md:text-sm leading-5 text-gray-400">
                  {post.user.username} .{" "}
                  <span className="text-gray-600 font-semibold">
                    {formatDate(post.createdAt)}
                  </span>
                </span>
              </article>
            </div>
          </div>

          <PostOptions
          isOwnPost={isOwnPost}
          setOpenDelete={setOpenDelete}
          setOpenUpdate={setOpenUpdate}
          />
        
        </section>

        {/*    ******* post **********  */}
        <div className="pl-8 pr-4 xl:pl-16 relative mt-2">
          {/*    ******* post title**********  */}
          <div>
            {post.content && (
              <p
                className={`w-full text-sm md:text-md font-medium py-1 whitespace-pre-wrap ${
                  !isExpanded ? "line-clamp-2" : ""
                }`}
              >
                {<LinkifyText text={post.content} />}{" "}
              </p>
            )}

            {/* Show more/less button */}
            {post.content && post.content.split(/\s+/).length > 20 && (
              <button
                onClick={()=> setIsExpanded((prev) => !prev)}
                className="text-blue-400 cursor-pointer text-sm font-medium hover:underline"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}

            {/* ******* post photo ********** */}
            {post.image && (
              <img
                src={post.image}
                alt={post.user.username}
                className="rounded-2xl my-3 mr-2 border w-full object-cover object-center h-48 sm:h-68 md:h-96 border-gray-300"
              />
            )}
          </div>

          <div className="flex justify-between w-full my-4">
            <div onClick={onLike} className="postIcon hover:text-red-400">
              <FaHeart
                className={`mr-2 text-lg ${isLiked ? "text-red-400" : ""}`}
              />
              {formatNumber(post.likes.length || 0)}
            </div>

            <div
              onClick={onComment}
              className="postIcon hover:text-blue-400 dark:hover:text-blue-400"
            >
              <FaComment className=" mr-2 text-lg"></FaComment>
              <span>{formatNumber(post.comments?.length || 0)}</span>
            </div>

            <div className="postIcon hover:text-green-400 dark:hover:text-green-400">
              <FaRetweet className="mr-2 text-lg" />
              <span>14 k</span>
            </div>
            <div
              title="share link"
              className="postIcon hover:text-blue-400 dark:hover:text-blue-400"
            >
              <FaShare className=" mr-2 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
