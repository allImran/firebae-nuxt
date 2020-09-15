<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" sm="6">
			<v-card
		    	class="mx-auto pa-5"
		    	max-width="100%"
		    	height="100%"
		  	>
		    <div class="menu-box  d-flex justify-space-around  flex-wrap">
		    	<template v-for="(item, index) in menuItems">
			    	<nuxt-link :key="index" class="link" :to="item.link">
				    	<div class=" flex-column text-center ">
				    		<v-icon class="menu-icon">{{ item.icon }}</v-icon>
				    		<h4>{{ item.name }}</h4>
				    	</div>
			    	</nuxt-link>
		    	</template>
		    </div>
		  </v-card>
		</v-col>
	</v-row>
  
</template>

<script>
  
  export default {
    name: 'index',
    data () {
    	return {
    		menuItems: [
    			{name: 'User', icon: 'mdi-account', link: '/user'},
    			{name: 'Order', icon: 'mdi-cart-arrow-down', link: '#'},
    			{name: 'Expence', icon: 'mdi-currency-bdt', link: '/expence'}
    		]
    	}
    }, //end of data
    
  }
</script>

<style lang="scss">
	.link{
		text-decoration: none;
		color: #9da19d !important;
		border: 1px solid #9da19d;
		padding: 10px 20px;
		display: block;
		margin-bottom: 10px;
		.menu-icon{
			color: #9da19d;
			font-size: 50px;
		}
	}

</style>