import React from 'react';
import ReactDOM from 'react-dom';
import ImageZoomer from './src/ImageZoomer';

const appContainer = document.querySelector('.container');

ReactDOM.render(
    <ImageZoomer zoomOnClick={true}>
        <img alt='img' src='https://www.brandfield.com/media/catalog/product/cache/image/9df78eab33525d08d6e5fb8d27136e95/c/a/casio-la690wea-1ef-la690wea-1ef-9260432.jpg'/>
        <img alt='img' src='https://pixel.nymag.com/imgs/daily/vulture/2019/01/31/magazine/matrix/wachowskis.w700.h700.jpg'/>
        <img alt='img' src='https://content.onliner.by/news/970x485/963b5f16b1584c122dabce73b6870c27.jpeg'/>
    </ImageZoomer>, appContainer
);
