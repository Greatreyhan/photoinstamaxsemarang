import React from "react";
import { Choose, Received, Sending } from "../assets";

const Tutorial = () => {
  return (
    <div className="bg-slate-50 py-20 md:py-16">
      <h2 className="text-4xl text-amber-900 text-center font-bold">
        Tata Cara Pembelian
      </h2>
      <div className="flex flex-wrap items-center justify-center py-6 md:py-16">
        <div className="relative flex-shrink-0 max-w-xs mx-2 mb-6 mt-8 overflow-hidden bg-amber-500 shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              transform="rotate(-45 159.52 175)"
              fill="#f3c06b"
            ></rect>
            <rect
              y="107.48"
              width="152"
              height="152"
              transform="rotate(-45 0 107.48)"
              fill="#f3c06b"
            ></rect>
          </svg>
          <div className="relative flex items-center justify-center px-10 pt-10">
            <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
            <picture>
              <source srcSet={Choose} type="image/webp" />
              <source srcSet={Choose} />
              <img
                className="relative w-40 h-40"
                src={Choose}
                alt="shopping item"
              />
            </picture>
          </div>
          <div className="relative px-6 pb-6 mt-6 text-white">
            <span className="block -mb-1 opacity-75">Memilih</span>
            <div className="flex justify-between">
              <span className="block text-xl font-semibold">Produk </span>
              <span className="flex items-center px-3 py-2 text-xs font-bold leading-none text-amber-500 bg-white rounded-full">
                1
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex-shrink-0 max-w-xs mx-2 mb-6 overflow-hidden bg-amber-600 shadow-lg sm:mb-0">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              transform="rotate(-45 159.52 175)"
              fill="#f3c06b"
            ></rect>
            <rect
              y="107.48"
              width="152"
              height="152"
              transform="rotate(-45 0 107.48)"
              fill="#f3c06b"
            ></rect>
          </svg>
          <div className="relative flex items-center justify-center px-10 pt-10">
            <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
            <img className="relative w-40 h-40" src={Sending} alt="shopping" />
          </div>
          <div className="relative px-6 pb-6 mt-6 text-white">
            <span className="block -mb-1 opacity-75">Memasukkan</span>
            <div className="flex justify-between">
              <span className="block text-xl font-semibold">Gambar</span>
              <span className="flex items-center px-3 py-2 text-xs font-bold leading-none text-amber-600 bg-white rounded-full">
                2
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex-shrink-0 max-w-xs mx-2 -mb-6 overflow-hidden bg-amber-700 shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              transform="rotate(-45 159.52 175)"
              fill="#f3c06b"
              className=""
            ></rect>
            <rect
              y="107.48"
              width="152"
              height="152"
              transform="rotate(-45 0 107.48)"
              fill="#f3c06b"
              className=""
            ></rect>
          </svg>
          <div className="relative flex items-center justify-center px-10 pt-10">
            <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
            <img className="relative w-40 h-40" src={Received} alt="shopping" />
          </div>
          <div className="relative px-6 pb-6 mt-6 text-white">
            <span className="block -mb-1 opacity-75">Menerima</span>
            <div className="flex justify-between">
              <span className="block text-xl font-semibold">Barang</span>
              <span className="flex items-center px-3 py-2 text-xs font-bold leading-none text-amber-700 bg-white rounded-full">
                3
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
