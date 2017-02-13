import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';
import { Link } from 'react-router';

class App extends Component {
  render() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="outer_container">
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
        <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
                <div className="footer_nav">
                  <p className="copy">© {year}, Just Search. All Rights Reserved.</p>
                </div>
            </div>
            <div className="col-md-7">
              <FooterTemplate />
            </div>
          </div>
        </div>
        </footer>
        </div>
    );
  }
}

export default App;
