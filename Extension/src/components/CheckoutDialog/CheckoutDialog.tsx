import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet, TearsheetNarrow } from "@carbon/ibm-cloud-cognitive"
import { getCartAverageRating } from "../../stores/storesCommon"
import CheckoutCart from "./CheckoutCart/CheckoutCart"
import { productItem } from "../../utils/types"
import ItemDialogContent from "../ItemDialog/ItemDialogContent/ItemDialogContent"
import CheckoutDialogContent from "./CheckoutDialogContent/CheckoutDialogContent"
import { messages_en } from "../../messages/messages_en";

interface CheckoutDialogProps {
  closeCheckoutDialog: () => void;
  currentStore: string;
  cart: {[key:string]: any}[];  
  inventory?: undefined | {[key:string]: any}[];
}

interface CheckoutDialogState {
  cart: {[key:string]: any}[];
  cartRank: number;
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
    const cart = this.props.cart;
    const cartRank = getCartAverageRating(cart);
    this.setState({cart: cart, cartRank: cartRank});
    window.setTimeout(() => {this.setState({openCart: true})}, 500);
  }

  render() {
    return (
      <>
        <Tearsheet
          open={this.state.openCart}
          label={""}
          title={messages_en.appTitle}
          description={messages_en.checkoutDialogModal1SubLabel}
          actions={[{
            kind: 'secondary',
            label: "Close",
            loading: false,
            onClick: () => {this.props.closeCheckoutDialog()}
            }, {
            kind: 'ghost',
            label: messages_en.checkoutDialogModal1DonationBtn,
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
              cartRank={this.state.cartRank}
              selectItem={(item) => {this.setState({openComparison: true, currentComparisonItem: item})}}
              cart={this.state.cart}/>
        </Tearsheet>
        <TearsheetNarrow
          open={this.state.openComparison}
          label={""}
          title={messages_en.appTitle}
          description={messages_en.checkoutDialogModal2Description}
          onClose={() => {this.setState({openComparison: false, currentComparisonItem: undefined})}}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.setState({openComparison: false, currentComparisonItem: undefined})}
            }]}
          >
           <ItemDialogContent
              inventory={this.props.inventory}
              subText={messages_en.checkoutDialogModal2Subtext}
              item={this.state.currentComparisonItem}/>
        </TearsheetNarrow>
      </>
    )
  }
}

export default CheckoutDialog
