import React from 'react';
import './Nav.scss';

import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            buttonActive: '',
        }
        this.ulNav = React.createRef();
    }

    showMenu = () => {
        if(this.state.buttonActive === '') {
            this.setState({buttonActive: 'is__active'});
            this.ulNav.current.style.right = '-16px';
        } else {
            this.setState({buttonActive: ''});
            this.ulNav.current.style.right = '-300px';
        }
    }

    closeMenu = () => {
        this.ulNav.current.style.right = '-300px';
        this.setState({buttonActive: ''});
    }

    render() {
        return (
            <nav className="Nav">
                <ul ref={this.ulNav}>
                    <li><Link data-text="Главная" onClick={this.closeMenu} to="/">Главная</Link></li>
                    <li><Link data-text="Погода" onClick={this.closeMenu} to="/weather">Погода</Link></li>
                    <li><Link data-text="Курс&nbsp;валют" onClick={this.closeMenu} to="/currency">Курс валют</Link></li>
                </ul>
                <div className="Nav__burger-wrap" onClick={this.showMenu} >
                    <button className={[`Nav__burger Nav__burger-line ${this.state.buttonActive}`]}>
                        <span>Menu</span>
                    </button>
                </div>
            </nav>
        )
    }   
}

export default Nav;