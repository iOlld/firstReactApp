import React from 'react';
import './Header.scss';

import Nav from '../Nav/Nav';
import Logo from '../Logo/Logo';

class Header extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        // city: '',
      }
    }

    
    // static getDerivedStateFromProps(props, state) {
    //     return { 
    //       city: props.city
    //     }
    // }

    render() {
        return (
            <header className="Header">
                <Logo />
                
                {/* <p> {this.state.city} </p>
                {this.state.city && <p> {this.state.city} </p>} */}
                <Nav />
                
            </header>
        )
    }   
}

export default Header;