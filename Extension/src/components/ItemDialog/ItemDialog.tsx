import React, { Component } from 'react'
import "./ItemDialog.scss"
import { TearsheetNarrow } from "@carbon/ibm-cloud-cognitive"
import { productItem } from "../../utils/types"
import ItemDialogContent from "./ItemDialogContent/ItemDialogContent";

interface ItemDialogProps {
  item: productItem
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
    return (
      <>
        <TearsheetNarrow
          open={this.state.open}
          verticalPosition={"lower"}
          label={""}
          title={"Take2"}
          description={"Carbon footprint comparison to other similar items"}
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
            <ItemDialogContent
              item={this.props.item}/>
        </TearsheetNarrow>
      </>
    )
  }
}

export default ItemDialog
