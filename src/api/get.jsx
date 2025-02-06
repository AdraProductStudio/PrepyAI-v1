import axios from "axios";
import { getUserEmailID } from "../services/Storage";
const emailID = getUserEmailID();    
export default axios.create({
  baseURL: "https://prepyaiapi.adraproductstudio.com",



  auth: {
    username: `${emailID}##googleweb`,
    password:
      "fc153ac36455604c6a6bcb3e22c0a4debfb746d59ad4a33a4b0d50f315206958d78da64e88957993e537e5ef235537a65ac0bc8fbaa725ae3e8e151617e82b81",
  },
});
