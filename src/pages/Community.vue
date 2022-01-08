<script setup lang="ts">
const communities = [
  {
    title: '조이랜드',
    who: '미취학, 유/초/중/고등부 학생',
    contactTo: ['010-3539-0563', '(설예리 집사)'],
    pictureURL: require('assets/조이랜드.jpeg'),
  },
  {
    title: '조이스쿨',
    who: '미취학, 유/초등부 학생',
    contactTo: ['010-4775-3627', '(이지웅 전도사)'],
    pictureURL: require('assets/조이스쿨.jpeg'),
  },
  {
    title: 'UCM (대학부)',
    who: '대학생',
    contactTo: ['010-4775-3627', '(이지웅 전도사)'],
    pictureURL: require('assets/UCM.jpeg'),
  },
  {
    title: '청년부',
    who: 'B존 이전의 청년',
    contactTo: ['010-4775-3627', '(이지웅 전도사)'],
    pictureURL: require('assets/청년부.png'),
  },
  {
    title: 'B존',
    who: '',
    contactTo: ['010-7559-0563', '(황도경 집사)'],
    pictureURL: require('assets/B존.jpeg'),
  },
  {
    title: 'C존',
    who: '',
    contactTo: ['010-4775-3627', '(이지웅 전도사)'],
    pictureURL: require('assets/C존.jpeg'),
  },
  {
    title: 'D존',
    who: '',
    contactTo: ['010-4775-3627', '(이지웅 전도사)'],
    pictureURL: require('assets/D존.jpeg'),
  },
  {
    title: 'SHEM (영어예배)',
    who: '한국에 있는 영어권 청년',
    contactTo: ['010-4946-8797', '(이승완 형제)'],
    pictureURL: require('assets/SHEM.png'),
  },
  {
    title: '중국어예배',
    who: '한국에 있는 중국어권 청년',
    contactTo: ['010-7119-8853', '(강미령 집사)'],
    pictureURL: require('assets/중국어예배.jpeg'),
  },
];
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'people'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 공동체 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pb-md q-gutter-md">
      <div class="row justify-between"></div>

      <div class="row q-pa-md">
        <div
          v-for="i in communities.length"
          :key="i"
          class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-4"
        >
          <q-card class="my-card fit">
            <q-img class="fit" :src="communities[i - 1].pictureURL">
              <div class="text-h5 absolute-bottom text-right">
                <div
                  class="row text-caption no-wrap items-center q-pa-none justify-end"
                >
                  <q-btn flat round icon="phone" />
                  {{ communities[i - 1].contactTo[0] }}
                  {{ communities[i - 1].contactTo[1] }}
                </div>
                <div class="row no-wrap items-center justify-end">
                  <div class="q-pr-sm text-caption">
                    {{ communities[i - 1].who }}
                  </div>
                  <div class="text-weight-bolder text-h6 ellipsis">
                    {{ communities[i - 1].title }}
                  </div>
                </div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
