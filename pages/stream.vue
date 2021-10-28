<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col>
        <HanaStream :url="watchingUrl" />
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-iterator
          :items="streamInfosSelected"
          items-per-page="3"
          item-key="id"
          single-expand
          :hide-default-footer="streamInfosSelected.length < 4"
          no-data-text="해당 날짜에는 스트림 정보가 없습니다."
        >
          <template #default="{ items }">
            <v-row dense>
              <v-col v-for="item in items" :key="item.id" cols="4">
                <v-card color="" class="my-1 mx-0">
                  <v-img
                    :src="item.thumb"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    :height="Math.min(windowWidth / 3, 200)"
                  >
                  </v-img>
                  <v-card-title>
                    <h5>{{ item.title }}</h5>
                  </v-card-title>
                  <v-card-subtitle>
                    {{ item.preacher }} <v-spacer /> {{ item.date }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn icon @click="watch(item.url)">
                      <v-icon color="pink"> mdi-video </v-icon></v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-date-picker
          v-model="date"
          flat
          scrollable
          color="info"
          full-width
          locale="ko-kr"
          :day-format="getDay"
          @click:date="getStreams"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HanaStream from '@/components/HanaStream.vue'

export default {
  components: {
    HanaStream,
  },
  data() {
    return {
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

      // Stream Info of the selected date
      streamInfosSelected: [],
      watchingUrl: '',

      // Calendar
      date: '',

      // Screen Size
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      console.log('w, h: ', this.windowWidth, this.windowHeight)
    })
  },
  created() {
    this.setTitle('하나스트림')
    const today = new Date()
    today.setHours(today.getHours() + 9)
    this.date = today.toISOString().substr(0, 10)
    console.log(new Date().toISOString(), this.date)
  },
  methods: {
    getDay(date) {
      return new Date(date).getDate()
    },
    watch(url) {
      this.watchingUrl = url
    },
    async getStreams() {
      const streamCollection = this.$fire.firestore.collection('stream')

      try {
        this.streamInfosSelected = []
        await streamCollection
          .where('date', '==', this.date)
          .get()
          .then((querySnapshot) => {
            // Iterate Through Query Data
            querySnapshot.docs.forEach((document) => {
              // Display Retrieved Data To Console
              const streamInfo = document.data()
              streamInfo.id = document.id

              // Get thumbnail
              const splitted = streamInfo.url.split('&')[0]
              const vid = splitted.substr(splitted.length - 11)
              if (!vid.includes('share')) {
                streamInfo.thumb = `http://img.youtube.com/vi/${vid}/hqdefault.jpg`
              } else {
                streamInfo.thumb = ''
              }

              console.log('thumb: ', streamInfo.thumb)
              this.streamInfosSelected.push(streamInfo)

              if (this.watchingUrl === '') {
                this.watchingUrl = streamInfo.url
              }
            })
          })
      } catch (e) {
        console.error(e)
      }
    },
    setTitle(value) {
      this.$store.commit('root/setTitle', value)
    },
  },
}
</script>