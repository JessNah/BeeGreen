import React, { Component } from 'react'
import ItemDialog from '../components/ItemDialog/ItemDialog'
import { productItem } from "../utils/types"
import { getItem } from "../stores/storesCommon";

interface ItemContainerProps {
  endItemSequence: () => void;
  currentStore: string
}

interface ItemContainerState {
  currentItem: productItem
}

class ItemContainer extends Component<ItemContainerProps, ItemContainerState> {
  state = {
    currentItem: {name: "", image: "", id: ""} as productItem
  }

  componentDidMount() {
    this.setState({currentItem: getItem(this.props.currentStore)})
  }

  render() {
    return (
      <>
        <ItemDialog
          closeItemDialog={this.props.endItemSequence}
          item={this.state.currentItem}
          />
      </>
    )
  }
}

export default ItemContainer
