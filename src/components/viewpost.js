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
        'imageUrl': '',
        'moneyRaised': '',
        'noLikes': '',
        'subtitle': '',
        'targetAmount': '',
        'timestamp': '',
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
              'imageUrl': d.imageUrl,
              'moneyRaised': '',
              'noLikes': d.noLikes,
              'subtitle': d.subtitle,
              'targetAmount': d.targetAmount,
              'timestamp': d.timestamp
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
        {/* container */}
        <div>
            {/* row for author name, pic and charity logo */}
            <div className="row">
                
            </div>
            {/* image */}
            <div>
            {this.state.imageUrl}
            <img src={this.state.imageUrl}></img>
            </div>
            {/* text container: title, descr., money raised all in this */}
            <div>
                <h2>Title</h2>
                <p>Description</p>
                <div>
                    Money raised indicator
                </div>
            </div>
            {/* Icon panel: likes, comments, share button */}
            <div className="row">

            </div>
            {/* Time since post */}
            <div>17 hour(s) ago*****</div>
            {/* Donate button */}
            <div>
                <button>
                    Donate
                </button>
            </div>
        </div>
      </div>
    );
  }
}

export default ViewPost;
