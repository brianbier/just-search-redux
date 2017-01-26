import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="container-fluid main_container">
        <div className="row main_container">
          <div className="col-md-3">
            <div className="logo_container">
              <div className="logo">
                <Link to="/">Just Search</Link>
              </div>
            </div>
            <HeaderTemplate  />
            <FooterTemplate />
          </div>
          <div className="col-md-9">
            <main>
              {React.cloneElement(this.props.children, this.props)}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
