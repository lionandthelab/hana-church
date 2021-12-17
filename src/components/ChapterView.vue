<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
import { Chapter } from 'components/models';
import { bookStringTable } from 'components/strings';
const props = defineProps<{
  chapter: Chapter;
  fontSize: number;
}>();

function getBookString(bookId: number): string {
  return bookStringTable[bookId];
}
function getChapterString(bookId: number, chapter: number): string {
  // psalm
  if (bookId == 18) {
    return `${chapter}편`;
  } else {
    return `${chapter}장`;
  }
}

const titleFontSize = computed(() => props.fontSize * 1.3);
const contentFontSize = computed(() => props.fontSize * 1.0);
const chapter = computed(() => props.chapter);
const bookString: string = computed(() => getBookString(chapter.value.bookId));
const chapterString: string = computed(() =>
  getChapterString(chapter.value.bookId, chapter.value.chapter)
);

const titleStyle = () => {
  return `font-size: ${titleFontSize.value}px`;
};
const contentStyle = () => {
  return `font-size: ${contentFontSize.value}px`;
};
</script>
<template>
  <div>
    <div class="q-pa-lg text-h5" :style="titleStyle()">
      {{ bookString }} {{ chapterString }}
    </div>
    <div
      class="q-pa-md"
      :style="contentStyle()"
      v-for="(verse, key) in chapter.verses"
      :key="key"
    >
      <span>{{ key }}. {{ verse }}</span>
    </div>
  </div>
</template>
<style></style>
