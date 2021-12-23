<script setup lang="ts">
import {} from 'vue';

const buttons = ['예배', '문화사역', '다음세대'];
const popup = {
  worship: ['일요예배', '수요HTS', '금요기도회', '툐요UCM예배', '영어예배'],
  culturalMinistry: ['하나무브먼트', '하나워십무브먼트', '라렙'],
  nextGen: ['조이랜드', '조이스쿨'],
};
</script>
<template>
  <div
    class="row justify-center"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[0]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="title in popup.worship" :key="title">
              <q-btn flat :label="title" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[1]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="title in popup.culturalMinistry" :key="title">
              <q-btn flat :label="title" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
    <div class="q-pa-lg text-primary">
      <q-btn :label="buttons[2]" size="20px" flat rounded>
        <q-popup-proxy>
          <q-banner>
            <div v-for="title in popup.nextGen" :key="title">
              <q-btn flat :label="title" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </div>
  </div>
</template>
