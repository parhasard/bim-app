<template>
    <transition name="slide-fade">
        <div ref="powerbiContainer" v-show="isOpen" class="panel">
            <iframe width="800" height="600" :src="reportUrl" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    </transition>
</template>

<script setup>
import { defineProps } from 'vue'
import { onMounted, ref } from 'vue';
import * as powerbi from 'powerbi-client';

const props = defineProps({
    isOpen: Boolean,
    accessToken: String,
    embedUrl: String,
    reportId: String
})
const reportUrl = ref('https://app.powerbi.com/reportEmbed?reportId=_ngcontent-ng-c755602976...&autoAuth=true&ctid=...');



const powerbiContainer = ref(null);

// onMounted(() => {
//     const embedConfiguration = {
//         type: 'report',
//         tokenType: powerbi.models.TokenType.Embed,
//         accessToken: props.accessToken,
//         embedUrl: props.embedUrl,
//         id: props.reportId,
//         permissions: powerbi.models.Permissions.All,
//         settings: {
//             filterPaneEnabled: true,
//             navContentPaneEnabled: true
//         }
//     };

//     const powerbiService = new powerbi.service.Service(
//         powerbi.factories.hpmFactory,
//         powerbi.factories.wpmpFactory,
//         powerbi.factories.routerFactory
//     );

//     powerbiService.embed(powerbiContainer.value, embedConfiguration);
// });
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