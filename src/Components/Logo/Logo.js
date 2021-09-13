import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';
 
const Logo = () => {
    return(
        <div className ='ma3 mt0'>
            <Tilt className="Tilt tiltCss br2 shadow-2 pa3" options={{ max:50 }} style={{ height: 150, width:150 }} >
                <div className="Tilt-inner pa2"><img src={brain} alt="BrainLogo" /></div>
            </Tilt>
        </div>
    );
}

export default Logo;