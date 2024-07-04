
import Layout from "../Layout";



interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {

  // const [isModal, setisModal] = useState<'signin' | 'signup' | 'createuser' | null>(null)
  // const isAuth = useSelector(isAuthenicated)

  // const closeModal = () => {
  //   setisModal(null)
  // }

  // common page before login and after login

  return (
    <>
      {/* <header className="header">
        <h4 className="header__logo">
          <Link to={"/"}>MRN
          </Link>
        </h4>
        {
          !isAuth ? <div className="header__menu">
            <Link to={'/'}>Home</Link>
            <Link to={'/accounts'}>Users Accounts</Link>
            <Link to={'/fund-transfer'}>Fund Teansefer</Link>
            <button onClick={() => setisModal("createuser")} title="create customer account">➕</button>
          </div> :
            <div className="header__btn">
              <button onClick={() => { setisModal("signin") }}>Sign In</button>
              <button onClick={() => { setisModal("signup") }}>Sign Up</button>
            </div>
        }
      </header>

      <SignIn isvisible={isModal === 'signin'} onClose={closeModal} />
      <SignUp isvisible={isModal === 'signup'} onClose={closeModal} />

      {
        isAuth &&
        <>
          <CreateUser isvisible={isModal === 'createuser'} onClose={closeModal} />
          <FundTransfer isvisible={true} onClose={() => { }} />
        </>

      } */}


      <Layout>
        <center>
          <h1 className="center">
            Welcome To MRN Banking System
          </h1>
        </center>

      </Layout>



    </>
  )
}


