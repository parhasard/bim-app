<template>
  <div class="sidebar">
    <button class="logo-button" @click="toggle">
      <img src="/power-bi.svg" alt="Power BI Logo">
    </button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  togglePanel: Function
})
function toggle() {
  props.togglePanel()
}
</script>

<style scoped>
.sidebar {
  height: 90vh;
  width: 5vw;  /* Adjust the width if necessary */
  position: fixed;
  left: 0;
  top: 0;
  padding:1em;
  top:5%;
  left:2%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  box-sizing: border-box;
  padding: 0; /* Remove padding if previously added */
}

.logo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Added to ensure any effects stay within the button's border */
  transition: background-color 0.3s ease, opacity 0.3s ease;
  width:90%;
}

.logo-button img {
  max-width: 60%;  /* Reduce the width to avoid filling the entire sidebar width */
  height: auto; /* Keeps the aspect ratio of the image */
  transition: filter 0.3s ease; /* Smooth transition for the filter */
}

.logo-button:hover {
  background-color: var(--primary-color); /* Ensures the background color changes on hover */
}

.logo-button:hover img {
  filter: invert(100%); /* Applies the filter only to the image */
}
</style>
