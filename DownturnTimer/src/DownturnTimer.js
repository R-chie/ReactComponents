import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './DownturnTimer.css';

class DownturnTimer extends React.Component {
    /* -------------props-------------
    * settings:
    *   timeupDate: str -- reference date,
    *   timeupText: str -- text when time is up
    * */
    static propsTypes =  {
        settings:   PropTypes.shape({
            timeupDate: PropTypes.string,
            timeupText: PropTypes.string
        }).isRequired,
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {
            today: new Date(),
            timer: new Date(props.settings.timeupDate)
        };
    }

    componentDidUpdate() {
        setTimeout(this._tick, 1000);
    }

    componentDidMount() {
        this._tick();
    }

    _countDown = () => {
        let difference = this.state.timer - this.state.today;
        let time = [
            {name: 'day',    value: Math.floor(   difference / (24*60*60*1000))},
            {name: 'hour',   value: Math.floor(  (difference % (24*60*60*1000)) / (60*60*1000))},
            {name: 'minute', value: this._addZero(Math.floor((difference % (24*60*60*1000)) / (60*1000))%60)},
            {name: 'second', value: this._addZero(Math.floor((difference % (24*60*60*1000)) / 1000)%60%60)}
        ];
        if (difference > 0) {
            return (
                <Fragment>
                    <h2>{this.state.timer.toString().slice(0,15)}</h2>
                    {
                        time.map((item, index) => {
                            return (
                            <span className="number-wrapper" key={index}>
                                <div className="line"/>
                                <div className="caption">{`${item.name}s`.toUpperCase()}</div><span className="number">{item.value}</span>
                            </span>
                            )
                        })
                    }
                </Fragment>
            );
        }
       return (
           <span className="number-wrapper"><div className="line"/>
               <span className="number end">{this.props.settings.timeupText}</span>
           </span>
       )
    };

    _tick = () => {
        this.setState({
            today: new Date()
        });
    };

    _addZero = (num) => {
        return `0${num}`.slice(-2);
    };

    render(){
        return <div className="DownturnTimer">{this._countDown()}</div>;
    }
}

export default DownturnTimer;
