import { useEffect, useRef, useState } from "react";

const useEmoji = () => {
      const [openEmoji, setopenEmoji] = useState(false);
      const emojiRef = useRef<HTMLDivElement>(null);
      useEffect(()=>{
        function handleClieckOutSide(event:MouseEvent){
        if (
          emojiRef.current && event.target instanceof Node &&
          !emojiRef.current.contains(event.target)) 
          {
          setopenEmoji(false);
        }}
        document.addEventListener("mousedown", handleClieckOutSide);
    
        return()=>{
          document.removeEventListener("mousedown", handleClieckOutSide);
        }
      },[])

  return {emojiRef, openEmoji, setopenEmoji}
}

export default useEmoji