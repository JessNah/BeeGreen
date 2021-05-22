import React, { Component } from 'react'
import "./ItemDialogContent.scss"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"
import { productItem } from "../../../utils/types"


interface ItemDialogProps {
  item?: productItem
}

interface ItemDialogState {
}

class ItemDialog extends Component<ItemDialogProps, ItemDialogState> {
  state= {
  }

  componentDidMount() {
    window.setTimeout(() => {this.setState({open: true})}, 500);
  }

  render() {
    const { item } = this.props;
    return (
      <>
      <div className={"take2--item-dialog-content-wrapper"}>
        <div className={"take2--item-dialog-content-selected-item"}>
          <div className={"take2--item-dialog-content-selected-item-img"}>
            <img className={"take2--item-dialog-content-selected-item-img-tag"}
              src={item?.image} />
          </div>
          <div className={"take2--item-dialog-content-selected-item-container"}>
            <div className={"take2--item-dialog-content-selected-item-text-wrapper"}>
              <span className={"take2--item-dialog-content-selected-item-text"}>
                {item?.name}
              </span>
            </div>
          </div>
        </div>
        <div className={"take2--item-dialog-content-compare-header"}>
          Here's how other similar items compare
        </div>
      </div>
      </>
    )
  }
}

export default ItemDialog
