import { Edit, Ellipsis, Share, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props={
    isOwnPost:boolean;
    setOpenDelete:()=>void;
    setOpenUpdate:()=>void;
}
const PostOptions = ({isOwnPost,setOpenDelete,setOpenUpdate}:Props) => {
  return (
      <div className="mr-4 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none cursor-pointer">
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 " align="end">
              <DropdownMenuGroup>
                 { isOwnPost && <DropdownMenuItem onClick={setOpenUpdate} className="dropdown-item">
                    Update Post
                    <DropdownMenuShortcut><Edit size={16}/></DropdownMenuShortcut>
                  </DropdownMenuItem>}
                { isOwnPost && <DropdownMenuItem onClick={setOpenDelete} className="dropdown-item">
                    Delete Post
                    <DropdownMenuShortcut><Trash size={16} /></DropdownMenuShortcut>
                  </DropdownMenuItem>}
                  <DropdownMenuItem className="dropdown-item">
                    Share
                    <DropdownMenuShortcut><Share size={16}/></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
)
}

export default PostOptions