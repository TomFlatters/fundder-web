import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';

class ViewPost extends Component {
  
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
    const postId = this.props.match.params.id;
    firebase.firestore().collection('posts').doc(postId).get().then((post) => {
        if (post.exists) {
            var d = post.data();
            this.setState({
              'title': d.title,
              'authorUsername': d.authorUsername,
              'charity': d.charity,
              'hashtags': d.hashtags,
            })
        } else {
            // TODO: redirect to home
            
        }
        
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

export default ViewPost;
