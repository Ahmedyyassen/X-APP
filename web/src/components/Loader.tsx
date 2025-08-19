import { LoaderCircle } from 'lucide-react'

type Color={
  value?:string
  size:number
}
const Loader = ({value="oklch(62.3% 0.214 259.815)",size}:Color) => {
  return (
    <div className='fixed w-screen h-screen flex justify-center items-center'>
      <LoaderCircle className='animate-spin' color={value} size={size} />
    </div>
  )
}

export default Loader