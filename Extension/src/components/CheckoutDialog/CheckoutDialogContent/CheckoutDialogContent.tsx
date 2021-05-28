import React, { Component } from 'react'
import "./CheckoutDialogContent.scss"
import { Tile, TooltipDefinition } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { Badge32, WarningAlt32 } from "@carbon/icons-react"
import RatingTag from "../../RatingTag/RatingTag";

interface CheckoutDialogContentProps {
  cart: productItem[],
  cartRank: number,
  selectItem: (item: productItem) => void;
}

interface CheckoutDialogContentState {
}


class CheckoutDialogContent extends Component<CheckoutDialogContentProps, CheckoutDialogContentState> {

  getBestItem = (cart) => {
    let bestItem: productItem = cart.length > 0 ? cart[0] : {score: 0, name:""};
    for(let item of cart){
      if(item.score < bestItem.score){
        bestItem = item;
      }
    }
    return bestItem;
  }
  
  getWorstItem = (cart) => {
    let worstItem: productItem = cart.length > 0 ? cart[0] : {score: 0, name:""};
    for(let item of cart){
      if(item.score >= worstItem.score){
        worstItem = item;
      }
    }
    return worstItem;
  }

  render() {
    const bestItem = this.getBestItem(this.props.cart);
    const worstItem = this.getWorstItem(this.props.cart);
    const bestScore = (100 - Math.floor(bestItem.score * 10)) + "%"; 
    const worstScore = (100 - Math.floor(worstItem.score * 10)) + "%"; 
    return (
      <>
        <div className={"beegreen--checkout-dialog-content-top-text"}>
          <div className={"beegreen--checkout-dialog-content-gratitude"}>
            Well done!
          </div>
          <div>
            <div style={{display: "inline-flex"}}>
              <div>This cart ranked:</div>
              <div className={"beegreen--checkout-dialog-content-top-text-rank"}>
                <RatingTag item={{score: this.props.cartRank, id: "", name: ""}} />
              </div>
            </div>
          </div>
          <div>
            <div style={{display: "inline-flex"}}>
              <div>Your average carts at this store rank:</div>
              <div className={"beegreen--checkout-dialog-content-top-text-rank"}>
                <RatingTag item={{score: 7.6, id: "", name: ""}} />
              </div>
            </div>
          </div>
        </div>
        <Tile>
          <div className={"beegreen--checkout-dialog-content-tile-header-wrapper"}>
            <Badge32 />
            <div className={"beegreen--checkout-dialog-content-tile-header"}>
              {"Best scoring item"}
            </div>
          </div>
          <div className={"beegreen--checkout-dialog-content-tile-title-wrapper "}>
            <div>
              <img className={"beegreen--checkout-dialog-content-tile-img"} src={bestItem.image}/>
            </div>
            <div className={"beegreen--checkout-dialog-content-text-container"}>
              <div className={"beegreen--checkout-dialog-content-text-wrapper"}>
                <span className={"beegreen--checkout-dialog-content-text"}>
                  {bestItem.name}
                </span>
              </div>
            </div>
          </div>
          <div className={"beegreen--checkout-dialog-content-tile-score"}>
            <div className="beegreen--checkout-dialog-content-stat-bar-container">
              <div style={{width: bestScore}} className="beegreen--checkout-dialog-content-stat-bar">
                {bestScore}
              </div>
            </div>
          </div>
        </Tile>
        <Tile>
          <div className={"beegreen--checkout-dialog-content-tile-header-wrapper"}>
            <WarningAlt32 />
            <div className={"beegreen--checkout-dialog-content-tile-header"}>
              {"Lowest scoring item"}
            </div>
          </div>
          <div className={"beegreen--checkout-dialog-content-tile-title-wrapper "}>
            <div>
              <img className={"beegreen--checkout-dialog-content-tile-img"} src={worstItem.image}/>
            </div>
            <div className={"beegreen--checkout-dialog-content-text-container"}>
              <div className={"beegreen--checkout-dialog-content-text-wrapper"}>
                <span className={"beegreen--checkout-dialog-content-text"}>
                  {worstItem.name}
                </span>
              </div>
            </div>
          </div>
          <div className={"beegreen--checkout-dialog-content-tile-score"}>
            <div className="beegreen--checkout-dialog-content-stat-bar-container">
              <div style={{width: worstScore}}className="beegreen--checkout-dialog-content-stat-bar">{worstScore}</div>
            </div>
          </div>
          <TooltipDefinition
            className={"beegreen--checkout-dialog-content-suggest"}
            onClick={() => {this.props.selectItem(this.getWorstItem(this.props.cart))}}
            tooltipText={"Bee Green will do our best to recommend some alternatives that would be friendlier on our planet!"}
          >
            Suggest a substitute
          </TooltipDefinition>
        </Tile>
      </>
    )
  }
}

export default CheckoutDialogContent
