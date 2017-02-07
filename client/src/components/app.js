import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
        <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
                <div className="header_nav">
                  <Link className="logo" to="/">Just Search</Link>
                </div>
            </div>
            <div className="col-md-9">
              <HeaderTemplate />
            </div>
          </div>
        </div>
        {React.cloneElement(this.props.children, this.props)}
        </div>
    );
  }
}

export default App;
