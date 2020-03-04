import React from 'react';
import './Header.scss';

import Nav from '../Nav/Nav';
import Logo from '../Logo/Logo';

class Header extends React.Component {
    // constructor (props) {
    //   super(props);
    //   this.state = {
  
    //   }
    // }
    render() {
        return (
            <header className="Header">
                <Logo />
                <Nav />
            </header>
        )
    }   
}

export default Header;