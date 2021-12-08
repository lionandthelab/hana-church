<<<<<<< HEAD


<script>
import { defineComponent } from 'vue'
=======
<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
>>>>>>> 34697584216cc897c7b0dd2af023e8f3fd2e2398
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
<<<<<<< HEAD
  getDatabase,ref, onValue
} from 'firebase/firestore';

export default defineComponent({
    name:'PlayList',
    props:{
        tag:{
            required:true,
            type:String
        }
    },
    setup(props) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'HTS')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log('No data available');
        }
        }).catch((error) => {
        console.error(error);
        });
    },
    mounted() {
        console.log('[PlayList] items ', this.items)
    }
})
</script>
<template>
  <div v-for="(item, i) in items" :key="i"> 
      play list {{item}}
  </div>  
</template>
=======
} from 'firebase/firestore';
import { onMounted, ref, defineProps } from 'vue';
import { rejects } from 'assert';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, 'streams'), where('playlistName', '==', props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }

  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
  console.log('[PlayList]', items.value[0].data());
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
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide v-for="(units, i) in test()" :key='i' :name="i" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <div class="full-width" v-for="(unit, i ) in units" :key='i'>
            <StreamListItem :item="unit" />
          </div>
        </div>
      </q-carousel-slide>
      <!-- <q-carousel-slide v-for="(item, i) in items" :key='i' :name="i" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <div class="col full-width">
            <StreamListItem :item="item" />
          </div>
        </div> -->
      <!-- </q-carousel-slide> -->
    </q-carousel>
  </div>
</template>
>>>>>>> 34697584216cc897c7b0dd2af023e8f3fd2e2398
