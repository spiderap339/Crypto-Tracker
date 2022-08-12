import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { CoinList } from '../config/config';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@mui/styles';
import {
    createTheme, 
    Typography, 
    Container, 
    TableContainer,
    LinearProgress,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import './coinsTable.css';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';



const useStyles = makeStyles({
    row: {
        // backgroundColor: "#16171a",
        backgroundColor: "#001E3C",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    }
})


const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const {currency, symbol} = CryptoState();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    
    const fetchCoins = async () => {
        setLoading(true);
        const response = await axios.get(CoinList(currency));

        setCoins(response.data);
        setLoading(false);
    }

    // console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            
        },
    });

    const handleSearch = () => {
        // console.log("handle search called...");
        let res = coins.filter((coin) => {
            // console.log(coin);
            let name= coin.name.toLowerCase().includes(search.toLowerCase());
              
            let symbol = coin.symbol.toLowerCase().includes(search.toLowerCase());
            // console.log(name, symbol);
            return name || symbol;
        })
        // console.log(res);
        return res;
    }

    
    const classes = useStyles();

    return ( 
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
            <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                Crypto Currency Prices
            </Typography>
            <div className="search">
                <input 
                    onChange={(e) => {
                        setSearch(e.target.value);
                        // console.log(search);
                    }}
                    
                    style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#001E3C",
                        color: "#fff",
                        padding: "1em",
                        border: "1px solid #fff",
                        marginBottom: "10px",
                        outline: "none",

                    }}
                    placeholder="Serach for Crypto Currency"
                />

            </div>        

            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor: "gold" }} />
                    ) : (
                            <Table> 
                                <TableHead style={{ backgroundColor: "#73D3BE"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24th Change", "Market Cap"].map((head) => (
                                                <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                            
                                            ))}
                                    </TableRow>
                                </TableHead>  

                                <TableBody>
                                    {
                                        handleSearch()
                                        // .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            // console.log(row)
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        styles={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    > 
                                                        <img 
                                                            src={row.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{marginBottom: 10}}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column"}}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                    color: "#73D3BE",
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>

                                                            <span style={{ color: "darkgrey" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    
                                                    <TableCell align= "right"
                                                        style={{color: "darkgrey"}}
                                                    >
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align= "right"
                                                        style={{color: profit > 0 ? "rgb(14, 203, 129" : "red",
                                                                fontWeight: 500,
                                                    }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)} %
                                                    </TableCell>

                                                    <TableCell align= "right"
                                                        style={{color: "darkgrey"}}
                                                    >
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
    
                        
                    )
                }
            </TableContainer>
            {/* <Pagination
                // count={(handleSearch().length/10).toFixed(0)}
                count={10}
            /> */}

            
        </Container>
    </ThemeProvider>
                
    )
}

export default CoinsTable