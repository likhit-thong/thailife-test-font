import config from "@/config";
import axios from "axios";

const callGetEmpMater = async (reqInfo = {}) => {
  try {
    let path = `${config.apiLocation}/emp/master`;
    let { data } = await axios.get(path);
    return data;
  } catch (e) {
    return null;
  }
};

const callSearchEmployee = async (reqInfo = {}) => {
  try {
    let path = `${config.apiLocation}/emp/search?qr=${reqInfo.qr}&opt=${reqInfo.opt}`;
    let { data } = await axios.get(path);
    return data;
  } catch (e) {
    return null;
  }
};

const callSaveEmployee = async (reqInfo = {}) => {
  try {
    let path = `${config.apiLocation}/emp`;
    let { data } = await axios.post(path, reqInfo);
    console.log("Saved ---> ", data);
    return data;
  } catch (e) {}
};

const callUpdateEmployee = async (reqInfo = {}) => {
  try {
    let path = `${config.apiLocation}/emp/${reqInfo.empId}`;
    let { data } = await axios.post(path, reqInfo);
    console.log("Saved ---> ", data);
    return data;
  } catch (e) {}
};

const callRemoveEmployee = async (reqInfo = {}) => {
  try {
    let path = `${config.apiLocation}/employee`;
    //console.log("path ---> ", path);
  } catch (e) {}
};

const ApiService = {
  callSaveEmployee,
  callSearchEmployee,
  callGetEmpMater,
  callUpdateEmployee,
  callRemoveEmployee,
};

export default ApiService;
