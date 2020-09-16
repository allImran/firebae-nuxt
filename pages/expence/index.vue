<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" sm="6">
			<v-card
		    	class="mx-auto pa-5"
		    	max-width="100%"
		    	height="100%"
		  	>
		    <div class="d-flex">
		    	<v-card-title class="pt-0">Expence List</v-card-title>
		    	<v-spacer></v-spacer>
		    	<v-btn @click="toggleDialog()"> 
		    		<v-icon>mdi-plus</v-icon>Create
		    	</v-btn>
		    </div>
		    <v-divider></v-divider>
		    <div class="d-flex justify-space-between align-center mb-10 mt-5">
			    <v-text-field
			    	class="mr-10"
			        v-model="search"
			        label="Search"
			        outlined
			        dense
			        hide-details
			     ></v-text-field>
		    	<v-chip
			      color="indigo"
			      text-color="white"
			    >
			      <v-avatar left>
			        <v-icon>mdi-currency-bdt</v-icon>
			      </v-avatar>
			      <p class="mt-5">{{total}}</p>
			    </v-chip>
		    </div>
		     
		    
		    <template>
			  <v-data-table
			    :headers="headers"
			    :items="expences"
			    :search="search"
			    :loading="$store.state.expence.loading"
			    :items-per-page="5"
			    class="elevation-1"
			  >
			  	<template v-slot:item.time="{ item }">
			  		<div class="d-flex justify-space-between">
			  			{{ item.time | fomrmateTime }}
			  			<v-btn 
			  				icon 
			  				x-small
			  				@click="openEditModal(item)"
			  				color="primary"
			  			>
					      <v-icon dark>mdi-pencil</v-icon>
					    </v-btn>
			  		</div>
			    </template>

			  </v-data-table>
			</template>
		  </v-card>
		</v-col>

		<v-dialog
	      v-model="dialog"
	      width="375px"
	    >
	      <CreateDialog
	      	ref="createExp"
	      	@onClickConfirm="store"
	      	@onClose="toggleDialog()"
	      />
	    </v-dialog>
	    <v-dialog
	      v-model="editdialog"
	      width="375px"
	    >
	      <EditDialog
	      	ref="editExp"
	      	:expence="editItem"
	      	@onClickConfirm="saveEditedItem"
	      	@onClose="toggleEditDialog()"
	      />
	    </v-dialog>

	    <Snackbar
	    	ref="snackbar"
	    />
	</v-row>
</template>

<script>
import CreateDialog from '@/components/ExpenceCreateDialog'
import EditDialog from '@/components/ExpenceEditDialog'
import Snackbar from '@/components/Snackbar'

 import { mapActions, mapState } from 'vuex'
  export default {
    name: 'index',
    components: {CreateDialog, EditDialog},
  //   async fetch({ store, route }) {
	 //    await store.dispatch("expence/ACT_EXPENCE");
	 // },
    data () {
    	return {
    		search: '',
    		dialog: false,
    		editdialog: false,
    		editItem: '',
    		headers: [
	          {
	            text: 'Title',
	            align: 'start',
	            sortable: false,
	            value: 'title',
	          },
	          { text: 'Amount', value: 'expence' },
	          { text: 'Date', value: 'time' },
	          
	        ],
    	}
    }, //end of data
    computed: {
    	...mapState({
    		expences: state => state.expence.expences
    	}),
    	total(){
    		let total = 0;
    		this.expences.map(i => {
    			total = total + parseFloat(i.expence);
    		})
    		return total;
    	}
    },
    filters: {
    	fomrmateTime(time){
    		let date = new Date(time).toDateString().split(' ');
    		return date[2] + '-' + date[1] + '-' + date[3]
    	}
    },
    methods: {
    	...mapActions({
	      storeExpence: 'expence/ACT_STORE',
	      getExpencesList: 'expence/ACT_EXPENCE',
	      updateExpence: 'expence/ACT_UPDATE'
	    }),
    	toggleDialog(){
    		this.dialog = !this.dialog
    	},
    	toggleEditDialog(){
    		this.editdialog = !this.editdialog
    	},
    	async store(data){
    		let response = await this.storeExpence(data);
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = '1 item added successfully';
    			this.$refs.snackbar.showNotification(message);
    			this.$refs.createExp.closeDialog();
    		}
    	},
    	async fetchExpenceList(){
    		let response = await this.getExpencesList()
    		if(!response.success){
    			let message = 'Login again';
    			this.$refs.snackbar.showNotification(message);
    		}
    	},
    	openEditModal(item){
    		this.toggleEditDialog();
    		this.editItem = Object.assign({},item);
    	},
    	async saveEditedItem(item){
    		console.log(item, "edited item on index page")
    		let response = await this.updateExpence(item)
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = 'Changes has done successfully';
    			this.$refs.snackbar.showNotification(message);
    			this.editdialog = false;
    		}
    	}
    },

    mounted(){
    	this.fetchExpenceList();
    }
    
  }
</script>

<style lang="scss">
	.link{
		text-decoration: none;
		color: #9da19d !important;
		border: 1px solid #9da19d;
		padding: 10px 20px;
		display: block;
		margin-bottom: 10px;
		
	}

</style>