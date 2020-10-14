<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" xl="4">
			<v-card
				style="padding-bottom: 100px;"
			    class="mx-auto"
			    dark
			    :loading="$store.state.order.loading"
			    max-width="400"
			    min-height="100%"
			  >
			  <h3 class="text-center" v-if="$store.state.product.loading">loading........</h3>
			  <div v-else class="content">
				  <h1>product</h1>
			  </div>
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
			productId() {
				return this.$route.params.id
			},
			
			...mapState({
	    		product: state => state.product.product,
	    	}),
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
		
		mounted(){
	    	this.fetchProduct();
	    }
	}
</script>

<style lang="scss">
	.date{
		h1, span{
			color:#009688 ;
		}
		.d-remain{
			border: 1px solid #009688;
		    border-radius: 50%;
		    padding: 15px;
		}
	}
	.payment-status{
		h2{
			color: #009688;
		}
	}
	.user{
		.user-avatar{
			color: #009688;
			font-size: 90px;
		}
	}
	.percent-text{
		color: #009688;
		font-size: 14px;
	}
	.detail{
		color: #009688;
	}
	.headline-2{
		font-size: 17px;
		font-weight: 600;
	}
</style>