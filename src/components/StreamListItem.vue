<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
}>();
const stream = computed(() => props.item.data());
</script>
<template>
  <div>
    <router-link
      :to="'/Watch/' + stream.tag + '&' + stream.date.split('/').join('')"
    >
      <q-card class="my-card">
        <q-img :src="stream.thumbnailUrl" :ratio="16 / 9" />
        <q-card-section>
          <div class="text-h6">
            {{ stream.title }}
          </div>
          <div class="text-subtitle2">{{ stream.tag }}</div>
          <div class="text-subtitle2">{{ stream.date }}</div>
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>
