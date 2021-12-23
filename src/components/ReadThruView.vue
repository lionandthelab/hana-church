<script setup lang="ts">
import {
  ref,
  onMounted,
  defineProps,
  watchEffect,
  watch,
  computed,
  defineEmits,
} from 'vue';
import { isSigned } from 'src/composables/useAuth';

import ChapterView from 'src/components/ChapterView.vue';
import { Schedule, ScheduleResponse } from 'components/models';
import { bookStringTableKr } from 'components/strings';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const props = defineProps<{
  date: string;
  readPlan: number;
  checkedDates: string[];
  fontSize: number;
}>();
const emit = defineEmits<{
  (e: 'updateEvents', value: string[]): void;
}>();
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

const checkedDates = ref(props.checkedDates); //date list of readers

//update date list of readers
const setReadDate = (date: string) => {
  if (checkedDates.value.indexOf(date) < 0) {
    console.log('registered');
    checkedDates.value.push(date);
  } else {
    console.log('already registered');
    let idx = checkedDates.value.indexOf(date);
    checkedDates.value.splice(idx, 1);
    console.log('set read date ', checkedDates.value);
  }
  if (checkedDates.value === undefined) emit('updateEvents', []);
  else emit('updateEvents', checkedDates.value);
};

//update date list of readers
//set check button's style by reader's status
const setStyleBtn = () => {
  if (props.checkedDates === undefined || props.date === undefined)
    return 'background-color:#FFFFFF';
  else if (props.checkedDates.indexOf(props.date) > -1)
    return 'background-color:#3CD3AD';
  else return 'background-color:#FFFFFF';
};

//set check button's style by reader's status
const tab = ref(0); //bible script tab
const schedules = ref<Schedule[]>([]); //today's bible list

function getNotationString(bookId: number, chapter: number): string {
  if (bookId == 18) {
    return `${bookStringTableKr[bookId]}${chapter}편`;
  } else {
    return `${bookStringTableKr[bookId]}${chapter}장`;
  }
  return;
}

//staus changed (read -> unread) or (unread -> read)
const onClickComplete = () => {
  console.log('click ', props.date);
  setReadDate(props.date);
  $q.notify({
    message: '달력에 표시되었습니다.',
    color: 'primary',
    icon: 'announcement',
  });
};

// FIXME
const getScheduleKeys = () => {
  var scheduleKeys = [];
  const targetDate = new Date(props.date);
  const readPlan = props.readPlan;
  console.log(`targetDate: ${targetDate.toString()}`);

  const firstDayOfTargetDate = new Date(targetDate.getFullYear(), 0, 1);

  const diffFromFirstDay = Math.round(
    Math.abs((targetDate - firstDayOfTargetDate) / oneDay)
  );
  console.log(`firstDayOfTargetDate: ${firstDayOfTargetDate.toString()} `);
  console.log(`diffFromFirstDay: ${diffFromFirstDay * readPlan} `);

  for (var i = 0; i < readPlan; i++) {
    var _date = new Date(firstDayOfTargetDate);
    _date.setDate(_date.getDate() + diffFromFirstDay * readPlan + i);
    console.log(`_date: ${_date.toString()}`);
    var month = _date.getMonth() + 1;
    var day = _date.getDate();
    console.log(`new key: ${month}/${day}`);

    scheduleKeys.push(`${month}/${day}`);
  }

  return scheduleKeys;
};

const getData = async () => {
  const scheduleKeys: string[] = getScheduleKeys();
  // const scheduleKeys: string[] = [`${month}/${day}`];
  schedules.value = [];
  return fetch('https://api.lionandthelab.club/schedule')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (var i = 0; i < scheduleKeys.length; i++) {
        console.log(`scheduleKeys: ${scheduleKeys[i]}`);
        console.log(
          'response[scheduleKey]: ',
          (data as ScheduleResponse)[scheduleKeys[i]]
        );

        schedules.value = schedules.value.concat(
          (data as ScheduleResponse)[scheduleKeys[i]]
        );
        console.log(schedules.value);
      }
      console.log(`schedules: ${schedules.value[0].bookId}`);
    });
};

//check status
watchEffect(() => {
  checkedDates.value = props.checkedDates;
});

watch(
  () => props.date,
  (first, second) => {
    if (first.value == second.value) {
      tab.value = 0;
    }
  }
);

const tabFontSize = computed(() => props.fontSize * 0.8);

const tabStyle = () => {
  return `font-size: ${tabFontSize.value}px`;
};

onMounted(async () => {
  await getData();
});
</script>
<template>
  <div
    v-if="isSigned"
    style="width: 100%; height: 100vh"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <div class="q-px-xl" :style="tabStyle()">
      <q-tabs
        v-model="tab"
        class="text-grey q-px-xs"
        active-color="primary"
        indicator-color="primary"
        no-caps
        narrow-indicator
        outside-arrows
        mobile-arrows
      >
        <q-tab
          v-for="(schedule, i) in schedules"
          :key="i"
          :name="i"
          :label="getNotationString(schedule.bookId, schedule.chapter)"
        />
      </q-tabs>
    </div>

    <div class="q-pa-none">
      <q-tab-panels v-model="tab" swipeable>
        <q-tab-panel
          style="min-height: 100vh"
          v-for="(schedule, i) in schedules"
          :key="i"
          :name="i"
        >
          <ChapterView
            :fontSize="fontSize"
            :bookId="schedule.bookId"
            :chapter="schedule.chapter"
          />
          <div
            v-if="i === schedules.length - 1"
            style="display: table; margin-left: auto"
          >
            <div class="q-pa-md"></div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn
                @click="onClickComplete()"
                :style="setStyleBtn()"
                round
                icon="check"
              />
            </q-page-sticky>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
  <div v-else class="q-pa-md text-h6 text-weight-bold">
    <div>하나통독은 로그인을 하셔야 이용하실 수 있습니다.</div>
    <div class="text-body2 text-weight-light">
      (대한성서공회의 저작권 정책을 따릅니다.)
    </div>
  </div>
</template>
<style></style>
