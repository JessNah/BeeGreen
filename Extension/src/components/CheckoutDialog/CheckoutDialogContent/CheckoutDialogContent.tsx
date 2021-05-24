import React, { Component } from 'react'
import "./CheckoutDialogContent.scss"
import { Tile, TooltipDefinition } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { Badge32, WarningAlt32 } from "@carbon/icons-react"

interface CheckoutDialogContentProps {
  cart: productItem[],
  selectItem: (item: productItem) => void;
}

interface CheckoutDialogContentState {
}


class CheckoutDialogContent extends Component<CheckoutDialogContentProps, CheckoutDialogContentState> {

  getBestItem = (cart) => {
    let bestItem: productItem = cart.length > 0 ? cart[0] : {score: 0, name:""};
    for(let item of cart){
      if(item.score > bestItem.score){
        bestItem = item;
      }
    }
    return bestItem;
  }
  
  getWorstItem = (cart) => {
    let worstItem: productItem = cart.length > 0 ? cart[0] : {score: 0, name:""};
    for(let item of cart){
      if(item.score <= worstItem.score){
        worstItem = item;
      }
    }
    return worstItem;
  }

  render() {
    return (
      <>
        <Tile>
          <div className={"take2--checkout-dialog-content-tile-header-wrapper"}>
            <Badge32 />
            <div className={"take2--checkout-dialog-content-tile-header"}>
              {"Best scoring item"}
            </div>
          </div>
          <div className={"take2--checkout-dialog-content-tile-score-wrapper "}>
            <div>{this.getBestItem(this.props.cart).name}</div>
            <div className={"take2--checkout-dialog-content-tile-score"}>
              {this.getBestItem(this.props.cart).score}
            </div>
          </div>
        </Tile>
        <Tile>
          <div className={"take2--checkout-dialog-content-tile-header-wrapper"}>
            <WarningAlt32 />
            <div className={"take2--checkout-dialog-content-tile-header"}>
              {"Lowest scoring item"}
            </div>
          </div>
          <div className={"take2--checkout-dialog-content-tile-score-wrapper "}>
            <div>{this.getWorstItem(this.props.cart).name}</div>
            <div className={"take2--checkout-dialog-content-tile-score"}>
              {this.getWorstItem(this.props.cart).score}
            </div>
          </div>
          <TooltipDefinition
            className={"take2--checkout-dialog-content-suggest"}
            onClick={() => {this.props.selectItem(this.getWorstItem(this.props.cart))}}
            tooltipText={"Take2 will do our best to recommend some alternatives that would be friendlier on our planet!"}
          >
            Suggest a substitute
          </TooltipDefinition>
        </Tile>
      </>
    )
  }
}

export default CheckoutDialogContent
