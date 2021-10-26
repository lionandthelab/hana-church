<template>
  <div id="body">
    <div v-if="admin === false">
      <v-card>
        Password :
        <input type="text" v-model="password" />
      </v-card>
      <v-btn @click="checkPassword">로그인</v-btn>
    </div>
    <div id="admin" v-if="admin">
      <form>
        <v-date-picker @click="getDate" v-model="streaming_data.date" />
        <v-card>
          날짜 :
          <input type="text" v-model="streaming_data.date" disabled="true" />
        </v-card>
        <v-card>
          URL :
          <input type="text" v-model="streaming_data.url" />
        </v-card>
        <v-card>
          예배 :
          <select v-model="streaming_data.tag">
            <option v-for="tag in tags" v-bind:key="tag.value">
              {{ tag.text }}
            </option>
          </select>
        </v-card>
        <v-card>
          제목 :
          <input type="text" v-model="streaming_data.title" />
        </v-card>
        <v-card>
          설교자 :
          <select v-model="streaming_data.preacher">
            <option v-for="preacher in preachers" v-bind:key="preacher.value">
              {{ preacher.text }}
            </option>
          </select>
        </v-card>
      </form>
    </div>
    <v-btn @click="dbWrite" v-if="admin">적용하기</v-btn>
  </div>
</template>

<script>
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
// const db = this.$store.root.db

export default {
  data() {
    return {
      selected: 'A',
      tags: [
        { value: 'hts', text: '수요 HTS' },
        { value: 'prayer', text: '금요 기도회' },
        { value: 'joyworship', text: '조이랜드 찬양' },
        { value: 'ucm', text: '토요예배 UCM' },
        { value: 'sundayworship', text: '주일 예배' },
        { value: 'cornerdream', text: '조이코너 / 드림 설교' },
        { value: 'treejunior', text: '조이트리 1-2 학년 설교' },
        { value: 'treesenior', text: '조이트리 3학년 - 조이틴 설교' },
      ],
      preachers: [
        { value: 'seong', text: '임성일 선교사님' },
        { value: 'seok', text: '이석만 목사님' },
        { value: 'soon', text: '하순회 전도사님' },
        { value: 'woong', text: '이지웅 전도사님' },
        { value: 'etc', text: '기타' },
      ],
      streaming_data: {
        title: '',
        url: '',
        date: '',
        tag: '',
        preacher: '',
      },
      password: '',
      txt: '',
      admin: false,
      url_1: '',
      url_2: '',
      url_3: '',
      url_4: '',
    }
  },
  mounted() {
    this.dbRead()
    console.log('dotenv test', process.env.DB_URL)
  },
  methods: {
    getDate() {
      console.log(this.streaming_data.date)
    },
    getData1() {
      return this.url_1
    },
    getData2() {
      return this.url_2
    },
    getData3() {
      return this.url_3
    },
    getData4() {
      return this.url_4
    },
    checkPassword() {
      if (this.password === '123') {
        this.admin = true
      } else {
        alert('password가 틀렸습니다.')
        this.password = ''
      }
    },
    dbWrite() {
      setDoc(doc(db, 'stream', 'url'), this.streaming_data)
    },
    dbRead() {
      getDoc(doc(db, 'stream', 'url')).then((docSnap) => {
        if (docSnap.exists()) {
          this.url_1 = docSnap.data().url1
          this.url_2 = docSnap.data().url2
          this.url_3 = docSnap.data().url3
          this.url_4 = docSnap.data().url4
          console.log('url1:', docSnap.data().url1)
          console.log('url2:', docSnap.data().url2)
          console.log('url3:', docSnap.data().url3)
          console.log('url4:', docSnap.data().url4)
        } else {
          console.log('No such document!')
        }
      })
    },
  },
}
</script>
<style>
</style>
