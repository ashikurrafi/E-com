import allNav from "../navigation/allNav";

const getNavs = (role) => allNav.filter((nav) => nav.role === role);

export default getNavs;
