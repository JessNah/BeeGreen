import React, { useEffect, useState, ReactNode } from 'react'
import "./SideTab.scss"
import { Button } from "carbon-components-react"
import { Close24 } from "@carbon/icons-react"

type sideTabProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: ReactNode;
}
const SideTab: React.FC<sideTabProps> = ({
  onClick }) => {

  const [closeTab, setCloseTab] = useState<boolean>(false)
  if(closeTab){
    return null;
  }
  return (
    <>
      <div className="take2-side-tab">
        <div onClick={onClick} className={"take2-side-tab-icon take2-side-tab-default"} aria-hidden="true">
          T2
        </div>
        <div className={"take2-side-tab-icon take2-side-tab-close"}
          onClick={() => setCloseTab(true)}>
            <Close24 className={"take2-close-svg"} ariaLabel={"Close this tab"} />
        </div>
      </div>
    </>
  )
}

 export default SideTab
