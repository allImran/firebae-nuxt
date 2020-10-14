<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" xl="4">
			<v-card
		    	class="mx-auto pa-5 custome"
		    	max-width="100%"
		  	>
		    <div class="d-flex">
		    	<v-card-title class="pt-0">Product List</v-card-title>
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
			        <v-icon>mdi-shopping</v-icon>
			      </v-avatar>
			      <p class="mt-5">{{ total }}</p>
			    </v-chip>
		    </div>
		     
		    
		    <template>
			  <v-data-table
			    :headers="headers"
			    :items="products"
			    :search="search"
			    single-expand
			    :loading="$store.state.product.loading"
			    :items-per-page="5"
			    class="elevation-1"
			  >
			  	
			    <template v-slot:item.actions="{ item }">
			      <v-icon
			        small
			        class="mr-2"
			        @click="openEditModal(item)"
			      >
			        mdi-pencil
			      </v-icon>
			      <v-icon
			        small
			      	@click="$router.push({path: `/product/${item.id}`})"
			      >
			        mdi-eye
			      </v-icon>
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
	      	ref="productExp"
	      	@onClickConfirm="store"
	      	@onClose="toggleDialog()"
	      />
	    </v-dialog>
	    <v-dialog
	      v-model="editdialog"
	      width="375px"
	    >
	      <EditDialog
	      	ref="editOrder"
	      	:order="editItem"
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
import CreateDialog from '@/components/ProductCreateDialog'
import EditDialog from '@/components/OrderEditDialog'
import Snackbar from '@/components/Snackbar'
import { mapActions, mapState } from 'vuex'

  export default {
    name: 'order-index',
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
	          { text: 'Price', value: 'price' },
	          { text: 'Actions', value: 'actions', sortable: false },
	        ],
    	}
    }, //end of data
    computed: {
    	...mapState({
    		products: state => state.product.products,
    	}),
    	total(){
    		return this.products.length;
    	}
    },
    methods: {
    	...mapActions({
	      storeProduct: 'product/ACT_STORE',
	      getProductList: 'product/ACT_PRODUCT',
	      updateProduct: 'product/ACT_UPDATE'
	    }),
    	toggleDialog(){
    		this.dialog = !this.dialog
    	},
    	toggleEditDialog(){
    		this.editdialog = !this.editdialog
    	},
    	async store(data){
    		console.log(data)
    		let response = await this.storeProduct(data);
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = 'Order added successfully...';
    			this.$refs.snackbar.showNotification(message);
    			this.$refs.productExp.closeDialog();
    		}
    	},
    	async fetchProductList(){
    		let response = await this.getProductList()
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
    		let response = await this.updateProduct(item)
    		if(!response.success){
    			let message = 'Login and try again';
    			this.$refs.snackbar.showNotification(message);
    		}else{
    			let message = 'Changes has done successfully';
    			this.$refs.snackbar.showNotification(message);
    			this.$refs.editOrder.closeDialog();
    		}
    	}
    },

    mounted(){
    	this.fetchProductList();
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
	.custome{
		min-height: 100%;
	}
</style>