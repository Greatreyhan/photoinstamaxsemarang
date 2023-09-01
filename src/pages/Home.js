import React, { useState, useEffect } from "react";
import { useFirebase } from "../FirebaseContext";
import { Link } from "react-router-dom";
import {
  HeroProduct,
  HeroProduct2,
  Polaroid1,
  Polaroid2,
  Polaroid3,
  Polaroid4,
  Polaroid5,
  Polaroid6,
  BoxWrap,
  FilmWrap,
  FrameWrap,
  MapWrap,
  StandWrap,
  Tokopedia,
  Shopee,
  Tiktok,
  HeroProduct3,
} from "../assets";
import { Tutorial } from "../components";

const Home = () => {
  const { user, signOut } = useFirebase();
  const [price, setPrice] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageShow = [
    [Polaroid1, "Dessert on Qatar, 2018"],
    [Polaroid2, "Andong Mount, 2015"],
    [Polaroid3, "Raja Ampat, 2017"],
    [Polaroid4, "Monument Valley, 2015"],
    [Polaroid5, "Grand Canyon Arizona, 2020"],
    [Polaroid6, "Dessert Road on Qatar, 2018"],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imageShow.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageShow.length]);

  if (!user) {
    return null;
  }
  return (
    <div>
      {/* Hero Image */}
      <div className="w-full bg-slate-200 py-24">
        <div className="flex items-center w-9/12 mx-auto">
          <div className="flex-1">
            <h1 className="text-amber-900 font-semibold text-4xl">
              CETAK FOTO POLAROID
            </h1>
            <p className="mt-4 text-slate-950 text-sm leading-5 tracking-wide w-96">
              Abadikan Momen Indahmu dengan Foto Polaroid Sebagai Hadiah Bagi
              Orang Yang Terkasih Dengan Biaya Yang Terjangkau Untuk Kualitas
              Maksimal.
            </p>
            <Link
              className="mt-8 inline-block text-amber-50 bg-amber-800 hover:bg-amber-900 px-6 py-2 font-semibold shadow-lg hover:shadow-none"
              to="/products"
            >
              Pesan Sekarang
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img className="drop-shadow-2xl" src={HeroProduct3} />
          </div>
        </div>
      </div>

      {/* Polaroid Detail with Changing Image */}
      <div className="w-full flex justify-between items-center">
        {/* Polaroid */}
        <div className="flex-1 bg-amber-800 py-12 flex justify-center items-center">
          <div className="w-7/12 px-8 py-8 bg-slate-100 rounded-md shadow-2xl rotate-3">
            <div className="w-full h-72">
              <img
                className="w-full h-full object-cover"
                src={imageShow[currentSlide][0]}
              />
            </div>
            <p className="my-8 text-center text-slate-900 font-semibold">
              {imageShow[currentSlide][1]}
            </p>
          </div>
        </div>
        {/* Description */}
        <div className="ml-12 flex-1">
          <h2 className="text-3xl font-bold text-amber-900">
            Pembuatan Cetak Polaroid
          </h2>
          <div className="">
            <div className="flex my-6">
              <span className="rounded-full block bg-amber-900 w-8 h-8"></span>
              <p className="ml-2 text-lg text-slate-900 font-normal">
                Kertas Foto Ukuran 86x54 mm
              </p>
            </div>
            <div className="flex my-6">
              <span className="rounded-full block bg-amber-900 w-8 h-8"></span>
              <p className="ml-2 text-lg text-slate-900 font-normal">
                Standar ISO 800 untuk menghasilkan gambar yang berkualitas
              </p>
            </div>
            <div className="flex my-6">
              <span className="rounded-full block bg-amber-900 w-8 h-8"></span>
              <p className="ml-2 text-lg text-slate-900 font-normal">
                Caption dapat dibubuhkan sesuai request
              </p>
            </div>
            <div className="flex my-6">
              <span className="rounded-full block bg-amber-900 w-8 h-8"></span>
              <p className="ml-2 text-lg text-slate-900 font-normal">
                Wrap untuk foto dapat disesuaikan dengan kebutuhan
              </p>
            </div>
            <div className="flex my-6">
              <span className="rounded-full block bg-amber-900 w-8 h-8"></span>
              <p className="ml-2 text-lg text-slate-900 font-normal">
                Edit Foto Sesuai dengan Keinginan
              </p>
            </div>
            <Link
              to="/products"
              className="bg-amber-800 hover:bg-amber-950 hover:shadow-none shadow-xl transition duration-100 mt-10 inline-block px-10 py-2 text-amber-50 font-semibold"
              onMouseEnter={() => setPrice(!price)}
              onMouseLeave={() => setPrice(!price)}
            >
              {!price ? "Rp 12.000" : "Order Now"}
            </Link>
          </div>
        </div>
      </div>

      {/* Packaging */}
      <div className="w-full mx-auto flex justify-center">
        <div className="w-5/12 ml-36 mt-10">
          <h2 className="text-4xl font-bold text-amber-900">
            Variasi
            <br /> Produk Kami
          </h2>
          <Link
            to="/products"
            className="bg-amber-800 hover:bg-amber-950 hover:shadow-none shadow-xl transition duration-100 mt-10 inline-block px-10 py-2 text-amber-50 font-semibold"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="w-7/12 flex flex-wrap justify-center">
          <Link to="/products" className="w-4/12 relative">
            <img src={BoxWrap} className="w-full h-full object-cover" />
            <span className="absolute h-full top-0 flex cursor-pointer transition-opacity duration-500 hover:opacity-100 opacity-0 justify-center items-center text-amber-50 font-semibold text-lg bg-black bg-opacity-60 w-full">
              Box Wrap
            </span>
          </Link>
          <Link to="/products" className="w-4/12 relative">
            <img src={FrameWrap} className="w-full h-full object-cover" />
            <span className="absolute h-full top-0 flex cursor-pointer transition-opacity duration-500 hover:opacity-100 opacity-0 justify-center items-center text-amber-50 font-semibold text-lg bg-black bg-opacity-60 w-full">
              Frame
            </span>
          </Link>
          <Link to="/products" className="w-4/12 relative">
            <img src={MapWrap} className="w-full h-full object-cover" />
            <span className="absolute h-full top-0 flex cursor-pointer transition-opacity duration-500 hover:opacity-100 opacity-0 justify-center items-center text-amber-50 font-semibold text-lg bg-black bg-opacity-60 w-full">
              Map Wrap
            </span>
          </Link>
          <Link to="/products" className="w-4/12 relative">
            <img src={StandWrap} className="w-full h-full object-cover" />
            <span className="absolute h-full top-0 flex cursor-pointer transition-opacity duration-500 hover:opacity-100 opacity-0 justify-center items-center text-amber-50 font-semibold text-lg bg-black bg-opacity-60 w-full">
              Acrylic Stand
            </span>
          </Link>
        </div>
      </div>

      {/* Tutorial */}
      <Tutorial />

      {/* Available At */}
      <div className="bg-amber-700 py-20">
        <h2 className="text-center font-bold text-amber-950 text-3xl">
          Kunjungi{" "}
          <span className="bg-amber-950 px-1.5 text-amber-50 h-3">
            Toko Kami
          </span>
        </h2>
        <div className="w-10/12 mx-auto flex flex-wrap justify-around mt-16">
          <a
            className="w-32 bg-amber-100 shadow-amber-950 px-5 py-5 shadow-lg"
            href="https://www.tokopedia.com/photoinstaxsemarang"
            target="_blank"
          >
            <img src={Tokopedia} />
          </a>
          <a
            className="w-32 bg-amber-100 shadow-amber-950 px-5 py-5 shadow-lg"
            href="https://shopee.co.id/photoinstaxsemarang"
            target="_blank"
          >
            <img src={Shopee} />
          </a>
          <a
            className="w-32 bg-amber-100 shadow-amber-950 px-5 py-5 shadow-lg"
            href="https://shopee.co.id/photoinstaxsemarang"
            target="_blank"
          >
            <img src={Tiktok} />
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="w-full bg-amber-900 py-12">
        <iframe
          className="w-8/12 mx-auto h-96 rounded-xl"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jl.%20Kanguru%20Utara%20IX%20No.07,%20Gayamsari,%20Kec.%20Gayamsari,%20Kota%20Semarang,%20Jawa%20Tengah%2050161+(Photo%20Instax%20Semarang)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.maps.ie/population/">
            Calculate population in area
          </a>
        </iframe>
      </div>

    </div>
  );
};

export default Home;
