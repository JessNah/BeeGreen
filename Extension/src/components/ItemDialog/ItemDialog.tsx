import React, { Component } from 'react'
import "./ItemDialog.scss"
import { TearsheetNarrow } from "@carbon/ibm-cloud-cognitive"
import { productItem } from "../../utils/types"
import ItemDialogContent from "./ItemDialogContent/ItemDialogContent";
import { messages_en } from "../../messages/messages_en"

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
          title={messages_en.appTitle}
          description={messages_en.itemDialogDescription}
          actions={[{
            kind: 'secondary',
            label: "Close",
            loading: false,
            onClick: () => {this.props.closeItemDialog()}
            }]}
          onClose={() => {this.props.closeItemDialog()}}
          >
            <ItemDialogContent
              subText={messages_en.itemDialogSubText}
              item={this.props.item}/>
        </TearsheetNarrow>
      </>
    )
  }
}

export default ItemDialog
