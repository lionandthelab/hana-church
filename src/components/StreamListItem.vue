<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
  imgStyle: string;
}>();
const stream = computed(() => props.item.data());
const streamTo = computed(() => `/Watch/${props.item.id}`);
</script>
<template>
  <div>
    <router-link :to="streamTo">
      <div class="fit">
        <q-card>
          <q-img
            :style="props.imgStyle"
            fit="fill"
            :src="stream.thumbnailUrl"
            :ratio="16 / 9"
          />
        </q-card>
        <div class="column">
          <q-label
            no-caps
            no-wrap
            class="q-pa-sm text-h5 text-weight-bolder text-body1"
            :class="$q.dark.isActive ? 'text-white' : 'text-black'"
          >
            {{ stream.title }}
          </q-label>
          <q-label
            id="infoPreacher"
            class="q-pl-sm text-caption text-weight-light"
          >
            {{ stream.preacher }}
          </q-label>
          <q-label
            id="infoPreacher"
            class="q-pl-sm text-caption text-weight-light"
          >
            {{ stream.tag }} • {{ stream.date.split('T')[0] }}
          </q-label>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style></style>
