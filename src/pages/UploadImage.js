import React, { useState } from 'react';
import { FIREBASE_STORE } from '../config/firebaseinit';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(FIREBASE_STORE,`images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef,image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(snapshot)
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload completed, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // Now you can save the downloadURL to Firestore or use it as needed
          });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
}

export default ImageUpload;
