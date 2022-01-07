<script setup lang="ts">
import ReadThruView from 'src/components/ReadThruView.vue';
import { firebaseUser } from 'src/composables/useAuth';
import { ref, watchEffect, onUpdated, computed } from 'vue';
import { db } from 'boot/firebase';
import {
  setDoc,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { fasBook } from '@quasar/extras/fontawesome-v5';
import { voiceList, setVoice, tts } from 'src/composables/useTts';

const makeDateString = function (date: Date) {
  const _month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const _date =
    date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  console.log(`makeDateString ${date.getFullYear()}/${_month}/${_date}`);
  return `${date.getFullYear()}/${_month}/${_date}`;
};

const myLocale = {
  days: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  daysShort: '일_월_화_수_목_금_토'.split('_'),
  months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  firstDayOfWeek: 0,
};

const readPlan = ref(1);
const fontSize = ref(20);
const options = [
  { label: '1독', value: 1 },
  { label: '2독', value: 2 },
  { label: '3독', value: 3 },
];
const dialog = ref(false);
const date = ref(makeDateString(new Date()));
const proxyDate = ref(makeDateString(new Date()));
const events = ref<string[]>([]);
const thisYearPercent = computed(() => {
  let year = Number(date.value.split('/')[0]);
  var thisYearDayCount = 0;
  var thisYearCheckedCount = events.value.filter(function (e) {
    return Number(e.split('/')[0]) == year;
  }).length;
  if (year % 4 == 0) thisYearDayCount = 366;
  else thisYearDayCount = 365;

  return ((thisYearCheckedCount / thisYearDayCount) * 100).toPrecision(2);
});

//date
const updateProxy = function () {
  proxyDate.value = date.value;
};
const moveDate = function () {
  date.value = proxyDate.value;
};
//date
//selected date
const dateStr = function () {
  let str = date.value.split('/');
  return str[0] + '년 ' + str[1] + '월 ' + str[2] + '일';
};
const onPrevDate = function () {
  let str = date.value.split('/');
  let day = new Date(
    parseInt(str[0]),
    parseInt(str[1]) - 1,
    parseInt(str[2]) - 1
  );
  date.value = makeDateString(day);
  proxyDate.value = date.value;
};
const onNextDate = function () {
  let str = date.value.split('/');
  let day = new Date(
    parseInt(str[0]),
    parseInt(str[1]) - 1,
    parseInt(str[2]) + 1
  );
  date.value = makeDateString(day);
  proxyDate.value = date.value;
};
//selected date
//firebase functions
const item = ref<QueryDocumentSnapshot<DocumentData>>();
const getUserInfo = async () => {
  if (firebaseUser.value !== null) {
    console.log(
      'getUserInfo -- firebaseUser.value.uid',
      firebaseUser.value.uid
    );
    const ref = doc(db, 'users', firebaseUser.value.uid);
    item.value = await getDoc(ref);
    if (item.value.data() == undefined) {
    } else if (item.value.data().readPlan == undefined) {
    } else {
      readPlan.value = item.value.data().readPlan;
      events.value = item.value.data().checkedDates;
      fontSize.value = item.value.data().fontSize;
    }
    checkInit.value = true;
  }
};
const setUserInfo = async () => {
  console.log('setUserInfo -- firebaseUser.value.uid', firebaseUser.value.uid);
  console.log('events: ', events);
  await setDoc(doc(db, 'users', firebaseUser.value.uid), {
    checkedDates: events.value,
    readPlan: readPlan.value,
    fontSize: fontSize.value,
  });
};
const registerUserInfo = () => {
  new Promise((resolve) => {
    resolve(setUserInfo());
  })
    .then(() => console.log('registerUserInfo'))
    .catch((e) => console.log('registerUserInfo errr -', e));
};
const updateEvents = (updatedEvent) => {
  events.value = updatedEvent;
};
//firebase functions
//update data & initialize
const checkInit = ref(false); //check firebase data set
watchEffect(() => {
  if (firebaseUser.value !== null) {
    if (!checkInit.value) {
      //initialize
      new Promise((resolve) => {
        resolve(console.log('init readthru'));
      })
        .then(() => getUserInfo())
        .catch((e) => console.log(e));
    } else registerUserInfo();
  }
});

const refeshUserInput = computed(() => {
  console.log('readPlan ', readPlan);
  console.log('date ', date);
  return readPlan.value.toString() + date.value;
});

onUpdated(() => updateProxy());
</script>
<template>
  <q-page-container style="padding: 0px">
    <q-page
      style="padding-top: 50px; width: 100%; height: 100%; overflow"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
      <q-page-sticky expand position="top" style="z-index: 999">
        <q-toolbar class="bg-primary text-white" style="border: 1px solid">
          <q-avatar>
            <q-icon :name="fasBook" />
          </q-avatar>
          <q-toolbar-title class="q-pa-xs"> 하나통독 </q-toolbar-title>
          <q-space />
          <div class="text-weight-bolder text-yellow-5">
            {{ thisYearPercent }}%
          </div>
          <!-- <q-btn to="/Stat/1" flat icon="person" round /> -->
          <q-btn flat icon="event" round>
            <q-popup-proxy
              @before-show="updateProxy()"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="proxyDate"
                :events="events"
                event-color="primary"
                :locale="myLocale"
                today-btn
              >
                <div class="row items-center justify-end q-gutter-sm">
                  <!-- <q-btn label="X" color="primary" flat v-close-popup /> -->
                  <q-btn
                    label="날짜 이동"
                    color="primary"
                    flat
                    @click="moveDate()"
                    v-close-popup
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          <q-btn flat round icon="settings" @click="dialog = true" />
        </q-toolbar>
      </q-page-sticky>
      <q-dialog v-model="dialog" class="overflow">
        <q-card>
          <q-card-section
            style="padding: 10px; display: flex; border-bottom: 1px solid grey"
          >
            <div class="full-width text-h6" style="text-align: center">
              설정
            </div>
            <q-btn
              flat
              v-close-popup
              square
              icon="close"
              padding="xs"
              style="margin-left: auto"
            />
          </q-card-section>

          <q-card-section class="items-center">
            <div class="col-3 text-body1">통독 플랜</div>
            <div class="col-9 q-px-md justify-center">
              <q-option-group
                name="preferred_genre"
                v-model="readPlan"
                :options="options"
                color="primary"
                inline
              />
            </div>
          </q-card-section>
          <q-card-section class="items-center">
            <div class="col-3 text-body1">글씨 크기</div>
            <div class="col-9 q-px-md full-width justify-center">
              <q-slider v-model="fontSize" :min="1" :max="75" />
            </div>
          </q-card-section>
          <q-card-section class="items-center" v-if="voiceList.length > 0">
            <div class="col-3 text-body1">목소리 변경</div>
            <div class="col-9 q-px-md full-width justify-center">
              <div v-for="(voice, i) in voiceList" :key="i">
                <div v-if="voice.lang == 'ko-KR'">
                  <q-btn
                    class="full-width items-start"
                    flat
                    @click="
                      setVoice(i);
                      $q.notify({
                        message: '목소리가 변경되었습니다.',
                        color: 'primary',
                        icon: 'announcement',
                      });
                    "
                  >
                    <q-icon name="mdi-play" />
                    <div>{{ voice.name }}</div>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="items-center">
            <div class="col-3 text-body1">읽기 속도 (배속)</div>
            <div class="col-9 q-px-md full-width justify-center">
              <q-item>
                <q-item-section side> 0.5x </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="tts.rate"
                    :min="0.5"
                    :max="2.0"
                    :step="0.1"
                    label
                    label-always
                  />
                </q-item-section>
                <q-item-section side> 2.0x </q-item-section>
              </q-item>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div
        class="row full-width justify-center"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <q-btn @click="onPrevDate()" flat color="grey" label="<" size="xl" />
        <div
          :key="date"
          class="q-pa-lg text-primary text-weight-bolder text-h5"
        >
          {{ dateStr() }}
        </div>
        <q-btn @click="onNextDate()" flat color="grey" label=">" size="xl" />
      </div>
      <ReadThruView
        :key="refeshUserInput"
        :date="date"
        :readPlan="readPlan"
        :checkedDates="events"
        :fontSize="fontSize"
        @updateEvents="updateEvents"
      />
    </q-page>
  </q-page-container>
</template>

<style>
#title {
  display: flex;
}
#menu {
  display: flex;
}
#repeat {
  margin-top: auto;
}
#date {
  margin-left: auto;
}
</style>
