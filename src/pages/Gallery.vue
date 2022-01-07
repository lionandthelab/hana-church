<script setup lang="ts">
import { ref } from 'vue';
import {
  fasImage,
  fasAngleUp,
  fasAngleDown,
} from '@quasar/extras/fontawesome-v5';

const pictures = [''];
for (let x = 1; x <= 85; x++) {
  pictures.push(
    `https://firebasestorage.googleapis.com/v0/b/hana-church.appspot.com/o/images%2Fcommunity%2F${x}.jpeg?alt=media&token=d4d6f288-fe0c-467f-83da-4bbe62003d6b`
  );
}
pictures.shift();

const pictureIdx = ref(0);
const pictureClick = (idx: number) => {
  pictureIdx.value = idx;
};

const zoom = ref<boolean>(false);
</script>
<template>
  <q-page
    style="padding-top: 50px; width: 100%; height: 100%; overflow"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasImage" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 갤러리 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <div class="row q-pa-md">
      <q-dialog v-model="zoom" full-width>
        <q-card
          class="transparent no-shadow"
          style="width: 700px; max-width: 80vw"
        >
          <div class="column">
            <div class="row justify-center">
              <q-btn
                flat
                size="xl"
                round
                :icon="fasAngleUp"
                text-color="white"
                @click="pictureIdx++"
              />
            </div>
            <div class="row justify-center">
              <q-img
                height="70vh"
                style="min-width: 80vw"
                fit="contain"
                :src="pictures[pictureIdx]"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                flat
                size="xl"
                round
                :icon="fasAngleDown"
                text-color="white"
                @click="pictureIdx--"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>
      <div
        v-for="(picture, i) in pictures"
        :key="picture"
        class="q-pa-xs col-xs-6 col-sm-4 col-md-4 col-lg-3 col-xl-2"
      >
        <div class="fit">
          <q-card
            v-ripple
            class="my-box cursor-pointer q-hoverable"
            style="width: 100%; background-color: black"
            @click="
              pictureClick(i);
              zoom = true;
            "
          >
            <span class="q-focus-helper"></span>
            <q-img
              fit="cover"
              :src="picture"
              :ratio="4 / 3"
              class="transparent"
            >
              <template v-slot:loading>
                <div class="text-subtitle1 text-white">Loading...</div>
              </template>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style></style>
