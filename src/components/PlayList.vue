<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
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

const props = defineProps<{
  playlistName: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const getData = async () => {
  let q;
  if (props.playlistName) {
    q = query(
      collection(db, 'streams'),
      where('playlistName', '==', props.playlistName)
    );
  } else {
    q = query(collection(db, 'streams'));
  }

  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort((a, b) => {
    /* eslint-disable @typescript-eslint/prefer-regexp-exec */
    var a_numbers: number[] = (a.data().title as string).match(/(\d+)/);
    var b_numbers: number[] = (b.data().title as string).match(/(\d+)/);
    if (a_numbers == undefined) {
      return (a.data().title > b.data().title && 1) || -1;
    }
    return (
      (parseInt(a_numbers[a_numbers.length - 1]) >
        parseInt(b_numbers[b_numbers.length - 1]) &&
        1) ||
      -1
    );
  });
};

onMounted(() => getData());
</script>
<template>
  <div class="q-py-sm q-px-md">
    <div class="q-pa-xs text-weight-bold text-h6 justify-center">
      # {{ props.playlistName }}
    </div>
    <q-scroll-area style="height: 235px; max-width: 100%">
      <div class="row fit justify-start items-start q-gutter-xs no-wrap">
        <StreamListItem
          class="q-pa-xs"
          imgStyle="width: 200px; height: 112px;"
          cardStyle="width: 200px; height: 112px;"
          :item="item"
          v-for="(item, key) in items"
          :key="key"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped></style>
