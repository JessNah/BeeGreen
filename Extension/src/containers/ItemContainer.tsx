import React, { Component } from 'react'
import ItemDialog from '../components/ItemDialog/ItemDialog'

interface ItemContainerProps {
  endItemSequence: () => void;
}

interface ItemContainerState {
}

class ItemContainer extends Component<ItemContainerProps, ItemContainerState> {
  state = {
  }

  render() {
    return (
      <>
        <ItemDialog
          closeItemDialog={this.props.endItemSequence}
          item={{name:"Mangoes"}}
          />
      </>
    )
  }
}

export default ItemContainer
