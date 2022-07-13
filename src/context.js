import { createContext, useState } from "react";

export const GLobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [purchaseData, setPurchaseData] = useState({
    number: "",
    method: "",
  });

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
  console.log(purchaseData);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (code, price) => {
    setCartItems((prev) => {
      if (prev.find((i) => i.code === code)) {
        return prev;
      }
      return [...prev, { code, price, amount: 1 }];
    });
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
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};
