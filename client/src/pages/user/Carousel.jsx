import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Paper } from '@mui/material';
import one from "@assets/images/one.jpg";
import two from "@assets/images/one.jpg";
import three from "@assets/images/one.jpg";
import four from "@assets/images/one.jpg";
import five from "@assets/images/one.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const MuiCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <ArrowForwardIosIcon
                className={className}
                style={{ ...style, color: 'black', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <ArrowBackIosNewIcon
                className={className}
                style={{ ...style, color: 'black', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

    const images = [one, two, three, four, five]

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <Paper key={index} elevation={3} component="div" sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 500 }}>
                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </Paper>
                ))}
            </Slider>
        </Box>
    );
};
export default MuiCarousel;