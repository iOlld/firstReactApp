import React from 'react';
import './App.scss';

import {Route, Switch} from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Weather from '../Weather/Weather';
import Currency from '../Currency/Currency';
import Other from '../Other/Other';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="App">
        {/* <div className="App__wrap"> */}
          <Header />
          <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/weather" component={Weather} />
                <Route exact path="/currency" component={Currency} />
                <Route component={Other} />
              </Switch>
          </main>
          <Footer />
        {/* </div> */}
      </div>
    )
  }
}

export default App;
