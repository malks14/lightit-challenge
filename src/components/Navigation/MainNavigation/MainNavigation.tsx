import React from "react";

import MainHeader from "../MainHeader/MainHeader";

import "./MainNavigation.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/lightit_logo.jpeg";
import { usePatients } from "../../../store/PatientsContext";

const MainNavigation = () => {

  const { filter, setFilter, clearFilter } = usePatients();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    
  
      <MainHeader>
        <Link to="/" className="navigation-logo">
        <img src={logo} alt="logo" className="navigation-logo__img" />
          <h3 className="navigation-logo__text">light-it</h3>
        </Link>


        <div className="navigation-filter">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search patients..."
              className="search-input"
              value={filter}
              onChange={handleFilterChange}
            />
            {filter && (
              <button 
                onClick={clearFilter}
                className="clear-button"
                type="button"
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </MainHeader>

  );
};

export default MainNavigation;