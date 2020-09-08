import React from 'react';

import bear from '../img/pink_bear.png';

export default function FundderNav(){
    return(
        <div className="navbar center-vertically">
            <img className="navbar-bear" src={bear}></img>
            <div className="pl w-500 nav-title">Fundder</div>
        </div>
    )
}