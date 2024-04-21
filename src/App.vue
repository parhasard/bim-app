<template>
  <the-viewer></the-viewer>
  <the-sidebar :toggle-panel="togglePanel"></the-sidebar>
  <the-panel :is-open="isOpen"></the-panel>
</template>

<script setup>
import { ref } from 'vue'
import TheViewer from "./pages/TheViewer.vue"
import TheSidebar from "./components/TheSidebar.vue"
import ThePanel from "./components/ThePanel.vue"

const isOpen = ref(false)

function togglePanel() {
  isOpen.value = !isOpen.value
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    overflow: hidden;
}
</style>
