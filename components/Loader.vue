<template>
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Loader"
  };
  </script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(243, 243, 243, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  