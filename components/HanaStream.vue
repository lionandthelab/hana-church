<template>
  <div class="fadeInBox">
    <v-row justify="center" align="center">
      <v-col>
        <!-- <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/watch?v=Z-NtPmIhokw"
    /> -->
        <LazyYoutube
          max-height="100%"
          max-width="100%"
          ref="lazyVideo"
          :src="url"
        />
        <!-- <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')">Stop</button>
    <button @click="handleClick('pauseVideo')">Pause</button>
    <button @click="handleClick('resetView')">Reset</button> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'

export default {
  name: 'HanaStream',
  components: { LazyYoutube },
  props: ['url'],
  data() {
    return {}
  },
  methods: {
    handleClick(event) {
      this.$refs.lazyVideo[event]()
    },
  },
}
</script>

<style>
.fadeInBox {
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
