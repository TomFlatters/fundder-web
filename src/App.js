import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      data: {
        'title': '',
        'authorUsername': '',
        'charity': '',
        'hashtags': [],
      }
    };
  }

  componentDidMount(){
    const rootRef = firebase.firestore().collection('posts').limit(1).get().then((posts) => {
      posts.forEach((post) => {
        var d = post.data();
        this.setState({
          'title': d.title,
          'authorUsername': d.authorUsername,
          'charity': d.charity,
          'hashtags': d.hashtags,
        })
      })
    });
  }

  render(){
    return (
      <div className="App">
        <h1>Fundder Web</h1>
        <div>
          <h2>Data:</h2>
          <p>
            {this.state.title}<br/>
            {this.state.authorUsername}<br/>
            {this.state.hashtags}<br/>
            {this.state.charity}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
