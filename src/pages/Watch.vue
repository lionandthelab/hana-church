<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { db } from 'boot/firebase';
import StreamVideo from 'src/components/StreamVideo.vue';
import StreamScroll from 'src/components/StreamScroll.vue';

const props = defineProps<{
  id: { type: string };
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  console.log('[Debug] search[0] - ', props.id.toString().split('&')[0]);
  console.log('[Debug] search[0] - ', props.id.toString().split('&')[1]);
  let tag = props.id.toString().split('&')[0];
  let date = props.id.toString().split('&')[1];

  console.log(
    date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2)
  );

  q = query(
    collection(db, 'streams'),
    where('tag', '==', tag),
    where(
      'date',
      '==',
      date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2)
    )
  );
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  date;
  console.log('[Debug]', items.value[0].data());
};
onMounted(() => getData());
</script>
<template>
  <div>
    <div v-for="(item, key) in items" :key="key">
      <div class="row">
        <StreamVideo class="col-12 col-xs-12 col-md-7" :item="item" />
        <StreamScroll class="col-12 col-xs-8 col-md-4" />
      </div>
    </div>
  </div>
</template>
