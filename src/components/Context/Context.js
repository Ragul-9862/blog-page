import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const uploadContext = createContext();

export default function Context({ children }) {
  const [image, setImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = image.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:1000/get-files");
      console.log("Response:", response);
      setImage(response.data.data || []); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <uploadContext.Provider
        value={{
          image,
          setImage,
          filteredImages,
          searchQuery,
          setSearchQuery,
        }}
      >
        {children}
      </uploadContext.Provider>
    </div>
  );
}
