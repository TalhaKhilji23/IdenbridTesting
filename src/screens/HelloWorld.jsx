// src/screens/HelloWorld.js
import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { StorageImage } from '@aws-amplify/ui-react-storage';
const HelloWorld = () => {
  const [file, setFile] = useState(null);
  const [picKey, setPicKey] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadImage = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    try {
      const result = await Storage.put(file.name, file, {
        contentType: file.type, // Use the file's MIME type
      });
      console.log("File uploaded successfully",result.key);
      setPicKey(result.key);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div>
      <h1>Upload File to S3</h1>
      <StorageImage imgKey={picKey|| 'UserAvatar.png'} />
      <input type="file" onChange={handleChange} />
      <button type="button" onClick={uploadImage}>Submit</button>
    </div>
  );
};

export default HelloWorld;
