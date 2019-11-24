import React, { Component } from "react";
import axios from "axios";
import "./eth-overview.css";
import { Card, Grid, GridRow, GridColumn } from "semantic-ui-react";
// import LatestBlocks from "../LatestBlocks/index";
import LatestTxs from "../Latest-Txs/index";

const apiKey = "1NKSISYXSKE4U1WYGY5US44TMVQMGCH1X7";
const endpoint = `https://api.etherscan.io/api`;

class EthOverview extends Component {
  constructor() {
    super();
    this.state = {
      ethUSD: "",
      ethBTC: "",
      blockNo: "",
      latestBlock: 0,
      difficulty: "",
      marketCap: 0
    };
  }

  async componentDidMount() {
    // get the ethereum price
    axios
      .get(endpoint + `?module=stats&action=ethprice&apikey=${apiKey}`)
      .then(res => {
        const { result } = res.data;
        this.setState(
          {
            ethUSD: result.ethusd,
            ethBTC: result.ethbtc
          },
          () => {
            // get the market cap of ether in USD
            axios
              .get(endpoint + `?module=stats&action=ethsupply&apikey=${apiKey}`)
              .then(res => {
                const { result } = res.data;
                // in wei
                const priceWei = result.toString();

                // in ether
                const priceEth = priceWei.slice(0, priceWei.length - 18);
                console.log(result, priceWei, priceEth);
                // convert eth in USD
                this.setState({
                  marketCap: parseInt(priceEth) * this.state.ethUSD
                });
              });
          }
        );
      });

    // get the latest block number
    axios
      .get(endpoint + `?module=proxy&action=eth_blockNumber&apikey=${apiKey}`)
      .then(res => {
        this.setState({
          latestBlock: parseInt(res.data.result),
          blockNo: res.data.result // save block no in hex
        });

        // get the block difficulty
        axios
          .get(
            endpoint +
              `?module=proxy&action=eth_getBlockByNumber&tag=${res.data.result}&boolean=true&apikey=${apiKey}`
          )
          .then(blockDetail => {
            const { result } = blockDetail.data;

            const difficulty = parseInt(result.difficulty).toString();

            // convert difficulty in Terra Hash
            // instead of dividing it with 10^12 we'll slice it
            const difficultyTH = `${difficulty.slice(0, 4)}.${difficulty.slice(
              4,
              6
            )} TH`;

            this.setState({
              difficulty: difficultyTH
            });
          });
      });
  }

  // getLatestBlocks = () => {
  //   return <LatestBlocks></LatestBlocks>;
  // };

  getLatestTxs = () => {
    const { blockNo } = this.state;

    if (blockNo) {
      return <LatestTxs blockNo={this.state.blockNo}></LatestTxs>;
    }
  };

  render() {
    const { ethUSD, ethBTC, latestBlock, difficulty, marketCap } = this.state;
    return (
      <div>
        <Grid>
          <GridRow>
            <GridColumn width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    ETHER PRICE
                  </Card.Header>
                  <Card.Description textAlign="left">
                    ${ethUSD} @{ethBTC} BTC
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
            <GridColumn width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    LATEST BLOCK
                  </Card.Header>
                  <Card.Description textAlign="left">
                    {latestBlock}
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
            <GridColumn width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    DIFFICULTY
                  </Card.Header>
                  <Card.Description textAlign="left">
                    {difficulty}
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
            <GridColumn width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    MARKET CAP
                  </Card.Header>
                  <Card.Description textAlign="left">
                    $ {marketCap}
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
          </GridRow>
        </Grid>

        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>this.getLatestBlocks</Grid.Column>
            <Grid.Column>{this.getLatestTxs()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default EthOverview;
