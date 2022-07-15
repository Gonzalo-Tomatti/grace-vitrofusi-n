import { createContext, useEffect, useState } from "react";
import axios from "axios";

let storedItems, storedUser;
window.addEventListener("DOMContentLoaded", () => {
  storedUser = JSON.parse(localStorage.getItem("user")) || {
    password: "",
    email: "",
  };
  storedItems = JSON.parse(localStorage.getItem("cart-items")) || [];
});
export const GLobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plsLogin, setPlsLogin] = useState(false);
  const [cartItems, setCartItems] = useState(storedItems);
  const [signupFlag, setSignupFlag] = useState(false);
  const [incorrectUser, setIncorrectUser] = useState(false);
  const [signupEmptyFields, setSignupEmptyFields] = useState(false);
  const [closeSessionFlag, setCloseSessionFlag] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [user, setUser] = useState(storedUser);
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
      email: user.email,
    };
    axios
      .post("https://grace-vitrofusion.herokuapp.com/make-purchase", purchase)
      .then(() => {
        setCartItems([]);
      });
  };

  // console.log("stored user", storedUser);
  // console.log("stored items", storedItems);
  // console.log("logeado", isLoggedIn);
  // console.log("user variable", user);
  // console.log("cart items variable", cartItems);

  // when you refresh the website, if there's a user set in local storage then you set loggedIn to true
  useEffect(() => {
    if (user.email) {
      setIsLoggedIn(true);
    }
  }, []);
  //save the cartItems in local storage every time you change them
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("cart-items", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  //when you log in save the user in local storage, when you close session remove user and cartItems from local storage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
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
      setSignupEmptyFields(true);
      setTimeout(() => {
        setSignupEmptyFields(false);
      }, 3000);
    } else {
      axios
        .post("https://grace-vitrofusion.herokuapp.com/signup", user)
        .then((res) => {
          if (res.data.msg === "email in use") {
            setEmailInUse(true);
            setTimeout(() => {
              setEmailInUse(false);
            }, 3000);
          } else {
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
      setIncorrectUser(true);
      setTimeout(() => {
        setIncorrectUser(false);
      }, 3000);
    } else {
      axios
        .get(
          `https://grace-vitrofusion.herokuapp.com/login/${user.email}&${user.password}`
        )
        .then((res) => {
          if (!res.data.length) {
            setIncorrectUser(true);
            setTimeout(() => {
              setIncorrectUser(false);
            }, 3000);
          } else {
            setUser(res.data[0]);
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
    // if (!isLoggedIn) {
    //   setUser({ password: "", email: "" });
    // }
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
        incorrectUser,
        signupEmptyFields,
        emailInUse,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};
