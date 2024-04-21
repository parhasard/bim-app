<template>
    <transition name="slide-fade">
        <div v-show="isOpen" class="panel">
            <!-- Panel content goes here -->
        </div>
    </transition>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    isOpen: Boolean
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* Starting and ending state for entering/leaving */
    {
    opacity: 0;
    transform: translateX(100%);
    /* Starts off-screen to the right */
}

.panel {
    height: 90vh;
    width: 40vw;
    /* Width of the panel when open */
    position: fixed;
    right: 2%;
    /* Panel is aligned to the right edge */
    top: 5%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 1000;
}
</style>