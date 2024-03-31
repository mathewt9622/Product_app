import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Import Bootstrap Spinner
import "./CategoryList.css"; // Import custom CSS for styling
import Navbar from "./Navbar";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch categories from the API
  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <div className="categories-heading-container">
        <h2 className="categories-heading">Select your Category </h2>
      </div>
      {loading ? ( // Render spinner if loading
        <div className="loading-spinner-container">
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <div className="category-list">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category-link"
            >
              <div className="category-card">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <span className="category-name">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
