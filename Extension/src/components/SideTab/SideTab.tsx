import React, { useEffect, useState } from 'react'
import "./SideTab.css"

const SideTab: React.FC<{}> = () => {
  return (
    <>
      <div className="take2-side-tab">
        <div className={"take2-side-tab-icon take2-side-tab-default"} aria-hidden="true">T2</div>
        <div className={"take2-side-tab-icon take2-side-tab-close"}>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="Close this tab" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" role="img" className="take2-close-svg" ><path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"></path></svg>
        </div>
      </div>
    </>
  )
}

 export default SideTab
