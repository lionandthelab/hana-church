<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  q = query(collection(db, 'streams'));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
};

onMounted(() => getData());
</script>
<template>
  <div class="q-mt-md q-mr-md">
    <q-layout
      view="lHh Lpr lFf"
      container
      style="min-height: 500px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <q-icon name="bookmark"></q-icon>
            </q-avatar>
            재생목록
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <p v-for="(item, key) in items" :key="key">
            <StreamListItem :item="item" />
          </p>
          <q-page-scroller
            position="bottom-right"
            :scroll-offset="150"
            :offset="[18, 18]"
          >
            <q-btn fab icon="keyboard_arrow_up" color="accent" />
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
