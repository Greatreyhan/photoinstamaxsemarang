import React, { useState } from 'react';
import { FIREBASE_STORE } from '../config/firebaseinit';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
function ImageUpload({ url, setUrl, setIsLoading, setType, setMsg }) {
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    setIsLoading(true)
    // Define allowed file extensions
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'heic'];
    if (e.target.files[0]) {
      // Extract file extension by finding the last dot in the file name
      const lastDotIndex = e.target.files[0].name.lastIndexOf('.');
      const fileExtension = lastDotIndex !== -1 ? e.target.files[0].name.slice(lastDotIndex + 1).toLowerCase() : '';
      const storageRef = ref(FIREBASE_STORE, `images/${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}/${Math.floor(Date.now() / 1000)}.${fileExtension}`);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

      if (allowedExtensions.includes(fileExtension)) {
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
            const newUrl = [...url, (downloadURL+"."+fileExtension)]
            setUrl(newUrl)
            setIsLoading(false)
          });
        }
      );
      }
      else{
        setIsLoading(false)
        setType(3)
        setMsg("Ekstensi gambar yang diunggah salah!")
      }
    }
  };

  const handleDelete = (e) => {
    const urlID = e.currentTarget.id
    const newUrl = [...url]
    newUrl.splice(newUrl.indexOf(urlID), 1)
    setUrl(newUrl)
    const pathStartIndex = urlID.indexOf('/o/') + 3;
    const pathEndIndex = urlID.indexOf('?alt=media');
    const filePath = urlID.substring(pathStartIndex, pathEndIndex);
    const storageRef = ref(FIREBASE_STORE, decodeURIComponent(filePath));
    deleteObject(storageRef).then(() => {
    }).catch((error) => {
      console.log("Terjadi Error: ", error)
    })
  }

  return (
    <div className='w-full flex gap-x-5 items-center flex-wrap'>
      {url ?
        url.map((imgData, i) => {
          return (
            <div key={i} className='rounded-lg flex h-20 w-20 shadow-lg relative'>
              <AiOutlineClose id={imgData} onClick={(e) => handleDelete(e)} className='w-5 h-5 px-1 py-1 bg-rose-500 text-white font-bold -right-2 cursor-pointer -top-2 rounded-full absolute' />
              <img className='w-full h-full object-cover rounded-lg' src={imgData} />
            </div>
          )
        })
        : null}
      <div className='rounded-lg flex h-20 w-20 border-2 border-amber-800 border-opacity-50 relative'>
        <AiOutlinePlus className='absolute flex w-full h-full px-4 py-4 text-amber-800 justify-center items-center' />
        <input style={{ opacity: '0%' }} className='text-white text-sm w-full h-full cursor-pointer' type="file" onChange={handleImageChange} />
      </div>
    </div>
  );
}

export default ImageUpload;
