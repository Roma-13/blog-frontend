import React from 'react';
import { useParams } from 'react-router-dom';
import { useImageContext } from '../../context/ImageContext'; 
import styles from './blog.module.css';

const Blog = () => {
  const { id } = useParams(); 
  const { images } = useImageContext();

  const parsedId = parseInt(id, 10);

  console.log('ID:', parsedId);
  console.log('Images:', images);

  const image = images.find((img, index) => index === parsedId);

  if (!image) {
    return <div>ბლოგი ვერ მოიძებნა</div>;
  }

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
      </nav>

      <div className={styles.blogContainer}>
        <h1>{image.title}</h1>
        <p>ავტორი: {image.author}</p>
        <img src={image.src} alt={image.title} className={styles.blogImage} />
        <p className={styles.description}>{image.description}</p> 
      </div>
    </div>
  );
};

export default Blog;
