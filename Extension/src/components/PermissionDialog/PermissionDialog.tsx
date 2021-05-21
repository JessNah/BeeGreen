import React, { useEffect, useState, ReactNode } from 'react'
import "./PermissionDialog.scss"
import { Modal } from "carbon-components-react"

type permissionDialogProps = {
  onOK: () => void;
  modalHeading: string,
  modalSubText: string,
  children?: ReactNode;
}
const PermissionDialog: React.FC<permissionDialogProps> = ({
  onOK, modalHeading, modalSubText }) => {

  const [closeModal, setCloseModal] = useState<boolean>(false)
  if(closeModal){
    return null;
  }
  return (
    <>
      <Modal
        open
        modalHeading={modalHeading}
        primaryButtonText={"OK"}
        secondaryButtonText={"Cancel"}
        onRequestClose={() => setCloseModal(true)}
        onRequestSubmit={() => {setCloseModal(true); onOK();}}
      >
        <p style={{marginBottom: "1rem"}}>
          {modalSubText}
        </p>
      </Modal>
    </>
  )
}

 export default PermissionDialog
