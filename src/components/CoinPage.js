import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/config';
import {makeStyles} from "@mui/styles";
import CoinInfo from '../components/CoinInfo';
import { Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from './Carousel';
const useStyles = makeStyles({
  container : {
    display: "flex",
    // [theme.breakpints.down("md")]: {
    //   flexDirection: "column",
    //   alignItems: "center",
    // },
  }, 

  sidebar: {
    width: "100%",
    // [theme.breakpints.down("md")] : {
    //   width: "100%", 
    // }, 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  }, 

  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15, 
    paddingTop: 0,
    textAlign: "justify",
    display: "flex",
    justifyContent: "center"
  },

  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
  },
  data: {
    display: "flex",
    justifyContent: "center",
  }
});

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [flag, setFlag] = useState(false);
  const {currency, symbol } = CryptoState(); 

  const fetchCoin =  async() => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    setFlag(true);
  };

//  console.log(coin);
//   console.log(flag? coin.name : ""); 
  useEffect(() => {
    fetchCoin();
  }, []);
  // console.log(coin.id);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={flag? coin.image.large: ""}
          alt={flag? coin.name: ""}
          height="200"
          style={{marginBottom: 20}}
        
        />

        <Typography variant="h3" className={classes.heading}>
          {flag? coin.name: ""}
        </Typography>
        
        
        <Typography variant="subtitle1" className={classes.description}>
          {flag? ReactHtmlParser(coin.description.en.split(". ")[0]): ""}
        </Typography>
        <div className={classes.data}>
        <div className={classes.marketData}>
          <span style={{ display: "flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;

            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {flag ? coin.market_cap_rank: ""}
            </Typography>
          </span>

          <span style={{display: "flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Current Price: 
            </Typography>

            &nbsp; &nbsp;

            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                flag ? coin.market_data.current_price[currency.toLowerCase()] : ""
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
            </Typography>    
            &nbsp; &nbsp;

            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(flag ? coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6) : "")}
              M
            </Typography>
          </span>
        </div> 
        </div>
           
      </div>

  
      {/* <CoinInfo coin={coin} /> */}

    </div>
  )
}

export default CoinPage