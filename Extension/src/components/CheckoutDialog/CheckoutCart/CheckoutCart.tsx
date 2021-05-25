import React, { Component } from 'react'
import "./CheckoutCart.scss"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { ShoppingCart32 } from "@carbon/icons-react"
import ItemDetails from "../../ItemDialog/ItemDialogContent/ItemDetails/ItemDetails"

interface CheckoutCartProps {
  cart: productItem[],
  cartRank: number;
  selectItem: (item: productItem) => void;
}

class CheckoutCart extends Component<CheckoutCartProps> {
  getStyledTagScore = (score) => {
    let style = "green";
    if(score <= 2){
      style = "green";
    } else if (score <= 4){
      style = "teal";
    } else if (score <= 6) {
      style = "purple";
    } else if (score <= 8) {
      style = "magenta";
    } else {
      style = "red";
    }
    return style as TagTypeName;
  }

  getScoreText = (score) => {
    let text = "Excellent";
    if(score <= 2){
      text = "Excellent";
    } else if (score <= 4){
      text = "Very good";
    } else if (score <= 6) {
      text = "Good";
    } else if (score <= 8) {
      text = "Fair";
    } else {
      text = "Low";
    }
    return text;
  }

  render() {
    return (
      <>
        <div className={"take2--checkout-cart-heading-wrapper"}>
          <ShoppingCart32 />
          <div className={"take2--checkout-cart-heading"}>
            Shopping cart
          </div>
          {this.props.cartRank && 
            <Tag
              type={this.getStyledTagScore(this.props.cartRank)}>
              {this.getScoreText(this.props.cartRank)}
            </Tag>}
        </div>
        <Accordion>
          {this.props.cart.map((item: productItem, index) => {
            return (
              <AccordionItem
                title={
                  <div key={index + "_cart_item"} className={"take2--checkout-cart-item"}>
                    <div 
                      style={{display:"inline-flex", cursor:"pointer"}} 
                      onClick={(event) => {this.props.selectItem(item); event.stopPropagation();}}>
                      <div>
                        <img className={"take2--checkout-cart-item-img"} src={item.image}/>
                      </div>
                      <div className={"take2--checkout-cart-item-text-container"}>
                        <div className={"take2--checkout-cart-item-text-wrapper"}>
                          <span className={"take2--checkout-cart-item-text"}>{item.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className={"take2--checkout-cart-item-text-container"}>
                      <div className={"take2--checkout-cart-item-text-wrapper"}>
                        <span className={"take2--checkout-cart-item-score"}>
                            <Tag
                              type={this.getStyledTagScore(item.score)} >
                              {this.getScoreText(item.score)}
                            </Tag>
                        </span>
                      </div>
                    </div>
                  </div>
                }>
                <ItemDetails item={item} />
              </AccordionItem>
            )})
          }
        </Accordion>
      </>
    )
  }
}

export default CheckoutCart
