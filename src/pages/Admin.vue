<script setup lang="ts">
import LoadPlayList from 'src/components/LoadPlayList.vue';
import StreamWrite from 'src/components/StreamWrite.vue';
</script>
<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">관리자 페이지</div>

        <div class="text-h7">재생목록 등록</div>
        <LoadPlayList />
        <div class="text-h7">Live 등록</div>
        <StreamWrite />
      </q-card-section>
    </q-card>
  </q-page>
</template>
