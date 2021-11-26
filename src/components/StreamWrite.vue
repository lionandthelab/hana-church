<script setup lang="ts">
import { ref } from 'vue';
import { isSigned, firebaseUser } from 'src/composables/useAuth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const title = ref('');
const vid = ref('');
const preacher = ref('');
const kind = ref('');
const date = ref(new Date());
const clear = () => {
  title.value = '';
  vid.value = '';
  preacher.value = '';
  kind.value = '';
  date.value = new Date();
};
const onSubmit = async () => {
  // const docRef = await addDoc(collection(db, 'streams'), {
  //   title: title.value,
  //   url: `https://www.youtube.com/embed/${vid.value}?rel=0`,
  //   tag: kind.value,
  //   preacher: preacher.value,
  //   thumbnailUrl: `https://img.youtube.com/vi/${vid.value}/mqdefault.jpg`,
  //   date: date.value,
  // });
  // console.log('Document written with ID: ', docRef.id);

  await setDoc(doc(db, 'streams', vid.value), {
    title: title.value,
    url: `https://www.youtube.com/embed/${vid.value}?rel=0`,
    tag: kind.value,
    preacher: preacher.value,
    thumbnailUrl: `https://img.youtube.com/vi/${vid.value}/mqdefault.jpg`,
    date: date.value.toString(),
  });
  // clear();
  $q.notify({
    message: '등록되었습니다',
    color: 'primary',
    icon: 'announcement',
  });
};
const onReset = () => {
  clear();
};
const existenceCheckRule = (val: string) =>
  (val && val.length > 0) || '입력란이 비었습니다';
</script>
<template>
  <q-card v-if="isSigned && firebaseUser?.email === 'lionandthelab@gmail.com'">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card-section>
        <q-input
          filled
          v-model="title"
          label="제목"
          hint="제목을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-input
          filled
          v-model="vid"
          label="비디오 ID"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-input
          filled
          v-model="kind"
          label="분류"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-input
          filled
          v-model="preacher"
          label="메신저"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-date v-model="date" minimal />
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn label="등록" type="submit" color="primary" />
        <q-btn
          label="초기화"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-form>
  </q-card>
  <q-card v-else> 권한이 없습니다. </q-card>
</template>
