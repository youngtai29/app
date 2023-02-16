import { v4 as uuidv4 } from "uuid";
// 生成一个随机字符串作为后台识别用户的标识带给服务器
export const getUUID = () => {
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果浏览器没有没有uuid，生成一个
  if (!uuid_token) uuid_token = uuidv4();
  //本地存储生成的uuid
  localStorage.setItem("UUIDTOKEN", uuid_token);
  return uuid_token;
};
