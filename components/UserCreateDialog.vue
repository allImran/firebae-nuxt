<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Add User
	        </v-card-title>
	        	<v-form>
			    	<v-col cols="12" sm="12" md="12">
			          <v-text-field
			          	v-model="user.name"
			            label="Name"
			            dense
			            outlined
			          ></v-text-field>
			          <v-text-field
			          	v-model="user.mobile"
			          	type="Number"
			            label="Mobile No"
			            dense
			            outlined
			          ></v-text-field>
			          <v-text-field
			          	v-model="user.fbId"
			            label="Facebook ID"
			            dense
			            outlined
			          ></v-text-field>
			          <v-textarea
			          	v-model="user.address"
			            label="Address"
			            dense
			            outlined
			          ></v-textarea>
			          <!-- <v-file-input
			          	@change="onFilePicked"
					    accept="image/png, image/jpeg, image/bmp"
					    placeholder="Pick an avatar"
					    prepend-icon="mdi-camera"
					    dense
					    outlined
					  ></v-file-input> -->
					   <v-img :src="imageUrl" ></v-img>
			          <v-textarea
			          	v-model="user.description"
			            label="Description"
			            dense
			            outlined
			          ></v-textarea>
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
	export default{
		name: 'user-create-dialog',
		data () {
			return {
				text: '',
				snackbar: false,
				loading: false,
				imageUrl: '',
				user: {
    				name: '',
    				fbId: '',
    				mobile: '',
    				address: '',
    				description: '',
    				image: null
    		  	},
			}
		}, //end of data
		methods: {
			store(){
				if(this.user.name.trim() == ''){this.$refs.snackbar.showNotification('Write a name first.'); return;}
				console.log(this.user.mobile.length)
				if(!Number.isInteger(parseInt(this.user.mobile)) || this.user.mobile.length < 6){this.$refs.snackbar.showNotification('Give right number.'); return;}
				if(this.user.address.trim() == ''){this.$refs.snackbar.showNotification('Write address.'); return;}
				this.$emit('onClickConfirm', this.user);
				//console.log(this.user.image.name)
			},
			onFilePicked(event){
				if(event !== undefined){
					const fileReader = new FileReader();
					fileReader.addEventListener('load', () => {
						this.imageUrl = fileReader.result;
						this.user.image = event;
					});
					fileReader.readAsDataURL(event)
				}else{
					this.imageUrl = '';
					this.user.image = null;
				}
			},
			closeDialog(){
				this.imageUrl = '';
				this.user.image = null;
				this.loading = false,
				this.user.name = '';
				this.user.fbId = '';
				this.user.mobile = '';
				this.user.address = '';
				this.user.description = '';
				this.$emit('onClose');
			},
		}
	}
</script>