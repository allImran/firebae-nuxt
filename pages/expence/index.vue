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
		    	<v-btn @click="openDialog()"> 
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
			  	<template v-slot:item.date="{ item }">
			  		<div class="d-flex justify-space-between">
			  			{{ item.date }}
			  			<v-btn icon x-small color="primary">
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
	      	@onClickConfirm="store()"
	      	@onClose="closeDialog()"
	      />
	    </v-dialog>
	</v-row>
</template>

<script>
import CreateDialog from '@/components/ExpenceCreateDialog'
 import { mapActions, mapState } from 'vuex'
  export default {
    name: 'index',
    components: {CreateDialog},
  //   async fetch({ store, route }) {
	 //    await store.dispatch("expence/ACT_EXPENCE");
	 // },
    data () {
    	return {
    		search: '',
    		dialog: false,
    		headers: [
	          {
	            text: 'Title',
	            align: 'start',
	            sortable: false,
	            value: 'title',
	          },
	          { text: 'Amount', value: 'expence' },
	          { text: 'Date', value: 'date' },
	          
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
    methods: {
    	openDialog(){
    		this.dialog = true
    	},
    	...mapActions({
		      storeEXp: 'expence/ACT_STORE' // map `this.add()` to `this.$store.dispatch('increment')`
		    }),
    	store(){
    		this.storeEXp(this.expence)
    		this.dialog = false;
			this.expence.title = '';
			this.expence.expence = '';
			this.expence.description = '';
    	},
    	closeDialog(){
    		this.dialog = false;
    	}
    },
    mounted(){
    	this.$store.dispatch('expence/ACT_EXPENCE')
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