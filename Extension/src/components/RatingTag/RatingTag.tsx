import React, { Component } from 'react'
import { productItem } from "../../utils/types"
import { Tag, TagTypeName } from "carbon-components-react"
import "./RatingTag.scss"


interface RatingTagProps {
  item?: productItem
}

interface RatingTagState {
}

class RatingTag extends Component<RatingTagProps, RatingTagState> {
  state= {
  }

  componentDidMount() {
  }

  getStyledTagScore = (score) => {
    let style = "green";
    if(score <= 2){
      style = "green";
    } else if (score <= 4){
      style = "teal";
    } else if (score <= 6) {
      style = "purple";
    } else if (score <= 8) {
      style = "magenta";
    } else {
      style = "red";
    }
    return style as TagTypeName;
  }

  getScoreText = (score) => {
    let text = "Excellent";
    if(score <= 2){
      text = "Excellent";
    } else if (score <= 4){
      text = "Very good";
    } else if (score <= 6) {
      text = "Good";
    } else if (score <= 8) {
      text = "Fair";
    } else {
      text = "Low";
    }
    return text;
  }

  render() {
    const { item } = this.props;
    if(!item){
      return null;
    }
    return (
      <>
        <Tag
          type={this.getStyledTagScore(this.props.item.score)}>
          {this.getScoreText(this.props.item.score)}
        </Tag>
      </>
    )
  }
}

export default RatingTag;
