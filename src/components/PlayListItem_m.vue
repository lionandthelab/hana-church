<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
}>();
const stream = computed(() => props.item.data());
const streamTo = computed(() => `/messagelist/${stream.playlistName}`);
</script>
<template>
  <div min-width="200px">
    <router-link  :to="streamTo">
      <q-card>
        <q-img :src="stream.thumbnailUrl" :ratio="16 / 9"/>
      </q-card>
    </router-link>
  </div>
</template>
