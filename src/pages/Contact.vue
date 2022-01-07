<script setup lang="ts">
import {} from 'vue';
</script>
<template>
  <q-page
    style="padding-top: 50px; width: 100vw; height: 100%; overflow"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'map'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> Contact Us </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pb-md q-gutter-md">
      <div class="row q-pa-xs justify-start">
        <div class="col-xs-12 col-lg-6">
          <q-card class="q-ma-md my-card" style="width: 80vw">
            <q-img
              fit="cover"
              src="https://i.ibb.co/qgv5nby/Kakao-Talk-20211008-200446582-02.jpg"
              height="500px"
            />
            <q-list>
              <q-item clickable class="q-pa-md">
                <q-item-section avatar>
                  <q-icon color="primary" name="home" />
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    >서울특별시 마포구 연남로42 상가비동 4층
                  </q-item-label>
                  <q-item-label caption>우편번호 03989</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable class="q-pa-md">
                <q-item-section avatar>
                  <q-icon color="red" name="phone" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>02-325-0691</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable class="q-pa-md">
                <q-item-section avatar>
                  <q-icon color="amber" name="subway" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>지하철</q-item-label>
                  <q-item-label caption
                    >홍대입구역 3번 출구에서 앞으로 200m 정도 직진 후,
                    연트럴파크길을 따라 연남동코오롱하늘채 아파트 104동 옆
                    상가B동 4층</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item clickable class="q-pa-md">
                <q-item-section avatar>
                  <q-icon color="cyan" name="directions_bus" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>버스</q-item-label>
                  <q-item-label caption
                    >홍대입구역 2번출구에서 05번 마을버스 타고
                    “코오롱아파트사거리” 정류장에서 하차(3정거장)</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
    <CommunityButtons />
  </q-page>
</template>
