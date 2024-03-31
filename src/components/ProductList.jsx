import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Text, Button } from "@mantine/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductList.css"; // Import custom CSS for styling
import Navbar from "./Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data);
        setLoading(false); // Set loading to false after fetching products
      } catch (error) {
        console.error("Error fetching products:", error); //console checking
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Navbar />
      <br />
      {loading ? (
        <div className="loading-spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="product-list-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              settings={settings}
            />
          ))}
        </div>
      )}
    </>
  );
};

const ProductCard = ({ product, settings }) => (
  <Card shadow="xs" className="product-card">
    <Slider {...settings}>
      {product.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Product ${index + 1}`}
          className="product-image"
        />
      ))}
    </Slider>
    <div className="product-details">
      <Text size="lg" weight={500} className="product-title">
        {product.title}
      </Text>
      <div className="product-price-button-container">
        <Text className="product-price">${product.price}</Text>
        <Link to={`/products/${product.id}`}>
          <Button className="add-to-cart-button" fullWidth>
            Add to Cart
          </Button>
        </Link>
      </div>
    </div>
  </Card>
);

export default ProductList;
