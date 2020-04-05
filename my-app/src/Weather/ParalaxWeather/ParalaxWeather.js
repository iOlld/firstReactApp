import React from 'react';
import './ParalaxWeather.scss';

class ParalaxWeather extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
        this.mountain_1 = React.createRef();
        this.mountain_2 = React.createRef();
        this.mountain_3 = React.createRef();
        this.fog = React.createRef();
        this.paralax = React.createRef()
        
    }

    static getDerivedStateFromProps(props, state) {
    
        return {
            contentHeight: props.contentHeight,
        }
        
    }

    // for scroll
    componentDidMount() {
        window.addEventListener('scroll', this.windowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowScroll);
    }

    
    windowScroll = (e) => {
        let s = window.scrollY;
        let w = window.outerWidth;
        let h = this.state.contentHeight;
        let h_b = h / 15;

        let p = s/h * 100;
        let p_b = s/h_b * 100;

        let o = 1 - 1/500 * p_b;

        let z_1 = 1 + (w / 100000 * p_b)
        // this.fog.current.style.transform
        this.fog.current.style.transform = `scale(${z_1})`;
        this.fog.current.style.opacity = o;
        // console.log()

        let w_2 = w;
        if(w < 1500) w_2 = w * 2;
        if(w < 1000) w_2 = w * 3;
        if(w < 850) w_2 = w * 11;
        if(w < 700) w_2 = w * 15;
        if(w < 500) w_2 = w * 30;
        if(w < 350) w_2 = w * 50;

        let z_2 = 1 + (w_2 / 1500000 * p);
        this.mountain_1.current.style.transform = `scale(${z_2})`;

        if(p_b <= 0) p_b = 0;

        let hr = w / 2000 * p_b;
        let z_3 = 1 + (w * 0.000005 * p_b);
        this.mountain_2.current.style.transform = `translate3d(${hr}px, 0px, 0px) scale(${z_3})`;

        let hr_2 = w / 1500 * p_b;
        let z_4 = 1 + (w * 0.00001 * p_b);
        this.mountain_3.current.style.transform = `translate3d(-${hr_2}px, 0px, 0px) scale(${z_4})`;

    }


    render() {

        return (
            <div className="ParalaxWeather__paralax"  ref={this.paralax}>
                <div className="paralax__mountain paralax__mountain-1"  ref={this.mountain_1}></div>
                <div className="paralax__mountain paralax__mountain-2"  ref={this.mountain_2}></div>
                <div className="paralax__mountain paralax__mountain-3"  ref={this.mountain_3}></div>
                <div className="paralax__fog"  ref={this.fog}></div>
            </div>
        )
    }   
}

export default ParalaxWeather;