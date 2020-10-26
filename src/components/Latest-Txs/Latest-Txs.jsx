import React, { Component } from "react";
import { Table, Label } from "semantic-ui-react";
import axios from "axios";

const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const endpoint = `https://api.etherscan.io/api`;

class LatestTxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount = () => {
    this.getTxs();
  };

  getTxs = async () => {
    const { blockNo } = this.props;

    // get the block transaction
    const blockDetail = await axios.get(
      endpoint +
        `?module=proxy&action=eth_getBlockByNumber&tag=${blockNo}&boolean=true&apikey=${apiKey}`
    );

    const { transactions } = blockDetail.data.result;

    let txsDetails = [];

    // check if there is any transaction
    if (transactions) {
      for (let i = 0; i < 2; i = i + 1) {
        const tx = transactions[i];
        txsDetails.push(
          <Table.Row key={i}>
            <Table.Cell>
              <Label color="blue">Tx</Label> {tx.hash}
            </Table.Cell>
            <Table.Cell>
              From {tx.from} <br></br>
              To {tx.to}
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Label color="blue">Eth</Label> {parseInt(tx.value) / 10 ** 18}
            </Table.Cell>
          </Table.Row>
        );
      }
    }

    this.setState({
      transactions: txsDetails,
    });
  };

  render() {
    return (
      <div>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.Cell style={{ color: "#1d6fa5" }}>
                <h4> Latest Transactions</h4>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.state.transactions}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default LatestTxs;
