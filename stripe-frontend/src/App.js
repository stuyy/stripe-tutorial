import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, PaymentPage, ProductsPage } from "./pages";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/payment" component={PaymentPage} />
          <Route exact={true} path="/products" component={ProductsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
