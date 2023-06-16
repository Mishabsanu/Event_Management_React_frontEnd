import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { coordiantorsEvents } from "../../utils/Constants";
import SearchEvent from "../../components/searchEvents/SearchItem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> / <span>Event List</span>
    </div>
  );
};

const CoordinatorList = () => {
  const token = useSelector((state) => state.token);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });

  const getEvents = async () => {
    const response = await axios.get(coordiantorsEvents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    });
    console.log(response.data);
    const { data } = response;
    setPagination(data);
  };

  useEffect(() => {
    getEvents();
  }, [page]);

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handlePriceSort = () => {
    if (priceSort === "asc") {
      setPriceSort("desc");
    } else {
      setPriceSort("asc");
    }
  };

  const filterEvents = (event) => {
    if (
      nameFilter &&
      !event.event.name.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }
    if (locationFilter && event.location !== locationFilter) {
      return false;
    }
    return true;
  };

  const sortEvents = (a, b) => {
    if (priceSort === "asc") {
      return a.price - b.price;
    } else if (priceSort === "desc") {
      return b.price - a.price;
    }
    return 0;
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const filteredItems = pagination.results
    .filter(filterEvents)
    .sort(sortEvents);

  return (
    <div style={{backgroundColor:"white"}}>
      <Navbar />
      <hr/>

      {/* <Breadcrumb /> */}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult" >  
            <h3 style={{paddingLeft:"20px",color:"black"}}>EVENT MANAGEMENT</h3>
            <div className="search-div" style={{paddingLeft:"20px"}}>
              <input
                type="text"
                placeholder="Search by name"
                value={nameFilter}
                onChange={handleNameChange}
                className="headerSearchInput"
              />

              <select
                value={locationFilter}
                onChange={handleLocationChange}
                className="headerSearchInput"
              >
                <option value="">Select location</option>
                <option value="calicut">calicut</option>
                <option value="kochi">kochi</option>
                {/* Add more location options */}
              </select>

              <SearchOutlinedIcon className="search-icon" />
              <div className="sort-container">
                <label>Sort by Price:</label>
                {priceSort === "asc" ? (
                  <ArrowUpwardIcon onClick={handlePriceSort} />
                ) : (
                  <ArrowDownwardIcon onClick={handlePriceSort} />
                )}
              </div>
            </div>
            {filteredItems.map((event) => (
              <SearchEvent
                key={event.id}
                id={event.id}
                name={event.event.name}
                description={event.description}
                price={event.price}
                cord={event.coordinator.username}
                date_avaliable={event.date_available}
                capacity={event.capacity}
              />
            ))}
       <div className="pagination" style={{paddingTop:"100px"}}>
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
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CoordinatorList;
