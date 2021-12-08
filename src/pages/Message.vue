<script setup lang="ts">
<<<<<<< HEAD
import StreamList from 'src/components/StreamList.vue';
import PlayList from 'src/components/PlayList.vue';
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
console.log('[Message] props - ', props.tag)
=======
import PlayList from 'src/components/PlayList.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { onMounted, ref, defineProps, onUpdated } from 'vue';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }

  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
  console.log('[Debug]', items.value[0]);
};

onMounted(() => getData());
onUpdated(() => getData());
>>>>>>> 34697584216cc897c7b0dd2af023e8f3fd2e2398
</script>
<template>
  <q-page>
    <!-- {{ tagList[props.tag] }} -->
<<<<<<< HEAD
    <q-item>
      <PlayList :tag="props.tag" :key="props.tag"/>
      <!-- <StreamList :tag="props.tag" :key="props.tag" /> -->
    </q-item>
=======
      <div v-for="(item, i) in items" :key="i">
        <div :key="i">
          {{item.data().playlistName}}
        </div>
        <PlayList :tag="item.data().playlistName" :key="item.data().playlistName"/>
        </div>
      <!-- <div update :key='props.tag'>{{item}}</div> -->
      <!-- <StreamList :tag="props.tag" :key="props.tag" /> -->
>>>>>>> 34697584216cc897c7b0dd2af023e8f3fd2e2398
  </q-page>
</template>
