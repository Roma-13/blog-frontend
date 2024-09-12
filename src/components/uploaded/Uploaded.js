import React, { useEffect } from 'react';
import axios from 'axios';
import { useImageContext } from '../../context/ImageContext'; 
import styles from './uploaded.module.css'; 

const Uploaded = () => {
  const { images, setImages } = useImageContext();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [setImages]);

  return (
    
    <div>
      
      <h2>Uploaded Images</h2>
      <div className={styles.imageContainer}>
        <div className={styles.cardContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.card}>
              <img src={image.src} alt={`uploaded-${index}`} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3>{image.title}</h3>
                <p>{image.author}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uploaded;
