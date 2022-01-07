<script setup lang="ts">
import { fasPrayingHands } from '@quasar/extras/fontawesome-v5';
import { openURL } from 'quasar';
</script>
<template>
  <q-page
    style="padding-top: 50px; width: 100%; height: 100%; overflow"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasPrayingHands" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> Q.T </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <div
      class="row items-center q-pa-md text-h6 text-weight-bold"
      :class="$q.dark.isActive ? 'text-white' : 'text-black'"
    >
      <q-btn
        class="text-h6 text-weight-bold"
        flat
        icon="login"
        label="매일성경 바로가기"
        @click="
          () => {
            openURL(
              'https://sum.su.or.kr:8888/bible/today',
              null, // in this example we don't care about the rejectFn()

              // this is the windowFeatures Object param:
              {
                noopener: true, // this is set by default for security purposes
                // but it can be disabled if specified with a Boolean false value
                menubar: true,
                toolbar: true,
                noreferrer: true,
                // .....any other window features
              }
            );
          }
        "
      />
    </div>
  </q-page>
</template>
