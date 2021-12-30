<template>
  <q-page style="width: 100%; height: 90vh">
    <div class="q-pa-md fit">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        full-width
        full-height
      >
        <q-carousel-slide
          class="absolute-full"
          style="height: 1000px"
          :name="1"
          img-src="https://i.ibb.co/vY1YRbp/az.jpg"
        />
        <q-carousel-slide
          class="absolute-full"
          style="height: 1000px"
          :name="2"
          img-src="https://i.ibb.co/hyDm7KZ/jc.png"
        />
        <q-carousel-slide
          class="absolute-full"
          style="height: 1000px"
          :name="3"
          img-src="https://i.ibb.co/FxcGTf9/shyt.png"
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
