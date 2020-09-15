<template>
  <v-snackbar
    v-model="snackbar"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="#fff"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'snackbar',
    data(){
      return {
        text: '',
        snackbar: false
      }
    }, 
    methods:{
      showNotification(message){
        this.text = message;
        this.snackbar = true;
      }
    }
  }
</script>