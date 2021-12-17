<script setup lang="ts">
import ReadPage from 'src/components/ReadPage.vue';
import { isSigned, firebaseUser, useAuth } from 'src/composables/useAuth';
import { ref, onMounted, computed, onUpdated, watchEffect } from 'vue';
import { db } from 'boot/firebase';
import { setDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData, } from 'firebase/firestore';
const readPlan = ref();
const options = [
        {
          label: '1독',
          value: 1
        },
        {
          label: '2독',
          value: 2
        },
        {
          label: '3독',
          value: 3
        }
      ];  
const dialog = ref(false);
const dialog2 = ref(false);
const date = ref('2021/12/15');
const proxyDate = ref('2021/12/15')
const events = ref(['2021/12/14','2021/12/13']);
const updateProxy = function() {
  proxyDate.value = date.value;
}
const save = function() {
  date.value = proxyDate.value;
}
const dateStr = function() {
  let str = date.value.split('/');
  return str[0] + '년 ' + str[1] + '월 ' + str[2] + '일';
}
const onPrevDate = function () {
  let str = date.value.split('/');
  let day = new Date(parseInt(str[0]), parseInt(str[1])-1, parseInt(str[2])-1);
  date.value = day.getFullYear().toString() + '/' + (day.getMonth()+1).toString() + '/' +day.getDate().toString();
  proxyDate.value = date.value;
}
const onNextDate = function () {
  let str = date.value.split('/');
  let day = new Date(parseInt(str[0]), parseInt(str[1])-1, parseInt(str[2])+1);
  date.value = day.getFullYear().toString() + '/' + (day.getMonth()+1).toString() + '/' +day.getDate().toString();
  proxyDate.value = date.value;
}
const update = (dd) => {
  console.log('update', dd);
  events.value = dd; 
  console.log('events.value ' , events.value);
}
const selectPlan = () => {
  console.log('selectPlan ');
}
const delay = (time:number) => {
  return new Promise(resolve => setTimeout(resolve, time));
}
const item = ref<QueryDocumentSnapshot<DocumentData>>();
const getUserInfo = async () => {
////////////////////////////////////
  while(firebaseUser.value == null){
    console.log('firebase null');
    await delay(1000);
    useAuth();
  } //help this wonderful code
////////////////////////////////////
firebaseUser.value == null
  const ref = doc(db, 'users', firebaseUser.value.uid);
  item.value = await getDoc(ref);
  if(item.value.data() == undefined){
    console.log('invalid user id')
  }
  else if(item.value.data().readPlan == undefined){
  }
  else{
    readPlan.value = item.value.data().readPlan;
  }
  console.log('read plan ', item.value.data().readPlan)
};
const setReadPlan= async ( plan:number) => {
  console.log('setReadPlan')
  await updateDoc(doc(db, 'users', firebaseUser.value.uid ), {
    'readPlan' : readPlan.value,
  })
};
const registerUserInfo = (plan:number) => {
  new Promise((resolve, reject) => {
    resolve(console.log('registerUserInfo'));
  })
    .then(val => setReadPlan(readPlan.value))
    .catch(e => console.log(e))
}
const init = () => {
  new Promise((resolve, reject) => {
    resolve(console.log('init readthru'));
  })
    .then(val => getUserInfo())
    .catch(e => console.log(e))
}
watchEffect(() => registerUserInfo(readPlan.value))
onMounted(() => init());
</script>
<template>
  <q-page padding>
    <div id='title'>
      <div class='q-pb-md text-h6'>하나통독</div>
    </div>
    <div id='menu'>

      <div id="date" class="">

        <q-btn icon="event" round color="primary">
          <q-popup-proxy @before-show="updateProxy()" cover transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDate" :events="events">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="save()" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>

    <q-btn  round icon="settings" color="primary" @click="dialog = true"  />
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section style="display:flex; border-bottom: 1px solid black;">
          <div class="text-h6">설정</div>
          <q-btn v-close-popup square icon="close" color="primary" padding="xs" style="margin-left:auto;"/>
        </q-card-section>
          
        <q-card-section class="row items-center q-gutter-sm">
          <span>통독 플랜</span>
        <q-option-group
          @change="selectPlan"
          name="preferred_genre"
          v-model="readPlan"
          :options="options"
          color="primary"
          inline
        />
        </q-card-section>
      </q-card>
    </q-dialog>

    </div>
      <div id='showDate'>
        <q-btn @click="onPrevDate()" round color="primary" label="<" align="around"/>
        <span :key="date" class="q-px-lg">{{dateStr()}}</span>
        <q-btn @click="onNextDate()"  label=">"  round color="primary"  align="around"/>
      </div>
      <read-page id='script' :date="date"  @test="update"></read-page>
  </q-page>
</template>

<style>
#showDate{
 display: table; 
 margin-left: auto; 
 margin-right: auto;
}
#title{
  display: flex;
}
#menu{
  display: flex;
}
#repeat{
  margin-top: auto;
}
#date{
  
  margin-left: auto;
}
#script{

}
</style>