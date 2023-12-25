import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { uploadContext } from "../../components/Context/Context";

export default function Fileuploads() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [info, setInfo] = useState("");

  const { image, setImage } = useContext(uploadContext);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:1000/get-files");
      console.log("Response:", response);
      setImage(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);
    formData.append("info", info);

    try {
      const response = await axios.post(
        "http://localhost:1000/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        alert("Uploaded Successfully!!!");

        getImage();
      }

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log(`Deleting image with ID: ${id}`);
      const response = await axios.delete(
        `http://localhost:1000/delete-image/${id}`
      );
      console.log("Delete response:", response.data);
      getImage();
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error.response.data);
      alert("Error deleting image");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handlesubmit} className="formStyle">
        <label>
          Title:
          <input
            className="form-control"
            type="text"
            placeholder="Enter the Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
{/* 
        <label>
          Info:
          <textarea
            rows={5}
            cols={50}
            onChange={(e) => setInfo(e.target.value)}
          />
        </label> */}

        <label>
          Choose Image:
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </form>

      <div className="image-upload">
        {image == null
          ? ""
          : image.map((item) => (
              <div className="image-show" key={item._id}>
                <p>{item.title}</p>
                <p>{item.info}</p>
                <img
                  src={`http://localhost:1000/files/${item.image}`}
                  alt="image"
                  height={300}
                  width={300}
                />
                <Link to={`/update/${item._id}`}>
                  <button className="btn btn-warning">Update</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
