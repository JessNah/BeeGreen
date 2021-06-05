import React, { Component } from 'react'
import ItemDialog from '../components/ItemDialog/ItemDialog'
import { productItem } from "../utils/types"
import { getItem, processItem, getInventory } from "../stores/storesCommon";

interface ItemContainerProps {
  endItemSequence: () => void;
  currentStore: string
}

interface ItemContainerState {
  currentItem: productItem,
  inventory: undefined | {[key:string]: any}[]
}

class ItemContainer extends Component<ItemContainerProps, ItemContainerState> {
  state = {
    currentItem: {name: "", image: "", id: "", score: 0.56} as productItem,
    inventory: undefined
  }

  componentDidMount() {
    getInventory(this.setInventory);
    this.setState({currentItem: getItem(this.props.currentStore)})
  }

  setInventory = (inventory) => {
    this.setState({inventory: inventory, currentItem: processItem(this.state.currentItem, inventory)});
  }

  render() {
    return (
      <>
        <ItemDialog
          closeItemDialog={this.props.endItemSequence}
          item={this.state.currentItem}
          inventory={this.state.inventory}
          />
      </>
    )
  }
}

export default ItemContainer
