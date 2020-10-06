import React from "react";
import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../stateprovider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  // gives the browser history. Import use history from react-router-dom
  const history = useHistory();
  // brings in data layer that we created. Always used to bring state and basket value.
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>

            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        prefix={"$"}
      />
      {/* history.push() systematically pushes the page into the browser if there is no route default is '/' or home */}
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
