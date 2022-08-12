import { CircularProgress, createTheme } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { HistoricalChart } from '../config/config';
import { CryptoState } from '../CryptoContext';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { ClassNames } from '@emotion/react';
import {Line} from 'react-chartjs-2';

const useStyles = makeStyles({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
    }
});
const CoinInfo = ({coin}) => {
    const classes = useStyles();
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const [coinNew, setCoinNew] = useState("");
    const {currency} = CryptoState();

    const fetchHistoricData = async () => {
        
        const {data} = await axios.get(HistoricalChart( coin.id, days, currency))
        
        setHistoricData(data.prices);
    }

    useEffect(() => {
        setCoinNew(coin);
        fetchHistoricData();

    }, [currency, days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    // console.log(historicData)
    // console.log(">>>>>>>>>>>>>>>>>>>>");
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={ClassNames.container}>
                {
                    !historicData ? (
                        <CircularProgress
                            style={{color: "gold"}}
                            size={250}
                            thickness={1}
                        />
                    ): (
                        <Line
                            data={{
                                labels:historicData.map((coin) => {
                                    let date = new Date(coin[0]);

                                    let time = date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                
                                    return days === 1 ? time : date.toLocaleDateString();
                                }), 

                                datasets: [{
                                    data: historicData.map((coin) => coin[1])
                            }]
                            }}
                        />
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo