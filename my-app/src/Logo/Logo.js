import React from 'react';
import './Logo.scss';

import { Link } from 'react-router-dom';

class Logo extends React.Component {
    // constructor (props) {
    //   super(props);
    //   this.state = {
  
    //   }
    // }
    render() {
        return (
            <Link
                to="/"
                className="Logo">iOld</Link>
        )
    }   
}

export default Logo;