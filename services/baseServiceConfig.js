// Define your API base URLs for each environment
const apiUrls = {
    herokuOld: "https://tattvachandrika-magazine-119814d66a82.herokuapp.com",
    heroku: "https://tattvachandrika-backend-a5f5d107dcde.herokuapp.com",
    website: "http://tattvachandrika.com",
    localhost: "http://localhost:3000"
  };

  console.log("Horopter:: API_ENV:", process, process.env, process.env.API_ENV);
  
  // Determine the environment from the API_ENV variable (default to 'localhost')
  const env = process.env.API_ENV || "localhost";
  
  // Set the API_BASE_URL based on the environment key; if the key isn't found, fallback to localhost
  export const API_BASE_URL = apiUrls[env] || apiUrls.localhost;
  export default API_BASE_URL;
