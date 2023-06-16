import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { getItemsURl } from "../../utils/Constants";
import Card from "../../components/itemCards/Card";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./itemList.scss";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> / <span>Item List</span>
    </div>
  );
};

const ItemList = () => {
  const token = useSelector((state) => state.token);
  const [items, setItems] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

  const getItems = async () => {
    try {
      const response = await axios.get(getItemsURl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          search: searchFilter,
          price: priceFilter,
          type: typeFilter,
        },
      });
      const { data } = response;
      console.log(data);
      setPagination(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [page, searchFilter, priceFilter]);

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
    setPage(1);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    setPage(1);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="item-list-wrapper" style={{backgroundColor:"white"}}>
      <Navbar />
      <div className="item-list-content-wrapper" >
        <div className="item-list-sidebar-wrapper">
          <div className="filter-section-wrapper" style={{backgroundColor:"white"}}>
            <h3>Filter</h3>
            <div className="filter-inputs">
              <input
                type="text"
                placeholder="Search by name"
                value={searchFilter}
                onChange={handleSearchChange}
              />
              <input
                type="text"
                placeholder="Filter by price"
                value={priceFilter}
                onChange={handlePriceChange}
              />
              <input
                type="text"
                placeholder="Filter by type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="item-list-main-wrapper">

          <div className="item-list-items-wrapper">
            {pagination.results
              .filter((item) =>
                item.name.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .filter((item) =>
                priceFilter ? item.price <= parseFloat(priceFilter) : true
              )
              .filter((item) =>
                typeFilter ? item.item_type.item_type === typeFilter : true
              )
              .map((item) => (
                

                <Card
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  price={item.price}
                  item_type={item.item_type.item_type}
                />
            
              ))}
          </div>
          <div className="pagination">
            <Button
              variant="contained"
              style={{backgroundColor:"black",color:"white"}}
              onClick={prePage}
              disabled={!pagination.hasPrevPage}
            >
              Prev
            </Button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="contained"
              style={{backgroundColor:"black",color:"white"}}
              onClick={nextPage}
              disabled={!pagination.hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
<br/>
<br />
      <Footer />
    </div>
  );
};

export default ItemList;
