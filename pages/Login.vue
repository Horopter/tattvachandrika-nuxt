<template>
  <div class="bg-amber-50 min-h-screen relative">
    <!-- Loader Component -->
    <Loader v-if="isLoading" />

    <!-- Header -->
    <header class="bg-orange-50">
      <div class="container mx-auto flex justify-between items-center p-4">
        <h1 class="text-xl font-bold text-orange-700">Hari Sarvottama</h1>
        <img src="../assets/images/Hanuma1.png" alt="hanuma" />
        <div class="relative flex flex-col items-center">
          <svg width="300" height="200">
            <defs>
              <path
                id="curve"
                d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
              />
            </defs>
            <text>
              <textPath xlink:href="#curve" startOffset="25%" text-anchor="middle">
                Sri Moola Gopala Krishno Vijayathe
              </textPath>
            </text>
          </svg>
          <img
            src="../assets/images/GopalaKrishna.png"
            alt="krishna"
            class="w-24 h-24 rounded-full absolute"
            style="top: 80px; left: 50%; transform: translateX(-50%)"
          />
        </div>
        <img src="../assets/images/hanuma2.png" alt="Bheema" />
        <h1 class="text-xl font-bold text-orange-700">Vaayu Jeevottama</h1>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto mt-6 p-6">
      <div class="bg-white rounded-lg shadow-lg p-6 mt-4">
        <h2 class="text-3xl font-bold text-center mb-4 text-orange-800">
          Welcome to Tattva Chandrika Login and Signup 
        </h2>

        <div class="tabs mb-6">
          <button
            @click="toggleTab('login')"
            :class="{ active: currentTab === 'login' }"
            class="tab-button"
          >
            Login
          </button>
          <button
            @click="toggleTab('signup')"
            :class="{ active: currentTab === 'signup' }"
            class="tab-button"
          >
            Sign Up
          </button>
        </div>

        <div v-if="currentTab === 'login'" class="form">
          <h2 class="text-xl font-bold text-center">Login</h2>
          <form @submit.prevent="login">
            <input
              v-model="loginData.username"
              type="text"
              placeholder="Username"
              required
              class="input-field"
            />
            <input
              v-model="loginData.password"
              type="password"
              placeholder="Password"
              required
              class="input-field"
            />
            <button type="submit" class="submit-button">Login</button>
          </form>
        </div>

        <div v-if="currentTab === 'signup'" class="form">
          <h2 class="text-xl font-bold text-center">Sign Up</h2>
          <form @submit.prevent="signup">
            <input
              v-model="signupData.first_name"
              type="text"
              placeholder="First Name"
              required
              class="input-field"
            />
            <span v-if="errors.first_name" class="error-message">
              {{ errors.first_name }}
            </span>

            <input
              v-model="signupData.last_name"
              type="text"
              placeholder="Last Name"
              required
              class="input-field"
            />
            <span v-if="errors.last_name" class="error-message">
              {{ errors.last_name }}
            </span>

            <input
              v-model="signupData.username"
              type="text"
              placeholder="Username"
              required
              class="input-field"
            />
            <span v-if="errors.username" class="error-message">
              {{ errors.username }}
            </span>

            <input
              v-model="signupData.email"
              type="email"
              placeholder="Email"
              required
              class="input-field"
            />
            <span v-if="errors.email" class="error-message">
              {{ errors.email }}
            </span>

            <input
              v-model="signupData.aadhaar"
              type="text"
              placeholder="Aadhaar Number"
              required
              class="input-field"
            />
            <span v-if="errors.aadhaar" class="error-message">
              {{ errors.aadhaar }}
            </span>

            <input
              v-model="signupData.mobile"
              type="text"
              placeholder="Mobile Number"
              required
              class="input-field"
            />
            <span v-if="errors.mobile" class="error-message">
              {{ errors.mobile }}
            </span>

            <input
              v-model="signupData.password"
              type="password"
              placeholder="Password"
              required
              class="input-field"
            />
            <span v-if="errors.password" class="error-message">
              {{ errors.password }}
            </span>

            <input
              v-model="signupData.re_password"
              type="password"
              placeholder="Re-enter Password"
              required
              class="input-field"
            />
            <span v-if="errors.re_password" class="error-message">
              {{ errors.re_password }}
            </span>

            <button type="submit" class="submit-button">Sign Up</button>
          </form>
        </div>

        <toast-message
          v-if="toastVisible"
          :message="toastMessage"
          @close="toastVisible = false"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import ToastMessage from "./ToastMessage.vue";
import { API_BASE_URL } from "~/services/baseServiceConfig";
import Loader from "~/components/Loader.vue";
import loadingMixin from "~/mixins/loadingMixin.js";

export default {
  components: {
    ToastMessage,
    Loader
  },
  mixins: [loadingMixin],
  data() {
    return {
      currentTab: "login",
      loginData: {
        username: "",
        password: "",
      },
      signupData: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        aadhaar: "",
        mobile: "",
        password: "",
        re_password: "",
      },
      errors: {},
      toastVisible: false,
      toastMessage: "",
    };
  },
  methods: {
    toggleTab(tab) {
      this.currentTab = tab;
      this.errors = {};
    },
    validateSignup() {
      this.errors = {};
      let isValid = true;
      if (!this.signupData.first_name) {
        this.errors.first_name = "First Name is required.";
        isValid = false;
      }
      if (!this.signupData.last_name) {
        this.errors.last_name = "Last Name is required.";
        isValid = false;
      }
      if (!this.signupData.username) {
        this.errors.username = "Username is required.";
        isValid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.signupData.email) {
        this.errors.email = "Email is required.";
        isValid = false;
      } else if (!emailPattern.test(this.signupData.email)) {
        this.errors.email = "Invalid email format.";
        isValid = false;
      }
      if (!this.signupData.aadhaar) {
        this.errors.aadhaar = "Aadhaar Number is required.";
        isValid = false;
      }
      const mobilePattern = /^[0-9]{10}$/;
      if (!this.signupData.mobile) {
        this.errors.mobile = "Mobile Number is required.";
        isValid = false;
      } else if (!mobilePattern.test(this.signupData.mobile)) {
        this.errors.mobile = "Invalid mobile number format.";
        isValid = false;
      }
      if (!this.signupData.password) {
        this.errors.password = "Password is required.";
        isValid = false;
      }
      if (this.signupData.password !== this.signupData.re_password) {
        this.errors.re_password = "Passwords do not match.";
        isValid = false;
      }
      return isValid;
    },
    async login() {
      await this.runWithLoader(() =>
        axios.post(API_BASE_URL + "/api/adminusers/login/", this.loginData)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$router.push({ name: "HomePage" });
          })
          .catch((error) => {
            console.error("Login failed:", error.response.data);
            alert("Login failed: " + error.response.data.error);
          })
      );
    },
    async signup() {
      if (this.validateSignup()) {
        await this.runWithLoader(() =>
          axios.post(API_BASE_URL + "/api/adminusers/signup/", {
            username: this.signupData.username,
            email: this.signupData.email,
            first_name: this.signupData.first_name,
            last_name: this.signupData.last_name,
            aadhaar: this.signupData.aadhaar,
            mobile: this.signupData.mobile,
            password: this.signupData.password,
          })
          .then((response) => {
            console.log(response.data);
            this.toastMessage = "Sign up successful! Please log in.";
            this.toastVisible = true;
            this.toggleTab("login");
          })
          .catch((error) => {
            console.error("Sign up failed:", error);
            if (error.response && error.response.data) {
              alert(
                "Sign up failed: " +
                (error.response.data.error ||
                  error.response.data.detail ||
                  "Unknown error")
              );
            } else {
              alert("Sign up failed: " + (error.message || "Network error"));
            }
          })
        );
      }
    },
  },
};
</script>

<style scoped>
.bg-amber-50 {
  background-color: #fbbf24;
}
.bg-orange-50 {
  background-color: #feebc8;
}
.bg-orange-100 {
  background-color: #ffedd5;
}
.text-orange-700 {
  color: #b45309;
}
.text-orange-800 {
  color: #9a3412;
}
.container {
  max-width: 600px;
}
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.tab-button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #feab00;
  color: #b45309;
  transition: background-color 0.3s, color 0.3s;
}
.tab-button.active {
  background-color: #feab00;
  color: white;
}
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #feab00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.submit-button:hover {
  background-color: #e9b300;
}
.error-message {
  color: red;
  font-size: 0.875rem;
}
</style>
