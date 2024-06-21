import React, { useEffect, useState } from "react";
import { getNavs } from "../navigation";

const Sidebar = () => {
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs("admin");
    setAllNav(navs);
  }, []);
  console.log(allNav);
  return (
    <div>
      <h1>Sidebar</h1>
    </div>
  );
};

export default Sidebar;
