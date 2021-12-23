<script setup lang="ts">
import {} from 'vue';

const popup = {
  worship: ['일요예배', '수요HTS', '금요기도회', '토요UCM예배', '영어예배'],
  culturalMinistry: ['하나무브먼트', '하나워십무브먼트', '라렙'],
  nextGen: ['조이랜드', '조이스쿨'],
};
</script>
<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <q-list>
      <q-item v-for="i in popup.worship.length" :key="i">
        <q-item-section>
          <q-item-label>
            <h3>{{ popup.worship[i - 1] }}</h3>
          </q-item-label>
        </q-item-section>
        <q-separator spaced vertical inset />
        <q-item-section side>
          <q-item-label caption>
            <span>{{ popup.worship[i - 1] }} 설명, 내용</span>
          </q-item-label>
        </q-item-section>
        <q-item-section><q-img /></q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
  </div>
</template>
