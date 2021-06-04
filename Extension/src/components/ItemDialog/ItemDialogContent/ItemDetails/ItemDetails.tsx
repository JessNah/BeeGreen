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

  getBarClass = (score) => {
    if(score < 35) {
      return "beegreen--item-details-stat-bar-green";
    } else if (score < 65) {
      return "beegreen--item-details-stat-bar-yellow";
    } else {
      return "beegreen--item-details-stat-bar-red";
    }
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
        { this.props.item.top3Metrics && Object.keys(this.props.item.top3Metrics).map((field: string, index) => {
          return (
            <div>
              <div className={"beegreen--item-details-stat-bar-1-label"}>
                {field + ": " + this.props.item.top3Metrics[field] + "%"}
              </div>
              <div>
                <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
                  <div style={{width: this.props.item.top3Metrics[field] + "%"}}
                    className={"beegreen--item-details-stat-bar-1 " + this.getBarClass(this.props.item.top3Metrics[field])}/>
                </div>
              </div>
            </div>
          )
        })}
        <div className={"beegreen--item-details-notes"}>
          {messages_en.itemDetailsCarbonDescription}
        </div>
      </>
    )
  }
}

export default ItemDetails
