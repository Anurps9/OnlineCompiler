import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useEffect, useState } from "react";
import cookie from 'react-cookies'
import { routes } from "./routes";
import axios from "axios";
import RequireAuth from "./Components/RequireAuth";
import Home from "./Components/Home";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const userId = cookie.load('userId')
    if(userId){
      axios
      .get(`/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' key='/' element={<RequireAuth><Home /></RequireAuth>}>
            {
              routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))
            }
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
