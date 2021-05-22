import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"
import { getCartAverageRating, getCart } from "../../stores/storesCommon"
import CheckoutCart from "./CheckoutCart/CheckoutCart"
import { productItem } from "../../utils/types"

interface CheckoutDialogProps {
  closeCheckoutDialog: () => void;
  currentStore: string;
}

interface CheckoutDialogState {
  cart: {[key:string]: any}[];
  cartRank: string;
  openCart: boolean;
  openComparison: boolean;
  currentComparisonItem?: productItem
}

class CheckoutDialog extends Component<CheckoutDialogProps, CheckoutDialogState> {
  state= {
    cart: [],
    cartRank: undefined,
    openCart: false,
    openComparison: false,
    currentComparisonItem: undefined
  }

  componentDidMount() {
    const cart = getCart(this.props.currentStore);
    const cartRank = getCartAverageRating(cart);
    this.setState({cart: cart, cartRank: cartRank});
    window.setTimeout(() => {this.setState({openCart: true})}, 500);
  }

  render() {
    console.log(this.state.cart);
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
          onClose={() => {this.props.closeCheckoutDialog()}}
          influencerPosition={'right'}
          influencerWidth={'wide'}
          influencer={
            <CheckoutCart 
              cart={this.state.cart} 
              cartRank={this.state.cartRank}
              selectItem={(item) => {this.setState({openComparison: true, currentComparisonItem: item})}}
              />}
          >
        </Tearsheet>
        <Tearsheet
          open={this.state.openComparison}
          label={""}
          title={"Let's take a look at " + this.state.currentComparisonItem?.name}
          description={""}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.setState({openComparison: false, currentComparisonItem: undefined})}
            }]}
          >
           Similar items that compare...
        </Tearsheet>
      </>
    )
  }
}

export default CheckoutDialog
