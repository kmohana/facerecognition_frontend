import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return (
            <nav style = {{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signOut')} className = 'f3 link underline pa3 dim white pointer'>SignOut</p>
            </nav>
        );
    }
    else{
        return (
            <nav style = {{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signIn')} className = 'f3 link underline pa3 dim white pointer'>SignIn</p>
                <p onClick={() => onRouteChange('register')} className = 'f3 link underline pa3 dim white pointer'>Register</p>
            </nav>
        );
    }
    
}

export default Navigation;