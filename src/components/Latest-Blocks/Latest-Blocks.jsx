import React, { Component } from "react";
import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Label
} from "semantic-ui-react";

import axios from "axios";

const apiKey = "1NKSISYXSKE4U1WYGY5US44TMVQMGCH1X7";
const endpoint = `https://api.etherscan.io/api`;

class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount = () => {
    this.getBlocks();
  };

  getBlocks = async () => {
    const { latestBlock } = this.props;

    let blocks = [];

    for (let i = 0; i < 5; i = i + 1) {
      // get the block transaction
      const blockDetail = await axios.get(
        endpoint +
          `?module=proxy&action=eth_getBlockByNumber&tag=${(
            latestBlock - i
          ).toString(16)}&boolean=true&apikey=${apiKey}`
      );

      const { result } = blockDetail.data;
      blocks.push(
        <TableRow key={i}>
          <TableCell>
            <Label color="blue">Bk</Label> {latestBlock - i}
          </TableCell>
          <TableCell>
            Miner {result.miner} <br></br>
            Txs {result.transactions.length}
          </TableCell>
          <TableCell>
            <Label color="blue">Size </Label> {parseInt(result.size)} bytes
          </TableCell>
        </TableRow>
      );

      this.setState({
        blocks: blocks
      });
    }
  };

  render() {
    return (
      <Table fixed>
        <TableHeader>
          <TableRow>
            <TableCell style={{ color: "#1d6fa5" }}>
              <h4>Latest Blocks</h4>
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>{this.state.blocks}</TableBody>
      </Table>
    );
  }
}

export default LatestBlocks;
