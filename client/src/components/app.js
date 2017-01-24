import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate siteName="Just Search" />
        <div className="container">
          {React.cloneElement(this.props.children, this.props)}
        </div>
        <FooterTemplate />
      </div>
    );
  }
}

export default App;