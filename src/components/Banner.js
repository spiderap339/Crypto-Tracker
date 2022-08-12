import React from 'react'
import {makeStyles} from "@mui/styles";
import {Container, Typography} from "@mui/material";
import Carousel from './Carousel';
const useStyles = makeStyles({
    banner: {
        backgroundImage: "url(https://img.freepik.com/premium-vector/binary-code-stream-digital-data-codes-hacker-coding-crypto-matrix-numbers-flow-digitally-blue-screen-abstract-background_102902-991.jpg?w=2000)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        // border: "1px solid #fff",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",

    },
    tagline: {
        display: "flex",
        height: "40%",
        // flexDirection: "column",
        justifyContent: "center",
    }
});
function Banner() {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                    variant="h2"
                    style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",
                    }}
                >
                    Crypto Tracker
                </Typography>
            </div>

            <div>
                <Carousel />
            </div>
        </Container>

    </div>
  )
}

export default Banner