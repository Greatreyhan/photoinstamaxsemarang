import React from "react";
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
} from "../assets";

const Home = () => {
  const { user, signOut } = useFirebase();

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
            <img className="drop-shadow-2xl" src={HeroProduct2} />
          </div>
        </div>
      </div>

      {/* Polaroid Detail with Changing Image */}
      <div className="w-full flex justify-between items-center">
        {/* Polaroid */}
        <div className="flex-1 bg-amber-800 py-12 flex justify-center items-center">
          <div className="w-7/12 px-8 py-8 bg-slate-100 rounded-md shadow-2xl rotate-3">
            <div className="w-full h-72">
            <img className="w-full h-full object-cover" src={Polaroid1} />
            </div>
            <p className="my-8 text-center text-slate-900 font-semibold">Trip to Maroko, 2022</p>
          </div>
        </div>
        {/* Description */}
        <div className="ml-12 flex-1">
        <h2 className="text-3xl font-semibold text-amber-900">Pembuatan Cetak Polaroid</h2>
        <div className="">
          <div className="flex my-6"><span className="rounded-full block bg-amber-900 w-8 h-8"></span><p className="ml-2 text-lg text-slate-900 font-normal">Kertas Foto Ukuran 8x12 cm</p></div>
          <div className="flex my-6"><span className="rounded-full block bg-amber-900 w-8 h-8"></span><p className="ml-2 text-lg text-slate-900 font-normal">Cetak dengan Kualitas Terbaik</p></div>
          <div className="flex my-6"><span className="rounded-full block bg-amber-900 w-8 h-8"></span><p className="ml-2 text-lg text-slate-900 font-normal">Caption dapat dibubuhkan sesuai request</p></div>
          <div className="flex my-6"><span className="rounded-full block bg-amber-900 w-8 h-8"></span><p className="ml-2 text-lg text-slate-900 font-normal">Wrap untuk foto dapat disesuaikan dengan kebutuhan</p></div>          
        </div>
        </div>
      </div>

      {/* Packaging */}

      {/* Available At */}

      {/* Tutorial */}
    </div>
  );
};

export default Home;
