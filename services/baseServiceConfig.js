// baseconfig.js

const apiUrls = {
    herokuOld: "https://tattvachandrika-magazine-119814d66a82.herokuapp.com",
    heroku: "https://tattvachandrika-backend-a5f5d107dcde.herokuapp.com",
    website: "https://tattvachandrika.com",
    localhost: "http://localhost:3000"
  };

  console.log("Full env:", import.meta.env);
  console.log("NUXT_PUBLIC_API_ENV:", import.meta.env.NUXT_PUBLIC_API_ENV);
  console.log("Horopter:: API_ENV:", import.meta.env.NUXT_PUBLIC_API_ENV);
  
  // Determine the environment from the NUXT_PUBLIC_API_ENV variable (default to 'localhost')
  const env = import.meta.env.NUXT_PUBLIC_API_ENV || "localhost";
  
  // Set the API_BASE_URL based on the environment key; if the key isn't found, fallback to localhost
  export const API_BASE_URL = apiUrls[env] || apiUrls.localhost;
  export default API_BASE_URL;  