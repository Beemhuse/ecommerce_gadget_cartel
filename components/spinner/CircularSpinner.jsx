import React from 'react'

export default function CircularSpinner() {
  return (
         <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin w-5 h-5 border-t-2 border-white rounded-full"></div>
        </div>
  )
}
