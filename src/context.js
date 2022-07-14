import { createContext, useState } from "react";
import axios from "axios";

export const GLobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plsLogin, setPlsLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [signupFlag, setSignupFlag] = useState(false);
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [purchaseData, setPurchaseData] = useState({
    number: "",
    method: "",
  });

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
    axios.post("./signup", user).then((res) => {
      setIsLoggedIn(true);
    });
    toggleLogin();
    toggleSignupFlag();
  };

  const toggleSignupFlag = (e) => {
    e.preventDefault();
    setSignupFlag(!signupFlag);
  };

  const logIn = (e) => {
    e.preventDefault();
    axios.get("/login").then((res) => {
      setUser(res);
      setIsLoggedIn(true);
    });
    toggleLogin();
  };

  const closeSession = () => {
    setIsLoggedIn(false);
    setUser({ username: "", password: "", email: "" });
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
        togglePlsLogin,
        plsLogin,
        toggleSignupFlag,
        signupFlag,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};
