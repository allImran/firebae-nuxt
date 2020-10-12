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
			  <h3 class="text-center" v-if="$store.state.order.loading">loading........</h3>
			  <div v-else class="content">
				  <v-card-title>{{ order.title }}</v-card-title>
				  <v-divider></v-divider>
				  <div class="order-data pa-3">
				  	<div class="date d-flex justify-space-around align-center">
				  		<table class="mt-5">
					  		<tr>
					  			<td>Order Date:</td>
					  			<td><strong class="pl-5">{{ order.date | fomrmateTime }}</strong></td>
					  		</tr>
					  		<tr v-if="dateCheck">
					  			<td>Order Deadline:</td>
					  			<td><strong class="pl-5">{{ order.deadLine | fomrmateTime }}</strong></td>
					  		</tr>
					  	</table>
					  	<div v-if="dateCheck" class="d-remain text-center">
					  		<h1>{{ diffsBetweenDate(order.deadLine) }}</h1> <span>Days Left</span>
					  	</div>
				  	</div>
				  	
				  	 <div class="mt-14 text-center">
				  	 <div class="mb-5">
				  	 	<span>Price: <strong> ৳ {{ order.amount }}</strong></span> 
				    	<span v-if="dateCheck"> <span class="text-h5 ml-3 mr-3 mt-3">|</span> Paid: <strong> ৳ {{ order.paid }}</strong></span>
				  	 </div>

				  	 <div v-if="order.amount == order.paid" class="payment-status justify-center d-flex">
				  	 	  <v-icon color="#009688">mdi-checkbox-marked-circle</v-icon>
				  	 	  <h2>Full Paid</h2>
				  	 </div>
				    <v-progress-linear
				    	v-else
				      color="teal"
				      buffer-value="0"
				      :value="payPercent"
				      stream
				    ></v-progress-linear>
				    <p class="mb-10 percent-text text-center">{{ payPercent }}%</p>
				    </div>
				  </div>
				  <v-divider></v-divider>
				  <div class="user d-flex justify-space-around align-center">
				  	<div >
				  		<v-icon class="user-avatar">mdi-account</v-icon>
				  	</div>
				  	<div class="user-info">
					  	<v-list-item>
					      <v-list-item-avatar color="grey"></v-list-item-avatar>
					      <v-list-item-content>
					        <v-list-item-title class="headline-2">{{ user.name }}</v-list-item-title>
					      </v-list-item-content>
					    </v-list-item>
					     <v-list-item>
					    	<v-list-item-icon>
					          <v-icon>mdi-cellphone-android</v-icon>
					        </v-list-item-icon>
					        <v-list-item-content>
					            <v-list-item-title>{{user.mobile}}</v-list-item-title>
					        </v-list-item-content>
					     </v-list-item>

					     <v-list-item>
					    	<v-list-item-icon>
					          <v-icon>mdi-home</v-icon>
					        </v-list-item-icon>
					        <v-list-item-content>
					            
					            	<span>{{ user.address }}</span>
					        	
					        </v-list-item-content>
					     </v-list-item>
				  	</div>
				  </div>
				  <v-divider></v-divider>
				  <p 
				  	class="mt-2 detail pa-3"
				  >
				  		<strong>Order Detail: </strong>
				  		{{ order.detail }}
				  	</p>
				  	<SimpleTable :data="{
				  		'price': order.amount,
				  		'paid': order.paid,
				  		'loss': order.loss
				  	}" />
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
	import SimpleTable from '@/components/SimpleTable'
	import {diffBetweenDate} from '@/service/transform'

	export default {
		name: 'single-order',
		data() {
			return {

			}
		},
		components: {SimpleTable},
		computed: {
			orderId() {
				return this.$route.params.id
			},
			dateCheck(){
				let start = new Date();
	    		let end = new Date(this.order.deadLine);
	    		return (start < end);
			},
			payPercent(){
				return parseInt((this.order.paid/this.order.amount) * 100);
			},
			
			...mapState({
	    		order: state => state.order.order,
	    		user: state => state.order.user,
	    	}),
		},
		methods: {
			...mapActions({
		      getOrder: 'order/ACT_SINGLE_ORDER',
		    }),
			async fetchOrder(item){
	    		//console.log(item, "edited item on index page")
	    		let response = await this.getOrder(this.orderId)
	    		if(!response.success){
	    			let message = response.message;
	    			this.$refs.snackbar.showNotification(message);
	    		}else{
	    			let message = 'Changes has done successfully';
	    			this.$refs.snackbar.showNotification(message);
	    			this.$refs.editUser.closeDialog();
	    		}
	    	},
	    	diffsBetweenDate(deadline){
	    		let start = new Date();
	    		let end = new Date(deadline);
	    		console.log(start < end)
	    		return diffBetweenDate(start, deadline);
	    	}
		},//end of methods
		filters: {
	    	fomrmateTime(time){
	    		let date = new Date(time).toDateString().split(' ');
	    		return date[2] + '-' + date[1] + '-' + date[3]
	    	}
	    },
		
		mounted(){
	    	this.fetchOrder();
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