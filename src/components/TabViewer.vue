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
import { onMounted, ref, defineProps } from 'vue';
import StreamListItem from 'src/components/StreamListItem.vue';

const props = defineProps<{
  date: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const tab = ref('');

const getData = async () => {
  let q;
  q = query(collection(db, 'streams'), where('date', '==', props.date));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());
</script>
<template>
  <div class="q-pa-md">
    <q-card>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          v-for="(item, key) in items"
          :key="key"
          :name="item.data().tag"
        >
          <StreamListItem :item="item" />
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />

      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="(item, key) in items"
          :key="key"
          :name="item.data().tag"
          :label="item.data().tag"
        />
      </q-tabs>
    </q-card>
  </div>
</template>
