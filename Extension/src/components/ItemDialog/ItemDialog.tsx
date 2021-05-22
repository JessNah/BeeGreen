import React, { Component } from 'react'
import "./ItemDialog.scss"
import { TearsheetNarrow } from "@carbon/ibm-cloud-cognitive"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"


interface ItemDialogProps {
  item: {[key:string]: any}
  closeItemDialog: () => void;
}

interface ItemDialogState {
  open: boolean
}

class ItemDialog extends Component<ItemDialogProps, ItemDialogState> {
  state= {
    open: false
  }

  componentDidMount() {
    window.setTimeout(() => {this.setState({open: true})}, 500);
  }

  render() {
    console.log("item dialog");
    return (
      <>
        <TearsheetNarrow
          open={this.state.open}
          verticalPosition={"lower"}
          label={""}
          title={"Take2"}
          description={"Let's take a look at " + this.props.item.name}
          actions={[{
            kind: 'secondary',
            label: "Close",
            loading: false,
            onClick: () => {this.props.closeItemDialog()}
            }, {
            kind: 'ghost',
            label: "Make an impact! Donate to plant some trees and reduce the carbon footprint of your purchase!",
            loading: false,
            onClick: () => {window.open("https://carbonfund.org/product-category/plant-trees/")}
          }]}
          onClose={() => {this.props.closeItemDialog()}}
          >
            Similar items that compare...
        </TearsheetNarrow>
      </>
    )
  }
}

export default ItemDialog
