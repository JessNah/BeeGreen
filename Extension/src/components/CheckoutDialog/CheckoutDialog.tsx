import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet, TearsheetNarrow } from "@carbon/ibm-cloud-cognitive"
import { getCartAverageRating, getCart } from "../../stores/storesCommon"
import CheckoutCart from "./CheckoutCart/CheckoutCart"
import { productItem } from "../../utils/types"
import ItemDialogContent from "../ItemDialog/ItemDialogContent/ItemDialogContent"
import CheckoutDialogContent from "./CheckoutDialogContent/CheckoutDialogContent"

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
    console.log(this.state);
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
            <CheckoutDialogContent
              selectItem={(item) => {this.setState({openComparison: true, currentComparisonItem: item})}}
              cart={this.state.cart}/>
        </Tearsheet>
        <TearsheetNarrow
          open={this.state.openComparison}
          label={""}
          title={"Take2"}
          description={"Carbon footprint comparison to other similar items"}
          onClose={() => {this.setState({openComparison: false, currentComparisonItem: undefined})}}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.setState({openComparison: false, currentComparisonItem: undefined})}
            }]}
          >
           <ItemDialogContent
              subText={"Consider making a substitution"}
              item={this.state.currentComparisonItem}/>
        </TearsheetNarrow>
      </>
    )
  }
}

export default CheckoutDialog
