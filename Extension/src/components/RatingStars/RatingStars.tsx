import React, { Component } from 'react'
import { productItem } from "../../utils/types"
import { getRatingOutOf5 } from "../../utils/utils"
import { StarFilled16, StarHalf16 } from "@carbon/icons-react"


interface RatingStarsProps {
  item?: productItem
  rating?: number
}

interface RatingStarsState {
}

class RatingStars extends Component<RatingStarsProps, RatingStarsState> {
  state= {
  }

  componentDidMount() {
  }

  getRating = (item: productItem) => {
    const stars = [];
    //inverse score first 10 - score.. cause small number is good here.
    //but for stars we need bigger is better. then normalize to out of 5.
    // const starsRating = ((10 - item.score) / 10) * 5;
    // const starsRatingRounded = Math.round(starsRating*2)/2;
    const starsRatingRounded = this.props.rating ? this.props.rating : getRatingOutOf5(item);
    for(let i = 1; i <= starsRatingRounded; i+= 0.5){
      if(starsRatingRounded === i && i % 1 !== 0){
        stars.push(<StarHalf16 style={{fill: this.getColor(starsRatingRounded)}} />);
        break;
      } else if( i % 1 === 0){
        stars.push(<StarFilled16 style={{fill: this.getColor(starsRatingRounded)}} />)
      }
    }
    if(stars.length === 0){
      stars.push(<StarHalf16 style={{fill: this.getColor(0.5)}} />)
    }
    return stars;
  }

  getColor = (score) => {
    const green = "#42be65"; //(4-5]
    const blue = "#C7E53D"; //(3-4]
    const purple = "#f1c21b"; //(2-3]
    const yellow = "#fca103"; //(1-2]
    const red = "#fa4d56"; //(0-1]
    if(score > 4){
      return green;
    } else if(score > 3){
      return blue;
    } else if(score > 2){
      return purple;
    } else if(score > 1){
      return yellow;
    } else {
      return red;
    }
  }

  render() {
    const { item, rating } = this.props;
    if(!item && !rating){
      return null;
    }
    return (
      <>
        <div style={{display: "inline"}}>
          <div style={{display:"inline-flex"}}>
            { this.getRating(item).map((star) => {
              return ( star )
            })}
          </div>
        </div>
      </>
    )
  }
}

export default RatingStars
