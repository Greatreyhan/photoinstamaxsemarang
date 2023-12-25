import React, { useState } from 'react';
import { FIREBASE_STORE } from '../config/firebaseinit';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { MdFileUpload } from "react-icons/md";

function UploadImageAdmin({ url, setUrl, setStatus}) {
    const [progress, setProgress] = useState(0);

    const handleImageChange = (e) => {
        setStatus(true)
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
                    setStatus(false)
                },
                () => {
                    // Upload completed, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const newUrl = [...url, downloadURL]
                        setUrl(newUrl)
                        setStatus(false)
                    });
                }
            );
        }
    };

    return (
        <div className='w-full h-full flex flex-col gap-x-5 items-center justify-center flex-wrap'>
            {url ?<img className='w-full h-full object-cover rounded-lg' src={url} />
                :
                <>
                    <div className='rounded-lg flex cursor-pointer justify-center items-center h-20 w-20 border-2 border-slate-400 border-opacity-50 relative'>
                        <MdFileUpload linePlus className='absolute flex w-full h-full px-4 py-4 text-slate-400 justify-center items-center' />
                        <input style={{ opacity: '0%' }} className='text-white cursor-pointer text-sm w-full h-full' type="file" onChange={handleImageChange} />
                    </div>
                    <p className='text-sm mt-2 text-slate-400'>Masukkan Gambar</p>
                </>}
        </div>
    );
}

export default UploadImageAdmin;
