<script setup lang="ts">
import {} from 'vue';
// import CommunityButtons from '../components/CommunityButtons.vue';
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="'people'" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 예배 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>

    <div class="q-pb-md q-gutter-md">
      <div class="row justify-between">
        <q-parallax src="../assets/hana-church-logo.png" :height="200">
          <div class="row full-width justify-center">
            <div class="q-px-xl text-primary text-weight-bolder text-h5">
              사랑과 성령으로 충만한
            </div>
            <div class="q-px-xl text-primary text-weight-bolder text-h5">
              제자들을 낳고 키우고 보내는
            </div>
            <div class="q-pa-lg text-primary text-weight-bolder text-h4">
              초대교회 같은 공동체
            </div>
          </div>
        </q-parallax>
      </div>
      <div class="row q-pa-md justify-center">
        <div class="col-xs-12 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/hana-church-logo-pad.png" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">주일예배</div>
                <div
                  class="
                    col-auto
                    text-grey text-caption
                    q-pt-md
                    row
                    no-wrap
                    items-center
                  "
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
        <div class="col-xs-12 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/hana-church-logo-pad.png" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">수요예배</div>
                <div
                  class="
                    col-auto
                    text-grey text-caption
                    q-pt-md
                    row
                    no-wrap
                    items-center
                  "
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
        <div class="col-xs-12 col-lg-4">
          <q-card class="q-ma-md my-card">
            <q-img src="../assets/hana-church-logo-pad.png" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">금요기도회</div>
                <div
                  class="
                    col-auto
                    text-grey text-caption
                    q-pt-md
                    row
                    no-wrap
                    items-center
                  "
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
      </div>
    </div>

    <!--<CommunityButtons />-->
  </q-page>
</template>
