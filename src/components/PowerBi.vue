<template>
    <div ref="powerbiContainer" class="powerbi-container"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as powerbi from 'powerbi-client';
  
  const props = defineProps({
    accessToken: String,
    embedUrl: String,
    reportId: String
  });
  
  const powerbiContainer = ref(null);
  
  onMounted(() => {
    const embedConfiguration = {
      type: 'report',
      tokenType: powerbi.models.TokenType.Embed,
      accessToken: props.accessToken,
      embedUrl: props.embedUrl,
      id: props.reportId,
      permissions: powerbi.models.Permissions.All,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
      }
    };
  
    const powerbiService = new powerbi.service.Service(
      powerbi.factories.hpmFactory,
      powerbi.factories.wpmpFactory,
      powerbi.factories.routerFactory
    );
  
    powerbiService.embed(powerbiContainer.value, embedConfiguration);
  });
  </script>
  
  <style>
  .powerbi-container {
    height: 600px; /* Set height as needed */
    width: 100%;
  }
  </style>
  