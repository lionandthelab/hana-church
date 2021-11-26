<template>
  <q-page class="row items-center justify-evenly">
    <StreamList />
  </q-page>
</template>

<script lang="ts">
//import StreamComponent from 'components/Stream.vue';
import StreamList from 'src/components/StreamList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { StreamList },
  setup() {
    //
  },
});
</script>
