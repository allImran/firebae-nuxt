<template>
  <v-app>
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer>-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <v-btn
        icon
        @click.stop= "goBack"
      >
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
      
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
        Log Out
      </v-btn>
    </v-app-bar>
    <!-- <v-main> -->
      <!-- <v-container> -->
        <nuxt />
      <!-- </v-container> -->
    <!-- </v-main> -->
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


    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'
  import { mapMutations, mapState } from 'vuex'
  export default {
  middleware: 'authenticated',
  name: 'default-layout',
  computed: {
    loggedIn(){
      if(process.browser){
          //localStorage.setItem("authToken", token);
          let userId = localStorage.getItem('UID')
          return userId === null ? false : true
      }
    },
    ...mapState({

    }),
   
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'নিবিলাস'
    }
  },//end of data
  methods: {
    ...mapMutations({
        removeUser: 'REMOVE_USER',
        setUser: 'SET_USER'
      }),
    logout() {
      firebase.auth().signOut();
      this.removeUser();
      this.$router.push('/login')
    },
    goBack(){
      this.$router.back();
    }
  },
  
}
</script>
