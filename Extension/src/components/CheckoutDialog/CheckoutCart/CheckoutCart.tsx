import React, { Component } from 'react'
import "./CheckoutCart.scss"
import { Accordion, AccordionItem } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import { ShoppingCart32 } from "@carbon/icons-react"
import ItemDetails from "../../ItemDialog/ItemDialogContent/ItemDetails/ItemDetails"
import RatingTag from "../../RatingTag/RatingTag"
import { messages_en } from "../../../messages/messages_en"

interface CheckoutCartProps {
  cart: productItem[],
  cartRank: number;
  selectItem: (item: productItem) => void;
}

class CheckoutCart extends Component<CheckoutCartProps> {
  render() {
    return (
      <>
        <div className={"beegreen--checkout-cart-heading-wrapper"}>
          <ShoppingCart32 />
          <div className={"beegreen--checkout-cart-heading"}>
            {messages_en.checkoutCartTitle}
          </div>
          {this.props.cartRank && 
            <RatingTag item={{score: this.props.cartRank, name: "", id: ""}}/>
          }
        </div>
        <Accordion>
          {this.props.cart.map((item: productItem, index) => {
            return (
              <AccordionItem
                title={
                  <div key={index + "_cart_item"} className={"beegreen--checkout-cart-item"}>
                    <div 
                      style={{display:"inline-flex", cursor:"pointer"}} 
                      onClick={(event) => {this.props.selectItem(item); event.stopPropagation();}}>
                      <div>
                        <img className={"beegreen--checkout-cart-item-img"} src={item.image}/>
                      </div>
                      <div className={"beegreen--checkout-cart-item-text-container"}>
                        <div className={"beegreen--checkout-cart-item-text-wrapper"}>
                          <span className={"beegreen--checkout-cart-item-text"}>{item.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className={"beegreen--checkout-cart-item-text-container"}>
                      <div className={"beegreen--checkout-cart-item-text-wrapper"}>
                        <span className={"beegreen--checkout-cart-item-score"}>
                          <RatingTag item={item}/>
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
