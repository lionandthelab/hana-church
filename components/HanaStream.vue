<template>
  <div class="HanaStream">
    <!-- <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/watch?v=Z-NtPmIhokw"
    /> -->
    <LazyYoutube
        ref="lazyVideo"
        :src=getData()
    />
    
    <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')">Stop</button>
    <button @click="handleClick('pauseVideo')">Pause</button>
    <button @click="handleClick('resetView')">Reset</button>
  </div>
</template>

<script>
    import { LazyYoutube } from "vue-lazytube";
    
    export default {
      data () {
        return{
          // streamingurl:"https://www.youtube.com/watch?v=Z-NtPmIhokw",
          streamingurl:"https://www.youtube.com/watch?v=sqH0u8wN4Rs"
        };
      },
      name: "HanaStream",
      components: {LazyYoutube},
      methods: {
        getData() {
          return this.hanaurl
        },
        handleClick(event) {
          this.$refs["lazyVideo"][event]();
        },
      },
      props: {
        hanaurl: {
          type: String,
          required: true,
        }
      },
    };
</script>

<style>
.HanaStream {
  height: 360px;
  width: 360px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
