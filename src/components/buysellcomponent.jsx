import React, { useState } from "react";
import "../style/buysell.css";

const BuySellComponent = (props) => {
  const { sendName, positionpnl } = props;
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    // Check for empty inputs
    if (price.trim() === "" || size.trim() === "") {
      setErrorMessage("Price and size cannot be empty.");
      return false;
    }

    // Validate price
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      setErrorMessage("Price must be a number with up to two decimal places.");
      return false;
    }

    // Validate size
    if (isNaN(size) || size <= 0) {
      setErrorMessage("Size must be a positive number.");
      return false;
    }

    // Clear any previous error message
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      // If inputs are valid, proceed with the API call
      sendName();
      // Clear input fields after submission
      setPrice("");
      setSize("");
    }
  };

  return (
    <div className="buysell-centent">
      <img className="logo" src="/logo.png" />
      <form onSubmit={handleSubmit}>
        <select id="side" name="side" className="custom-select">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="text"
          id="price"
          className="custom-input"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          id="size"
          className="custom-input"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <button type="submit" className="custom-button">
          Send
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        Portfolio Value:{" "}
        <span
          className={
            positionpnl.portfolioValueChange > 0
              ? "color-green"
              : positionpnl.portfolioValueChange === 0
              ? "color-white"
              : "color-red"
          }
        >
          {positionpnl &&
            positionpnl.portfolioValue &&
            positionpnl.portfolioValue.toFixed(2) +
              " (" +
              (
                positionpnl &&
                positionpnl.portfolioValueChange &&
                positionpnl.portfolioValueChange * 100
              ).toFixed(2) +
              "%)"}
        </span>
      </div>
    </div>
  );
};

export default BuySellComponent;
