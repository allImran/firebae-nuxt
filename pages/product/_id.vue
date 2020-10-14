<template>
	<v-row class="product-detail">
		<v-col class="mx-auto mt-12" cols="12" md="4" xl="4">
			<v-card
			    :loading="$store.state.product.loading"
			    class="mx-auto pb-8"
			    height="100%"
			  >
			    <template slot="progress">
			      <v-progress-linear
			        color="deep-purple"
			        height="10"
			        indeterminate
			      ></v-progress-linear>
			    </template>

				    <v-img
				      height="290"
				      :src="`https://firebasestorage.googleapis.com/v0/b/batayon-1.appspot.com/o/${imageName}?alt=media`"
				    >
				    	<v-card-title>{{product.name}}</v-card-title>
				    </v-img>

				    <div class="d-flex justify-center align-center mt-10 mb-5">
				    	<span class="display-3 mr-3 price">{{ product.price}} <sup>tk</sup></span>
				    	<v-divider
						  vertical
						></v-divider>
				    	<span class="ml-3">Total sale: 43</span>
				    </div>

			    	<v-card-title>Details</v-card-title>
				      
					<v-card-text>
				      <div>{{ product.detail }}</div>
				    </v-card-text>

			    <!-- <v-card-actions>
			      <v-btn
			        color="deep-purple lighten-2"
			        text
			        @click="reserve"
			      >
			        Reserve
			      </v-btn>
			    </v-card-actions> -->
			  </v-card>
			
		</v-col>
		<Snackbar
	    	ref="snackbar"
	    />
	</v-row>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import Snackbar from '@/components/Snackbar'

	export default {
		name: 'single-product',
		data() {
			return {

			}
		},
		components: {},
		computed: {
			...mapState({
	    		product: state => state.product.product,
	    	}),
			productId() {
				return this.$route.params.id
			},
			imageName(){
				return this.product.image.replace('/', '%2F')
			},
		},
		methods: {
			...mapActions({
		      getProduct: 'product/ACT_SINGLE_PRODUCT',
		    }),
			async fetchProduct(item){
	    		//console.log(item, "edited item on index page")
	    		let response = await this.getProduct(this.productId)
	    		if(!response.success){
	    			let message = response.message;
	    			this.$refs.snackbar.showNotification(message);
	    		}
	    	},
	    	
		},//end of methods
		
		created(){
	    	this.fetchProduct();
	    }
	}
</script>

<style lang="scss">
	.product-detail{
		.v-card__title{
			background-color: #13111121;
		}
		.price{ 
			color: #009688;
		}
	}
</style>