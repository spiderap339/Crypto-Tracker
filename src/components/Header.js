import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
const darkTheme = createTheme({
  palette: {
    
    main:"#fff",
    mode:'dark',
  },
});
const useStyles = makeStyles({
    title: {
        flex: 1,
        color: "#73D3BE",
        fontFamily: "Montserrat",
        fontWeight: "bolder",
        cursor: "pointer",
        
    }
});
const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency} = CryptoState(); 

    // console.log(currency);
    return (
        <div className="header">
            <ThemeProvider theme={darkTheme}>

            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                        className={classes.title}
                        onClick={()=> navigate('/')}
                        variant="h6"
                        >
                            Crypto Tracker
                        </Typography>

                        <Select 
                        variant='outlined'
                        
                        sx={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                            color: "#fff",
                            
                        }}  

                        value = {currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
            </ThemeProvider>

        </div>
    );
}

export default Header;