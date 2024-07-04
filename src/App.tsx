// @ts-nocheck
import { Route, Switch, useHistory } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useState } from "react";
import Autosuggest from "react-autosuggest";
import FundTransfer from "./pages/TransferFund/FundTransfer";
import { useSelector } from "react-redux";
import { isauth } from "./redux/database/selectors";
import Modal from "./components/Modal";


const LoginModal = () => {

  const history = useHistory()

  return (
    <Modal title="Login" isvisible={true}>
      <center>
        <h1> Please Login....!</h1>
        <button style={{padding: '5px 8px', margin: 5}} onClick={() => history.push('/')}>Click To Go Login Page</button>
      </center>
    </Modal>
  )
}


function App() {

  const isAuth = useSelector(isauth)

  return (
    <div className="container">
      <>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/fund-transfer"
            render={(props) => <FundTransfer {...props} />}
          />

          <Route path="/fund-transfer">
            {
              isAuth ? <FundTransfer /> : <><LoginModal /></>
            }
          </Route>

          <Route path="/accounts">
            {
              isAuth ? <AccountDetails /> : <><LoginModal /></>
            }
          </Route>
          <Home />
        </Switch>
        <br />
      </>
    </div>
  )
}

export default App
