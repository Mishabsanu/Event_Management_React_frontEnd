// import React from "react";
// import "./card.scss";
// import { Link } from "react-router-dom";

// const Card = (props) => {
//   const formatIndianRupees = (price) => `₹ ${price}`;

//   return (
//     <div className="card">
//       <img src={props.imageUrl} alt="Nike-Shoe" className="sneaaker-img" />
//       <h1 className="title">{props.name}</h1>
//       <div className="price-box">
//       {props.price}
//       </div>
//       <Link to={`/itemList/${props.item_type}/${props.id}`}>
//         <div className="button-box">
//           <button className="purchase">VIEW NOW</button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import { Star, ChevronDown } from "lucide-react";

const Card = (props) => {
  const formatIndianRupees = (price) => `₹ ${price}`;
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-xl px-5 py-10">
        <div
          className="mx-auto flex flex-wrap items-center lg:w-full p-4"
          style={{ border: "1px solid lightgray", borderRadius: "12px" }}
        >
          <img
            alt="Nike Air Max 21A"
            className="h-80 rounded object-cover lg:h-50 w-full"
            src={props.imageUrl}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-4/5 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              {props.item_type}
            </h2>
            <h1 className="my-5 text-3xl font-semibold text-black">
              {props.name}
            </h1>
            <p className="leading-relaxed">
              {props.description
                ? `${props.description.split(" ").slice(0, 30).join(" ")}...`
                : ""}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="title-font text-xl font-bold text-gray-900">
                ₹{props ? Math.floor(props.price).toLocaleString("en-IN") : ""}
              </span>
              <Link to={`/itemList/${props.item_type}/${props.id}`}>
                <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  VIEW ITEM
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
