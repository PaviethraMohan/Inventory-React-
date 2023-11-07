import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import your CSS styles
import Layout from '../Layout/Layout';
import dashboard from '../Images/dashboard.jpg';
import babyproductsindex from '../Images/babyproductsindex.jpg';
import personalcareindex from '../Images/personalcareindex.jpg';

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCarouselSlide = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const isAtFirstImage = activeIndex === 0;
  const isAtLastImage = activeIndex === 1; // Update this value if you have more images

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="row">
          <div className="col-md-6">
            <header className="hero">
              <div className="container-fluid">
                <div className="hero-content">
                  <h1>Welcome to</h1>
                  <h2>Inventory Management System</h2>
                  <p>Effortlessly manage your inventory with our powerful solution.</p>
                  <a href="#features" className="btn btn-primary">
                    Explore Products
                  </a>
                </div>
              </div>
              <div className="hero-image mt-4">
                <img src={dashboard} alt="Inventory Management" style={{ width: "450px", height: "250px" }} />
              </div>
            </header>
          </div>
          <div className="col-md-6 mt-4">
            <div className="container mx-auto">
              <div className="row justify-content-center align-items-center">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li
                      data-target="#myCarousel"
                      data-slide-to="0"
                      className={activeIndex === 0 ? 'active' : ''}
                    ></li>
                    <li
                      data-target="#myCarousel"
                      data-slide-to="1"
                      className={activeIndex === 1 ? 'active' : ''}
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                      <img
                        src={babyproductsindex}
                        alt="First slide"
                        style={{ width: "600px", height: "400px" }}
                      />
                    </div>
                    <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                      <img
                        src={personalcareindex}
                        alt="Second slide"
                        style={{ width: "600px", height: "400px" }}
                      />
                    </div>
                  </div>
                  {isAtFirstImage ? null : (
                    <a
                      className="carousel-control-prev"
                      href="#myCarousel"
                      role="button"
                      data-slide="prev"
                      onClick={() => handleCarouselSlide(activeIndex - 1)}
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundcolor:"black"}}></span>
                      <span className="sr-only"></span>
                    </a>
                  )}
                  {isAtLastImage ? null : (
                    <a
                      className="carousel-control-next"
                      href="#myCarousel"
                      role="button"
                      data-slide="next"
                      onClick={() => handleCarouselSlide(activeIndex + 1)}
                    >
                      <span className="carousel-control-next-icon" ariahidden="true"style={{backgroundcolor:"black"}}></span>
                      <span className="sr-only"></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container-fluid">
          <p>&copy; 2023 Inventory Manager. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Dashboard;
