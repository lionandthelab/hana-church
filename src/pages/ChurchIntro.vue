<script setup lang="ts">
import { computed } from 'vue';
import { fasChurch } from '@quasar/extras/fontawesome-v5';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const coreValues = {
  title: [
    'Worship(예배 공동체)',
    'Loving Fellowship(가족 공동체)',
    'Discipleship(제자 공동체)',
    'Mission(선교 공동체)',
  ],
  content: [
    '하나님과의 친밀감. 성령님께서 함께 하시도록 기도와 예배로 시작한다.',
    '우리는 사랑으로 하나되는 하나님의 가족이다.',
    '평신도 제자들이 예수님의 본을 따라 세상에서 빛과 소금이 되어 하나님의 나라를 확장한다.',
    '예수님의 지상 명령에 따라 땅끝까지 복음을 전하고 교회를 개척한다.',
  ],
};
const layout = computed(() => {
  return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose';
});
</script>
<template>
  <q-page
    style="padding-top: 50px; width: 100%; height: 100%; overflow"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasChurch" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 교회소개 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pb-md q-gutter-md">
      <div class="row text-center justify-center">
        <q-parallax src="../assets/hana-church-logo.png" :height="200">
          <div class="column full-width align-center">
            <div class="q-px-lg text-primary text-weight-bolder text-h5">
              사랑과 성령으로 충만한
            </div>
            <div class="q-px-lg text-primary text-weight-bolder text-h5">
              제자들을 낳고 키우고 보내는
            </div>
            <div class="q-pa-md text-primary text-weight-bolder text-h4">
              초대교회 같은 공동체
            </div>
          </div>
        </q-parallax>
      </div>
      <div class="column q-pa-md">
        <q-timeline :layout="layout" color="primary">
          <q-timeline-entry heading> 신촌하나교회 </q-timeline-entry>

          <q-timeline-entry title="비전" subtitle="" side="left" icon="church">
            <div>
              <q-card flat class="q-pa-sm q-ma-sm col transparent">
                <div class="row text-weight-bold q-mr-sm text-h5">
                  사랑과 성령으로 충만한 제자들을 낳고 키우고 보내는 초대교회
                  같은 공동체
                </div>
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="핵심가치"
            subtitle=""
            side="right"
            icon="book"
            color="orange"
          >
            <div>
              <q-card flat class="q-pa-sm q-ma-sm transparent justify-center">
                <div v-for="x in 4" :key="x" class="q-pa-sm column">
                  <div class="row text-weight-bold q-mr-sm text-h5">
                    {{ coreValues.title[x - 1] }}
                  </div>
                  <div class="row text-body1">
                    {{ coreValues.content[x - 1] }}
                  </div>
                </div>
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>목회자</q-timeline-entry>

          <q-timeline-entry
            title="임성일 선교사"
            subtitle="신촌하나교회 담임목회자"
            side="left"
            icon="person"
          >
            <div>
              <q-card class="q-ma-lg">
                <q-img src="../assets/임성일_선교사님.jpeg" />
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="이석만 목사"
            subtitle="신촌하나교회 청년대학부 목회자"
            side="right"
            icon="person"
            color="cyan"
          >
            <div>
              <q-card class="q-ma-lg">
                <q-img src="../assets/이석만_목사님.jpeg" />
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="하순회 전도사"
            subtitle="신촌하나교회 목회자"
            side="left"
            icon="person"
            color="orange"
          >
            <div>
              <q-card class="q-ma-lg">
                <q-img src="../assets/하순회_전도사님.jpeg" />
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="이지웅 전도사"
            subtitle="신촌하나교회 목회자"
            icon="person"
            side="right"
            color="purple"
          >
            <div>
              <q-card class="q-ma-lg">
                <q-img src="../assets/이지웅_전도사님.jpeg" />
              </q-card>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="" subtitle="" side="left" icon="done_all">
            <div class="q-pa-md"></div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </q-page>
</template>
