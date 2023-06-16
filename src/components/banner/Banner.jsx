import React from "react";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:px-3">
        <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
          <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            People who really cares about their Events
          </h1>
          <div className="mt-10 flex justify-between max-w-max">
  <Link to="/eventlist">
    <div
      className="flex items-center space-x-2 rounded-full border p-2 shadow-xl"
      style={{ marginLeft: "300px" }}
    >
      <p className="text-xs font-medium md:text-sm">
        <b>EVENT MANAGEMENT</b>
        <span className="ml-2 cursor-pointer font-bold" style={{ color: "blue" }}>
  Read More &rarr;
</span>

      </p>
    </div>
  </Link>
  <Link to="/itemList">
    <div
      className="flex items-center space-x-2 rounded-full border p-2 shadow-xl"
      style={{ marginLeft: "150px" }}
    >
      <p className="text-xs font-medium md:text-sm">
      <b>ITEM SUPPLIERS</b>
        <span className="ml-2 cursor-pointer font-bold"  style={{ color: "blue" }}>
          Read More &rarr;
        </span>
      </p>
    </div>
  </Link>
</div>


{/*  
          <div className="mt-8">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Subscribe
            </button>
          </div> */}
        </div>
        <div className="rounded-lg bg-gray-200 p-4">
          <img
            className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[400px]"
            src="https://static.mywebsites360.com/d3536c889e90455b8c18f12a5d7c8646/i/c3b01bf9e4234257bcd458794a78c5b6/1/4SoifmQpDrHbZJ6W73K2k/Hydrangea_s%20on%20the%20Beach%20%25281%2529.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
