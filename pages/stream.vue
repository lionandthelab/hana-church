<template>
  <v-row>
    <v-col class="text-center">
      <!-- <img
        src="/schana-logo.png"
        alt="schana-logo"
        class="mb-5"
      > -->
      <blockquote class="blockquote">
        &#8220;태초에 하나님이 천지를 창조하셨느니라&#8221;
        <footer>
          <small>
            <em>&mdash;창세기 1장 1절</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<script>
export default {
  created() {
    this.setTitle('하나스트림')
  },
  methods: {
    setTitle(value) {
      this.$store.commit('root/setTitle', value)
    },
  },
}
</script>
