import { useEffect, useState } from "react";
import "./App.css";
import Router from "./router/Router";

import publicRoutes from "./router/routes/publicRoutes";
import getRoutes from "./router/routes";

function App() {
  // const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const [allRoutes, setAllRoutes] = useState(publicRoutes);

  // useEffect(() => {
  //   const routes = getRoutes();
  //   console.log(routes);
  //   setAllRoutes(...allRoutes, routes);
  // }, []);

  useEffect(() => {
    const routes = getRoutes();
    console.log(routes);
    // Update allRoutes with the routes from getRoutes
    setAllRoutes((prevRoutes) => [...prevRoutes, routes]);
  }, []);

  return <Router allRoutes={allRoutes} />;
}

export default App;
