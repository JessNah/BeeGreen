import React, { Component } from 'react'
import "./ItemDetails.scss"
import { productItem } from "../../../../utils/types"
import { messages_en } from "../../../../messages/messages_en"
import RatingBar from "../../../RatingBar/RatingBar";


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
    if(!this.props.item.top3Metrics){
      return null;
    }
    this.props.item.top3Metrics = Object.keys(this.props.item.top3Metrics).sort().reduce(
      (obj, key) => { 
        obj[key] = this.props.item.top3Metrics[key]; 
        return obj;
      }, 
      {}
    );
    return (
      <>
        <RatingBar scorePercent={(Math.floor(item.score * 10)) + "%"} className={"beegreen--item-details-stat-bar-container-grad"} />
        <div>{(this.props.item.stats && this.props.item.stats.Total_emissions) ? 
          (this.props.item.stats.Total_emissions + " Kg CO2 - per kg product") : messages_en.itemDetailsCarbonEmissions}</div>
        { this.props.item.top3Metrics && Object.keys(this.props.item.top3Metrics).map((field: string, index) => {
          return (
            <div>
              <div className={"beegreen--item-details-stat-bar-1-label"}>
                {field.replace(/_/g, ' ') + ": " + this.props.item.top3Metrics[field] + "%"}
              </div>
              <div>
                <div className="beegreen--item-details-stat-bar-container beegreen--item-details-stat-bar-container-grey">
                  <div style={{width: (this.props.item.top3Metrics[field]) + "%"}}
                    className={"beegreen--item-details-stat-bar-1 " + this.getBarClass(this.props.item.top3Metrics[field])}/>
                </div>
              </div>
            </div>
          )
        })}
        <div className={"beegreen--item-details-notes"}>
          {this.props.item.details ? this.props.item.details : messages_en.itemDetailsCarbonDescription}
        </div>
      </>
    )
  }
}

export default ItemDetails
