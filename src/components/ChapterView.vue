<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
import { bookStringTableKr, bookStringTableEn } from 'components/strings';
import { ChapterResponse } from 'components/models';

const props = defineProps<{
  bookId: number;
  chapter: number;
  fontSize: number;
}>();

function getBookKey(bookId: number): string {
  return bookStringTableEn[bookId];
}
function getBookString(bookId: number): string {
  return bookStringTableKr[bookId];
}
function getChapterString(bookId: number, chapter: number): string {
  // psalm
  if (bookId == 18) {
    return `${chapter}편`;
  } else {
    return `${chapter}장`;
  }
}

const getChapter = async (bookId: number, chapter: number): Chapter => {
  const bookKey = getBookKey(bookId);
  console.log(`bookKey: ${bookKey}`);
  return fetch(`https://signal.lionandthelab.com/${bookKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('response: ', data);

      return (data as ChapterResponse)[chapter];
    });
};

const chapter = ref<Chapter>();
const titleFontSize = computed(() => props.fontSize * 1.3);
const contentFontSize = computed(() => props.fontSize * 1.0);
const bookString: string = computed(() => getBookString(props.bookId));
const chapterString: string = computed(() =>
  getChapterString(props.bookId, props.chapter)
);

const titleStyle = () => {
  return `font-size: ${titleFontSize.value}px`;
};
const contentStyle = () => {
  return `font-size: ${contentFontSize.value}px`;
};

const getData = async () => {
  chapter.value = await getChapter(props.bookId, props.chapter);
};

onMounted(() => getData());
</script>
<template>
  <div v-if="chapter">
    <div class="q-pa-lg text-h5" :style="titleStyle()">
      {{ bookString }} {{ chapterString }}
    </div>
    <div
      class="q-pa-md"
      :style="contentStyle()"
      v-for="(verse, i) in chapter.verses"
      :key="i"
    >
      <div v-if="i == 0">{{ verse.title }}</div>
      <div>{{ verse.index }}. {{ verse.content }}</div>
    </div>
    <div>{{ chapter.comments }}</div>
  </div>
  <div v-else>Loading {{ bookString }} {{ chapterString }}...</div>
</template>
<style></style>
