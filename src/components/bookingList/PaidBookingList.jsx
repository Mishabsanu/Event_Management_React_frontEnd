import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { nonapprovalList, paidItemList } from "../../utils/Constants";
import { useSelector } from "react-redux";
import "./BookingList.scss";

const PaidBookingList = () => {
  const { user } = useSelector(({ user }) => ({ user }));
  const token = useSelector((state) => state.token);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    getBookingsList();
  }, [page]);

  const getBookingsList = () => {
    axios
      .get(`${paidItemList}${user.id}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);
      })
      .catch(handleError);
  };

  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div
      className="booking-list-container"
      style={{ backgroundColor: "white" }}
    >
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">PAID ITEM ORDER LIST</h2>
          </div>
          <div></div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Booking ID
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">
                        Item Name
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Price
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Paid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {pagination.results.length > 0 ? (
                      pagination.results.map((row) => (
                        <tr key={row.item.name}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={row?.item?.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                {/* <div className="text-sm font-medium text-gray-900">{person.event.event.name}</div> */}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <div className="text-sm text-gray-900">
                              {row.item.name}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {row.item.price}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span
                              className={`status ${
                                row.is_paid ? "pay-status" : ""
                              }`}
                            >
                              {row.is_paid ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            {/* Add your actions buttons or elements here */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pagination">
        <Button
          variant="contained"
          color="primary"
          onClick={prePage}
          disabled={!pagination.hasPrevPage}
        >
          Previous
        </Button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={nextPage}
          disabled={!pagination.hasNextPage}
        >
          Next
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaidBookingList;
