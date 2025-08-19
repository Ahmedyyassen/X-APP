
const PostLoader = () => {
  return (
         <div className="brd cursor-pointer">
        {/*  post user detailes  */}
        <section className="flex justify-between items-center">
          <div className="flex p-4 pb-0">
            {/* profile image */}
            <div
              className="rounded-full w-10 h-10 xl:w-14 xl:h-14 object-cover bg-slate-300 animate-pulse"
            />
            <div className="ml-2 flex shrink-0 items-center ">
              <article className="flex flex-col gap-1">
                <span className="bg-slate-300 h-4 w-36 animate-pulse" />
                <span className="bg-slate-300 h-4 w-54 animate-pulse" />
              </article>
            </div>
          </div>
        </section>

        {/*    ******* post **********  */}
        <div className="pl-8 pr-4 xl:pl-16 relative mt-2">
          {/*    ******* post title**********  */}
          <div>
              <div className='flex flex-col space-y-2 '>
                <span className="bg-slate-300 h-4 w-[90%] animate-pulse" />
                <span className="bg-slate-300 h-4 w-[60%] animate-pulse" />
              </div>


            {/* ******* post photo ********** */}
            <div
                className="rounded-2xl my-3 mr-2 border w-full object-cover object-center h-48 sm:h-68 md:h-96 bg-slate-300 animate-pulse"
             />
          </div>

          <div className="w-full my-4 h-5 bg-slate-300 animate-pulse">
          </div>

        </div>
      </div>
  )
}

export default PostLoader