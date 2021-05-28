import React, { Component } from 'react'
import "./ItemDetails.scss"
import { productItem } from "../../../../utils/types"
import { messages_en } from "../../../../messages/messages_en"


interface ItemDetailsProps {
  item?: productItem
}

interface ItemDetailsState {
}

class ItemDetails extends Component<ItemDetailsProps, ItemDetailsState> {
  state= {
  }

  componentDidMount() {
  }

  render() {
    const { item } = this.props;
    if(!item){
      return null;
    }
    return (
      <>
        <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grad">
          <div style={{width: (100 - Math.floor(item.score * 10)) + "%"}} className="beegreen--item-details-stat-bar">
            {(100 - Math.floor(item.score * 10)) + "%"}
          </div>
        </div>
        <div>{messages_en.itemDetailsCarbonEmissions}</div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {messages_en.itemDetailsCarbonFieldFarm + "70%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"70%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {messages_en.itemDetailsCarbonFieldProcessing + "33%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"33%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {messages_en.itemDetailsCarbonFieldTransport + "56%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"56%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div className={"beegreen--item-details-notes"}>
          {messages_en.itemDetailsCarbonDescription}
        </div>
      </>
    )
  }
}

export default ItemDetails
