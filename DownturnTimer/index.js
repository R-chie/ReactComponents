import React from 'react';
import ReactDOM from 'react-dom';
import DownturnTimer from './src/DownturnTimer';

const appContainer = document.querySelector('#timer');
const settings = {
    containerId: 'timer',
    timeupDate: '2019/05/02 00:00:00',
    timeupText: 'Time is up!'
};
ReactDOM.render(
    <DownturnTimer settings={settings}/>, appContainer
);
