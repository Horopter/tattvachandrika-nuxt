<template>
  <div class="bg-amber-50 min-h-screen">
    <!-- Header -->
    <header class="bg-orange-50">
      <div class="container mx-auto flex justify-between items-center py-4">
        <h1 class="text-xl font-bold text-orange-700">Hari Sarvottama</h1>
        <img
          src="/assets/images/Hanuma.png"
          alt="hanuma"
          class="w-30 h-30 object-contain"
        />
        <div class="relative flex flex-col items-center">
          <svg width="300" height="200">
            <defs>
              <path
                id="curve"
                d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
              />
            </defs>
            <text>
              <textPath xlink:href="#curve" startOffset="25%" text-anchor="middle">
                Sri Moola Gopala Krishno Vijayathe
              </textPath>
            </text>
          </svg>
          <img
            src="/assets/images/GopalaKrishna.png"
            alt="krishna"
            class="w-100 h-100 rounded-full absolute"
            style="top: 80px; left: 50%; transform: translateX(-50%)"
          />
        </div>
        <img
          src="/assets/images/Garuda.png"
          alt="garuda"
          class="w-30 h-30 object-contain"
        />
        <h1 class="text-xl font-bold text-orange-700">Vaayu Jeevottama</h1>
      </div>
    </header>

    <!-- Institution Name -->
    <section class="text-orange-800 text-center py-4 bg-orange-100">
      <h2 class="text-2xl font-bold">
        Sri Jagadguru Sriman Madhvacharya Moola Maha Samsthanam
      </h2>
      <h3 class="text-xl">Sri Rajendratirthiya Poorvadi Matha</h3>
      <h3 class="font-bold text-2xl">Sri Vyasaraaja Matha (Sosale)</h3>
    </section>

    <!-- Main content -->
    <main class="container mx-auto mt-6 p-6">
      <div class="bg-white rounded-lg shadow-lg p-6 mt-4">
        <h2 class="text-3xl font-bold text-center mb-4 text-orange-800">
          Sri Tattvachandrika: Your Monthly Companion for Spiritual Growth and Knowledge
        </h2>

        <!-- Slideshow Section with Lamps -->
        <div class="flex justify-center items-center mb-6 bg-gray-800 p-4">
          <!-- Left Lamp (Mirror Image) -->
          <img
            src="/assets/images/diya.gif"
            alt="Lamp"
            class="w-40 h-55 mr-4"
            style="transform: scaleX(-1);"
          />
          <!-- Slideshow Container -->
          <div class="relative w-full max-w-2xl h-[600px] flex items-center justify-center bg-gray-900">
            <transition name="fade" mode="out-in">
              <img
                :src="currentImage"
                alt="Samsthaana Pratima"
                class="rounded-lg shadow-md max-h-full object-contain"
                :key="currentImage"
              />
            </transition>
          </div>
          <!-- Right Lamp -->
          <img
            src="/assets/images/diya.gif"
            alt="Lamp"
            class="w-40 h-55 ml-4"
          />
        </div>

        <div class="p-4 bg-orange-100 text-center">
          <h1 class="text-xl font-sans font-semibold text-orange-900">
            Our Previous Editions
          </h1>
        </div>

        <!-- Carousel of Previous Editions using Vue Splide -->
        <div class="mt-8">
          <client-only>
            <Splide :options="splideOptions">
              <SplideSlide v-for="(edition, index) in editions" :key="index">
                <div class="bg-orange-100 rounded-lg shadow-md p-4">
                  <img
                    :src="edition.image"
                    :alt="edition.alt"
                    class="w-full rounded-lg mb-4"
                  />
                  <p class="text-center text-orange-800 font-bold">
                    {{ edition.title }}
                  </p>
                </div>
              </SplideSlide>
            </Splide>
          </client-only>
        </div>

        <!-- Call-to-Action Section -->
        <div class="m-8 p-4 bg-orange-100">
          <h1 class="text-2xl font-semibold font-sans text-center text-orange-950">
            Want to be a subscriber to Sri Tattvachandrika Monthly Magazine of Sri Vyasaraja Matha?
          </h1>
          <h1 class="text-xl font-semibold font-sans underline text-red-500 text-center mt-5">
            <NuxtLink to="https://google.com" target="_blank">
              Registration Link
            </NuxtLink>
          </h1>
        </div>
        <div class="m-8 p-4 bg-orange-100">
          <h1 class="text-2xl font-semibold font-sans text-center text-orange-950">
            Admin Login :
          </h1>
          <h1 class="text-xl font-semibold font-sans underline text-red-500 text-center mt-5">
            <NuxtLink to="/Login" target="_blank">
              Click Here
            </NuxtLink>
          </h1>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

// Splide options for the carousel
const splideOptions = {
  type: "loop",
  perPage: 4,
  gap: "20px",
  autoplay: true,
  pauseOnHover: true,
  pagination: false,
  arrows: true,
};

// Editions data for the carousel
const editions = [
  {
    image: new URL("~/assets/images/feb.jpg", import.meta.url).href,
    alt: "February 2024",
    title: "February 2024",
  },
  {
    image: new URL("~/assets/images/march.jpg", import.meta.url).href,
    alt: "March 2024",
    title: "March 2024",
  },
  {
    image: new URL("~/assets/images/april.jpg", import.meta.url).href,
    alt: "April 2024",
    title: "April 2024",
  },
  {
    image: new URL("~/assets/images/may.jpg", import.meta.url).href,
    alt: "May 2024",
    title: "May 2024",
  },
  {
    image: new URL("~/assets/images/june.jpg", import.meta.url).href,
    alt: "June 2024",
    title: "June 2024",
  },
  {
    image: new URL("~/assets/images/july.jpg", import.meta.url).href,
    alt: "July 2024",
    title: "July 2024",
  },
  {
    image: new URL("~/assets/images/august.jpg", import.meta.url).href,
    alt: "August 2024",
    title: "August 2024",
  },
  {
    image: new URL("~/assets/images/september.jpg", import.meta.url).href,
    alt: "September 2024",
    title: "September 2024",
  },
];

// Slideshow for the main image section using images from the samsthaana-pratimas folder
const imagesImport = import.meta.glob("~/assets/images/samsthaana_pratimas/*.{jpg,jpeg,png}", { eager: true });
const slideshowImages = Object.values(imagesImport).map((mod) => mod.default);
const currentIndex = ref(0);
const currentImage = ref(slideshowImages[0] || "");

// Update the current image every 9 seconds
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slideshowImages.length;
    currentImage.value = slideshowImages[currentIndex.value];
  }, 9000);
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
svg text {
  font-size: 18px;
  font-weight: bold;
  fill: rgb(141, 12, 12);
}

header {
  padding: 10px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
