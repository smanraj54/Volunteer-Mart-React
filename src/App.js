import {BrowserRouter as Router,Switch, Route ,useHistory} from 'react-router-dom';
import './App.css';
import Delivery from './Delivery/Delivery';
import CustomerCareFooter from './CustomerCare/footer';
import CustomerCareHeader from './CustomerCare/header';
import Body from './CustomerCare/body';
import Payment from './PaymentManagement/Payment';
import { NavbarDetails } from './CartManagement/NavBarDetails';
import { Cart } from './CartManagement/Cart';
import HomePageCatalogue from './HomePage/HomePageCatalogue';
import Homepage from "./UserManagement/pages/Homepage";
import UserHomepage from "./UserManagement/pages/UserHomepage";
import Login from "./UserManagement/pages/Login";
import SignUp from "./UserManagement/pages/SignUp";
import ForgotPassword from "./UserManagement/pages/ForgotPassword";
import Question from "./UserManagement/pages/Question";
import UpdatePassword from "./UserManagement/pages/UpdatePassword";
//import AdminPanel from './AdminPage/AdminPanel';

function App() {
  const history = useHistory();  
  return (
    // <div>
    //     <NavbarDetails/>
    //     <Cart/>
    // </div>
    // <div>
    //   <Header/>
    //   <Main/>
    //   <Footer/>
    // </div>
    // <div style={{'height':'100%'}}>
    //   <Header />
    //   <Payment/>
    //   <Footer />
    // </div>
    <Router>
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/userHome">
        <UserHomepage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signUp">
        <SignUp />
      </Route>
      <Route exact path="/resetPassword">
        <ForgotPassword />
      </Route>
      <Route exact path="/question">
        <Question />
      </Route>
      <Route exact path="/updatePassword">
        <UpdatePassword />
      </Route>
      <Route exact path = "/home">
          {" "}
          <div>
            <NavbarDetails/>
            <HomePageCatalogue></HomePageCatalogue>
          </div>
      </Route>
      <Route path = "/Cart">
          {" "}
          <div>
            <NavbarDetails/>
            <Cart/>
          </div>
          {/* <h1>WELCOME TO SecondPage</h1> */}
      </Route>
      <Route path = "/Delivery">
          {" "}
          <div>
            <NavbarDetails/>
            <Delivery/>
          </div>
          {/* <h1>WELCOME TO SecondPage</h1> */}
      </Route>
      <Route path = "/CustomerCare">
          {" "}
          <div>
            <CustomerCareHeader/>
            <Body/>
            <CustomerCareFooter/>
          </div>
      </Route>
      <Route path = "/Payment">
          {" "}
          <div>
            <NavbarDetails/>
            <Payment/>
          </div>
      </Route>
      {/* <Route path = "/Admin">
          {" "}
          <div>
            <AdminPanel/>
          </div>
      </Route> */}
      <Route path = "/Wrong">
          {" "}
          <h1>Wrong Email and Password!!!</h1>
      </Route>
      <Route>
          {" "}
          <h1>WrongPage!!!</h1>
      </Route>
    </Switch>
</Router>

  );
}

export default App;