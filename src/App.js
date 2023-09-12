import "./App.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import Login from "./component/login";
import Form from "./component/form";
import Archive from "./component/archive";
import Signup from "./component/signup";


function App() {
  return (
    <PrimeReactProvider>
      <Login />
      <Form />
      <Archive />
    </PrimeReactProvider>
  );
}

export default App;
