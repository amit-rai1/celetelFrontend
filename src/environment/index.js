
//For local setup -- LOcal Host
const local = {
  apiUrl: "http://localhost:",
  encryptionkey: "",
  PORT: '7600/api',
  API_BASEURL: "http://localhost:7600",
  SOCKET_URL: "ws://localhost:7600"
};

// For Staging server --  

const staging = {
  apiUrl: "",
  encryptionkey: "",
  PORT: '7600/api',
  API_BASEURL: "",
  SOCKET_URL: ""
};

// 54.201.160.69:9162
// const staging = {
//   // apiUrl: "http://54.190.192.105:",
//   // encryptionkey: "",
//   // PORT: '9121/api/v1',
//   // API_BASEURL: "http://54.190.192.105:9121",
//   // SOCKET_URL: "ws://54.190.192.105:9121"
// };

//For staging server port KEY can not be remove its using in application

const dev = {
  // apiUrl: "http://190.92.159.196:",
  // encryptionkey: "",
  // PORT: '9121/api/v1',
  // API_BASEURL: "http://190.92.159.196:9121",
  // SOCKET_URL: "ws://190.92.159.196:9121"

};

console.log("process.env.REACT_APP_ENV :", process.env.REACT_APP_ENV);

if (process.env.REACT_APP_ENV === "local") module.exports = local;
// else if (process.env.REACT_APP_ENV === "dev") module.exports = dev;
else if (process.env.REACT_APP_ENV === "staging") module.exports = staging;




// else module.exports = staging;

// else module.exports = dev;

else module.exports = local;



