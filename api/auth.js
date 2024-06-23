import axios from "axios";
import {BACKEND_URL} from "./const"

export function login(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${BACKEND_URL}/auth/login`, data)
      .then(res => {
        const token = res.data.access_token;
        if (token) {
          localStorage.setItem("authToken", token);
          resolve(true); // Indicate successful login
        } else {
          reject("Invalid credentials"); // Indicate login failure due to invalid credentials
        }
      })
      .catch(error => {
        console.error("Error occurred during login:", error);
        reject("Login failed"); // Indicate login failure due to error
      });
  });
}


// export function getToken(){
//     const token =localStorage.getItem("authToken");
//     return token;
// }

export function isAuthenticated(){
    const token =localStorage.getItem("authToken");
    return !!token
}