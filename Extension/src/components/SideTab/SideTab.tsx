import React, { useEffect, useState } from 'react'
import "./SideTab.css"

const SideTab: React.FC<{}> = () => {
  return (
    <>
      <div id="SideTabJ" className="side-tab">
        <div className={"side-tab-icon"} aria-hidden="true">T2</div>
        <div className={"side-tab-icon side-tab-close"}>x</div>
      </div>
    </>
  )
}

 export default SideTab
