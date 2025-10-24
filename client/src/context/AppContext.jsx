import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // console.log(localStorage.getItem("accessToken"));
  const currency = (import.meta.env && import.meta.env.VITE_CURRENCY) || "đ";

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const navigate = useNavigate();
  // User starts as null (not logged in) - only set after successful login
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(() => {
    return localStorage.getItem("isSeller") === "true";
  });
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("addresses");
    return savedAddresses
      ? JSON.parse(savedAddresses)
      : [
          {
            id: 1,
            name: "Nhà riêng",
            fullName: "Nguyễn Văn A",
            phone: "0123456789",
            street: "123 Nguyễn Huệ",
            city: "Quận 1",
            state: "TP.HCM",
            country: "Việt Nam",
            isDefault: true,
          },
        ];
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/products");
      if (data.success) {
        setProducts(data.data || []);
      } else {
        console.warn("No products found or API error:", data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error(
        "Fetch product error:",
        error.response?.data || error.message
      );
      // Không hiển thị toast error để tránh spam khi chưa đăng nhập
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Không thể tải sản phẩm");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Refetch products when token changes (after login)
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  // Save isSeller to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSeller", isSeller);
  }, [isSeller]);

  // Save addresses to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  // Save orders to localStorage whenever it changes - optimized batching
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId, quantity = 1) => {
    // Check if user is logged in
    if (!user) {
      return { success: false, needLogin: true };
    }

    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[productId]) {
        newCart[productId] += quantity;
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });

    return { success: true, needLogin: false };
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) => ({
        ...prev,
        [productId]: quantity,
      }));
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const getCartTotal = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        total += product.offerPrice * cartItems[productId];
      }
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      status: "Processing",
      cancelReason: null,
      cancelledBy: null,
      cancelledAt: null,
      ...orderData,
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    // localStorage save handled by useEffect
    clearCart();

    return newOrder;
  };

  const cancelOrder = (orderId, reason, cancelledBy = "customer") => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "Cancelled",
            cancelReason: reason,
            cancelledBy: cancelledBy,
            cancelledAt: new Date().toISOString(),
          }
        : order
    );
    setOrders(updatedOrders);
    // localStorage save handled by useEffect
  };

  const rejectOrder = (orderId, reason) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "Rejected",
            cancelReason: reason,
            cancelledBy: "seller",
            cancelledAt: new Date().toISOString(),
          }
        : order
    );
    setOrders(updatedOrders);
    // localStorage save handled by useEffect
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    // localStorage save handled by useEffect
  };

  const getOrders = () => {
    return orders;
  };

  const login = (userData, userToken) => {
    if (userData && userToken) {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem("accessToken", userToken);
      // Refetch products after login
      fetchProducts();
    } else {
      toast.error("Lỗi đăng nhập");
    }
    setShowUserLogin(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isSeller");
    setProducts([]);
  };

  const getDefaultAddress = () => {
    return addresses.find((addr) => addr.isDefault) || addresses[0] || null;
  };

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    token,
    setToken,
    login,
    logout,
    products,
    currency,
    formatPrice,
    cart: cartItems,
    orders,
    placeOrder,
    getOrders,
    cancelOrder,
    rejectOrder,
    deleteOrder,
    addresses,
    setAddresses,
    getDefaultAddress,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
