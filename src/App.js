import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Checkout from "./components/checkout/checkout";
import Login from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./stateprovider";
import Payment from "./components/payment/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/orders/orders";

// promise key is public no need to hide
const promise = loadStripe(
  "pk_test_51HQE62FgRhgfMb4TSg57VeCvFVqrBUAtJosBdC37x5ompSbZ2gP1WiTaVF7j9LX6BOlbt5mrVRZqR1wI6SeqWrA9006UZyGhad"
);

function App() {
  // getting state
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      // console.log('THE USER IS >>>', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          {/* Note: default root always located at the bottom */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
