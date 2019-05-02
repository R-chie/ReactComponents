import React from 'react';
import PropTypes from 'prop-types';
import './ImageZoomer.css'

class ImageZoomer extends React.Component {

    static propsTypes =  {
    };

    static defaultProps = {
        zoomOnClick: false
    };

    state = {
        zoomOnClick: false,
        isEntered: false,
        zoomerXpos: 0,
        zoomerYpos: 0,
        targetSrc: '',
        cursorXpos: 0,
        cursorYpos: 0,
    };

    componentDidMount() {
        if (this.props.zoomOnClick){
            if (!this.state.zoomOnClick){
                this.setState({zoomOnClick: this.props.zoomOnClick})
            }
        }
    }

    mouseHandler = (e) => {
        let target = e.target;
        switch (e.type) {
            case 'click' :
                if (this.state.zoomOnClick) { // if zoomOnClick came True from props
                    if (target.nodeName === 'IMG') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({isEntered: !this.state.isEntered,  targetSrc: target.src});
                    }
                }
                break;
            case 'mousemove' :
                if (!this.state.zoomOnClick) { // if zoomOnClick came False from props or without props
                    if (target.nodeName === 'IMG') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({isEntered: true,  targetSrc: target.src});
                    }
                }
                if (this.state.isEntered) {
                    if (target.nodeName === 'IMG') {
                        this._setPos(target, e.pageX, e.pageY);
                        this.setState({targetSrc: target.src});
                    }
                }
                break;
            case 'mouseleave' :
                this.setState({isEntered: false, targetSrc: ''});
                break;
        }
    };

    _setPos = (target, x, y) => {
        const offset = 100;
        const { left, top, width, height } = target.getBoundingClientRect();
        const xPos = (x - left) / width * 100;
        const yPos = (y - top) / height * 100;
        this.setState({
            zoomerXpos: xPos,
            zoomerYpos: yPos,
            cursorXpos: x + offset / 2,
            cursorYpos: y - offset * 1.2,
        });
    };

    render() {
        return (
            <div className='ImageZoomer'
                 onMouseMove={this.mouseHandler}
                 onMouseLeave={this.mouseHandler}
                 onClick={this.mouseHandler}>
                {
                    (this.state.isEntered) &&
                    <div className='zoomer' style={{
                        left: this.state.cursorXpos,
                        top: this.state.cursorYpos,
                        backgroundImage: `url(${this.state.targetSrc})`,
                        backgroundSize: '350%, cover',
                        backgroundPosition : `${this.state.zoomerXpos}% ${this.state.zoomerYpos}%`
                    }}/>
                }
                {this.props.children}
            </div>
        )
    }
}

export default ImageZoomer;
