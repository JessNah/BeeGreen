import React, { Component } from 'react'
import "./RatingBar.scss"


interface RatingBarProps {
  scorePercent?: string,
  className?: string
}

interface RatingBarState {
}

class RatingBar extends Component<RatingBarProps, RatingBarState> {
  state= {
  }

  componentDidMount() {
  }

  render() {
    const { scorePercent, className } = this.props;
    if(!scorePercent){
      return null;
    }
    let cx = "beegreen--rating-bar-stat-bar-container";
    if(className){
      cx = cx + " " + className;
    }
    return (
      <>
        <div className={cx}>
          <div style={{width: (180 * (parseFloat(scorePercent) / 100.0)) + "px"}} className="beegreen--rating-bar-stat-bar-stat">{scorePercent}</div>
          <div style={{width: scorePercent}} className="beegreen--rating-bar-stat-bar">
            {" "}
          </div>
        </div>
      </>
    )
  }
}

export default RatingBar