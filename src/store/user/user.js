export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};
export const setUserInfo = (userInfo) => {
  localStorage.setItem("USERINFO", JSON.stringify(userInfo));
};
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("USERINFO")) || {};
};
export const removeToken = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USERINFO");
};
