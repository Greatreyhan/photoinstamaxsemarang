import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref, remove } from 'firebase/database'
import { FaFileImage } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import Loading from './Loading'
import DetailTransaction from './DetailTransaction';
import DetailTransactionCustom from './DetailTransactionCustom';


const Custom = () => {
  const [dataItems, setDataItems] = useState([])
  const [keyItems, setKeyItems] = useState([])
  const [goods, setGoods] = useState([])
  const [goodsKey, setGoodsKey] = useState([])
  const [dataProv, setDataProv] = useState([])
  const [popUpDetail, setPopUpDetail] = useState(false)
  const [detailID, setDetailID] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "custom"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setKeyItems(key)
        setDataItems(data)
      }
    });
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setGoods(data)
        setGoodsKey(key)
      }
    });
    fetch('https://photoinstax.onrender.com/api/provinsi', {
      method: 'GET',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => {
        setDataProv(data.rajaongkir.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleEdit = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.id)
  }

  const handleDelete = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const goodid = e.currentTarget.id.split("|")[0]
    const userid = e.currentTarget.id.split("|")[1]
    console.log(goodid)

    onValue(ref(FIREBASE_DB, "user/" + userid.trim() + "/transaction"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        remove(ref(FIREBASE_DB, "user/" + userid.trim() + "/transaction/" + data.indexOf(goodid)))
          .then(() => {
          })
          .catch((error) => {
            console.log(error)
          });
      }
    });
    remove(ref(FIREBASE_DB, "custom/" + goodid))
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      });
  }

  return (
    <div className='flex justify-center mx-4'>
      {isLoading ? <Loading /> : null}
      <table className="table p-2 bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              #
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Date
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Resi
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Data
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Nomor Pemesanan
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Status
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Packaging
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Film Putih
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Film Hitam
            </th>
            <th className="border p-2 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataItems && keyItems && goods ?
            keyItems.map((key, i) => {
              return (
                <tr className="text-gray-700" key={i}>
                  <td className="border p-2 dark:border-dark-5">
                  {popUpDetail ?
                    <DetailTransactionCustom countID={detailID} keyItem={keyItems} data={dataItems} name={"null"} setPopUpDetail={setPopUpDetail} />
                    : null}
                    {i}
                  </td>
                  <td className="border p-2 text-sm dark:border-dark-5">
                    {new Intl.DateTimeFormat('en-US').format(new Date(key.slice(6) * 1000))}
                  </td>
                  <td className="border p-2 dark:border-dark-5 uppercase text-sm text-center">
                    {dataItems[key].resi ? dataItems[key].resi : "-"}
                  </td>
                  <td className="border p-2 dark:border-dark-5 text-sm w-52">
                  {dataItems[key].pengiriman.split("|")[0]} - {dataItems[key].pengiriman.split("|")[1]}
                  </td>
                  <td className="border p-2 dark:border-dark-5 uppercase text-sm">
                    {dataItems[key].pengiriman.split("|")[2]}
                  </td>
                  <td className="border p-2 dark:border-dark-5">
                    {dataItems[key].buyStatus == 0 ? <span className='text-xs px-2 py-1 bg-rose-100 rounded-full text-rose-950'>Konfirmasi</span> : dataItems[key].buyStatus == 1 ? <span className='text-xs px-2 py-1 bg-amber-100 rounded-full text-amber-950'>Dibayar</span> : dataItems[key].buyStatus == 2 ? <span className='text-xs px-2 py-1 bg-green-100 rounded-full text-green-950'>Dikirim</span> : <span className='text-xs px-2 py-1 bg-blue-100 rounded-full text-blue-950'>Selesai</span>}
                  </td>
                  <td className="border p-2 dark:border-dark-5 text-center">
                    {dataItems[key].packaging ? dataItems[key].packaging.split("|")[0]  : "-"}
                  </td>
                  <td className="border p-2 dark:border-dark-5">
                    <div className='flex flex-wrap w-36 items-center justify-center'>
                      {Array.isArray(dataItems[key].imgWhite) ? dataItems[key].imgWhite.map(ss => {
                        return (
                          <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={ss}><FaFileImage /></a>
                        )
                      })
                        : <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={dataItems[key].img}><FaFileImage /></a>}
                    </div>
                  </td>
                  <td className="border p-2 dark:border-dark-5">
                    <div className='flex flex-wrap w-36 items-center justify-center'>
                      {Array.isArray(dataItems[key].imgBlack) ? dataItems[key].imgBlack.map(ss => {
                        return (
                          <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={ss}><FaFileImage /></a>
                        )
                      })
                        : <a className='bg-amber-200 w-6 h-6 text-sm text-amber-900 flex justify-center items-center rounded-full' target="_blank" href={dataItems[key].img}><FaFileImage /></a>}
                    </div>
                  </td>
                  <td className="border p-2 dark:border-dark-5">
                    <div className='flex gap-1'>
                      <a onClick={() =>{setPopUpDetail(!popUpDetail); setDetailID(i)} } id={key + "|" + dataItems[key].userID} className='bg-blue-200 w-6 h-6 text-sm text-blue-900 flex justify-center items-center rounded-full' href={"#"}><MdEdit /></a>
                      <a onClick={handleDelete} id={key + "|" + dataItems[key].userID} className='bg-rose-200 w-6 h-6 text-sm text-rose-900 flex justify-center items-center rounded-full' href={""}><MdDelete /></a>
                    </div>
                  </td>
                </tr>
              )
            })
            : null}

        </tbody>
      </table>

    </div>
  )
}

export default Custom