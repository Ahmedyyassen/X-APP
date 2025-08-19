// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import useConversation from "../hooks/useConversation";
// import { useAppSelector } from "../hooks/useRedux";

const BookmarkPage = () => {

  // const { conversations,isLoading,
  //   error,onClose,
  //   handleKeyDown,
  //   handleSendMessage,
  //   openMessage,
  //   setOpenModal,
  //   handleKeyUp,newMessage,setnewMessage,
  //   friendFn,
  //  } = useConversation();

  //   const { selectedChatMessages,selectedUserDate, typingStatus} = useAppSelector((sel) => sel.chatSlice);



  // if (error) {
  //   return <div>Error {error.message}</div>
  // }

  // return (
  //   <>
  //     <div>
  //     <div>BookmarkPage</div>
  //     { !isLoading ? 
  //       (conversations.length === 0 ? <div>You don't have any friends</div> : 
  //       conversations.map((conv) => (
  //       <div key={conv._id} className="bg-neutral-900 p-4 rounded-2xl cursor-pointer" onClick={()=>setOpenModal(conv) }>
  //         <div>{friendFn(conv).fullName}</div>
  //       </div>
  //     )) )
  //     : <div>...Loading</div> 
  //   }
  //     </div>

      

  //   <Dialog
  //           open={openMessage}
  //           onOpenChange={onClose}
  //         >
  //           <DialogContent
  //             className="w-[500px] rounded-2xl"
  //             aria-describedby={undefined}
  //           >
  //             <DialogHeader>
  //               <DialogTitle>Chat Page</DialogTitle>
  //             </DialogHeader>
  //             <DialogDescription>{selectedUserDate?.username}</DialogDescription>
    
  //             <div>
  //               <div className="grid gap-4 py-4">
  //                 {selectedChatMessages?.map((item)=>(
  //                     <div key={item._id}>
  //                         <span >{item.content}</span>
  //                         <span>{}</span>
  //                       </div>
  //                 ))}
  //                 <div className="grid grid-cols-4 items-center gap-4 ">
  //                   <Input
  //                     id="message"
  //                     type="text"
  //                     name="message"
  //                     value={newMessage}
  //                     onChange={(e) => setnewMessage(e.target.value)}
  //                     onKeyDown={handleKeyDown}
  //                     onKeyUp={handleKeyUp}
  //                     placeholder="Message..."
  //                     className="col-span-4 h-11 rounded-2xl p-4"
  //                   />
  //                 </div>
  //               </div>
  //               <DialogFooter>
  //                 <div className="flex items-center justify-between w-full">
  //                   {typingStatus && <span>Typing...</span>}
  //                   <Button
  //                     type="button"
  //                     onClick={handleSendMessage}
  //                     size={"lg"}
  //                     className="rounded-full cursor-pointer ml-auto"
  //                   >
  //                       Send
  //                   </Button>
  //                 </div>
  //               </DialogFooter>
  //             </div>
  //           </DialogContent>
  //         </Dialog> 
  //   </>
  // );
return <div>bookmark</div>
};

export default BookmarkPage;
