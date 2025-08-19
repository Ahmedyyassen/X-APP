import { LoaderCircle } from "lucide-react";
import type { Post } from "../types/post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

type Props={
    onDelete:()=>void;
    selectedPost:Post;
    deleteing:boolean
    onClose:()=>void
    open:boolean
    setopenDialog:(e:boolean)=>void
}
const DeleteModal = ({onDelete,selectedPost,deleteing,onClose,open,setopenDialog}:Props) => {
  
  const handleClose = ()=>{
    onClose();
    setopenDialog(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-wrap line-clamp-2">
            {selectedPost.content}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" style={{backgroundColor:"#fb2c36", color:"#fff"}} onClick={onDelete}>
            {deleteing ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Delete"
            )
            }
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteModal