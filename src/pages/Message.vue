<script setup lang="ts">
import StreamList from 'src/components/StreamList.vue';
import { defineProps } from 'vue';
// const tagList = {
//   UCM: '토요 예배(UCM)',
//   JoyWorship: '조이 찬양',
//   HTS: '수요 예배(HTS)',
//   SundayWorship: '주일 예배',
//   JoyCorner: '조이 코너',
//   Prayer: '금요 기도회',
//   JoyTeen: '조이틴',
//   JoyTree: '조이 트리',
// };
const props = defineProps<{
  tag: string;
}>();
</script>
<template>
  <q-page>
    <!-- {{ tagList[props.tag] }} -->
    <q-item>
      <StreamList :tag="props.tag" :key="props.tag" />
    </q-item>
  </q-page>
</template>
