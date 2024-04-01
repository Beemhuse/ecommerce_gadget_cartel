import React from 'react'

export default function EmptyProduct({message}) {
  return (
    <div className="flex w-full flex-col gap-6 items-center justify-center py-5">
    <img src="/assets/empty.jpg"  className="lg:w-1/4 w-full rounded-lg"/>
  <h2 className=" text-center text-3xl"> {message}</h2>
  </div>
  )
}
