<script setup lang="ts">
import {} from 'vue';
import { auth } from 'boot/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { firebaseUser, useAuth } from 'src/composables/useAuth';

useAuth();

const provider = new GoogleAuthProvider();
</script>
<template>
  <q-btn flat v-if="firebaseUser" round color="white">
    <q-avatar color="white" size="32px" padding="md">
      <img
        :src="
          firebaseUser.photoURL || 'https://cdn.quasar.dev/img/boy-avatar.png'
        "
      />

      <q-menu>
        <q-card>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-account"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>이름</q-item-label>
                <q-item-label caption>{{
                  firebaseUser.displayName
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-email"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>이메일</q-item-label>
                <q-item-label caption>{{ firebaseUser.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="right">
            <q-btn
              icon="mdi-upload"
              label="업로드"
              flat
              color="primary"
              to="/admin"
            ></q-btn>
            <q-btn
              icon="mdi-logout"
              label="로그아웃"
              flat
              color="primary"
              @click="signOut(auth)"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-avatar>
  </q-btn>
  <q-btn
    flat
    v-else
    @click="signInWithPopup(auth, provider)"
    round
    color="white"
  >
    <q-avatar icon="mdi-login" size="32px" />
  </q-btn>
</template>
