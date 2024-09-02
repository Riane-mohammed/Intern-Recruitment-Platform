import React, { useState, useEffect } from 'react';

const ImageComponent = ({ imagePath, alt }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (imagePath) {
            setImageUrl(`./src/Assets/${imagePath}`);
        }
    }, [imagePath]);

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt={alt} />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
};

export default ImageComponent;
