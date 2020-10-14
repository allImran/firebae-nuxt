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
			            @focus="fetchUserList"
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
			          <image-uploader
					        :preview="true"
					        :maxWidth="400"
					        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
					        capture="environment"
					        :debug="1"
					        doNotResize="gif"
					        :autoRotate="true"
					        outputFormat="verbose"
					        @input="setImage"
					      >
					        <label for="fileInput" slot="upload-label">
					          <figure>
					            <svg
					              xmlns="http://www.w3.org/2000/svg"
					              width="32"
					              height="32"
					              viewBox="0 0 32 32"
					            >
					              <path
					                class="path1"
					                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
					              ></path>
					            </svg>
					          </figure>
					          <span class="upload-caption">{{
					            hasImage ? "Replace" : "Click to upload"
					          }}</span>
					        </label>
					      </image-uploader>
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
		name: 'order-create-dialog',
		components: {},
		data () {
			return {
				msg: "Vue Image Upload and Resize Demo",
		        hasImage: false,
		        image: null,
				text: '',
				snackbar: false,
				loading: false,
				isUserFetched: false,
				order: {
    				title: '',
    				userId: '',
    				userName: '',
    				loss: '',
    				detail: '',
    				amount: '',
    				date: '',
    				paid: '',
    				deadLine: ''
    		  	},
			}
		}, //end of data
		computed: {
	    	...mapState({
	    		users: state => state.user.users
		    }),

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
	    	setImage: function(output) {
		      this.hasImage = true;
		      this.image = output;
		      console.log('Info', output.info)
		      console.log('Exif', output.exif)
		    },
			closeDialog(){
				this.loading = false,
				this.order.title = '';
				this.order.userId = '';
				this.order.userName = '';
				this.order.loss = '';
				this.order.amount = '';
				this.order.detail = '';
				this.order.date = '';
				this.order.paid = '';
				this.order.deadline = '';
				this.$emit('onClose');
			},
		}, //end of methods
		created(){
			let time = new Date().toISOString().split('T')[0];
			this.order.date = this.order.deadLine = time;
		}
	}
</script>