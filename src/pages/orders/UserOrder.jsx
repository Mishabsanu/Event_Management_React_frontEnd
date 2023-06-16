// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "../../utils/axios";
// import { itemUserBooking } from "../../utils/Constants";
// import "./order.scss";

// const ItemOrder = ({ orders }) => {
//   return (
//     <div>
//       <h2>User Item Orders</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Item</th>
//             <th>Quantity</th>
//             <th>Approved</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders ? (
//             orders.results?.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.item.vender}</td>
//                 <td>{order.item.name}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.is_approved ? "true" : "false"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No item orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const EventOrder = ({ eventOrder }) => {
//   return (
//     <div>
//       <h2>User Event Orders</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Coordinator Name</th>
//             <th>Event</th>
//             <th>Date Booked</th>
//             <th>Approved</th>
//           </tr>
//         </thead>
//         <tbody>
//           {eventOrder ? (
//             eventOrder.results?.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.event.coordinator.username}</td>
//                 <td>{order.event.event.name}</td>
//                 <td>{order.date_booked}</td>
//                 <td>{order.is_approved ? "true" : "false"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No event orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const UserOrder = () => {
//   const user = useSelector((state) => state.user);
//   const [orders, setOrders] = useState([]);
//   const [eventOrder, setEventOrder] = useState([]);

//   const getEventOrders = () => {
//     axios
//       .get(`${itemUserBooking}${user.id}`)
//       .then((response) => {
//         setEventOrder(response.data);
//       })
//       .catch((error) => {
//         if (
//           error.response &&
//           error.response.status >= 400 &&
//           error.response.status <= 500
//         ) {
//           console.log(error.response.data.message);
//         }
//       });
//   };

//   useEffect(() => {
//     getUserOrders();
//     getEventOrders();
//   }, []);

//   return (
//     <div className="user-order">
//       <div className="order-div">
//         <ItemOrder orders={orders} />
//         <EventOrder eventOrder={eventOrder} />
//       </div>
//     </div>
//   );
// };

// export default UserOrder;
