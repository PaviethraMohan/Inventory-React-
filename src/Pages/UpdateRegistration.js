import React, { useState, useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import axios from "axios";
import config from "../environment";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "@mui/material/styles/styled";

const StyledSubmitButton = styled(Button)({
  backgroundColor: "#4CAF50",
  color: "white",
  "&:hover": {
    backgroundColor: "#45A049",
  },
});

const StyledDialog = styled(Dialog)({
  maxWidth: "3000px",
  padding: "",
  "& .MuiDialog-paper": {
    maxWidth: "1000px", // Adjust the maxWidth for the dialog paper
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#007bff",
  color: "white",
  textAlign: "center",
});

function UpdateRegistration({ user, onUpdate, open, onClose }) {
  function formatDate(dateStr) {
    const inputDate = new Date(dateStr);
    if (!isNaN(inputDate.getTime())) {
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else {
      return "";
    }
  }
  const [formData, setFormData] = useState({
    registerId:user.registerId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNo: user.phoneNo,
    gender: user.gender,
    country: user.country,
    state: user.state,
    categoryId: user.categoryId,
    dateOfBirth: new Date(user.dateOfBirth),
    address: user.address,
    postalCode: user.postalCode,
    stateMaster: null,
    countryMasters: null,
    categoryMaster: null,
    createdBy: user.createdBy,
    updatedBy: user.updatedBy,
    createdOn: (user.createdOn),
    updatedOn:(user.updatedOn),
    statusFlag: user.statusFlag,
  });
  const authToken = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/CategoryMasterController/GetAllCategory`, {
        headers: headers,
      })
      .then((response) => {
        setCategories(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [headers]);

  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/CountryController/GetAllCountry`, {
        headers: headers,
      })
      .then((response) => {
        setCountries(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [headers]);

  useEffect(() => {
    if (formData.country) {
      axios
        .get(
          `${config.baseApiUrl}/api/StateController/GetStateForCountry?countryId=${formData.country}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          setStates(response.data.result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setStates([]);
    }
  }, [formData.country, headers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const originalDate = new Date(formData.dateOfBirth);

  // Format the date as "yyyy-MM-dd"
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // Update the formData with the new formatted date
  formData.dateOfBirth = formattedDate;
  formData.dateOfBirth=new Date(formattedDate)
  console.log(formData);
    onUpdate(formData);
    onClose();
  };
  const formattedDateOfBirth =
    user && user.dateOfBirth ? formatDate(user.dateOfBirth) : "";
  return (
    <ClickAwayListener onClickAway={() => {}}>
      <StyledDialog open={open} onClose={onClose}>
        <StyledDialogTitle>Update User Information</StyledDialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNo"
                  fullWidth
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                {/* <FormControl fullWidth>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    fullWidth
                    value={formatDate(formData.dateOfBirth)}
                    // value={formData.dateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </FormControl> */}
                <FormControl fullWidth>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    fullWidth
                    value={formattedDateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    label="Category"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <MenuItem value={0} disabled>
                      Select Category
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <MenuItem value={0} disabled>
                      Select Country
                    </MenuItem>
                    {countries.map((country) => (
                      <MenuItem
                        key={country.countryId}
                        value={country.countryId}
                      >
                        {country.country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <MenuItem value={0} disabled>
                      Select State
                    </MenuItem>
                    {states.map((state) => (
                      <MenuItem key={state.stateCode} value={state.stateCode}>
                        {state.state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Postal Code"
                  name="postalCode"
                  fullWidth
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <StyledSubmitButton type="submit" variant="outline">
              Update
            </StyledSubmitButton>
            <Button onClick={onClose} variant="contained" color="error">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </ClickAwayListener>
  );
}

export default UpdateRegistration;
