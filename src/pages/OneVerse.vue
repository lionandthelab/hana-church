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
import { onMounted, ref } from 'vue';
import StreamListItem from 'src/components/StreamListItem.vue';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

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
  q = query(collection(db, 'streams'), where('tag', '==', 'OneVerse'));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());
</script>
<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">ONE VERSE</div>
        <q-item v-for="(item, key) in items" :key="key">
          <StreamListItem :item="item" />
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>
