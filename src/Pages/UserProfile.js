import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import config from "../environment";
function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const authToken = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/UsersController/GetUser`, {
        headers:headers
      })
      .then((response) => {
        setUserData(response.data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-9">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>User Profile</h4>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <img src="https://via.placeholder.com/150" alt="User Avatar" className="rounded-circle" />
              </div>
              <h2 className="text-center mb-3">
                {userData.firstName} {userData.lastName}
              </h2>
              <hr />
              <div className="row">
                <div className="col-md-6 d-flex justify-content-start">
                  <h3 className="text-primary">Personal Details</h3>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <button className="btn btn-primary" >
                    <i className="fa fa-edit"></i>Edit
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phoneNo}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Gender:</strong> {userData.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {userData.postalCode}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Country:</strong> {userData.countryMasters?.country}
                  </p>
                  <p>
                    <strong>State:</strong> {userData.stateMaster?.state}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Category:</strong> {userData.categoryMaster?.categoryName}
                  </p>
                </div>
                <div className="col-md-6"></div>
              </div>
              <hr />
              <h3 className="text-primary">Other Details</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
