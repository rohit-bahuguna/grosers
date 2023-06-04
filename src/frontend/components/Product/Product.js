import React, { useEffect, useState } from "react";
import "./css/Product.css";
import { ProductCard } from "./ProductCard";
import { ProductFilterBar } from "./ProductFilterBar";
import { filterDataBySubCatagories, filterDataByCatagory, searchProduct, sortData } from "../../utils";

import { useProductData } from "../../contexts/productContext/productContext";
import Layout from "../common/Layout"
import { useParams } from "react-router-dom";

export function ProductListing() {
  const { category } = useParams()
  const {
    sortBy,
    priceRange,
    categories,
    sortByRating,
    products,
    cart,
    wishlist,
    address,
    search,
    selectedCategory,
    selectedSubCategories
  } = useProductData();


console.log("selectedSubCategories" , selectedSubCategories);
  const searchData = searchProduct([...products], search);

  const filteredByCatagory = filterDataByCatagory([...searchData], selectedCategory);

  const filteredDataSubCatagories = filterDataBySubCatagories([...filteredByCatagory], selectedSubCategories);

  const sortedData = sortData([...filteredDataSubCatagories], sortBy, priceRange, sortByRating);

  // useEffect(() => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 1000);
  //   changeTitle("Products");
  // }, []);


  return (
    <Layout>
      <div className="product-main-container">
        <ProductFilterBar />
        <div className="product-list-container" >
          <div className="product-list-header">
            {sortedData.length > 0 ? (
              <>

                <p className="paragraph-sm">Showing <span className="number-of-products">{sortedData.length}</span> of <span className="number-of-products" > {products.length}</span> items</p>
              </>
            ) : (
              products.length > 0 && <h1>Sorry , Products are not available for chosen category.</h1>
            )}
          </div>

          <div className="responsive-grid">
            {sortedData && sortedData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
