import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"
import { getCartAverageRating, getCart } from "../../stores/storesCommon"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"

interface CheckoutDialogProps {
  closeCheckoutDialog: () => void;
  currentStore: string;
}

interface CheckoutDialogState {
  openCart: boolean;
  openComparison: boolean;
  currentComparisonItem: string
}

class CheckoutDialog extends Component<CheckoutDialogProps, CheckoutDialogState> {
  state= {
    openCart: false,
    openComparison: false,
    currentComparisonItem: ""
  }

  componentDidMount() {
    this.setState({openCart: true});
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
    const cart = getCart(this.props.currentStore);
    const cartRank = getCartAverageRating(cart);
    console.log(cart);
    return (
      <>
        <Tearsheet
          open={this.state.openCart}
          label={""}
          title={"Take2"}
          description={"Keep it up! You're shopping smarter than 73% of shoppers visiting this site."}
          actions={[{
            kind: 'secondary',
            label: "Close",
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
                      <div 
                        style={{display:"inline-flex", cursor:"pointer"}} 
                        onClick={() => {this.setState({openComparison: true, currentComparisonItem: item.name})}}>
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
                >
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
            </>}
            >
        </Tearsheet>
        <Tearsheet
          open={this.state.openComparison}
          label={""}
          title={"Let's take a look at " + this.state.currentComparisonItem}
          description={""}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.setState({openComparison: false, currentComparisonItem: ""})}
            }]}
          >
           Similar items that compare...
        </Tearsheet>
      </>
    )
  }
}

export default CheckoutDialog
