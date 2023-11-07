import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../environment";
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";
import RoleModel from "./RoleModal"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import {
  // ... other imports
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Role() {
  const authToken = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(0);
  const [orderBy, setOrderBy] = useState("roleName");
  const [order, setOrder] = useState("asc");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // Fixed the error here
  const [openAddDialog, setOpenAddDialog] = useState(false);


  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/RoleMasterController/GetAll`, {
        headers: headers,
      })
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.baseApiUrl}/api/RoleMasterController/GetAll`,
        {
          headers: headers,
        }
      );
      setData(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Load data initially
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleConfirmUpdate = () => {
    const updateData = {
      roleId: updateRoleId,
      roleName: newRoleName,
    };
    axios
      .put(`${config.baseApiUrl}/api/RoleMasterController/RoleUpdate`, updateData, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Role updated successfully");
          toast.success("Role updated successfully");
          fetchData();
          closeUpdateDialog();
        } else {
          console.log("Unexpected response:", response);
          toast.error("Error updating role");
          closeUpdateDialog();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error updating role");
        closeUpdateDialog();
      });

  };
  const handleEdit = (roleId,currentRoleName) => {
    setUpdateRoleId(roleId);
    setNewRoleName(currentRoleName);
    setOpenUpdateDialog(true);
  };
  const openUpdateDialogBox = (roleId) => {
    setUpdateRoleId(roleId);
    setOpenUpdateDialog(true);
  };
  const closeUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };
  const handleRoleNameChange = (event) => {
    setNewRoleName(event.target.value);
  };
  const handleDelete = (roleId) => {
    openDeleteConfirmation(roleId);
  };

  const handleActivate = (roleId) => {
    fetch(`https://localhost:7100/api/RoleMasterController/RoleUpdateStatus`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleId),
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Role activated successfully");
          toast.success("Role activated successfully");
          fetchData();
          closeDeleteDialog();
        } else {
          console.log("Unexpected response:", response);
          toast.error("Error deleting role");
          closeDeleteDialog();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting role");
        closeDeleteDialog();
      });
  };
  const handleAddRole = () => {
    const newRoleData = {
      roleName: newRoleName,
    };
    axios
    .post(`${config.baseApiUrl}/api/RoleMasterController/CreateRole`, newRoleData, {
      headers: headers,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Role added successfully");
        toast.success("Role added successfully");
        fetchData(); // Refresh the data
        closeAddDialog(); // Close the dialog
      } else {
        console.log("Unexpected response:", response);
        toast.error("Error adding role");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Error adding role");
    });
    closeAddDialog();
  };
  
  const openAddDialogBox = () => {
    setOpenAddDialog(true);
  };
  const closeAddDialog = () => {
    setOpenAddDialog(false);
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const openDeleteConfirmation = (roleId) => {
    setDeleteRoleId(roleId);
    setOpenDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    fetch(`https://localhost:7100/api/RoleMasterController/DeleteRole`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteRoleId),
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Role deleted successfully");
          fetchData();
          toast.success("Role deleted successfully");
          closeDeleteDialog();
        } else {
          console.log("Unexpected response:", response);
          toast.error("Error deleting role");
          closeDeleteDialog();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting role");
        closeDeleteDialog();
      });
  };

  const sortedData = stableSort(data, getComparator(order, orderBy)).slice(
    page * 5,
    page * 5 + 5
  );

  return (
    <div className="container-fluid" style={{ marginLeft: "0px" }}>
      <br></br>
      <div className="row text-center" style={{ backgroundColor: "white" }}>
        <div className="col-md-10">
        <h2
          style={{
            color: "#007bff",
            fontFamily: "Ariel",
            fontWeight: "bolder",
          }}
        >
          ROLES
        </h2>
        </div>
        <div className="col-md-2">
        <Button style={{ backgroundColor: '#007bff', color: 'white' }} onClick={openAddDialogBox}>Add New</Button>

        </div>       
       
      </div>
      <TableContainer component={Paper} style={{ height: "75vh" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#31373c", color: "white" }}>
            <TableRow>
              <TableCell style={{ backgroundColor: "#31373c", color: "white" }}>
                <TableSortLabel
                  active={orderBy === "roleName"}
                  direction={orderBy === "roleName" ? order : "asc"}
                  style={{ backgroundColor: "#31373c", color: "white" }}
                  onClick={() => handleRequestSort("roleName")}
                >
                  Role Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#31373c",
                  color: "white",
                  textAlign: "right",
                  paddingRight: "60px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.roleId}>
                <TableCell>{row.roleName}</TableCell>
                <TableCell
                  style={{
                    textAlign: "right",
                  }}
                >
                  {row.statusFlag ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckIcon />}
                      onClick={() => handleActivate(row.roleId)}
                    >
                      Activate
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<EditIcon />}
                        style={{ marginRight: "8px" }}
                        onClick={() => handleEdit(row.roleId,row.roleName)}
                      ></Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(row.roleId)}
                      ></Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage=""
        />
      </TableContainer>
      <div className="card flex justify-content-center">
        <Dialog
          open={openDeleteDialog}
          onClose={closeDeleteDialog}
          PaperProps={{
            style: {
              maxWidth: "80%",
            },
          }}
          modalWidth="100%"
          BackdropProps={{
            onClick: (event) => {
              event.stopPropagation();
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "#007bff" }}>
            {"Confirm Deletion"}{" "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} style={{ color: "#007bff" }}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              style={{ color: "red" }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={openUpdateDialog}
        onClose={closeUpdateDialog}
      >
        <DialogTitle id="update-dialog-title">Update Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newRoleName"
            label="Role Name"
            type="text"
            fullWidth
            value={newRoleName}
            onChange={handleRoleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
  open={openAddDialog}
  onClose={closeAddDialog}
  PaperProps={{
    style: {
      maxWidth: "80%",
    },
  }}
  modalWidth="100%"
  BackdropProps={{
    onClick: (event) => {
      event.stopPropagation();
    },
  }}
>
  <DialogTitle id="alert-dialog-title" style={{ color: "#007bff" }}>
    {"Add New Role"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {/* Here, you can add input fields for collecting new role data */}
      <TextField
        autoFocus
        margin="dense"
        id="newRoleName"
        label="Role Name"
        type="text"
        fullWidth
        value={newRoleName}
        onChange={(event) => setNewRoleName(event.target.value)}
      />
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeAddDialog} style={{ color: "#007bff" }}>
      Cancel
    </Button>
    <Button onClick={handleAddRole} style={{ color: "#007bff" }}>
      Add Role
    </Button>
  </DialogActions>
</Dialog>

      </div>
    </div>
  );
}

export default Role;
