<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center"> </v-card>
        <v-card>
          <v-card-title class="headline">
            {{ date.getFullYear() }}년 {{ date.getMonth() + 1 }}월
            {{ date.getDate() }}일
            <v-btn @click="changeDate"> 날짜 변경 </v-btn>
            <v-date-picker v-model="str_date" v-if="showCalendar" />
          </v-card-title>
          <v-card-text>
            <p>바로 시청하세요</p>
            <label v-for="(worship, key) in worships" v-bind:key="key">
              <label v-if="day == worship.day"
                ><input type="checkbox" class="checkbox" />{{
                  worship.text
                }}</label
              >
            </label>
            <HanaStream hanaurl="https://www.youtube.com/watch?v=Vl_PEhupBAQ" />
            <!-- <button type="button" @click="getData">GET</button>
          <button type="button" @click="setData">SET</button> -->
            <br />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
            {{ str_date }}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
// const db = this.$store.root.db

export default {
  data() {
    return {
      showCalendar: false,
      value: '',
      worships: [
        { value: 'sundayworship', text: '주일 예배', day: 6 },
        { value: 'hts', text: '수요 HTS', day: 2 },
        { value: 'prayer', text: '금요 기도회', day: 4 },
        { value: 'joyworship', text: '조이랜드 찬양', day: 6 },
        { value: 'ucm', text: '토요예배 UCM', day: 5 },
        { value: 'cornerdream', text: '조이코너 / 드림 설교', day: 6 },
        { value: 'treejunior', text: '조이트리 1-2 학년 설교', day: 6 },
        { value: 'treesenior', text: '조이트리 3학년 - 조이틴 설교', day: 6 },
      ],
      txt: '',
      date: new Date(),
      str_date: '',
      day: 0,
      admin: true,
      url_1: '',
      url_2: '',
      url_3: '',
      url_4: '',
    }
  },
  mounted() {
    this.dbRead()
    var date = new Date(2021, 9, 23)
    console.log(date)
    this.day = date.getDay()
    console.log(this.worships[this.day])
  },
  methods: {
    getDate() {
      this.date = new Date(this.str_date.split('-'))
    },
    changeDate() {
      this.showCalendar = !this.showCalendar
      return true
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
    dbWrite() {
      setDoc(doc(db, 'stream', 'url'), {
        url1: this.url_1,
        url2: this.url_2,
        url3: this.url_3,
        url4: this.url_4,
      })
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
    setTitle(value) {
      this.$store.commit('root/setTitle', value)
    },
  },

  created() {
    this.setTitle('하나스트림')
  },
}
</script>
<style>
.checkbox {
  color: aliceblue;
  width: 10%;
  border-style: solid;
  border-color: aliceblue;
}
input {
  color: aliceblue;
  width: 80%;
  border-style: solid;
  border-color: aliceblue;
}
</style>