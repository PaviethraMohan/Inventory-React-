// environment.js
const env = process.env.NODE_ENV;

const development = {
  baseApiUrl: 'https://localhost:7100', // Change the port and protocol as needed
};


const config = {
  development,
};

export default config[env];
