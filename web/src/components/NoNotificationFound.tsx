import { Bell } from "lucide-react"

const NoNotificationFound = () => {
  return (
      <div className="flex flex-1 items-center justify-center px-8" style={{ minHeight: 400 }}>
      <div className="flex flex-col justify-center items-center">
        <Bell color={"#E1E8ED"} size={80}/>
        <p className="text-2xl font-semibold text-gray-500 mt-6 mb-3">No notifications yet</p>
        <p className="text-gray-400 text-center text-base leading-6 max-w-xs">
          When people like, or follow you, you&apos;all see it here.
          </p>
      </div>
    </div>
  )
}

export default NoNotificationFound