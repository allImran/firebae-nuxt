<template>
	<div>
		<v-card>
	        <v-card-title class="headline">
	          Add Expence
	        </v-card-title>
	        	<v-form>
			    	<v-col cols="12" sm="12" md="12">
			          <v-select
			          	v-model="expence.title"
			            placeholder="Title"
			            :items="names"
			            dense
			            outlined
			          ></v-select>
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
	import expName from './expName'
	export default{
		name: 'expence-create-dialog',
		data () {
			return {
				text: '',
				names: expName,
				snackbar: false,
				loading: false,
				expence: {
    				title: '',
    				expence: '',
    				description: '',
    				time: ''
    		  	},
			}
		}, //end of data
		methods: {
			store(){
				if(this.expence.title.trim() == ''){this.$refs.snackbar.showNotification('Write a title first.'); return;}
				if(!Number.isInteger(parseInt(this.expence.expence)) || parseInt(this.expence.expence) < 1){this.$refs.snackbar.showNotification('Give right amount.'); return;}
				console.log(this.expence)
				this.$emit('onClickConfirm', this.expence);
			},
			closeDialog(){
				this.loading = false,
				this.expence.title = '';
				this.expence.expence = '';
				this.expence.description = '';
				this.$emit('onClose');
			},
		}, //end of methods
		created(){
			this.expence.time = new Date().toISOString().split('T')[0];
		}
	}
</script>