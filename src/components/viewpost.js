import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';
import { Redirect } from 'react-router';

import like from '../img/like.png';
import share from '../img/share.png';

class ViewPost extends Component {
  
  constructor(){
    super();
    this.state = {
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
        'loading': true,
        'postNotFound': false,
        'profileImageUrl': '',
        'userId': '',
        'charityImageUrl': '',
    };
  }

  componentDidMount(){
    const postId = this.props.match.params.id;
    var d;
    firebase.firestore().collection('posts').doc(postId).get().then((post) => {
        if (post.exists) {
            d = post.data();
            console.log('got post data');
            this.setState({
                'redirectUrl': "https://donate.fundder.co/anon/" + postId,
                'title': d.title,
                'authorUsername': d.authorUsername,
                'userId': d.author,
                'charity': d.charity,
                'hashtags': d.hashtags,
                'imageUrl': d.imageUrl,
                'moneyRaised': d.moneyRaised,
                'noLikes': d.noLikes,
                'subtitle': d.subtitle,
                'targetAmount': d.targetAmount,
                'timestamp': d.timestamp,
                'loading': false,
                'charityLogo': d.charityLogo,
                });
            // this.getImage(d.author);
        } else {
            // TODO: redirect to home
            this.setState({
                'postNotFound': true
            })
        }
    });

  }

//   getImage = (id) => {
//     console.log('getting pic');
//     console.log(id);
//     firebase.firestore().collection('users').doc(id).get().then((userProfile) => {
//         console.log('got user pic');
//         this.setState({
//             'profileImageUrl': userProfile.profilePic
//         })
//     });
//   }

  isVideo = () => {
    let url = this.state.imageUrl;
    if (url && url!==''){
        return url.indexOf('/o/videos')===-1 ? false : true;
    } else {
        return false
    }
  }

  render(){
    if(this.state.postNotFound){
        return(<Redirect to='/'/>)
    }
    else{
        if(this.state.loading){
            return(
                <div></div>
            )
        } else{
        return (
        <div className="App">
            {/* container */}
            <div className="post-container">
                <div className="post-container-inner">
                {/* row for author name, pic and charity logo */}
                <div className="px row space-apart center-vertically mb">
                    <div className="w-500">{this.state.authorUsername}</div>
                    <div className="charity-logo-container"><img className="charity-logo" src={this.state.charityLogo}/></div>
                </div>
                {/* video/image */}
                <div className="row center">
                    { this.isVideo() ? <video controls className="post-image" src={this.state.imageUrl}/> : <img className="post-image" src={this.state.imageUrl}></img>}
                </div>
                {/* text container: title, descr., money raised all in this */}
                <div className="mb px">
                    <div>
                        <h3>{this.state.title}</h3>
                        <p>
                            {this.state.subtitle} 
                            {this.state.hashtags.map((hashtag) => <span className="hashtag"> #{hashtag}</span>)}
                        </p>
                    </div>
                    <div className="w-500 mt">
                        <div className="progress-container">
                            <div className="progress-bar" style={{'width': (100*this.state.moneyRaised/this.state.targetAmount).toString()+'%'}}></div>
                        </div>
                        £{this.state.moneyRaised>0 ? this.state.moneyRaised : '0.00'} raised of £{this.state.targetAmount} target.
                    </div>
                </div>
                {/* Icon panel: likes, comments, share button */}
                <div className="row space-apart py mt px2">
                    <div className="w-500 row"><img className="like-symbol"src={like}/><div className="pl">{this.state.noLikes}</div></div>
                    <div className="w-500 row"><img className="like-symbol"src={share}/><div className="pl">Share</div></div>
                </div>
                {/* Time since post */}
                <div className="w-300 mb2 px2">17 hour(s) ago</div>
                {/* Donate button */}
                <div className="row center px">
                    <button className="primary-button">
                        <a href={this.state.redirectUrl}>
                            Donate
                        </a>
                    </button>
                </div>
            </div>
            </div>
        </div>
        );
        }
    }
  }
}

export default ViewPost;
