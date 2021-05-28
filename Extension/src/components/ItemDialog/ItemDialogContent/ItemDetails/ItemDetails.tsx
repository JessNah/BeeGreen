import React, { Component } from 'react'
import "./ItemDetails.scss"
import { productItem } from "../../../../utils/types"


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
        <div>{"185 kg carbon emissions3"}</div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {"Farm: " + "70%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"70%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {"Processing: " + "33%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"33%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div>
          <div className={"beegreen--item-details-stat-bar-1-label"}>
            {"Transport: " + "56%"}
          </div>
          <div>
            <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
              <div style={{width:"56%"}} className="beegreen--item-details-stat-bar-1"/>
            </div>
          </div>
        </div>
        <div className={"beegreen--item-details-notes"}>
          {"This product is known to use more energy to mill than other similar items. Additionally, this item consumes more land for use in production when compared to other similar items."}
        </div>
      </>
    )
  }
}

export default ItemDetails
