<template>
  <q-page style="width: 100%; height: 90vh">
    <div class="row text-center justify-center">
      <q-parallax src="../assets/hana-church-logo.png" :height="150">
        <div class="column full-width align-center">
          <div class="q-pa-xs text-weight-bolder text-h5">
            신촌하나교회에 오신 것을
          </div>
          <div class="q-pa-xs text-weight-bolder text-h4">환영합니다!</div>
        </div>
      </q-parallax>
    </div>
    <div class="q-pa-none fit">
      <q-carousel
        height="700px"
        fit="cover"
        animated
        v-model="slide"
        infinite
        :autoplay="autoplay"
        arrows
        padding
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          :name="1"
          img-src="https://firebasestorage.googleapis.com/v0/b/hana-church.appspot.com/o/images%2Fbaby.jpeg?alt=media&token=a9680c7c-54b6-4260-8651-25f54a193f32"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://firebasestorage.googleapis.com/v0/b/hana-church.appspot.com/o/images%2Fbapti.png?alt=media&token=a9680c7c-54b6-4260-8651-25f54a193f32"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://firebasestorage.googleapis.com/v0/b/hana-church.appspot.com/o/images%2Ftob.png?alt=media&token=a9680c7c-54b6-4260-8651-25f54a193f32"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://firebasestorage.googleapis.com/v0/b/hana-church.appspot.com/o/images%2Fplay2.png?alt=media&token=a9680c7c-54b6-4260-8651-25f54a193f32"
        />
      </q-carousel>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

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
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
});
</script>
