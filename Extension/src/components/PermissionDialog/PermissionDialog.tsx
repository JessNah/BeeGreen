import React, { ReactNode } from 'react'
import "./PermissionDialog.scss"
import { Modal } from "carbon-components-react"

type permissionDialogProps = {
  onOK: () => void;
  onClose: () => void;
  modalHeading: string,
  modalSubText: string,
  children?: ReactNode;
}
const PermissionDialog: React.FC<permissionDialogProps> = ({
  onOK, onClose, modalHeading, modalSubText }) => {

  // const [closeModal, setCloseModal] = useState<boolean>(false)
  // if(closeModal){
  //   return null;
  // }
  return (
    <>
      <Modal
        open
        modalHeading={modalHeading}
        primaryButtonText={"OK"}
        secondaryButtonText={"Cancel"}
        onRequestClose={() => onClose()}
        onRequestSubmit={() => onOK()}
      >
        <p style={{marginBottom: "1rem"}}>
          {modalSubText}
        </p>
      </Modal>
    </>
  )
}

 export default PermissionDialog
