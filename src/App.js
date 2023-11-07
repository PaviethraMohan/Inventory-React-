// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import Role from "./Pages/Role";
import PageNotFound from "./Pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./Pages/UserProfile";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Layout authenticated={authenticated}>
        <Routes>
          
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route path="*" 
          element={
          <PrivateRoute authenticated={authenticated}>
            <PageNotFound />
            </PrivateRoute>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute authenticated={authenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
         {/* <Route path="/user-profile/:userId" component={UserProfile} /> */}
         <Route
            path="/user-profile/:userId"
            element={
              <PrivateRoute authenticated={authenticated}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/Role"
            element={
              <PrivateRoute authenticated={authenticated}>
                <Role />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
