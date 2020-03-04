import React from 'react';
import './Nav.scss';

import { Link } from 'react-router-dom';

class Nav extends React.Component {
    // constructor (props) {
    //   super(props);
    //   this.state = {
  
    //   }
    // }
    render() {
        return (
            <nav className="Nav">
                <ul>
                    <li><Link data-text="Главная" to="/">Главная</Link></li>
                    <li><Link data-text="Погода" to="/weather">Погода</Link></li>
                    <li><Link data-text="Курс&nbsp;валют" to="/currency">Курс валют</Link></li>
                </ul>
            </nav>
        )
    }   
}

export default Nav;