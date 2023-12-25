
import React, { useContext } from 'react';
import { uploadContext } from '../Context/Context';
import './Post.css'
import user from '../Posts/Assets/winkboy.png'
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Posts() {
  const { image,filteredImages } = useContext(uploadContext);

  if (!image) {
    return <p>Loading...</p>;
  }

  console.log('Images:', image); 

  return (
    <div className='row post-main'>
  <h2>Business</h2>
    <div className="image-upload col-lg-9 ">
    
      {filteredImages.map((item) => (
        <div className="image-show" key={item._id}>
        
          <img
            className='post-image img-fluid'
            src={`http://localhost:1000/files/${item.image}`}
            alt="post"
            height={180}
            width={300}
          />
            <p className='post-title'>{item.title}</p>
          {/* <p className='post-info'>@{item.info}</p> */}
        </div>
      ))}
    </div>
    <div className='sidebar col-lg-3 '>
      <img className='user-img' src={user} alt='user'/>
      <p className='user-info'  >Ragul M</p>
      <div>
        <p className='User-info' >I'm a Mernstack Developer</p>
        <p className='User-info'>So this is my Blog page project where it connect both frontend and backend frameworks.
        </p>
        <p className='User-info'>Follow Me </p>
        <div>
<FaLinkedin className='icon' />
<FaInstagram  className='icon' />
<FaGithub  className='icon' />
        </div>

      </div>
    </div>
    </div>
  
  );
}
