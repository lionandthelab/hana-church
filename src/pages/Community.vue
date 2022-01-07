<script setup lang="ts">
import {} from 'vue';
import { useRouter } from 'vue-router';
import { fasBookmark } from '@quasar/extras/fontawesome-v5';

const router = useRouter();
const gotoUCM = async () => {
  await router.push('/message/UCM');
};
</script>
<template>
  <q-page
    style="padding-top: 50px; width: 100%; height: 100%; overflow"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
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

      <div class="row q-pa-md">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/UCM토요예배15시.png" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                :icon="fasBookmark"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
                @click="gotoUCM()"
                >예배 바로가기</q-btn
              >
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">UCM</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">구성원</div>
              <div class="text-caption text-grey">대학생, 사회 초년생</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="phone" />
              010-4775-3627 (이지웅 전도사)
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/조이랜드.png" />

            <q-card-section>
              <!-- <q-btn
                fab
                color="primary"
                icon="person"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              >
              </q-btn> -->

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">조이랜드</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">구성원</div>
              <div class="text-caption text-grey">미취학, 유/초등부 학생</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="phone" />
              010-3539-0563 (설예리 집사)
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img fit="scale-down" src="../assets/hana-church-logo-pad.png" />

            <q-card-section>
              <!-- <q-btn
                fab
                color="primary"
                icon="person"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              >              
              </q-btn> -->

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">중국어 예배</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">구성원</div>
              <div class="text-caption text-grey">
                한국에 있는 중국어권 청년
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="phone" />
              010-7119-8853 (강미령 집사)
            </q-card-actions>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/SHEM.png" />

            <q-card-section>
              <!-- <q-btn
                fab
                color="primary"
                icon="person"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              /> -->

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">영어 예배</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">구성원</div>
              <div class="text-caption text-grey">한국에 있는 영어권 청년</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="phone" />
              010-4946-8797 (이승완 형제)
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
