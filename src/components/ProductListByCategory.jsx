import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, Text, Button } from "@mantine/core";
import "./ProductListByCategory.css"; // Import custom CSS for styling
import Navbar from "./Navbar";

const ProductListByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products by category ID from the API
    axios
      .get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error); //console checking
      });
  }, [categoryId]);

  return (
    <>
      <Navbar />
      <div className="product-list-by-category-container">
        {products.map((product) => (
          <Card key={product.id} className="product-card-by-category">
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image-by-category"
            />
            <div className="product-details-by-category">
              <Text
                size="lg"
                weight={500}
                className="product-title-by-category"
              >
                {product.title}
              </Text>
              <Text className="product-price-by-category">
                ${product.price}
              </Text>
              <Link to={`/products/${product.id}`}>
                <Button className="add-to-cart-button-by-category" fullWidth>
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductListByCategory;
