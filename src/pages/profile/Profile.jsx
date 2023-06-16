
import React from "react";
import styled from "styled-components";
import UserOrder from "../orders/UserOrder";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";

const Profiles = () => {
  const { user } = useSelector(({ user }) => ({ user }));

  return (
   <div style={{backgroundColor:"white"}}>
      <Navbar />
    <hr/>
    <br/>
      <Container style={{backgroundColor:"white"}}>
        <ProfileDetails style={{backgroundColor:"white",border:"solid .5px"}}>
          <UserImage>
            <img
              className="user-image-img"
              src="https://www.wearepay.uk/wp-content/uploads/2018/06/anna_bradley-500x500.jpg"
              alt="User"
            />
          </UserImage>
          <div className="user-details">
            <h2>{user?.username}</h2>
            <p>UserName: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>
              Phone Number: {user?.phone_number ? user?.phone_number : "12345678"}
            </p>
          </div>
        </ProfileDetails>
      </Container>
      <br/>
      <Footer />
      
   </div>
  
  );
};

export default Profiles;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;

  h2 {
    font-size: 24px;
    margin-top: 0;
    text-transform: uppercase;
    padding-left: 5px;
  }

  p {
    margin-bottom: 10px;
  }

  .user-details {
    margin-top: 20px;
    text-align: center;
  }
`;

const UserImage = styled.div`
  img {
    max-width: 300px;
    width:80px
    height: 300px;
    display: block;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    object-fit: contain;
  }
`;

const UserOrdersRow = styled.div`
  flex: 1;
`;

const UserOrders = styled.div`
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    th {
      text-align: left;
      background-color: #f2f2f2;
    }
  }
}`;
