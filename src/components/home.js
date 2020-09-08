import React, { Component } from 'react';
import '../App.css';

import bear from '../img/pink_bear.png';

function App() {
    return(
        <div>
            <div class="row center bear-container">
                <img className="bear-pic" src={bear}></img>
            </div>
        </div>
    )
}

export default App;
