import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './DownturnTimer.css';

class DownturnTimer extends React.Component {
    static propsTypes =  {
        settings:   PropTypes.object.isRequired,
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {
            today: new Date(),
            container: props.settings.containerId,
            timer: new Date(props.settings.timeupDate),
            timeupText: props.settings.timeupText
        };
    }

    componentDidUpdate() {
        setTimeout(this.tick, 1000);
    }

    componentDidMount() {
        this.tick();
    }

    _countDown = () => {
        let difference = this.state.timer - this.state.today,
            day = Math.floor(   difference / (24*60*60*1000)),
            hour = Math.floor(  (difference % (24*60*60*1000)) / (60*60*1000)),
            minute = Math.floor((difference % (24*60*60*1000)) / (60*1000))%60,
            second = Math.floor((difference % (24*60*60*1000)) / 1000)%60%60;
        if (difference > 0) {
            return (
                <Fragment>
                    <span className="number-wrapper"><div className="line"></div>
                        <div className="caption">DAYS</div><span className="number day">{day}</span>
                    </span>
                    <span className="number-wrapper"><div className="line"></div>
                        <div className="caption">HOURS</div><span className="number hour">{hour}</span>
                    </span>
                    <span className="number-wrapper"><div className="line"></div>
                        <div className="caption">MINS</div><span className="number min">{this.addZero(minute)}</span>
                    </span>
                    <span className="number-wrapper"><div className="line"></div>
                        <div className="caption">SECS</div><span className="number sec">{this.addZero(second)}</span>
                    </span>
                </Fragment>
            );
        }
       return (
           <span className="number-wrapper"><div className="line"></div>
               <span className="number end">{this.state.timeupText}</span>
           </span>
       )
    };

    tick = () => {
        this.setState({
            today: new Date()
        });
    };

    addZero = (num) => {
        return ('0' + num).slice(-2);
    };

    render(){
        return this._countDown();
    }
}

export default DownturnTimer;
