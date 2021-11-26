<template>
  <div>
    <p>{{ title }}</p>
    <div class="row">
      <div class="col-12 col-sm-4 col-md-3 q-pa-md" v-for="stream in streams" :key="stream.id" @click="increment">
            <q-card class="my-card">
            <q-img
              :src="stream.thumbnailUrl"
              :ratio="16/9"
            />
            

          <q-card-section>
            <div class="text-h6">{{stream.title}}</div>
            <div class="text-subtitle2">{{stream.tag}}</div>
            <div class="text-subtitle2">{{stream.date}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <p>Meta(props example): {{ meta.totalCount }}</p>
    <p>Clicks(local ref example): {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue';
import { Stream, Meta } from './models';

function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1;
    return clickCount.value;
  }

  return { clickCount, increment };
}

function useDisplayStream(streams: Ref<Stream[]>) {
  const streamCount = computed(() => streams.value.length);
  return { streamCount };
}

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    streams: {
      type: Array as PropType<Stream[]>,
      default: () => [],
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },
  },
  setup(props) {
    return { ...useClickCount(), ...useDisplayStream(toRef(props, 'streams')) };
  },
});
</script>
