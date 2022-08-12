import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import CoinPage from './components/CoinPage';
import { makeStyles } from '@mui/styles';
import React from 'react';
const useStyles = makeStyles({
  App: {
    backgroundColor: '#0A1929',
    color:"white",
    minHeight: "100vh",
  },
});

function App() {

  

  const classes = useStyles();

  return (
    <div className={classes.App}>
              <BrowserRouter>

        <Header />

          <Routes>
            
              <Route path='/' element={<HomePage />} />
              <Route path='/coins/:id' element={<CoinPage />} />

          </Routes> 

        </BrowserRouter>
    </div>
    
    
  );
}

export default App;
