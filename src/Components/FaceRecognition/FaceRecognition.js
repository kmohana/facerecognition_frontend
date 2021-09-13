import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL , box}) => {
    const style = {
        top: box.top_row+ 'px' ,
        left :box.left_col + 'px', 
        bottom: box.bottom_row + 'px',
        right: box.right_col+ 'px'
    };
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>

                    <img src ={imageURL} 
                        id = 'imageFace'
                        alt =''
                        width = '500px'
                        height = 'auto'
                        />
                    <div className = 'boundingBox' style = {style}>
                    </div>
            </div>
        </div>
    );
}

export default FaceRecognition;
