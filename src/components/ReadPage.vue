<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { isSigned, firebaseUser, useAuth } from 'src/composables/useAuth';
import { setDoc,
  doc,
  getDoc,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData, } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
const props = defineProps<{
  date: string;
}>();
const delay = (time:number) => {
  return new Promise(resolve => setTimeout(resolve, time));
}
const checkedDate = ref([]);
const item = ref<QueryDocumentSnapshot<DocumentData>>();
const getReadDate = async () => {
////////////////////////////////////
  while(firebaseUser.value == null){
    await delay(1000);
    useAuth();
  } //help this wonderful code
////////////////////////////////////
  checkedDate.value = [];
  const ref = doc(db, 'users', firebaseUser.value.uid);
  item.value = await getDoc(ref);
  if(item.value.data() == undefined){
    console.log('get read date undefined');
  }
  else if(item.value.data().checkedDate == undefined){
    console.log('get read date checkdate undefined');
  }
  else{
    checkedDate.value = item.value.data().checkedDate;
    console.log('checkedDate.value ', checkedDate.value);
  }

};
const setReadDate = async ( date:string) => {
  console.log('index ', checkedDate.value.indexOf(date));
  if(checkedDate.value.indexOf(date) < 0)
  {
    checkedDate.value.push(date);
    let registerd = false;
    await setDoc(doc(db, 'users', firebaseUser.value.uid), {
      'checkedDate' : checkedDate.value,
    })
    console.log('set read date ', checkedDate.value);
  }
  else{
    console.log('already registered');
    let idx = checkedDate.value.indexOf(date);
    checkedDate.value.splice(idx, 1) ;
    await setDoc(doc(db, 'users', firebaseUser.value.uid), {
      'checkedDate' : checkedDate.value,
    })
    console.log('set read date ', checkedDate.value);
  }

};
const registerReadData = () => {
  new Promise((resolve, reject) => {
    console.log('register read data');
    resolve(getReadDate());
    reject('register read data error');
  })
    .then(val => setReadDate( props.date))
    .then(val => updateEvents())
    .then(val => tt())
    .catch(e => console.log('Promise error - ' , e))
}
const setStyleBtn = () => {
  console.log('setStyleBtn - ', checkedDate.value.indexOf(props.date) )
  if(checkedDate.value.indexOf(props.date) > -1)
    return 'background-color:#3CD3AD';
  else 
    return 'background-color:#FFFFFF';
}
const updateEvents = () => {
  console.log('update events - ', checkedDate.value);
}
const tab = ref(0);
const bookList = ref([]);
const onClickComplete = () => {
  console.log('click ', props.date);
  registerReadData();
}
const onChangeTab = function(){
  bookList.value = [
    {
      title:'창세기1',
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..',
      }
    },
    {
      title:'창세기2',
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    }, 
    {
      title:'창세기3',
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    },
    {
      title:'창세기4',
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    }
    ];
  tab.value = 0;
}
const getCheckedDate = () => {
  return checkedDate.value
}
const emit = defineEmits<{
  (e: 'test', value: string[]): void
}>()
const tt = () => {
  console.log('tt', getCheckedDate())
  emit('test', getCheckedDate());
}
const init = () => {
  new Promise((resolve, reject) => {
    resolve(console.log('init start'));
    reject('init failed');
  })
    .then(() => onChangeTab())
    .then(() => getReadDate())
    .then(() => emit('test', getCheckedDate()))
    .catch(e => 'init failed')
}

onMounted(( )=>init())
</script>
<template>
  <div class="q-pa-md" >
    <div class="q-gutter-y-md" style="min-width: 70vw;">
      <q-card>
        <q-tabs 
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab 
          v-for="(book, i) in bookList"
          :key = i
          :name="i" :label="book.title" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
          <q-tab-panel 
          v-for="(book, i) in bookList"
          :key = i
          :name="i"
          >
            <div class="q-pb-lg">{{book.title}}</div>
            <div v-for="(verse, key) in book.verses" :key="key">
              <span>{{key}}.  </span>
              <span>{{verse}}</span>
            </div>
            <div  style=" display: table;  margin-left: auto;">
              <q-btn @click="onClickComplete()" v-if="i === bookList.length-1" :key="props.date" square icon="check" :style="setStyleBtn()"></q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<style>
#page{
  background-color: cadetblue;
}
</style>
