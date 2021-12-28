<script setup lang="ts">
import { ref } from 'vue';
import { worshipInfo, ministryInfo, nextgenInfo } from './CommunityInfo';
// import { scrollToElement } from './CommunityInfo';

const buttons = ref(['예배', '문화사역', '다음세대']);

const choice = ref<number>(0);
</script>
<template>
  <div class="row justify-center">
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[0]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="i in worshipInfo.length" :key="i">
              <q-btn
                flat
                :label="worshipInfo[i - 1].worshipName"
                @click="choice = i"
              />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[1]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="i in ministryInfo.length" :key="i">
              <q-btn flat :label="ministryInfo[i - 1].ministryName" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[2]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="i in nextgenInfo.length" :key="i">
              <q-btn flat :label="nextgenInfo[i - 1].nextgenName" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
  </div>
  <div>choice {{ choice }}</div>

  <div v-if="choice === 0" class="q-pa-md" style="max-width: 1300px">
    <q-list>
      <q-item v-for="i in worshipInfo.length" :key="i">
        <q-item-section :id="worshipInfo[i - 1].worshipName">
          <q-item-label>
            <h3>{{ worshipInfo[i - 1].worshipName }}</h3>
          </q-item-label>
        </q-item-section>
        <q-separator spaced vertical inset />
        <q-item-section side>
          <q-item-label caption>
            <span>{{ worshipInfo[i - 1].content }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>
            <span>시간: {{ worshipInfo[i - 1].worshipTime }}</span>
          </q-item-label>
          <span>장소: {{ worshipInfo[i - 1].worshipPlace }}</span>
        </q-item-section>
        <q-item-section><q-img /></q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
  </div>
</template>
