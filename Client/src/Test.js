import React from 'react';
import { baseUrl } from './config';

class Test extends React.Component {
  constructor() {
    super();

    this.state = {
      totalStatePurchasesCount: 0,
      totalStatePurchasesScore: 0
    }
  }

  async componentDidMount() {
    const [ totalNumberOfPurchases, totalStatePurchasesScore ] = await Promise.all([
      fetch(`${baseUrl}/purchases/count`).then(res => res.json()).catch(err => err),
      fetch(`${baseUrl}/purchases`).then(res => res.json()).catch(err => err)
    ]);

    this.setState({ 
      totalStatePurchasesCount: totalNumberOfPurchases.count || 0,
      totalStatePurchasesScore: Array.isArray(totalStatePurchasesScore) ? 
      totalStatePurchasesScore.reduce((sum, curr) => sum + curr.score, 0) : 0,
    });
  }


  render() {
    return (
    <div>
      <h3>Total Number Of purchases</h3>
        { this.state.totalStatePurchasesCount + ""}
      <h3>Total purchase score</h3>
        { this.state.totalStatePurchasesScore + ""}
    </div>
    );
  }
}
export default Test;