import { createContext, useEffect, useState } from "react";
import axios from "axios";

let storedItems, storedToken;
window.addEventListener("DOMContentLoaded", () => {
  storedToken = JSON.parse(localStorage.getItem("token")) || "";
  storedItems = JSON.parse(localStorage.getItem("cart-items")) || [];
});

export const GLobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(storedToken);

  // AXIOS GLOBALS
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plsLogin, setPlsLogin] = useState(false);
  const [cartItems, setCartItems] = useState(storedItems);
  const [signupFlag, setSignupFlag] = useState(false);
  const [closeSessionFlag, setCloseSessionFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const [purchaseData, setPurchaseData] = useState({
    method: "",
    number: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [purchaseDetails, setPurchaseDetails] = useState();

  const setCurrentPurchaseDetails = (details) => {
    setPurchaseDetails(details);
  };

  const makePurchase = () => {
    const date = new Date();
    const total = cartItems.reduce((total, current) => {
      return total + current.price;
    }, 0);
    const purchase = {
      date,
      total,
      method: purchaseData.method,
      number: purchaseData.number,
      name: purchaseData.name,
      lastName: purchaseData.lastName,
      phone: purchaseData.phone,
      address: purchaseData.address,
      items: cartItems,
    };
    axios
      .post(
        "https://backend-grace-vitrofusion-production.up.railway.app/make-purchase",
        purchase
      )
      .then(() => {
        setCartItems([]);
      });
  };

  // console.log("stored items", storedItems);
  // console.log("stored token", storedToken);
  // console.log("logeado", isLoggedIn);
  // console.log("user variable", user);
  // console.log("cart items variable", cartItems);
  // console.log("token variable", token);

  // when you refresh the website, if there's a token set in local storage then you set loggedIn to true
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  //save the cartItems in local storage every time you change them
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  //when you log in save the token in local storage, when you close session remove token and cartItems from local storage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("cart-items");
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    if (user.password === "" || user.email === "") {
      showError("Por favor completar todos los campos.");
    } else if (!user.email.includes("@")) {
      showError("El email debe contener @.");
    } else {
      axios
        .post(
          "https://backend-grace-vitrofusion-production.up.railway.app/signup",
          user
        )
        .then((res) => {
          if (res.data.msg === "email in use") {
            showError("El email ingresado se encuentra en uso.");
          } else {
            setToken(res.data.token);
            setIsLoggedIn(true);
            toggleLogin();
            toggleSignupFlag();
          }
        });
    }
  };

  const toggleSignupFlag = (e) => {
    e.preventDefault();
    setSignupFlag(!signupFlag);
  };

  const logIn = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      showError("Por favor completar todos los campos.");
    } else {
      axios
        .post(
          `https://backend-grace-vitrofusion-production.up.railway.app/login`,
          user
        )
        .then((res) => {
          if (res.data.msg === "user not found") {
            showError("El usuario no existe.");
          } else {
            setToken(res.data.token);
            setIsLoggedIn(true);
            toggleLogin();
          }
        });
    }
  };

  const toggleCloseSession = () => {
    setCloseSessionFlag(!closeSessionFlag);
  };
  const closeSession = () => {
    setIsLoggedIn(false);
    setUser({
      password: "",
      email: "",
    });
    setPurchaseData({
      method: "",
      number: "",
      name: "",
      lastName: "",
      phone: "",
      address: "",
    });
    setCartItems([]);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = parseInt(value);
    }
    setPurchaseData((prev) => {
      if (!value) {
        return prev;
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (signupFlag) {
      setSignupFlag(false);
    }
    if (!isLoggedIn) {
      setUser({ password: "", email: "" });
    }
  };

  const addToCart = (code, price) => {
    if (isLoggedIn) {
      setCartItems((prev) => {
        if (prev.find((i) => i.code === code)) {
          return prev;
        }
        return [...prev, { code, price, amount: 1 }];
      });
    } else {
      togglePlsLogin();
    }
  };

  const togglePlsLogin = () => {
    setPlsLogin(!plsLogin);
  };

  const removeFromCart = (code) => {
    setCartItems((prev) =>
      prev.filter((i) => {
        return i.code !== code;
      })
    );
  };
  const updateAmount = (code, update) => {
    setCartItems((prev) => {
      const items = prev
        .map((i) => {
          if (i.code === code) {
            if (update === "inc") {
              i.amount += 1;
            } else {
              i.amount -= 1;
            }
          }
          return i;
        })
        .filter((i) => {
          return i.amount > 0;
        });
      return items;
    });
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setErrorFlag(true);
    setTimeout(() => {
      setErrorFlag(false);
    }, 3000);
  };

  return (
    <GLobalContext.Provider
      value={{
        toggleCart,
        isCartOpen,
        addToCart,
        cartItems,
        updateAmount,
        removeFromCart,
        handleChange,
        purchaseData,
        toggleLogin,
        isLoginOpen,
        handleLogin,
        user,
        signUp,
        logIn,
        isLoggedIn,
        closeSession,
        toggleCloseSession,
        closeSessionFlag,
        togglePlsLogin,
        plsLogin,
        toggleSignupFlag,
        signupFlag,
        makePurchase,
        setCurrentPurchaseDetails,
        purchaseDetails,
        token,
        errorFlag,
        errorMsg,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};
