import React, { useState } from "react";
import PortfolioComponent from "./portfoliocomponent";

import "../style/buyselloutput.css";

const BuySellOutputComponent = (props) => {
  const { orderupdate, positionpnl, showPopup } = props;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dropdownStates, setDropdownStates] = useState({});
  const [activeTab, setActiveTab] = useState("orderHistory"); // Default to "orderHistory"
  const URL = import.meta.env.VITE_GET_URL;

  const handleCancelOrder = (orderId) => {
    // Perform a POST request to cancel the order
    fetch(URL + "ordercancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        showPopup(data.message);
        console.log("POST request successful", data);
      })
      .catch((error) => {
        showPopup(error.message);
        console.error("Error making POST request:", error);
      });
  };

  const toggleDropdown = (orderId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  return (
    <>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "orderHistory" ? "active" : ""}`}
          onClick={() => setActiveTab("orderHistory")}
        >
          Order History
        </div>
        <div
          className={`tab ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio
        </div>
      </div>

      {activeTab === "orderHistory" && (
        <div className="buyselloutput-content">
          <div className="buyselloutput-table-overflow">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Filled Size</th>
                  <th>Time</th>
                  <th>Taker Side</th>
                  <th>Order Status</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {orderupdate &&
                  orderupdate
                    .slice()
                    .reverse()
                    .map((order, index) => {
                      const date = new Date(order.orderUpdateTime * 1000);
                      const isOpen = dropdownStates[order.orderId];

                      return (
                        <React.Fragment key={index}>
                          <tr
                            className={
                              order.side === "buy" ? "color-green" : "color-red"
                            }
                            onClick={() => {
                              setSelectedOrder(order);
                              toggleDropdown(order.orderId);
                            }}
                          >
                            <td>
                              {isOpen ? (
                                <svg
                                  viewBox="0 0 1024 1024"
                                  fill="currentColor"
                                  height="1em"
                                  width="1em"
                                  {...props}
                                >
                                  <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
                                </svg>
                              ) : (
                                <svg
                                  viewBox="0 0 1024 1024"
                                  fill="currentColor"
                                  height="1em"
                                  width="1em"
                                  {...props}
                                >
                                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
                                </svg>
                              )}
                            </td>
                            <td>{order.price}</td>
                            <td>{order.size}</td>
                            <td>{order.filledSizes}</td>
                            <td>{new Date(date).toLocaleString()}</td>
                            <td>{order.side}</td>
                            <td>{order.orderStatus}</td>
                            <td>
                              {order.orderStatus !== "FullyFilled" &&
                                order.orderStatus !== "Cancelled" && (
                                  <button
                                    className="cancel-button"
                                    onClick={() =>
                                      handleCancelOrder(order.orderId)
                                    }
                                  >
                                    Cancel Order
                                  </button>
                                )}
                            </td>
                          </tr>
                          {selectedOrder === order && isOpen && (
                            <>
                              <tr>
                                <th>Filled Price</th>
                                <th>Filled Size</th>
                              </tr>
                              {order.filledData &&
                                order.filledData
                                  .slice()
                                  .reverse()
                                  .map((filled, index) => {
                                    return (
                                      filled.filledPrice !== "NaN" &&
                                      filled.filledSize !== 0 && (
                                        <tr key={index}>
                                          <td>{filled.filledPrice}</td>
                                          <td>
                                            {filled.filledSize -
                                              order.filledData
                                                .slice()
                                                .reverse()[index + 1]
                                                .filledSize}
                                          </td>
                                        </tr>
                                      )
                                    );
                                  })}
                            </>
                          )}
                        </React.Fragment>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "portfolio" && (
        <PortfolioComponent portfolioData={positionpnl} />
      )}
    </>
  );
};

export default BuySellOutputComponent;
