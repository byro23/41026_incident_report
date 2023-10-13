import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primeicons/primeicons.css";

import Login from "./component/login";
import ForgetPassword from "./component/forgetPassword";
import Form from "./component/form";
import Archive from "./component/archive";
import Signup from "./component/signup";
import Home from "./component/home";
import ViewMalls from "./component/viewMalls";
import FormList from "./component/viewForms";
import SearchIncidents from "./component/searchForms";
import UserHome from "./component/userHome";
import AdminHome from "./component/adminHome";
import Incident from "./component/incident";
import EditIncident from "./component/editIncident";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login.js" element={<Login />} />
          <Route path="/form.js" element={<Form />} />
          <Route exact path="/archive.js" element={<Archive />} />
          <Route path="/incident/:id" element={<Incident />} />
          <Route path="/signup.js" element={<Signup />} />
          <Route path="/viewMalls.js" element={<ViewMalls />} />
          <Route path="/viewForms.js" element={<FormList />} />
          <Route path="/searchForms.js" element={<SearchIncidents />} />
          <Route path="/userHome.js/:userId" element={<UserHome />} />
          <Route path="/forgetPassword.js" element={<ForgetPassword />} />
          <Route path="/adminHome.js/:userId" element={<AdminHome />} />
          <Route path="/incident/:id/edit" element={<EditIncident />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
