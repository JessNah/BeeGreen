import React, { Component } from 'react'
import "./ItemReviewsContent.scss"
import { productItem } from "../../../../utils/types"
import { messages_en } from "../../../../messages/messages_en";
import RatingStars from "../../../RatingStars/RatingStars";

interface ItemReviewsContentProps {
  item?: productItem
}

interface ItemReviewsContentState {
}

class ItemReviewsContent extends Component<ItemReviewsContentProps, ItemReviewsContentState> {
  state= {
  }
  render() {
    let { item } = this.props;
    console.log(item);
    return (
      <>
      <div className={"beegreen--item-reviews-content-wrapper"}>
        {(!item.comments || item.comments.length === 0) &&
          <div>{messages_en.noReviews}</div>
        }
        { (item.comments && item.comments.length > 0) && item.comments.map((comment) => {
          return (
            <div>
              <div className="beegreen--item-reviews-content-card">
                  <div className="beegreen--item-reviews-content-title">
                    <RatingStars
                      rating={comment.rating}
                      />
                  </div>
                  <div className="info">{comment.comment}</div>
                  <div className="beegreen--item-reviews-content-name">
                    {comment.username}
                  </div>
                  <div className="beegreen--item-reviews-content-date">
                      <span>{comment.date}</span>
                  </div>
              </div>
            </div>
          )
        })}
      </div>
      </>
    )
  }
}

export default ItemReviewsContent
