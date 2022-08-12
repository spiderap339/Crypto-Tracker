import { makeStyles } from '@mui/styles'
import React, {useState, useEffect} from 'react'
import { TrendingCoins } from '../config/config';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginTop: "100px",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        fontFamily: "monospace",
    }
})); 

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Carousel() {
    const classes = useStyles();
    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([]);

    // const fetchTrendingCoins = async (currency) => {
    //     // console.log(currency);
    //     const response = await axios.get(TrendingCoins(currency));
    //     console.log(response.data);
    //     setTrending([1,2,3,4]);
    //     console.log(trending);
    //     console.log('---------------------');

    // }

    
    const items = trending.map((coin) => {
        
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link
                className={classes.carouselItem} 
                to={`/coins/${coin.id}`}
            >
                
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 2}}
                />

                <span style={{fontSize: 15, fontWeight: 300}} >
                    {coin.symbol}
                    {/* &nbsp used for space */}
                    &nbsp; 
                    <span
                        style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500}}
                    >   
                        {/* toFixed() used to fix the decimal digits */}
                        {profit && "+"} {coin.price_change_percentage_24h.toFixed(3)} %
                    </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(3))}
                </span>
            </Link>
        )
    })
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };
    
    useEffect(() => {
        axios.get(TrendingCoins(currency))
        .then((response) => {
            // console.log(response.data);
            setTrending(response.data)
        })
    }, [currency])
    
    // console.log(trending);
    
    return (
        <div className={classes.carousel}>
            <AliceCarousel 
                mouseTracing
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel