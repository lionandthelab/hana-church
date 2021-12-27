<template>
  <q-page
    class="q-pa-md row items-center justify-evenly full-height"
    style="width: 100%; max-height: 100vh"
  >
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between" style="width: 50vw">
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
    <div class="row q-pa-md">
      <q-card style="width: 100%">
        <q-img
          class="rounded-borders"
          loading="lazy"
          fit="contain"
          src="../assets/hana-church-logo.png"
          :ratio="16 / 9"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
if ('Notification' in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup() {
    //
  },
});
</script>
