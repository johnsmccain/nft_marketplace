import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Image = ({url}) => {
    const [imageUri, setImageUri] = useState();
    const [error, setError] = useState();

    const fetchImage = async () => {

        try {

            let response = await axios.get(url);
            if (!response.ok) throw new Error("Network response was not OK!");

            console.log(response)
            const blob = await response.blob();
            console.log(blob)
            const objectURI = URL.createObjectURL(blob);
            console.log(objectURI)
            setImageUri(objectURI);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching image:', error);
        }
    }

    useEffect(() => {
        fetchImage();
    })
  return (
    <>
        {error && <p>Error: {error}</p>}
        {imageUri && <Card.Img variant="top" src={imageUri}  loading='lazy'/>}
    </>
  )
}

export default Image
