
import { Route, Routes } from "react-router";
import Navigation from "./Navigation.jsx";
import Signin from "./Signin.jsx";



function App() {
  return(
    <>
    <Navigation/>
    <Routes>
      <Route path="/" ></Route>
      <Route path="/signin" element={<Signin/>}></Route>
    </Routes>
    </>
    
    

  );
}

export default App
