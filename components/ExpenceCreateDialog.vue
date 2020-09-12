<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Add Expence
	        </v-card-title>
	        	<v-form>
			    	<v-col cols="12" sm="12" md="12">
			          <v-text-field
			          	v-model="expence.title"
			            label="Title"
			            dense
			            outlined
			          ></v-text-field>
			          <v-text-field
			          	v-model="expence.expence"
			            label="Amount"
			            dense
			            outlined
			          ></v-text-field>
			          <v-textarea
			          	v-model="expence.description"
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
	    	:text="text"
	    	:snackbar="snackbar"
	    	
	    />
	</div>
</template>

<script>
	import Snackbar from '@/components/Snackbar'
	export default{
		name: 'expence-create-dialog',
		data () {
			return {
				text: '',
				snackbar: false,
				loading: false,
				expence: {
    			title: '',
    			expence: '',
    			description: '',
    		  },
			}
		}, //end of data
		methods: {
			store(){
				if(this.expence.title.trim() == ''){this.snackAlert('Write a title')}
				console.log('store')
			},
			closeDialog(){
				this.expence.title = '';
				this.expence.expence = '';
				this.expence.description = '';
				this.$emit('onClose');
			},
			snackAlert(text){
				this.text = text;
				this.snackbar = true;
			}
		}
	}
</script>