<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" xl="4">
			<v-card
		    	class="mx-auto pa-5"
		    	max-width="100%"
		    	height="100%"
		  	>
		    <div class="d-flex">
		    	<v-card-title class="pt-0">Usre List</v-card-title>
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
			        <v-icon>mdi-account</v-icon>
			      </v-avatar>
			      <p class="mt-5">{{ totalUser }}</p>
			    </v-chip>
		    </div>
		     
		    
		    <template>
			  <v-data-table
			    :headers="headers"
			    :items="users"
			    :search="search"
			    single-expand
			    :loading="$store.state.user.loading"
			    :items-per-page="5"
			    class="elevation-1"
			  >
			  	<template v-slot:item.mobile="{ item }">
			  		<div class="d-flex justify-space-between">
			  			{{ item.mobile }}
			  			<div>
			  				<v-btn 
				  				icon 
				  				x-small
				  				@click="openEditModal(item)"
				  				color="primary"
				  			>
						      <v-icon dark>mdi-pencil</v-icon>
						    </v-btn>

						    <a class="fb-link" :href="item.fbId" target="_blank"><v-icon dark>mdi-facebook</v-icon></a>
			  			</div>
			  			
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
	      	ref="editUser"
	      	:user="editItem"
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
import CreateDialog from '@/components/UserCreateDialog'
import EditDialog from '@/components/UserEditDialog'
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
	            text: 'Name',
	            align: 'start',
	            value: 'name',
	          },
	          { text: 'Mobile', value: 'mobile' },
	          
	        ],
    	}
    }, //end of data
    computed: {
    	...mapState({
    		users: state => state.user.users
    	}),
    	totalUser(){
    		return this.users.length;
    	}
    },
    methods: {
    	...mapActions({
	      storeUser: 'user/ACT_STORE',
	      fetchUserList: 'user/ACT_USER',
	      updateUser: 'user/ACT_UPDATE'
	    }),
    	toggleDialog(){
    		this.dialog = !this.dialog
    	},
    	toggleEditDialog(){
    		this.editdialog = !this.editdialog
    	},
    	async store(data){
    		let response = await this.storeUser(data);
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = 'User added successfully...';
    			this.$refs.snackbar.showNotification(message);
    			this.$refs.createExp.closeDialog();
    		}
    	},
    	async fetchExpenceList(){
    		let response = await this.getExpencesList('expence/ACT_EXPENCE')
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
    		//console.log(item, "edited item on index page")
    		let response = await this.updateUser(item)
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = 'Changes has done successfully';
    			this.$refs.snackbar.showNotification(message);
    			this.$refs.editUser.closeDialog();
    		}
    	}
    },

    mounted(){
    	this.fetchUserList();
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
	.fb-link{
		text-decoration: none;
		color: #9da19d !important;
		&:hover{
			color: #3f51b5;
		}
	}

</style>