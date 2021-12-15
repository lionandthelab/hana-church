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
import { fasDiceOne } from '@quasar/extras/fontawesome-v5';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  q = query(collection(db, 'streams'), where('tag', '==', 'OneVerse'));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );

  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());
</script>
<template>
  <q-page style="width: 100%; max-height: 100vh">
    <div class="q-pa-xl text-weight-bolder text-h4 justify-center">
      <q-icon size="md" :name="fasDiceOne" />
      ONE VERSE
    </div>
    <div class="row q-pa-md">
      <StreamListItem
        class="q-pa-lg col-6 col-md-4"
        :item="item"
        v-for="(item, key) in items"
        :key="key"
      />
    </div>
  </q-page>
</template>
