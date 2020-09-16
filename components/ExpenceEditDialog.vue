<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Edit Expence
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
			          	type="number"
			            label="Amount"
			            dense
			            outlined
			          ></v-text-field>
			          <div class="d-flex justify-center align-center mb-5 mt-2">
				           <v-date-picker
				           	full-width 
				           	v-model="expence.time"
				           	color="green lighten-1"
				         	>
				           	</v-date-picker>
			          </div>
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
			ref="snackbar"	    	
	    />
	</div>
</template>

<script>
	import Snackbar from '@/components/Snackbar'
	export default{
		name: 'expence-edit-dialog',
		data () {
			return {
				text: '',
				snackbar: false,
				loading: false,
			}
		}, //end of data
		methods: {
			store(){
				if(this.expence.title.trim() == ''){this.$refs.snackbar.showNotification('Write a title first.'); return;}
				if(!Number.isInteger(parseInt(this.expence.expence)) || parseInt(this.expence.expence) < 1){this.$refs.snackbar.showNotification('Give right amount.'); return;}
				this.$emit('onClickConfirm', this.expence);
			},
			closeDialog(){
				this.$emit('onClose');
			},
		},
		props: {
			expence: {
				required: true
			}
		}
	}
</script>