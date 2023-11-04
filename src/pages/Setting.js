import React, { useState, useEffect } from "react";
import { useFirebase } from "../FirebaseContext";
import { ProfilePict } from "../assets";
import { BiEditAlt } from "react-icons/bi";
import { onValue, ref, push } from 'firebase/database'
import { FIREBASE_DB } from '../config/firebaseinit'

const Setting = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dataPerson, setDataPerson] = useState(null)
  const [pictPerson, setPictPerson] = useState(null)
  const { user } = useFirebase();
  useEffect(() => {
    user ? setEmail(user.email) : setEmail("")
    onValue(ref(FIREBASE_DB, "user/" + user.uid), (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data)
      if(data){
      setDataPerson(data)
      setUsername(data.username)
      setPhone(data.phone)
      setAddress(data.address)
      setPictPerson(data.pict)
      }
    });
  }, [])
  const changeData = () =>{
    const data = {
      username : username,
      phone : phone,
      address : address,
      pict : pictPerson,
      email : user.email
    }
    push(ref(FIREBASE_DB, "user/" + user.uid), data)
        .then(() => {
          console.log('changed')
        })
        .catch((error) => {
          console.log(error)
        });
  }
  return (
    <div>
      {dataPerson ?
        <div className="flex w-full">
          <div className="my-8">
            <img
              className="rounded-lg m-5 w-48 h-48 object-cover object-center"
              src={dataPerson.pict}
            />
            <a className="flex items-center bg-amber-300 text-amber-900 font-semibold mx-5 justify-center py-2">
              <BiEditAlt />
              <span className="ml-2">Edit Photo Profile</span>
            </a>
          </div>
          <div className="border-l-2 border-white border-opacity-40 flex-1 mx-8">
            <h2 className="text-2xl mt-8 text-center font-semibold text-amber-50">Informasi Pengguna</h2>
            <div className="flex items-center ml-10 mt-8">
              <label for="username" className="text-amber-50 w-14">
                Nama
              </label>
              <input
                onChange={(e) => setUsername(e.currentTarget.value)}
                value={username}
                type="text"
                id="username"
                className="py-2 px-2 mx-4 border-b-4 border-amber-950 bg-amber-200 text-amber-950 placeholder-amber-900 w-72"
                name="username"
                placeholder="Your name"
              />
            </div>
            <div className="flex items-center ml-10 mt-4">
              <label for="address" className="text-amber-50 w-14">
                Alamat
              </label>
              <input
                onChange={(e) => setAddress(e.currentTarget.value)}
                value={address}
                type="text"
                id="address"
                className="py-2 px-2 mx-4 border-b-4 border-amber-950 bg-amber-200 text-amber-950 placeholder-amber-900 w-72"
                name="address"
                placeholder="Your Address"
              />
            </div>
            <div className="flex items-center ml-10 mt-4">
              <label for="email" className="text-amber-50 w-14">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                type="email"
                id="email"
                className="py-2 px-2 mx-4 border-b-4 border-amber-950 bg-amber-200 text-amber-950 placeholder-amber-900 w-72"
                name="email"
                placeholder="Your email"
              />
            </div>
            <div className="flex items-center ml-10 mt-4">
              <label for="phone" className="text-amber-50 w-14">
                No. Hp
              </label>
              <input
                onChange={(e) => setPhone(e.currentTarget.value)}
                value={phone}
                type="text"
                id="phone"
                className="py-2 px-2 mx-4 border-b-4 border-amber-950 bg-amber-200 text-amber-950 placeholder-amber-900 w-72"
                name="phone"
                placeholder="Your Phone"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={changeData} className="my-8 px-8 py-1.5 hover:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-amber-100 text-lg font-semibold text-amber-950">Simpan</button>
            </div>
          </div>
        </div>
        : null}
      <div className="border-t-2 border-white border-opacity-30"></div>
    </div>
  );
};

export default Setting;
