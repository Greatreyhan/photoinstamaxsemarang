import React,{useEffect, useState} from 'react'
const PopupBuy = ({Name,setPopBuy}) => {
  const [dataProv,setDataProv] = useState([])
  const [dataCity, setDataCity] = useState([])
  const [dataCourier, setDataCourier] = useState(['jne','pos','tiki'])
  const [dataOption, setDataOption] = useState([])
  const [selectedProv, setSelectedProv] = useState(0)
  const [selectedCity, setSelectedCity] = useState(1)
  const [selectedCourier, setSelectedCourier] = useState('jne')
  const [selectedOption, setSelectedOption] = useState("")
  const [originCity, setOriginCity] = useState(399)
  const [weight, setWeight] = useState(1000)
  useEffect(() => {
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
        setDataProv(data.rajaongkir.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    fetch('http://localhost:4000/api/kota/1', {
        method: 'GET',
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          return resp.json();
        })
        .then((data) => {
          setDataCity(data.rajaongkir.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
    });
  }, []);

  const handleProv = (e) =>{
    setSelectedProv(e.target.value)
    fetch('http://localhost:4000/api/kota/'+e.target.value, {
        method: 'GET',
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          return resp.json();
        })
        .then((data) => {
          setDataCity(data.rajaongkir.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
    });
  }

  const handleCity = (e) =>{
    setSelectedCity(e.target.value)
  }
  const handleCourier = (e) =>{
    setSelectedCourier(e.target.value)
    fetch(`http://localhost:4000/api/ongkos/${originCity}/${selectedCity}/${weight}/${e.target.value}`, {
        method: 'GET',
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          return resp.json();
        })
        .then((data) => {
          console.log(data.rajaongkir.results)
          setDataOption(data.rajaongkir.results[0]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
    });
  }

  return (
    <div className='w-full h-screen bg-white fixed left-0 top-0 flex justify-center items-center'>
      <select onChange={handleProv} name="Provinsi">
        {dataProv ? dataProv.map(prov=>{
          return(<option value={prov.province_id} key={prov.province_id}>{prov.province}</option>)
        }) : null }
      </select>
      <select onChange={handleCity} name="Kota">
        {dataCity ? dataCity.map(city=>{
          return(<option value={city.city_id} key={city.city_id}>{city.type} {city.city_name}</option>)
        }) : null }
      </select>
      <select onChange={handleCourier} name="choice">
        {dataCourier ? dataCourier.map((courierList,i)=>{
          return(<option value={courierList} key={i}>{courierList}</option>)
        }) : null }
      </select>
      <select onChange={(e)=>selectedOption(e.target.value)} name="choice">
        {dataOption.costs ? dataOption.costs.map((option,i)=>{
          return(<option value={option.service} key={i}>{option.service}-{option.description}-{option.cost[0].value}-{option.cost[0].etd}</option>)
        }) : null }
      </select>
    </div>
  )
}

export default PopupBuy