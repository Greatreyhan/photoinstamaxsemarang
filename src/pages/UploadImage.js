import React, { useState } from 'react';
import { FIREBASE_STORE } from '../config/firebaseinit';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ImageUpload({setUrl}) {
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
        const storageRef = ref(FIREBASE_STORE,`images/${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}/${Math.floor(Date.now() / 1000)}`);
        const uploadTask = uploadBytesResumable(storageRef,e.target.files[0]);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error(error);
          },
          () => {
            // Upload completed, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL)
            });
          }
        );
    }
  };

  return (
    <div className='w-full flex-col items-center'>
      <div>
      <input className='text-white text-sm' type="file" onChange={handleImageChange} />
      </div>
      <div className='flex justify-between items-center'>
        <span className='bg-amber-400 h-5 mt-2 flex justify-center text-xs items-center px-3' style={{width:progress+'%'}}>{progress}%</span>
      </div>
    </div>
  );
}

export default ImageUpload;
