
<template>
  <div class="container" ref="container">
    <!-- <canvas ref="canvas" class="canvas"> </canvas> -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRaw  } from "vue";
import ThreeScene from "../helpers/scene/ifcScene";
const container = ref(null);
let sceneManager;
const selectedProperties = ref(null)


const handleResize = () => {
    if (sceneManager && container.value) {
        sceneManager.updateSize();
    }
};

onMounted(() => {
  
  if (container.value) {
    window.addEventListener('resize', handleResize);
    sceneManager = new ThreeScene(container.value);
    console.log("Container:", container.value);
    sceneManager.initScene();
    sceneManager.setSelectionChangedCallback((props) => {
      selectedProperties.value = props;
      console.log(toRaw(selectedProperties.value))
    });
    
  } else {
    console.error("Sth bad happened");
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style >
.container {
  top: 0;
  left: 0;
  max-width: 100vw;
  height: 100vh;
  position: relative;
}
</style>