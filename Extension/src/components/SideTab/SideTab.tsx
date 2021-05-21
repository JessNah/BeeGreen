import React, { ReactNode, useEffect, useState } from 'react'
import "./SideTab.scss"
import { Close24 } from "@carbon/icons-react"

type sideTabProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: ReactNode;
}

type sideTabState = {
  animateIn: boolean
}
const SideTab: React.FC<sideTabProps> = ({
  onClick, 
  onClose }) => {
  const [animateIn, setAnimateIn] = useState<boolean>(false)

  useEffect(() => {
    console.log("hmomomom");
    setAnimateIn(true)
  });

  return (
    <>
      <div className={!animateIn ? "take2-side-tab" : "take2-side-tab take2-side-tab-active"}>
        <div onClick={onClick} className={"take2-side-tab-icon take2-side-tab-default"} aria-hidden="true">
          T2
        </div>
        <div className={"take2-side-tab-icon take2-side-tab-close"}
          onClick={onClose}>
            <Close24 className={"take2-close-svg"} ariaLabel={"Close this tab"} />
        </div>
      </div>
    </>
  )
}

 export default SideTab
