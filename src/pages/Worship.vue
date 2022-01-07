<script setup lang="ts">
import {} from 'vue';
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100%; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'people'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 예배 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div
      class="q-pb-md q-gutter-md"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
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
            <q-img src="../assets/주일예배10시반.png" />

            <q-card-section>
              <q-btn
                fab
                label="LIVE 가기"
                color="primary"
                icon="mdi-video"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
                to="worship-live"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">주일예배</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">장소</div>
              <div class="text-caption text-grey">교회본당</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="timer" />
              <div class="col">
                <div class="row">1부: 10:30 ~ 12:30</div>
                <div class="row">2부: 14:00 ~ 16:00</div>
              </div>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/수요HTS20시반.png" />

            <q-card-section>
              <q-btn
                fab
                label="영상 보기"
                color="primary"
                icon="mdi-video"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
                to="/message/HTS"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">수요HTS</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">장소</div>
              <div class="text-caption text-grey">교회본당</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="timer" />
              20:30 ~ 22:00
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/금요예배21시.png" />

            <q-card-section>
              <q-btn
                fab
                label="LIVE 가기"
                color="primary"
                icon="mdi-video"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
                to="/worship-live"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">금요기도회</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">장소</div>
              <div class="text-caption text-grey">교회본당</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="timer" />
              21:00 ~ 23:00
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/UCM토요예배15시.png" />

            <q-card-section>
              <q-btn
                fab
                label="영상 보기"
                color="primary"
                icon="mdi-video"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
                to="/message/UCM"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">UCM 예배</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                ></div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">장소</div>
              <div class="text-caption text-grey">교회본당</div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="timer" />
              15:00 ~ 16:30
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
