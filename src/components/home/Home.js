import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { useImageContext } from '../../context/ImageContext'; 
import styles from './home.module.css';

const Home = () => {
  const { images, setImages } = useImageContext();
  const [filter, setFilter] = useState(''); 

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredImages = images.filter((image) => filter === '' || image.theme === filter);

  return (
    <div>
      <div className={styles.logo}>
        <img
          src="https://blogs.netgazeti.ge/wp-content/themes/netgazeti/images/logo-03.png"
          alt="Logo"
        />
      </div>

      <nav className={styles.navbar}>
        <div className={styles.leftSection}>
          <ul>
            <li><a href="/">{'მთავარი'}</a></li>
            <li><a href="/">{'ჩვენს შესახებ'}</a></li>
            <li><a href="/">{'კონტაქტი'}</a></li>
            <li><a href="/uploader">{'ატვირთვა'}</a></li>
          </ul>
        </div>

        <select value={filter} onChange={handleFilterChange} className={styles.filterDropdown}>
          <option value="">ყველა თემა</option>
          <option value="sports">სპორტი</option>
          <option value="people">საზოგადოება</option>
          <option value="cars">ავტომობილები</option>
          <option value="technology">ტექნოლოგია</option>
          <option value="entertainment">გასართობი</option>
        </select>
      </nav>

      <div className={styles.imageContainer}>
        <div className={styles.cardContainer}>
          {filteredImages.length === 0 ? (
            <p>მონაცემი ვერ მოიძებნა.</p> 
          ) : (
            filteredImages.map((image, index) => (
              <div key={index} className={styles.card}>
                <img src={image.src} alt={`uploaded-${index}`} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3>
                    <Link to={`/blog/${index}`}>
                      {image.title}
                    </Link>
                  </h3>
                  <p>{image.author}</p>
                  <p className={styles.uploadTime}>{new Date(image.uploadTime).toLocaleDateString()}</p> 
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
