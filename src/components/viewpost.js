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
              'moneyRaised': d.moneyRaised,
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

  isVideo = () => {
    let url = this.state.imageUrl;
    console.log(url);
    if (url && url!==''){
        console.log(url.indexOf('/o/videos'));
        return url.indexOf('/o/videos')===-1 ? false : true;
    } else {
        return false
    }
  }

  render(){
    return (
      <div className="App">
        {/* container */}
        <div className="post-container">
            <div className="post-container-inner">
            {/* row for author name, pic and charity logo */}
            <div className="row space-apart mb">
                <div className="row">
                    <div>pic</div>
                    <div className="pl">{this.state.authorUsername}</div>
                </div>
                <div>{this.state.charity}</div>
            </div>
            {/* video/image */}
            <div className="row center">
                { this.isVideo() ? <video controls className="post-image" src={this.state.imageUrl}/> : <img className="post-image" src={this.state.imageUrl}></img>}
            </div>
            {/* text container: title, descr., money raised all in this */}
            <div className="mb">
                <h2>{this.state.title}</h2>
                <p>{this.state.subtitle}</p>
                <div>
                    <div class="progress-container">
                        <div class="progress-bar" style={{'width': (100*this.state.moneyRaised/this.state.targetAmount).toString()+'%'}}></div>
                    </div>
                    £{this.state.moneyRaised} raised of £{this.state.targetAmount} target.
                </div>
            </div>
            {/* Icon panel: likes, comments, share button */}
            <div className="row space-apart mb">
                <div>{this.state.noLikes} Likes</div>
                <div>Share</div>
            </div>
            {/* Time since post */}
            <div className="mb">17 hour(s) ago</div>
            {/* Donate button */}
            <div className="row center">
                <button className="primary-button">
                    Donate
                </button>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default ViewPost;
