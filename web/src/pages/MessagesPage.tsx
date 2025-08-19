import Header from "../components/Header"
import { ConversationDrawer } from "../components/ConversationDrawer";
import useConversation from "../hooks/useConversation";
import { useAppSelector } from "../hooks/useRedux";
import { Search } from "lucide-react";
import ConversationCom from "../components/ConversationCom";

const MessagesPage = () => {
    const { 
    error,
    onClose,
    friendFn,
    isLoading,
    newMessage,
    handleKeyUp,
    openMessage,
    setOpenModal,
    setnewMessage,
    conversations,
    handleKeyDown,
    handleSendMessage,
   } = useConversation();

  const { selectedConversation } = useAppSelector((sel) => sel.chatSlice);
   

  if (error) {
    return <div>Error {error.message}</div>
  }

  return (
    <>
    { isLoading ? (
      <div>...Loading</div>
    ) : (
      conversations.length === 0 ? (
        <div>There is no any conversation</div>
      ) : (
      <div>
          <div className="w-full h-screen overflow-auto border-x-1 border-gray-300 dark:border-gray-800">
          <Header title="Messages"  />

              <div className='px-4 py-3 border-b '>
                <div className='flex flex-row items-center rounded-full px-4 py-3 bg-gray-100 dark:bg-zinc-950'>
                  <Search name='search' size={24} color={"#657786"} />
                  <input placeholder='Search for people and groups'
                  className='flex flex-1 ml-3 w-full text-base border-none outline-none'
                  />
                </div>
              </div>

          <div className="border">
            { conversations?.map((item)=>(
                  <ConversationCom
                   key={item._id}
                   conv={item}
                   friendFn={friendFn}
                   setOpenModal={()=>setOpenModal(item)}
                    openMessage={openMessage}
                   />
                ))}

          </div>
          </div>
             {
              selectedConversation && (
                  <ConversationDrawer 
                    isChateOpen={openMessage}
                    closeConversation={onClose}
                    setNewMessage={setnewMessage}
                    newMessage={newMessage}
                    sendMessage={handleSendMessage}

                    handleKeyDown={handleKeyDown}
                    handleKeyUp={handleKeyUp}
                    />
                )
            }
      </div>
      )
    )}
    </>
  )
}

export default MessagesPage