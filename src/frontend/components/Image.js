import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const Image = ({url}) => {
    const [imageUri, setImageUri] = useState();
    const [error, setError] = useState();

    const fetchImage = async () => {

        try {

            let response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not OK!");

            const blob = await response.blob();
            const objectURI = URL.createObjectURL(blob);
            setImageUri(objectURI);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching image:', error);
        }
    }

    useEffect(() => {
        fetchImage();
    },[])
  return (
    <>
        {error && <p>Error: {error}</p>}
        {imageUri && <Card.Img variant="top" src={imageUri}  loading='lazy'/>}
    </>
  )
}

export default Image
