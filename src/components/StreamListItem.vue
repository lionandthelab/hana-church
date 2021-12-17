<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
<<<<<<< HEAD
import {  fasList } from '@quasar/extras/fontawesome-v5';
=======
import { useQuasar } from 'quasar';
const $q = useQuasar();
>>>>>>> 892f2d6eeafa1743ef7a49189c5a1e9fcccd8bfa

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
  imgStyle: string;
  cardStyle: string;
}>();
const stream = computed(() => props.item.data());
const streamTo = computed(() => `/Watch/${props.item.id}`);
</script>
<template>
  <router-link :to="streamTo">
    <div class="fit">
      <q-card style="width: 100%" :style="props.imgStyle">
        <q-img
          :style="props.imgStyle"
          fit="cover"
          :src="stream.thumbnailUrl"
          :ratio="16 / 9"
        />
      </q-card>
      <div class="column" :style="props.cardStyle">
        <q-label
          style="
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          "
          class="row q-pa-xs text-h5 text-weight-bolder text-body1"
        >
          {{ stream.title }}
        </q-label>
        <q-label class="row q-pl-sm text-caption text-weight-light">
          {{ stream.preacher }}
        </q-label>
        <q-label class="row q-pl-sm text-caption text-weight-light">
          {{ stream.tag }} • {{ stream.date.split('T')[0] }}
        </q-label>
      </div>
    </div>
  </router-link>
</template>

<style></style>
