import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./components/Register";
import { Routes, Route } from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});


  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>
<<<<<<< HEAD
        {//<Route path="/login" element={<Login user={loggedUser} />}></Route>
        }
=======
        {/* {/* <Route path="/login" element={<Login user={loggedUser} />}></Route> */}
        <Route path="/register" element={<Register />}></Route> */
>>>>>>> 3587afee74425653482ff2df499cd1c9059e8995
      </Routes>
    </div>
  );
}

export default App;
