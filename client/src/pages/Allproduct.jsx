import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Allproduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch sản phẩm từ API khi mount
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:3000/api/v1/products", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.data && res.data.data) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        } else {
          console.error("Không thể tải danh sách sản phẩm", err);
          setProducts([]);
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          All
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {" "}
            Products
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          "Discover our complete collection of fresh fruits, juices and gift
          baskets"
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {products.map((product, index) => (
              <ProductCard key={product._id || index} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              No products available
            </p>
            <p className="text-gray-600 mb-6">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allproduct;
