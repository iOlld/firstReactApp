import React from 'react';
import './Home.scss';

class Home extends React.Component {
    constructor (props) {
        super(props);
        // this.itemRef = React.createRef();
        this.bg = React.createRef();
        this.moon = React.createRef();
        this.mountain = React.createRef();
        this.road = React.createRef();
        this.text = React.createRef();

    }

    componentDidMount() {
        window.addEventListener('scroll', this.windowScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowScroll);
    }

    
    windowScroll = () => {
        let scrollValue = window.scrollY;

        this.bg.current.style.top = scrollValue * 0.5 + 'px';
        this.moon.current.style.right = scrollValue * 0.5 + 'px';
        // this.moon.current.style.left = -scrollValue * 0.5 + 'px';
        // this.mountain.current.style.top = -scrollValue * 0.15 + 'px'; // Так было
        this.mountain.current.style.top = -scrollValue * 0.05 + 'px';
        // this.road.current.style.top = scrollValue * 0.1 + 'px';
        this.road.current.style.top = scrollValue * 0.15 + 'px'; // Так было
        this.text.current.style.top = scrollValue * 1 + 'px';
    }
    

    render() {

        return (
            <div className="Home" >
                <div className="Home__paralax">
                    {/* <div className="Home__bg"></div> */}
                    <div className="picture bg" ref={this.bg}></div>
                    <div className="picture moon" ref={this.moon}></div>
                    <div className="picture mountain" ref={this.mountain}></div>
                    <div className="picture road" ref={this.road}></div>
                    <h1 className="Home__title" ref={this.text}>Pet Project</h1>
                    
                </div>
                
                <div className="container">
                        {/* <div className="Home__description" ref={this.itemRef} > */}
                        <div className="Home__description">
                            <p>Согласен, так себе дизайнер, но стараюсь как могу</p>
                        </div>
                        <div className="Home__description">
                            <p>Еще нужно сделать много поправок, так сказать <br/> "Бета версия"</p>
                        </div>
                        <div className="Home__description">
                            <p>Описаниие для погоды</p>
                        </div>
                        <div className="Home__description">
                            <p>
                                Курс от "приват банка"
                            </p>
                        </div>
                    </div>
            </div>
        )
    }   
}

export default Home;