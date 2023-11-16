import React, {useState, useEffect} from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'
import { FaFileImage } from "react-icons/fa";


const Pesanan = () => {
  const [dataItems, setDataItems] = useState([])
  const [keyItems, setKeyItems] = useState([])
  const [goods, setGoods] = useState([])
  const [dataProv, setDataProv] = useState([])
  const [dataCity, setDataCity] = useState([])
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "transactions"), (snapshot) => {
      const data = snapshot.val();
      if(data) {
        const key = Object.keys(data)
        setKeyItems(key)
        setDataItems(data)
      }
    });
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if(data) {
        const key = Object.keys(data)
        setGoods(data)
      }
    });
    fetch('http://localhost:4000/api/provinsi', {
      method: 'GET',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data)
        setDataProv(data.rajaongkir.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      const cityPromises = [];

      for (let i = 1; i <= 34; i++) {
        const promise = fetch(`http://localhost:4000/api/kota/${i}`, {
          method: 'GET',
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error('Network response was not ok');
            }
            return resp.json();
          })
          .then((data) => data.rajaongkir.results)
          .catch((error) => {
            console.error('Error fetching data:', error);
            return null; // or handle the error in a way that fits your use case
          });
      
        cityPromises.push(promise);
      }
      
      Promise.all(cityPromises)
        .then((results) => {
          const filteredResults = results.filter((result) => result !== null);
          setDataCity(filteredResults);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  },[])
  return (
    <div className='flex justify-center mx-4'>{console.log(dataCity)}
      <table className="table p-2 bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              #
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Resi
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Produk
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Alamat
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Kurir
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Status
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Harga
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Packaging
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Gambar
            </th>
          </tr>
        </thead>
        <tbody>
          {dataItems && keyItems && goods ?
          keyItems.map((key,i)=>{
            return(
              <tr className="text-gray-700" key={i}>
              <td className="border p-2 dark:border-dark-5">
                {i}
              </td>
              <td className="border p-2 text-sm dark:border-dark-5">
                {key}
              </td>
              <td className="border p-2 dark:border-dark-5">
                {Array.isArray(dataItems[key].produkID) ? "Paket" : goods[parseInt(dataItems[key].produkID)].title}
              </td>
              <td className="border p-2 dark:border-dark-5 text-sm">
                {dataItems[key].alamat}
              </td>
              <td className="border p-2 dark:border-dark-5 uppercase">
                {dataItems[key].kurir } | {dataItems[key].pengiriman }
              </td>
              <td className="border p-2 dark:border-dark-5">
                {dataItems[key].buyStatus == 0 ? <span className='text-xs px-2 py-1 bg-rose-100 rounded-full text-rose-950'>Konfirmasi</span> : dataItems[key].buyStatus == 1 ? <span className='text-xs px-2 py-1 bg-amber-100 rounded-full text-amber-950'>Dibayar</span> : dataItems[key].buyStatus == 2 ? <span className='text-xs px-2 py-1 bg-green-100 rounded-full text-green-950'>Dikirim</span>:<span className='text-xs px-2 py-1 bg-blue-100 rounded-full text-blue-950'>Selesai</span>}
              </td>
              <td className="border p-2 dark:border-dark-5">
                {dataItems[key].price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0,-3) }
              </td>
              <td className="border p-2 dark:border-dark-5">
                {dataItems[key].packaging.split("|")[0]}
              </td>
              <td className="border-t p-2 dark:border-dark-5 flex flex-wrap h-full">
              {Array.isArray(dataItems[key].img) ?  dataItems[key].img.map(ss=>{
                return(
                  <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={ss}><FaFileImage /></a>
                )
              })
              : <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={dataItems[key].img}><FaFileImage /></a>}          
              </td>
            </tr>
            )
          })
          :null}

        </tbody>
      </table>

    </div>
  )
}

export default Pesanan