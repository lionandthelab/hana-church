<script setup lang="ts">
import {} from 'vue';
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'map'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 오시는길 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between"></div>
    </div>
    <CommunityButtons />
  </q-page>
</template>
