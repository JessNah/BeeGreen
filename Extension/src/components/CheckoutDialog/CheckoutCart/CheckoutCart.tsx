import React, { Component } from 'react'
import "./CheckoutCart.scss"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { ShoppingCart32 } from "@carbon/icons-react"

interface CheckoutCartProps {
  cart: productItem[],
  cartRank: string,
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
                      onClick={() => {this.props.selectItem(item)}}>
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
                <div className="take2--checkout-cart-stat-bar-container">
                  <div className="take2--checkout-cart-stat-bar take2--checkout-cart-stat-bar-1">90%</div>
                </div>
                <div>{"This item scored " + item.score + "/10" }</div>
                <div></div>
                <div>{"185 kg carbon emissions3"}</div>
                <div>{"73% Production"}</div>
                <div>{"7% Transport"}</div>
                <div>{"19% Use"}</div>
                <div>{"<1% End-of-life processing"}</div>
              </AccordionItem>
            )})
          }
        </Accordion>
      </>
    )
  }
}

export default CheckoutCart
