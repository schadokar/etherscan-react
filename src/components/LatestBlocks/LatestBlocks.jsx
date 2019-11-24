import React, { Component } from "react";
import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from "semantic-ui-react";

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

  getBlocks = () => {
    const { lastBlocks } = this.props;
    console.log(lastBlocks);
    const blockDetails = lastBlocks.map((block, index) => (
      <TableRow key={index}>
        <TableCell>Bk {block.blockNo}</TableCell>
        <TableCell>
          Miner {block.miner} <br></br>
          Txs {block.totalTxs}
        </TableCell>
        {/* <TableCell> Eth {parseInt(block.value) / 10 ** 18}</TableCell> */}
      </TableRow>
    ));

    this.setState({
      blocks: blockDetails
    });
  };
  render() {
    return (
      <Table fixed>
        <TableHeader>
          <TableRow>
            <TableCell as="h3" style={{ padding: "10px" }}>
              Latest Blocks
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>{this.state.blocks}</TableBody>
      </Table>
    );
  }
}

export default LatestBlocks;
