<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <SchanaLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline"> 신촌하나교회 </v-card-title>
        <v-card-text>
          <p>신촌하나교회에 오신걸 환영합니다 :)</p>
          <br />
          <a
            href="https://hanamovement.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            하나무브먼트
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  created() {
    this.setTitle('신촌하나교회')
  },
  methods: {
    setTitle(value) {
      this.$store.commit('root/setTitle', value)
    },
  },
}
</script>