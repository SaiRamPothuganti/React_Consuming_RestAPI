import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	lizedImage = null;
	constructor(){
		super();
		this.postImage = this.postImage.bind(this);
		this.getImage = this.getImage.bind(this);
		this.state = {resizedImage: null};
	}	
	getImage(){
		 axios.get('http://localhost:51533/api/Upload')
    .then(response => console.log(response));
	}
	postImage(event) {
		var that = this;
		let file = event.target.files[0];
		console.log(file);
		if (file) {
		  let data = new FormData();
		  data.append('file', file);
			axios({
				method:'POST',
				url:'http://localhost:51533/api/Upload',
				data: data,
				config:{headers: { 'contentType': false,
					'processData': false}}
				
			}).then(function(response){
				let image = response.data[0];
				console.log(response);
				console.log(image);
				
			 that.setState({resizedImage:  response.data[0]});
			
			});	
		}
}
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title">Re-Sizing Image</h1>
        </header>
        <p className="App-intro">
          Please Upload Image to Resize Image by (half of pixels).
        </p>
		<p>
          <input type="file"
          name="myFile"
          onChange={this.postImage} />  
        </p>

			<p > <img src={this.state.resizedImage} alt=" Files with Extensions ' .bmp , .gif ,.jpg, .jpeg,.png,.icon ' only acceptable "/> </p>
				
      </div>
    );
  }
}

export default App;
