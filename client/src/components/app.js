import React, {Component} from 'react';

class App extends Component{
	render(){
		return(
			<div>
				<p>Just Search</p>
				<div class="container">
					{React.cloneElement(this.props.children, this.props)}
				</div>
				<p>Just Search Footer</p>
			</div>
		)
	}
}

export default App;

