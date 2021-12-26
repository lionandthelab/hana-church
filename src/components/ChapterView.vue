<script setup lang="ts">
import { ref, onMounted, onUpdated, defineProps, computed } from 'vue';
import { bookStringTableKr, bookStringTableEn } from 'components/strings';
import { ChapterResponse, Chapter } from 'components/models';
import { fasFileAudio } from '@quasar/extras/fontawesome-v5';
import { useTts, speak } from 'src/composables/useTts';

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

const getChapter = async (
  bookId: number,
  chapter: number
): Promise<Chapter> => {
  const bookKey = getBookKey(bookId);
  console.log(`bookKey: ${bookKey}`);
  return fetch(`https://api.lionandthelab.club/${bookKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('response: ', data);

      return (data as ChapterResponse)[chapter];
    });
};

const verseTexts = ref<string[]>([]);
const chapter = ref<Chapter>();
const titleFontSize = computed(() => props.fontSize * 1.3);
const paragraphFontSize = computed(() => props.fontSize * 1.1);
const contentFontSize = computed(() => props.fontSize * 1.0);
const commentFontSize = computed(() => props.fontSize * 0.8);
const bookString = computed(() => getBookString(props.bookId));
const chapterString = computed(() =>
  getChapterString(props.bookId, props.chapter)
);

const titleStyle = () => {
  return `font-size: ${titleFontSize.value}px`;
};
const paragraphStyle = () => {
  return `font-size: ${paragraphFontSize.value}px`;
};
const contentStyle = () => {
  return `font-size: ${contentFontSize.value}px`;
};

const commentStyle = () => {
  return `font-size: ${commentFontSize.value}px`;
};

const getData = async () => {
  chapter.value = await getChapter(props.bookId, props.chapter);

  const verses = chapter.value.verses;
  verseTexts.value.push(`${bookString.value} ${chapterString.value}}`);
  var prevTitle = '';
  verses.map((v) => {
    if (v.title) {
      if (prevTitle != v.title) {
        verseTexts.value.push(v.title);
        prevTitle = v.title;
      } else {
        v.title = '';
      }
    }
    const _content = v.content.replace(/[0-9]+\)/g, '');

    verseTexts.value.push(_content);
  });
};

onMounted(() => getData());
onUpdated(() => {
  useTts();
});
</script>
<template>
  <div v-if="chapter">
    <div
      class="row q-pa-lg text-h5 text-weight-bolder items-center justify-center"
      :style="titleStyle()"
    >
      <div class="col">
        {{ bookString }} {{ chapterString }}
        <q-btn
          flat
          color="primary"
          :icon="fasFileAudio"
          round
          @click="speak(verseTexts)"
        />
      </div>
    </div>
    <div
      class="q-px-lg text-align-justify"
      :style="contentStyle()"
      v-for="(verse, i) in chapter.verses"
      :key="i"
    >
      <div class="q-py-sm" :style="paragraphStyle()" v-if="verse.title">
        {{ verse.title }}
      </div>
      <div class="row q-py-sm items-center">
        <div class="col column q-pa-xs">
          <div class="row justify-start">
            <p>
              <span class="q-pr-md text-weight-bolder">
                {{ verse.index }}
              </span>
              <span>
                {{ verse.content }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="chapter.comments.length > 0"> -->
    <div
      class="q-px-lg text-weight-light"
      :style="commentStyle()"
      v-for="(comment, i) in chapter.comments"
      :key="i"
    >
      {{ i }} {{ comment }}
    </div>
  </div>
  <!-- </div> -->
  <div v-else>Loading {{ bookString }} {{ chapterString }}...</div>
</template>
<style></style>
