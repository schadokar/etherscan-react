import React, { Component } from "react";
import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from "semantic-ui-react";
import axios from "axios";

const apiKey = "1NKSISYXSKE4U1WYGY5US44TMVQMGCH1X7";
const endpoint = `https://api.etherscan.io/api`;

class LatestTxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount = () => {
    this.getTxs();
  };

  getTxs = async () => {
    const { blockNo } = this.props;

    // get the block difficulty
    const blockDetail = await axios.get(
      endpoint +
        `?module=proxy&action=eth_getBlockByNumber&tag=${blockNo}&boolean=true&apikey=${apiKey}`
    );

    const { transactions } = blockDetail.data.result;

    let txsDetails = [];

    for (let i = 0; i < 10; i = i + 1) {
      const tx = transactions[i];
      txsDetails.push(
        <TableRow key={i}>
          <TableCell>Tx {tx.hash}</TableCell>
          <TableCell>
            From {tx.from} <br></br>
            To {tx.to}
          </TableCell>
          <TableCell> Eth {parseInt(tx.value) / 10 ** 18}</TableCell>
        </TableRow>
      );
    }

    this.setState({
      transactions: txsDetails
    });
  };

  render() {
    return (
      <Table fixed>
        <TableHeader>
          <TableRow>
            <TableCell style={{ padding: "10px" }}>
              Latest Transactions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>{this.state.transactions}</TableBody>
      </Table>
    );
  }
}

export default LatestTxs;
