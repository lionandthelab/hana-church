<script setup lang="ts">
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { onMounted, onUpdated, ref } from 'vue';
import StreamListItem from 'src/components/StreamListItem.vue';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const slide = ref(0);

const getData = async () => {
  let today = new Date();
  let todayString =
    today.getFullYear().toString() +
    '/' +
    (today.getMonth() + 1 < 10 ? '0' : '') +
    (today.getMonth() + 1).toString() +
    '/' +
    (today.getDate() < 10 ? '0' : '') +
    today.getDate().toString();
  let q;
  console.log(`today: ${todayString}`);
  q = query(collection(db, 'streams'), where('date', '==', todayString));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());

onUpdated(() => getData());
</script>
<template>
  <q-page style="width: 100%; max-height: 100vh">
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        swipeable
        animated
        :control-type="controlType"
        control-color="primary"
        navigation
        padding
        arrows
        height="90vh"
        class="rounded-borders"
      >
        <q-carousel-slide
          :name="key"
          v-for="(item, key) in items"
          :key="key"
          class="column no-wrap flex-center"
        >
          <StreamListItem :item="item" imgStyle="width:711px; height:400px" />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>
