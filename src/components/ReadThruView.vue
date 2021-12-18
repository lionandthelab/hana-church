<script setup lang="ts">
import { ref, onMounted, defineProps, watchEffect, computed } from 'vue';
import ChapterView from 'src/components/ChapterView.vue';

const props = defineProps<{
  date: string;
  checked: string[];
  fontSize: number;
}>();

const checkedDate = ref(props.checked); //date list of readers
//update date list of readers
const setReadDate = (date: string) => {
  if (checkedDate.value.indexOf(date) < 0) {
    console.log('registered');
    checkedDate.value.push(date);
  } else {
    console.log('already registered');
    let idx = checkedDate.value.indexOf(date);
    checkedDate.value.splice(idx, 1);
    console.log('set read date ', checkedDate.value);
  }
};
//update date list of readers
//set check button's style by reader's status
const setStyleBtn = () => {
  if (props.checked == undefined || props.date == undefined)
    return 'background-color:#FFFFFF';
  else if (props.checked.indexOf(props.date) > -1)
    return 'background-color:#3CD3AD';
  else return 'background-color:#FFFFFF';
};
//set check button's style by reader's status
const tab = ref(0); //bible script tab
const bookList = ref([]); //today's bible list
//staus changed (read -> unread) or (unread -> read)
const onClickComplete = () => {
  console.log('click ', props.date);
  setReadDate(props.date);
};
//test bible data
const onChangeTab = function () {
  bookList.value = [
    {
      title: '창1',
      bookId: 0,
      chapter: 1,
    },
    {
      title: '창2',
      bookId: 0,
      chapter: 2,
    },
    {
      title: '창3',
      bookId: 0,
      chapter: 3,
    },
  ];
  tab.value = 0;
};
//test bible data

const init = () => {
  new Promise((resolve) => {
    resolve(console.log('read page init ', props.checked));
  })
    .then(() => onChangeTab())
    .catch((e) => console.log(e));
};

//check status
watchEffect(() => {
  checkedDate.value = props.checked;
});

const tabFontSize = computed(() => props.fontSize * 0.8);

const tabStyle = () => {
  return `font-size: ${tabFontSize.value}px`;
};

onMounted(() => init());
</script>
<template>
  <div
    style="width: 100%; height: 100vh"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <div class="q-px-xl" :style="tabStyle()">
      <q-tabs
        v-model="tab"
        class="text-grey q-px-xs"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab
          v-for="(book, i) in bookList"
          :key="i"
          :name="i"
          :label="book.title"
        />
      </q-tabs>
    </div>

    <div class="q-pa-none">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          style="height: 100vh"
          v-for="(book, i) in bookList"
          :key="i"
          :name="i"
        >
          <ChapterView
            :fontSize="fontSize"
            :bookId="book.bookId"
            :chapter="book.chapter"
          />
          <div
            v-if="i === bookList.length - 1"
            style="display: table; margin-left: auto"
          >
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn
                @click="onClickComplete()"
                :style="setStyleBtn()"
                round
                color="primary"
                icon="check"
              />
            </q-page-sticky>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<style></style>
