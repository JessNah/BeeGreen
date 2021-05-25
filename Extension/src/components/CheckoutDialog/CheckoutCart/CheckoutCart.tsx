import React, { Component } from 'react'
import "./CheckoutCart.scss"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { ShoppingCart32 } from "@carbon/icons-react"

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
                <div className="take2--checkout-cart-stat-bar-container take2--checkout-cart-stat-bar-container-grad">
                  <div style={{width: (100 - Math.floor(item.score * 10)) + "%"}} className="take2--checkout-cart-stat-bar">
                    {(100 - Math.floor(item.score * 10)) + "%"}
                  </div>
                </div>
                <div>{"185 kg carbon emissions3"}</div>
                <div>
                  <div className={"take2--checkout-cart-stat-bar-1-label"}>
                    {"Farm: " + "70%"}
                  </div>
                  <div>
                    <div className="take2--checkout-cart-stat-bar-container take2--checkout-cart-stat-bar-container-grey">
                      <div style={{width:"70%"}} className="take2--checkout-cart-stat-bar-1"/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={"take2--checkout-cart-stat-bar-1-label"}>
                    {"Processing: " + "33%"}
                  </div>
                  <div>
                    <div className="take2--checkout-cart-stat-bar-container take2--checkout-cart-stat-bar-container-grey">
                      <div style={{width:"33%"}} className="take2--checkout-cart-stat-bar-1"/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={"take2--checkout-cart-stat-bar-1-label"}>
                    {"Transport: " + "56%"}
                  </div>
                  <div>
                    <div className="take2--checkout-cart-stat-bar-container take2--checkout-cart-stat-bar-container-grey">
                      <div style={{width:"56%"}} className="take2--checkout-cart-stat-bar-1"/>
                    </div>
                  </div>
                </div>
                <div className={"take2--checkout-cart-notes"}>
                  {"This product is known to use more energy to mill than other similar items. Additionally, this item consumes more land for use in production when compared to other similar items."}
                </div>
              </AccordionItem>
            )})
          }
        </Accordion>
      </>
    )
  }
}

export default CheckoutCart
