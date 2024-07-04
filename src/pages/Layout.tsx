import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./Home/component/SignIn";
import SignUp from "./Home/component/SignUp";
import CreateUser from "./CreateUser/CreateUser";
import { isauth } from "../redux/database/selectors";

import "./index.css";

const Layout = ({ children }: any) => {

  const [isModal, setisModal] = useState<'signin' | 'signup' | 'createuser' | null>(null)
  const isAuth = useSelector(isauth)

  const closeModal = () => {
    setisModal(null)
  }

  return (
    <>
      <header className="header">
        <h4 className="header__logo">
          <Link to={"/"}>MRN
          </Link>
        </h4>
        {
          isAuth ? <div className="header__menu">
            <Link to='/'>Home</Link>
            <Link to='/accounts'>Users Accounts</Link>
            <Link to='/fund-transfer'>Fund Teansefer</Link>
            <button onClick={() => setisModal("createuser")} title="create customer account">➕</button>
          </div> :
            <div className="header__btn">
              <button onClick={() => { setisModal("signin") }}>Sign In</button>
              <button onClick={() => { setisModal("signup") }}>Sign Up</button>
            </div>
        }
      </header>

      {children}

      <CreateUser isvisible={isModal === 'createuser'} onClose={closeModal} />
      <SignIn isvisible={isModal === 'signin'} onClose={closeModal} />
      <SignUp isvisible={isModal === 'signup'} onClose={closeModal} />

    </>
  )
}

export default Layout;