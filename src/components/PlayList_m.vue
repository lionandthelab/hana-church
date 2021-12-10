<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
import PlayListItem_m from 'src/components/PlayListItem_m.vue';
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
import { resolveTxt } from 'dns';
import { rejects } from 'assert';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const item = ref<QueryDocumentSnapshot<DocumentData>>();

const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, 'streams'), where('playlistName', '==', props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  item.value = items.value[0];
  console.log('items ', items.value[0]);
};

const test = function() {
  let arr = [];
  for(var i = 0 ; i < items.value.length ; i = i+4){
    try{
      let unit = [];
      items.value[i] != undefined?unit.push(items.value[i]):console.log('empty');
      items.value[i+1] != undefined?unit.push(items.value[i+1]):console.log('empty');
      items.value[i+2] != undefined?unit.push(items.value[i+2]):console.log('empty');
      items.value[i+3] != undefined?unit.push(items.value[i+3]):console.log('empty');
      arr.push(unit);
    }
    catch(e){
      console.log('catch - ', e);
    }
  }
  console.log('arr - ' ,arr)
  return arr;
}
const slide = ref(1);
onMounted(() => getData());

</script>
<template>
  <div class="q-pb-lg">
    <div v-for="(item , i ) in items.slice(0,1) " :key="i">
      <PlayListItem_m  :item="item" :len="items.length" /> 
    </div>
  </div>
</template>

<style>
q-card{
  display:flex
}
</style>