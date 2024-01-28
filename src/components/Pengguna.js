import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, remove } from 'firebase/database'
import { MdEdit, MdDelete } from "react-icons/md";

const Pengguna = () => {
  const [dataUser, setDataUser] = useState([])
  const [keyUser, setKeyUser] = useState([])
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "user"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setDataUser(data)
        setKeyUser(key)
        console.log(data)
      }
    });
  }, [])
  const handleDelete = (e)=>{
    e.preventDefault()
    remove(ref(FIREBASE_DB, "user/" + e.currentTarget.id))
    .then(() => {
    })
    .catch((error) => {
      console.log(error)
    });
  }
  return (
    <div>
      <div className="container  px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      User
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Phone
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Address
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser && keyUser ?
                    keyUser.map(list => {
                      return (
                        <tr>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="relative block">
                                  <img alt="profil" src={dataUser[list].pict} className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {dataUser[list].username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser[list].email}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser[list].phone}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                              {dataUser[list].address}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <a onClick={handleDelete} id={list} className='bg-rose-200 w-6 h-6 mx-auto text-sm text-rose-900 flex justify-center items-center rounded-full' ><MdDelete /></a>
                          </td>
                        </tr>
                      )
                    })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Pengguna