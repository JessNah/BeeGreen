import React, { Component } from 'react'
import { Tag } from "carbon-components-react"
import "./RatingTag.scss"
import { messages_en } from "../Messages/messages_en"



class RatingTag extends Component {
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
    return style;
  }

  getScoreText = (score) => {
    let text = messages_en.ratingTagExcellent;
    if(score <= 2){
      text = messages_en.ratingTagExcellent;
    } else if (score <= 4){
      text = messages_en.ratingTagVGood;
    } else if (score <= 6) {
      text = messages_en.ratingTagGood;
    } else if (score <= 8) {
      text = messages_en.ratingTagFair;
    } else {
      text = messages_en.ratingTagLow;
    }
    return text;
  }

  render() {
    const { score } = this.props;
    if(!score){
      return null;
    }
    return (
      <>
        <Tag
          type={this.getStyledTagScore(score)}>
          {this.getScoreText(score)}
        </Tag>
      </>
    )
  }
}

export default RatingTag;
