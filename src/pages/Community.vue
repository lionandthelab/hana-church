<script setup lang="ts">
import {} from 'vue';
import CommunityButtons from '../components/CommunityButtons.vue';
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'people'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 공동체 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">
        <q-parallax src="../assets/hana-church-logo.png" :height="250">
          <div class="row full-width justify-center">
            <div class="q-pa-lg text-primary text-weight-bolder text-h4">
              사랑과 성령으로 충만한 제자들을 낳고 키우고 보내는
            </div>
          </div>
          <div class="row full-width justify-center">
            <div class="q-pa-lg text-primary text-weight-bolder text-h3">
              "초대교회같은 공동체"
            </div>
          </div>
        </q-parallax>
      </div>
    </div>
    <CommunityButtons />
  </q-page>
</template>
