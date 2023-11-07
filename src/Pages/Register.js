import React, { useState, useEffect } from "react";
import config from "../environment";
import { toast } from "react-toastify";
import axios from "axios";
import "./Register.css";
import RegistrationForm from "./RegistrationForm";
import UpdateRegistration from "./UpdateRegistration";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableSortLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Register() {
  const [dataSource, setDataSource] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const displayedColumns = [
    "First Name",
    "Last Name",
    "Email",
    "Country",
    "State",
    "Category",
    "Actions",
  ];
  const authToken = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showActivateConfirmation, setShowActivateConfirmation] =
    useState(false);
  const [activateUserId, setActivateUserId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedRegisterUser, setSelectedRegisterUser] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
const [userToUpdate, setUserToUpdate] = useState(null);
const openUpdateDialog = (user) => {
  if(user){
  setUserToUpdate(user);
  setShowUpdateDialog(true);}
};
const closeUpdateDialog = () => {
  setUserToUpdate(null);
  setShowUpdateDialog(false);
};
const handleUpdate = (updatedUserData) => {
  const requestData = {
    registerId:updatedUserData.registerId,
    firstName: updatedUserData.firstName,
    lastName: updatedUserData.lastName,
    email: updatedUserData.email,
    phoneNo: updatedUserData.phoneNo,
    gender: updatedUserData.gender,
    dateOfBirth: new Date(updatedUserData.dateOfBirth),
    address: updatedUserData.address,
    state: updatedUserData.state,
    country: updatedUserData.country,
    postalCode: updatedUserData.postalCode,
    categoryId: updatedUserData.categoryId,
    stateMaster: null,
    countryMasters: null,
    categoryMaster: null,
    createdBy: updatedUserData.createdBy,
    updatedBy: updatedUserData.updatedBy,
    createdOn: updatedUserData.createdOn,
    updatedOn: updatedUserData.updatedBy,
    statusFlag: updatedUserData.statusFlag,
  };
  axios
    .put(`${config.baseApiUrl}/api/RegisterUserController/UpdateRegisteredUser`, requestData, {
      headers: headers,
    })
    .then((response) => {
      toast.success("User data updated successfully");
      closeUpdateDialog();
    })
    .catch((error) => {
      toast.error("Failed to update user data: " + error.message);
    });
  closeUpdateDialog();
};
  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const openDeleteConfirmation = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteConfirmation(true);
  };
  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.baseApiUrl}/api/RegisterUserController/GetAll`,
        {
          headers: headers,
        }
      );
      setDataSource(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDelete = () => {
    fetch(
      `https://localhost:7100/api/RegisterUserController/DeleteRegisteredUser`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteUserId),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          fetchData();
          toast.success("User deleted successfully");
        } else {
          console.log("Unexpected response:", response);
          toast.success("User deleted successfully");
          closeDeleteConfirmation();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting role");
        closeDeleteConfirmation();
      });
    closeDeleteConfirmation();
  };
  const openUserDetailsModal = (user) => {
    setSelectedRegisterUser(user);
    setShowViewDialog(true);
  };
  const closeViewDialog = () => {
    setSelectedRegisterUser(null);
    setShowViewDialog(false);
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (!isNaN(date)) {
      return date.toLocaleDateString();
    }
    return "N/A";
  };
  const openActivateConfirmation = (userId) => {
    setActivateUserId(userId);
    setShowActivateConfirmation(true);
  };

  const closeActivateConfirmation = () => {
    setShowActivateConfirmation(false);
  };
const openEditUser=()=>{}
  const confirmActivation = () => {
    fetch(
      `https://localhost:7100/api/RegisterUserController/UpdateUserStatus`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activateUserId),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success("User activated successfully");
          fetchData();
          closeActivateConfirmation();
        } else {
          toast.success("User activated successfully");
          closeActivateConfirmation();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting role");
        closeActivateConfirmation();
      });
    closeActivateConfirmation();
  };
  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/RegisterUserController/GetAll`, {
        headers: headers,
      })
      .then((response) => {
        setDataSource(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...dataSource].sort((a, b) => {
    const isAsc = order === "asc";
    if (orderBy === "category") {
      return isAsc
        ? a.categoryMaster.categoryName.localeCompare(
            b.categoryMaster.categoryName
          )
        : b.categoryMaster.categoryName.localeCompare(
            a.categoryMaster.categoryName
          );
    }
    return isAsc
      ? a[orderBy] > b[orderBy]
        ? 1
        : -1
      : b[orderBy] > a[orderBy]
      ? 1
      : -1;
  });

  const slicedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <div className="container mt-4">
        <div className="row text-center" style={{ backgroundColor: "white" }}>
          <div className="col-md-10">
            <h2
              style={{
                color: "#007bff",
                fontFamily: "Ariel",
                fontWeight: "bolder",
              }}
            >
              USERS
            </h2>
          </div>
          <div className="col-md-2 justify-content-end">
            <Button
              style={{ backgroundColor: "#007bff", color: "white" }}
              onClick={openRegistrationForm}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
      <div className="container ">
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#31373c", color: "white" }}>
              <TableRow>
                {displayedColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{ backgroundColor: "#31373c", color: "white" }}
                  >
                    <TableSortLabel
                      active={orderBy === column.toLowerCase()}
                      direction={
                        orderBy === column.toLowerCase() ? order : "asc"
                      }
                      onClick={handleSort(column.toLowerCase())}
                      style={{ backgroundColor: "#31373c", color: "white" }}
                    >
                      {column}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>{element.firstName}</TableCell>
                  <TableCell>{element.lastName}</TableCell>
                  <TableCell>{element.email}</TableCell>
                  <TableCell>{element.country}</TableCell>
                  <TableCell>{element.state}</TableCell>
                  <TableCell>
                    {element.categoryMaster &&
                    element.categoryMaster.categoryName
                      ? element.categoryMaster.categoryName
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="">
                      {element.statusFlag === false ? (
                        <div>
                          <button
                            className="btn btn-danger delete-button me-2"
                            onClick={() =>
                              openDeleteConfirmation(element.registerId)
                            }
                          >
                            <DeleteIcon />
                          </button>
                          <button
                            className="btn btn-primary view-button"
                            onClick={() => openUserDetailsModal(element)}
                          >
                            <VisibilityIcon />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-success activate-button"
                          onClick={() =>
                            openActivateConfirmation(element.registerId)
                          }
                        >
                          Activate <CheckIcon />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={dataSource.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
        />
      </div>
      <p className="mt-3">
        {(!dataSource || dataSource.length <= 0) && "No users found"}
      </p>

      <Dialog
        open={showDeleteConfirmation}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirmation-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showActivateConfirmation}
        onClose={closeActivateConfirmation}
        aria-labelledby="activate-confirmation-title"
        aria-describedby="activate-confirmation-description"
      >
        <DialogTitle id="activate-confirmation-title">
          Activate Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="activate-confirmation-description">
            Are you sure you want to activate this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeActivateConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmActivation} color="primary">
            Confirm Activation
          </Button>
        </DialogActions>
      </Dialog>
      {selectedRegisterUser && (
        <Dialog
          open={showViewDialog}
          onClose={closeViewDialog}
          aria-labelledby="view-user-details-title"
          aria-describedby="view-user-details-description"
          className="custom-dialog"
          maxWidth="md"
          fullWidth="true"
        >
          <DialogTitle id="view-user-details-title">
            <div className="row justify-content-center">User Details</div>
          </DialogTitle>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <DialogContentText id="view-user-details-description">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <p>
                    <strong>First Name:</strong>{" "}
                    {selectedRegisterUser.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {selectedRegisterUser.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedRegisterUser.email}
                  </p>
                </div>
                <div className="col-md-5">
                  <p>
                    <strong>Phone:</strong> {selectedRegisterUser.phoneNo}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedRegisterUser.gender}
                  </p>
                  <p>
                    <strong>DateOfBirth:</strong>{" "}
                    {formatDate(selectedRegisterUser.dateOfBirth)}
                  </p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <p>
                    <strong>Address:</strong> {selectedRegisterUser.address}
                  </p>
                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {selectedRegisterUser.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong>{" "}
                    {selectedRegisterUser.countryMasters.country}
                  </p>
                  <p>
                    <strong>State:</strong>{" "}
                    {selectedRegisterUser.stateMaster.state}
                  </p>
                </div>
                <div className="col-md-5">
                  <p>
                    <strong>Phone:</strong> {selectedRegisterUser.phoneNo}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedRegisterUser.gender}
                  </p>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => openUpdateDialog(selectedRegisterUser)} variant="contained" color="primary">
      Edit
    </Button>
          <Button onClick={closeViewDialog} variant="contained" color="error">
      Cancel
    </Button>
   
          </DialogActions>
        </Dialog>
      )}
      {showRegistrationForm && (
        <RegistrationForm
          open={showRegistrationForm}
          onClose={closeRegistrationForm}
        />
      )}
      {showUpdateDialog && (
  <UpdateRegistration
    user={userToUpdate}
    onUpdate={handleUpdate}
    open={showUpdateDialog}
    onClose={closeUpdateDialog}
  />
)}

    </div>
  );
}

export default Register;
