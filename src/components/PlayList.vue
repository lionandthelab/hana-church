

<script>
import { defineComponent } from 'vue'
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
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