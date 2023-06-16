import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { getItemsURl } from "../../utils/Constants";
import SimpleImageSlider from "react-simple-image-slider";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import BasicModal from "../../components/modal/Modal";

import { ChevronLeft, ChevronRight, Heart, Share } from "lucide-react";
import "./itemdetails.scss";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> / <span>Item Details</span>
    </div>
  );
};

const ItemDetails = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [imageSlide, setImageSlide] = useState("");
  const { id, type } = useParams();

  const [items, setItems] = useState({});

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(`${getItemsURl}${type}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      }
    };

    getItems();
  }, [id, token]);

  const handleImageClick = () => {
    let imageSlide = items.imageUrl ? true : false;
    setImageSlide(imageSlide);
  };

  const { imageUrl, name, vendor, price, description } = items;

  return (
    <div style={{ backgroundColor: "white" }}>
      <br />
      <Navbar />
      <hr />
      <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
        <div className="overflow-hidden">
          <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
            <div className="items-start justify-between lg:flex lg:space-x-8">
              <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                <div className="w-full xl:flex xl:flex-row-reverse">
                  <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                    <div className="relative flex items-center justify-center">
                      <img
                        alt="Product gallery 1"
                        src="https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                        width={650}
                        height={590}
                        className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                <div className="pb-5">
                  <h1 className="text-lg font-semibold md:text-xl xl:text-2xl">
                    {name}
                  </h1>
                  <p className="mt-4 font-semibold">{price} </p>

                  <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
                    {vendor}
                  </h2>
                  <p className="text-lg font-semibold md:text-xl xl:text-2xl">
                    {items?.item_type}
                  </p>
                </div>

                <div className="pb-2" />

                <div className="pt-6 xl:pt-8">
                  <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                    Product Details:
                  </h3>
                  <p className="text-sm">
                    A chip (often just chip, or crisp in British and Irish
                    English) may be a thin slice of potato that has been either
                    deep fried or baked until crunchy. theyre commonly served as
                    a snack, side dish, or appetizer.
                  </p>
                </div>
                <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4 ">
                  <div className="item-enter">
                    <BasicModal item={name} user={user.username} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
