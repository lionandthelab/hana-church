<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app full-width hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="barTitle" />
      <v-spacer />
      <v-btn
        icon
        right
        @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon color="yellow darken-2">mdi-brightness-6</v-icon>
      </v-btn>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main v-if="deferredPrompt">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-banner v-if="deferredPrompt" color="info" class="text-left">
      신촌하나교회 앱을 설치해보세요!

      <template v-slot:actions>
        <v-btn text @click="dismiss">다음에</v-btn>
        <v-btn text @click="install">설치</v-btn>
      </template>
    </v-banner>
    <v-footer v-if="!deferredPrompt" :absolute="fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} all reserved by
        라이언앤더랩.</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: '홈',
          to: '/',
        },
        {
          icon: 'mdi-video-wireless',
          title: '하나스트림',
          to: '/stream',
        },
        {
          icon: 'mdi-book',
          title: '하나통독',
          to: '/tongdok',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '신촌하나교회',
    }
  },
  computed: {
    barTitle() {
      return this.$store.state.root.title
    },
  },
  beforeMount() {
    window.addEventListener('beforeinstallprompt', function (e) {
      console.log('beforeinstallprompt Event fired!')
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      console.log('deferredPrompt: ', this.deferredPrompt, e)
      return true
    })
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
    })
  },
  created() {
    this.drawer = false
  },
  methods: {
    dismiss() {
      this.deferredPrompt = null
    },
    async install() {
      if (this.deferredPrompt) {
        await this.deferredPrompt.prompt()
      } else {
        console.log('cannot install!')
      }
    },
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
