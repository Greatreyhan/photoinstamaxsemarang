import React, { useState } from 'react';
import { FIREBASE_STORE } from '../config/firebaseinit';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlinePlus } from 'react-icons/ai'
function ImageUpload({ url, setUrl }) {
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const storageRef = ref(FIREBASE_STORE, `images/${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}/${Math.floor(Date.now() / 1000)}`);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

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
            const newUrl = [...url, downloadURL]
            setUrl(newUrl)
          });
        }
      );
    }
  };

  return (
    <div className='w-full flex gap-x-5 items-center flex-wrap'>
      {url ?
        url.map(imgData => {
          return (
            <div className='rounded-lg flex h-20 w-20 shadow-lg'>
              <img className='w-full h-full object-cover rounded-lg' src={imgData} />
            </div>
          )
        })
        : null}
      <div className='rounded-lg flex h-20 w-20 border-2 border-amber-800 border-opacity-50 relative'>
        <AiOutlinePlus className='absolute flex w-full h-full px-4 py-4 text-amber-800 justify-center items-center' />
        <input style={{ opacity: '0%' }} className='text-white text-sm' type="file" onChange={handleImageChange} />
      </div>
      {/* <div className='flex justify-between items-center'>
        <span className='bg-amber-400 h-5 mt-2 flex justify-center text-xs items-center px-3' style={{width:progress+'%'}}>{progress}%</span>
      </div> */}
    </div>
  );
}

export default ImageUpload;
