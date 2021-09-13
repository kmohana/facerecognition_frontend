import React from 'react';
import './ImageLinkForm.css';
 
const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className ='f3'>
                {'This Magic Brain will detect faces in your pictures. Try now!!'}
            </p>
            <div className ='center'>
                <div className = 'pa4 form center br4 shadow-5'>
                    <input 
                        className= 'f6 pa2 w-70 center' 
                        type ='text' 
                        placeholder='URL' 
                        onChange ={onInputChange}
                    />
                    <button 
                        className ='f6 link ph3 pv2 dib white b--light-purple bg-light-purple grow w-30' 
                        onClick = {onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;