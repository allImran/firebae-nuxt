<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Add Order
	        </v-card-title>
	        	<v-form>
			    	<v-col cols="12" sm="12" md="12">
			          <v-text-field
			          	v-model="order.title"
			            label="Title"
			            dense
			            outlined
			          ></v-text-field>
			          <v-autocomplete
			            v-model="order.userId"
			            :items="users"
			            item-text="name"
			            item-value="id"
			            outlined
			            @change="setuserName"
			            dense
			            :loading="$store.state.user.loading"
			            placeholder="Select User"
			          ></v-autocomplete>
			          <v-text-field
			          	v-model="order.amount"
			          	type="number"
			            label="Amount"
			            dense
			            outlined
			          ></v-text-field>
			          <v-text-field
			          	v-model="order.paid"
			          	type="number"
			            label="Paid Amount"
			            dense
			            outlined
			          ></v-text-field>
			          <v-text-field
			          	v-model="order.loss"
			          	type="number"
			            label="Loss"
			            dense
			            outlined
			          ></v-text-field>
			          <h5 class="text-center">Date</h5>
			          <div class="d-flex justify-center align-center mb-5 mt-2">
				           <v-date-picker
				           	full-width 
				           	v-model="order.date"
				           	color="green lighten-1"
				         	>
				           	</v-date-picker>
			          </div>
			          <v-textarea
			          	v-model="order.detail"
			            label="Description"
			            dense
			            outlined
			          ></v-textarea>
			          <h5 class="text-center">Dead Line</h5>
			          <div class="d-flex justify-center align-center mb-5 mt-2">
				           <v-date-picker
				           	full-width 
				           	v-model="order.deadLine"
				           	color="green lighten-1"
				         	>
				           </v-date-picker>
			          </div>
			          <v-btn 
			          	:loading="loading"
			          	@click="store()"
			          >
			          Confirm</v-btn>
			          <v-btn
			            color="primary"
			            text
			            @click="closeDialog()"
			          >
			            Cancel
			          </v-btn>
			        </v-col>
			    </v-form>
	      </v-card>
	    <Snackbar 
			ref="snackbar"	    	
	    />
	</div>
</template>

<script>
	import Snackbar from '@/components/Snackbar'
	import { mapActions, mapState } from 'vuex'

	export default{
		name: 'order-edit-dialog',
		data () {
			return {
				text: '',
				snackbar: false,
				loading: false,
				isUserFetched: false,
				// order: {
    // 				title: '',
    // 				userId: '',
    // 				userName: '',
    // 				loss: '',
    // 				detail: '',
    // 				amount: '',
    // 				date: '',
    // 				paid: '',
    // 				deadLine: ''
    // 		  	},
			}
		}, //end of data
		computed: {
	    	...mapState({
	    		users: state => state.user.users
		    }),

	    },
	    props: {
	    	order: {
	    		required: true
	    	}
	    },
	   
		methods: {
			...mapActions({
		      getUserList: 'user/ACT_USER',
		    }),
			store(){
				if(this.order.title.trim() == ''){this.$refs.snackbar.showNotification('Write a title first.'); return;}
				console.log(this.order);
				this.loading = true;
				this.$emit('onClickConfirm', this.order);
			},
			
			async fetchUserList(){
				console.log( 'fetchUser')
				if(!this.isUserFetched){
					let response = await this.getUserList();
		    		if(!response.success){
		    			let message = 'Login again';
		    			this.$refs.snackbar.showNotification(message);
		    		}else{
		    			this.isUserFetched = true;
		    		}
				}
	    		
	    	},
	    	setuserName(id){
	    		let user = this.users.filter(i => i.id === id);
	    		console.log(user);
	    		this.order.userName = user[0].name
	    	},
			closeDialog(){
				this.loading = false,
				// this.order.title = '';
				// this.order.userId = '';
				// this.order.userName = '';
				// this.order.loss = '';
				// this.order.amount = '';
				// this.order.detail = '';
				// this.order.date = '';
				// this.order.paid = '';
				// this.order.deadline = '';
				this.$emit('onClose');
			},
		}, //end of methods
		created(){
			this.fetchUserList();
		}
	}
</script>