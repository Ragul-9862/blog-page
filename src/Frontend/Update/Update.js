import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Update() {
    const { imageId } = useParams();
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (imageId) {
          const response = await axios.get(`http://localhost:1000/get-image/`+imageId);
          const imageData = response.data;
          setTitle(imageData.title);
          setInfo(imageData.info);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchData();
  
  }, [imageId]);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('info', info);
      formData.append('image', file);
  
      const response = await axios.put(
        `http://localhost:1000/update-image/${imageId}`, // Correct the URL
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data) {
        alert('Image Updated Successfully!!!');
      }
  
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea rows={5} cols={5} value={info} onChange={(e) => setInfo(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleFileChange} value={file} />
      <button className="btn btn-warning" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}
