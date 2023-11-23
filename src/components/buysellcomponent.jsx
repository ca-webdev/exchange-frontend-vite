import "../style/buysell.css";

const BuySellComponent = (props) => {
  const { sendName } = props;
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <select id="action" name="action" className="custom-select">
          <option value="B">Buy</option>
          <option value="S">Sell</option>
        </select>
        {/* B 999@$10000 */}
        <input type="text" id="instruction" className="custom-input" placeholder="Price" />
        <input type="text" id="instruction" className="custom-input" placeholder="Size" />
        <button onClick={sendName} className="custom-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default BuySellComponent;
