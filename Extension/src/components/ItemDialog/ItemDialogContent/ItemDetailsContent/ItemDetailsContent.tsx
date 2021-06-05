import React, { Component } from 'react'
import "./ItemDetailsContent.scss"
import { productItem } from "../../../../utils/types"
import ItemDetails from "../ItemDetails/ItemDetails"
import { getTopSubstitute } from "../../../../stores/storesCommon"


interface ItemDetailsContentProps {
  item?: productItem
  subText: string
  inventory?: undefined | {[key:string]: any}[]
}

interface ItemDetailsContentState {
}

class ItemDetailsContent extends Component<ItemDetailsContentProps, ItemDetailsContentState> {
  state= {
  }
  render() {
    let { item, inventory } = this.props;
    let substitute_1: productItem = {
      name: "Soy flour",
      id: "soy_flour",
      score: 2.6, //low is good
      top3Metrics: {"Farm": 43, "Processing": 15, "Transport": 26}
    } 
    let substitute_2: productItem = {
      name: "Wheat flour",
      id: "wheat_flour",
      score: 7.2, //high is bad
      top3Metrics: {"Farm": 70, "Processing": 33, "Transport": 56}
    }
    if(item && !item.category){
      item.category = "Oil";
    }
    if(inventory && item && item.category) {
      if(getTopSubstitute(inventory, item) !== undefined){
        substitute_1 = getTopSubstitute(inventory, item);
        //manually set substitute's top 3 metrics to match that of main item.
        substitute_1.top3Metrics = {};
        for (const property in item.top3Metrics) {
          substitute_1.top3Metrics[property] = Math.round(substitute_1.stats[property + "_normalized"] * 10);
        }
      }
      if(getTopSubstitute(inventory, item, true) !== undefined){
        substitute_2 = getTopSubstitute(inventory, item, true);
        //manually set substitute's top 3 metrics to match that of main item.
        substitute_2.top3Metrics = {};
        for (const property in item.top3Metrics) {
          substitute_2.top3Metrics[property] = Math.round(substitute_2.stats[property + "_normalized"] * 10);
        }
      }
    }
    return (
      <>
      <div className={"beegreen--item-details-content-wrapper"}>
        <div className={"beegreen--item-details-content-selected-item"}>
          <div className={"beegreen--item-details-content-selected-item-img"}>
            <img className={"beegreen--item-details-content-selected-item-img-tag"}
              src={item?.image} />
          </div>
          <div className={"beegreen--item-details-content-selected-item-container"}>
            <div className={"beegreen--item-details-content-selected-item-text-wrapper"}>
              <span className={"beegreen--item-details-content-selected-item-text"}>
                {item?.name}
              </span>
            </div>
          </div>
        </div>
        <ItemDetails item={item} />
          <div className={"beegreen--item-details-content-compare-header"}>
            {this.props.subText}
          </div>
        <div className={"beegreen--item-details-sub-wrapper"}>
          <div className={"beegreen--item-details-substitute"}>
            <div className={"beegreen--item-details-content-text-sub-container"}>
              <div className={"beegreen--item-details-content-text-sub-wrapper"}>
                <span className={"beegreen--item-details-content-text-sub"}>
                  {substitute_1.name}
                </span>
              </div>
            </div>
            <ItemDetails item={substitute_1} />
          </div>
          <div className={"beegreen--item-details-substitute"}>
            <div className={"beegreen--item-details-content-text-sub-container"}>
              <div className={"beegreen--item-details-content-text-sub-wrapper"}>
                <span className={"beegreen--item-details-content-text-sub"}>
                  {substitute_2.name}
                </span>
              </div>
            </div>
            <ItemDetails item={substitute_2} />
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default ItemDetailsContent
