<template>
	<v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      direction= "top"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="#fff"
          dark
          icon
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <template v-for="(item, index) in items">
      	
	      <v-btn
	        v-if="item.link !== path"
	        :key="index"
	        fab
	        dark
	        :to="item.link"
	        small
	        color="#424242"
	      >
	        <v-icon>{{ item.icon }}</v-icon>
	      </v-btn>

      </template>
      
    </v-speed-dial>
</template>

<script>
	export default {
	name: 'speed-dial',
		computed: {
			path() {
				return this.$route.path;
			}
		},
		data: () => ({
	      direction: 'top',
	      fab: false,
	      fling: false,
	      hover: false,
	      tabs: null,
	      top: false,
	      right: false,
	      bottom: true,
	      left: true,
	      transition: 'slide-y-reverse-transition',
	      items: [
    			{name: 'Home', icon: 'mdi-home', link: '/'},
    			{name: 'User', icon: 'mdi-account', link: '/user'},
    			{name: 'Order', icon: 'mdi-cart-arrow-down', link: '/order'},
    			{name: 'Expence', icon: 'mdi-currency-bdt', link: '/expence'},
    			{name: 'Statistics', icon: 'mdi-chart-bell-curve-cumulative', link: '/chart'}
    		]
	    }),
	}
</script>

