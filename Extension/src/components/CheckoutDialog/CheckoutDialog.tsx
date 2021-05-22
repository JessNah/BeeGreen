import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"
import { getInstaCart, getCartAverageRating } from "../../stores/getInstaCart" 
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"

interface CheckoutDialogProps {
  closeCheckoutDialog: () => void;
}

interface CheckoutDialogState {
  open: boolean;
}

class CheckoutDialog extends Component<CheckoutDialogProps, CheckoutDialogState> {
  state= {
    open: false
  }

  componentDidMount() {
    this.setState({open: true});
  }

  getStyledTagScore = (score) => {
    let style = "red";
    if(score >= 8){
      style = "green";
    } else if (score >= 6){
      style = "teal";
    } else if (score >= 4) {
      style = "purple";
    } else if (score >= 2) {
      style = "magenta";
    } else {
      style = "red";
    }
    return style as TagTypeName;
  }

  getScoreText = (score) => {
    let text = "Excellent";
    if(score >= 8){
      text = "Excellent";
    } else if (score >= 6){
      text = "Very good";
    } else if (score >= 4) {
      text = "Good";
    } else if (score >= 2) {
      text = "Fair";
    } else {
      text = "Low";
    }
    return text;
  }

  render() {
    const cart = getInstaCart();
    const cartRank = getCartAverageRating(cart);
    console.log(cart);
    return (
      <>
        <Tearsheet
          open={this.state.open}
          label={""}
          title={"Take2"}
          description={"Keep it up! You're shopping smarter than 73% of shoppers visiting this site."}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.props.closeCheckoutDialog()}
            }, {
            kind: 'ghost',
            label: "Make an impact! Donate to plant some trees and reduce the carbon footprint of your purchase!",
            loading: false,
            onClick: () => {window.open("https://carbonfund.org/product-category/plant-trees/")}
          }]}
          influencerPosition={'right'}
          influencerWidth={'wide'}
          influencer={<>
            <div className={"take2--checkout-dialog-card-heading-wrapper"}>
              <div className={"take2--checkout-dialog-cart-heading"}>
                Shopping cart rating
              </div>
              <Tag
                type={this.getStyledTagScore(cartRank)}>
                {this.getScoreText(cartRank)}
              </Tag>
            </div>
            <Accordion>
            {cart.map((item, index) => {
              return (
                <AccordionItem
                  title={
                    <div key={index + "_cart_item"} className={"take2--checkout-dialog-cart-item"}>
                      <div style={{display:"inline-flex"}}>
                        <div>
                          <img className={"take2--checkout-dialog-cart-item-img"} src={item.image.currentSrc}/>
                        </div>
                        <div className={"take2--checkout-dialog-cart-item-text-container"}>
                          <div className={"take2--checkout-dialog-cart-item-text-wrapper"}>
                            <span className={"take2--checkout-dialog-cart-item-text"}>{item.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className={"take2--checkout-dialog-cart-item-text-container"}>
                        <div className={"take2--checkout-dialog-cart-item-text-wrapper"}>
                          <span className={"take2--checkout-dialog-cart-item-score"}>
                              <Tag
                               type={this.getStyledTagScore(item.score)} >
                                {this.getScoreText(item.score)}
                              </Tag>
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                />
              )})
            }
            </Accordion>
            </>}
            >
        </Tearsheet>
      </>
    )
  }
}

export default CheckoutDialog
