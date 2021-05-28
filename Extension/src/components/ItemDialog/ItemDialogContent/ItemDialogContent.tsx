import React, { Component } from 'react'
import "./ItemDialogContent.scss"
import { Accordion, AccordionItem, Tag, TagTypeName } from "carbon-components-react"
import { productItem } from "../../../utils/types"
import ItemDetails from "./ItemDetails/ItemDetails"


interface ItemDialogProps {
  item?: productItem
  subText: string
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
    const substitute_1: productItem = {
      name: "Soy flour",
      id: "soy_flour",
      score: 2.6
    } 
    const substitute_2: productItem = {
      name: "Wheat flour",
      id: "wheat_flour",
      score: 7.2
    } 
    return (
      <>
      <div className={"beegreen--item-dialog-content-wrapper"}>
        <div className={"beegreen--item-dialog-content-selected-item"}>
          <div className={"beegreen--item-dialog-content-selected-item-img"}>
            <img className={"beegreen--item-dialog-content-selected-item-img-tag"}
              src={item?.image} />
          </div>
          <div className={"beegreen--item-dialog-content-selected-item-container"}>
            <div className={"beegreen--item-dialog-content-selected-item-text-wrapper"}>
              <span className={"beegreen--item-dialog-content-selected-item-text"}>
                {item?.name}
              </span>
            </div>
          </div>
        </div>
        <ItemDetails item={item} />
          <div className={"beegreen--item-dialog-content-compare-header"}>
            {this.props.subText}
          </div>
        <div className={"beegreen--item-details-sub-wrapper"}>
          <div className={"beegreen--item-details-substitute"}>
            <div className={"beegreen--item-dialog-content-text-sub-container"}>
              <div className={"beegreen--item-dialog-content-text-sub-wrapper"}>
                <span className={"beegreen--item-dialog-content-text-sub"}>
                  {substitute_1.name}
                </span>
              </div>
            </div>
            <ItemDetails item={substitute_1} />
          </div>
          <div className={"beegreen--item-details-substitute"}>
            <div className={"beegreen--item-dialog-content-text-sub-container"}>
              <div className={"beegreen--item-dialog-content-text-sub-wrapper"}>
                <span className={"beegreen--item-dialog-content-text-sub"}>
                  {substitute_2.name}
                </span>
              </div>
            </div>
            <ItemDetails item={substitute_2} />
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default ItemDialog
