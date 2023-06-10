import "./App.css";
import { Route, Switch } from "react-router-dom";

import RegisterPage from "./RegisterPage.js";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import Header from "./component/Header";
function App() {
  return (
    <>
      <Header />
      <Switch>
        {/* <Route exact path='/' component={} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/about" component={About} />

        <Route path="/login" component={Login} />

        <Route path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} /> */}
      </Switch>
    </>
  );
}

export default App;
