import React, { Component } from 'react'
import "./ItemDialogContent.scss"
import { productItem } from "../../../utils/types"
import ItemDetailsContent from "./ItemDetailsContent/ItemDetailsContent";
import ItemReviewsContent from "./ItemReviewsContent/ItemReviewsContent";
import { Tab, Tabs } from 'carbon-components-react';
import { messages_en } from "../../../messages/messages_en";


interface ItemDialogProps {
  item?: productItem
  subText: string
  inventory?: undefined | {[key:string]: any}[]
}

interface ItemDialogState {
  open: boolean;
  currentTab1?: boolean;
}

class ItemDialog extends Component<ItemDialogProps, ItemDialogState> {
  state= {
    open: false,
    currentTab1: true
  }

  componentDidMount() {
    window.setTimeout(() => {this.setState({open: true})}, 500);
  }

  render() {
    let { item, subText, inventory } = this.props;
    return (
      <>
      <div style={{marginLeft: "32px", marginBottom: "-18px"}}>
        <Tabs
          selected={this.state.currentTab1 ? 0 : 1}
          >
          <Tab
            label={messages_en.detailsTab}
            onClick={() => {this.setState({currentTab1: true})}}
            />
          <Tab
            label={messages_en.reviewsTab}
            onClick={() => {this.setState({currentTab1: false})}}
            />
        </Tabs>
      </div>
      { this.state.currentTab1 ?
        <ItemDetailsContent
          item={item}
          inventory={inventory}
          subText={subText}
        />
        :
        <ItemReviewsContent
          item={item}
        />
      }
      </>
    )
  }
}

export default ItemDialog
