import React, { ReactNode } from 'react'
import './LoadingModal.scss'
import { Modal, Loading } from 'carbon-components-react'
import { messages_en } from "../../messages/messages_en"

type loadingModalProps = {
  message: string;
  loading: boolean;
  children?: ReactNode;
}
const LoadingModal: React.FC<loadingModalProps> = ({
  message, loading }) => {
  if(!loading){
    return null;
  }

  const getRandomFact = () => {
    const facts = [
      messages_en.loadingModalFunFact1,
      messages_en.loadingModalFunFact2,
      messages_en.loadingModalFunFact3,
      messages_en.loadingModalFunFact4
    ]
    return facts[Math.floor(Math.random()*facts.length)]
  }

  return (
    <>
      <Modal
        open
        passiveModal
        modalHeading={messages_en.loadingModalOneMoment}
      >
        <>
          <div className={"beegreen-loading-modal-content"}>
            <div className={"beegreen-loading-modal-loader"}>
              <Loading withOverlay={false}/>
            </div>
            <p className={"beegreen-loading-modal-loader-message"}>
              {message}
            </p>
          </div>
          <div className={"beegreen-loading-modal-fact-heading"}>
            {messages_en.loadingModalDidYouKnow}
          </div>
          {getRandomFact()}
        </>
      </Modal>
    </>
  )
}

 export default LoadingModal
