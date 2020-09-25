<template>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                     >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                  @submit.prevent="login"
                >
                  <v-text-field
                    label="Email"
                    v-model="email"
                    name="login"
                    :rules="[v => !!v || 'Field is required']"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    :rules="[v => !!v || 'Field is required']"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="login"
                  :loading="loading"
                  color="primary"
                  :disabled="!valid"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbar"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'
  import { mapMutations } from 'vuex'

  export default {
    name: 'login',
    layout: 'loginLayout',
    data () {
      return {
        valid: true,
        lazy: false,
        email: '',
        password: '',
        snackbar: false,
        text: '',
        loading: false
      }
    }, //end of data
    methods: {
      ...mapMutations({
        setUser: 'SET_USER_TO_LOCAL'
      }),
      login(){
        this.loading = true;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data =>{
           console.log(data, 'data')
           this.setUser(data.user.uid)
           this.$router.push('/')
        }).catch(error => {
          this.loading = false;
          this.snackbar = true;
          this.text = error
         // alert(error)
        })
      }
    }, //end of methods
    props: {
      source: String,
    },
  }
</script>