import React, { useState } from 'react';
import axios from 'axios';
import { useImageContext } from '../../context/ImageContext';
import styles from './Uploader.module.css';

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addImage } = useImageContext();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !author || !theme || !description) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('author', author);
    formData.append('theme', theme);
    formData.append('description', description); 

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      addImage(response.data.fileUrl, response.data.title, response.data.theme, response.data.description);
      alert('ბლოგი გამოქვეყნდა!');
      setFile(null);
      setName('');
      setAuthor('');
      setTheme('');
      setDescription(''); 
    } catch (error) {
      setError('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className={styles.container}>
      <h2 className={styles.title}>ბლოგის ატვირთვა</h2>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <input type="file" onChange={handleFileChange} className={styles.fileInput} />
        <input type="text" value={name} onChange={handleNameChange} placeholder="შეიყვანეთ ბლოგის სათაური" className={styles.nameInput} />
        <input type="text" value={author} onChange={handleAuthorChange} placeholder="ბლოგის ავტორი" className={styles.textInput} />
        
        <select value={theme} onChange={handleThemeChange} className={styles.themeInput}>
          <option value="">აირჩიეთ თემა</option>
          <option value="sports">სპორტი</option>
          <option value="people">საზოგადოება</option>
          <option value="cars">ავტომობილები</option>
          <option value="technology">ტექნოლოგია</option>
          <option value="entertainment">გასართობი</option>
        </select>
        
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="ბლოგის აღწერა"
          className={styles.descriptionInput}
        />
        
        <button type="submit" disabled={loading} className={styles.reg}>
          {loading ? 'იტვირთება...' : 'ატვირთვა'}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default Uploader;



