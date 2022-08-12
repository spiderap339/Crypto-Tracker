import React, {useContext} from 'react'
import {createContext, useState, useEffect} from 'react';

const Crypto = createContext();

function CryptoContext({children}) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        console.log(currency);
        if (currency === "INR") setSymbol("₹");
        else setSymbol("$");
    }, [currency])
    // console.log(currency);
    console.log(symbol);
  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export  const CryptoState = () => {
    return useContext(Crypto);
}