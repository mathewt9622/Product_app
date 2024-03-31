import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Paper, Text, Button } from "@mantine/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetails.css";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch product details from the API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProduct(response.data);
        setLoading(false); // Set loading to false after fetching product
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProductDetails();
  }, [id]);

  // Render loading spinner while fetching product details
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  // Render product details once loaded
  return (
    <>
     
      <div className="product-details-container">
        <Paper shadow="xs" padding="xl" className="product-details-card">
          <div className="product-carousel">
            <Carousel>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="product-info">
            <Text size="xl" weight={700} className="product-title">
              {product.title}
            </Text>
            <Text size="lg" className="product-description">
              {product.description}
            </Text>
            <div className="product-actions">
              <Text size="lg" weight={500} className="product-price">
                ${product.price}
              </Text>
              <Button color="blue" size="sm" className="add-to-cart-button">
                Add to Cart
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ProductDetails;
