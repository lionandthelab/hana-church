<script setup lang="ts">
import PlayList from 'src/components/PlayList.vue';
import PlayList_m from 'src/components/PlayList_m.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
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
const isMobile = () => {
  console.log('window size - ', window.innerWidth);
  return window.innerWidth < 600;
};
onMounted(() => getData());
onUpdated(() => getData());
</script>
<template>
  <q-page>
    <!-- <q-toolbar-title class='text-center text-weight-bold'>{{props.tag}}</q-toolbar-title> -->
    <!-- {{ tagList[props.tag] }} -->
    <div v-for="(item, i) in items" :key="i">
      <PlayList
        :tag="item.data().playlistName"
        :key="item.data().playlistName"
        v-if="!isMobile()"
      />
      <PlayList_m
        :tag="item.data().playlistName"
        :key="item.data().playlistName"
        v-if="isMobile()"
      />
    </div>
  </q-page>
</template>
