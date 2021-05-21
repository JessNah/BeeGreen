import React, { ReactNode } from 'react'
import './LoadingModal.scss'
import { Modal, Loading } from 'carbon-components-react'

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
      "Up to 12.7 million tonnes of plastic enters the oceans every year.",
      "In the Canadian Arctic, 87% of birds have ingested plastics of some sort.",
      "Scientists have documented 700 marine species affected by ocean plastic.",
      "The equivalent of a truckload of plastic enters the oceans every minute."
    ]
    return facts[Math.floor(Math.random()*facts.length)]
  }

  return (
    <>
      <Modal
        open
        passiveModal
        modalHeading={"One moment please."}
      >
        <>
          <div className={"take2-loading-modal-content"}>
            <div className={"take2-loading-modal-loader"}>
              <Loading withOverlay={false}/>
            </div>
            <p className={"take2-loading-modal-loader-message"}>
              {message}
            </p>
          </div>
          <div className={"take2-loading-modal-fact-heading"}>
            Did you know?
          </div>
          {getRandomFact()}
        </>
      </Modal>
    </>
  )
}

 export default LoadingModal
