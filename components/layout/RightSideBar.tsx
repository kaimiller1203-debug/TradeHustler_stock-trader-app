import React from 'react'

const RightSideBar = () => {
    return (
            <div
                className="
                  absolute
                  top-1/2 -translate-y-1/2
                  right-[-180px]
                  w-[200px]
                  h-[240px]
                  rounded-2xl
                  border border-[rgba(242,115,3,0.25)]
                  bg-[rgba(242,115,3,0.12)]
                  backdrop-blur-xl
                  shadow-[0_8px_40px_rgba(242,115,3,0.35)]
                  z-40
                  flex items-center justify-center
                ">
                <span className="text-[10px] text-white/50">Chart Widget</span>
            </div>
            )
}
export default RightSideBar
