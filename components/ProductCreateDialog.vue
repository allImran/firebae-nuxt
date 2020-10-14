<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Add Product
	        </v-card-title>
	        	<v-form>
			    	<v-col cols="12" sm="12" md="12">
			          <v-text-field
			          	v-model="product.name"
			            label="Name"
			            dense
			            outlined
			          ></v-text-field>
			          
			          <v-text-field
			          	v-model="product.price"
			          	type="number"
			            label="price"
			            dense
			            outlined
			          ></v-text-field>
			          
			          <v-textarea
			          	v-model="product.detail"
			            label="Description"
			            dense
			            outlined
			          ></v-textarea>
			          
			          <image-uploader
			          		ref="image"
					        :preview="preview"
					        :maxWidth="400"
					        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
					        capture="environment"
					        :debug="1"
					        doNotResize="gif"
					        :autoRotate="true"
					        outputFormat="file"
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
		name: 'product-create-dialog',
		components: {},
		data () {
			return {
				preview: true,
				msg: "Vue Image Upload and Resize Demo",
		        hasImage: false,
		        image: null,
				text: '',
				snackbar: false,
				loading: false,
				isUserFetched: false,
				product: {
    				name: '',
    				detail: '',
    				price: '',
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
				if(this.product.name.trim() == ''){this.$refs.snackbar.showNotification('Write a name first.'); return;}
				console.log(this.product);
				//this.loading = true;
				this.product.image = this.image;
				this.$emit('onClickConfirm', this.product);
			},
			
	    	setImage: function(output) {
		      this.hasImage = true;
		      this.image = output;
		      // console.log('Info', output.info)
		      // console.log('Exif', output.name)
		    },
			closeDialog(){
				this.loading = false,
				this.product.name = '';
				this.product.detail = '';
				this.product.price = '';
				this.hasImage = false;
		      	this.image = null;
		      	var image2 = document.getElementsByClassName("img-preview");
				image2.src = "image1.jpg"
				console.log(document.getElementsByClassName("img-preview"));
				this.$emit('onClose');
			},
		}, //end of methods
		
	}
</script>

<style lang="scss">
	.img-preview{
		width: 100%;
	}
</style>