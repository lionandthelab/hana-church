<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col>
        <div v-if="!verified">
          <v-card shaped outlined elevation="2">
            <v-card-title>관리자 비밀번호를 입력하세요</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="비밀번호"
                hide-details="auto"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
            <v-alert
              v-show="wrongPwAlert"
              dismissible
              dense
              prominent
              text
              type="error"
              >비밀번호가 틀렸습니다.</v-alert
            >
            <v-card-actions>
              <v-spacer />
              <v-btn color="info" rounded text @click="checkPassword">
                입장
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div v-else id="verified">
          <v-date-picker
            v-model="newStreamInfo.date"
            color="info"
            landscape
            full-width
            locale="ko-kr"
            @click:date="getStreams"
          />
          <v-data-iterator
            :items="streamInfosSelected"
            items-per-page="3"
            item-key="id"
            single-expand
            :hide-default-footer="streamInfosSelected.length < 4"
            no-data-text="해당 날짜에는 스트림 정보가 없습니다."
          >
            <template #default="{ items }">
              <v-row>
                <v-col
                  v-for="item in items"
                  :key="item.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card color="primary" class="my-3 mx-0">
                    <v-card-title>
                      <h4>{{ item.title }}</h4>
                    </v-card-title>
                    <v-card-subtitle>
                      {{ item.preacher }} <v-spacer /> {{ item.date }}
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn icon @click="deleteStream(item.id)">
                        <v-icon color="warning">
                          mdi-delete-circle
                        </v-icon></v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
          <v-card>
            <v-card-text color="info">
              <v-text-field
                v-model="newStreamInfo.date"
                type="text"
                disabled
                label="날짜"
              />
              <v-text-field
                v-model="newStreamInfo.url"
                type="text"
                label="URL"
              />
              <v-select
                v-model="newStreamInfo.tag"
                :items="tags"
                label="예배"
              ></v-select>
              <v-text-field
                v-model="newStreamInfo.title"
                type="text"
                label="제목"
              />
              <v-select
                v-model="newStreamInfo.preacher"
                :items="preachers"
                label="메신저"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="info" @click="addStream" v-if="verified">
                등록하기
                <v-icon right> mdi-checkbox-marked-circle </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Select List
      tags: [
        { value: 'hts', text: '수요 HTS' },
        { value: 'prayer', text: '금요 기도회' },
        { value: 'joyworship', text: '조이랜드 찬양' },
        { value: 'ucm', text: '토요예배 UCM' },
        { value: 'sundayworship', text: '주일 예배' },
        { value: 'cornerdream', text: '조이코너 / 조이드림 메시지' },
        { value: 'treejunior', text: '조이트리 1-2학년 메시지' },
        { value: 'treesenior', text: '조이트리 3학년 / 조이틴 메시지' },
      ],
      preachers: [
        { value: 'seong', text: '임성일 선교사님' },
        { value: 'seok', text: '이석만 목사님' },
        { value: 'soon', text: '하순회 전도사님' },
        { value: 'woong', text: '이지웅 전도사님' },
        { value: 'etc', text: '기타' },
      ],

      // Stream Info of the selected date
      streamInfosSelected: [],

      // New Stream Info
      newStreamInfo: {
        id: '',
        title: '',
        url: '',
        date: '',
        tag: '',
        preacher: '',
      },

      // Admin Password
      verified: false,
      password: '',
      showPassword: false,
      wrongPwAlert: false,
    }
  },
  mounted() {},
  created() {
    this.setTitle('관리 페이지')
  },
  methods: {
    checkPassword() {
      if (this.password === '123') {
        this.verified = true
      } else {
        this.showAlert()
        this.password = ''
      }
    },
    showAlert() {
      this.wrongPwAlert = true
      const timer = this.showAlert.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.showAlert.timer = setTimeout(() => {
        this.wrongPwAlert = false
      }, 3000)
    },
    async getStreams() {
      const streamCollection = this.$fire.firestore.collection('stream')

      try {
        this.streamInfosSelected = []
        await streamCollection
          .where('date', '==', this.newStreamInfo.date)
          .get()
          .then((querySnapshot) => {
            // Iterate Through Query Data
            querySnapshot.docs.forEach((document) => {
              // Display Retrieved Data To Console
              const streamInfo = document.data()
              streamInfo.id = document.id
              this.streamInfosSelected.push(streamInfo)
            })
          })
      } catch (e) {
        console.error(e)
      }
    },
    async deleteStream(id) {
      const streamCollection = this.$fire.firestore.collection('stream')

      try {
        await streamCollection.doc(id).delete()
        this.getStreams()
      } catch (e) {
        console.error(e)
      }
    },
    async addStream() {
      const streamCollection = this.$fire.firestore.collection('stream')

      try {
        await streamCollection.add(this.newStreamInfo)
        this.getStreams()
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