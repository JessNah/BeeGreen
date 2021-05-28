import React, { ReactNode, useEffect, useState } from 'react'
import "./SideTab.scss"
import { Close24, Bee32 } from "@carbon/icons-react"

type sideTabProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: ReactNode;
}

const SideTab: React.FC<sideTabProps> = ({
  onClick, 
  onClose }) => {
  const [animateIn, setAnimateIn] = useState<boolean>(false)

  useEffect(() => {
    setAnimateIn(true)
  });

  return (
    <>
      <div className={!animateIn ? "beegreen-side-tab" : "beegreen-side-tab beegreen-side-tab-active"}>
        <div onClick={onClick} className={"beegreen-side-tab-icon beegreen-side-tab-default"} aria-hidden="true">
          <Bee32 className={"beegreen-side-tab-bee"} />
        </div>
        <div className={"beegreen-side-tab-icon beegreen-side-tab-close"}
          onClick={onClose}>
            <Close24 className={"beegreen-close-svg"} ariaLabel={"Close this tab"} />
        </div>
      </div>
    </>
  )
}

 export default SideTab
