import "../style/buysell.css";

const BuySellComponent = (props) => {
  const { sendName } = props;
  return (
    <div className="buysell-centent">
      <form onSubmit={(e) => e.preventDefault()}>
        <select id="side" name="side" className="custom-select">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="text"
          id="price"
          className="custom-input"
          placeholder="Price"
        />
        <input
          type="text"
          id="size"
          className="custom-input"
          placeholder="Size"
        />
        <button onClick={sendName} className="custom-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default BuySellComponent;
