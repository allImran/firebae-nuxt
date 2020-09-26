<template>
	<v-row>
		<v-col class="mx-auto mt-12" cols="12" md="4" xl="4">
			<v-card
		    	class="mx-auto pa-5 custome"
		    	max-width="100%"
		    	height="100%"
		  	>
				<div class="d-flex justify-center align-center flex-column">
					<v-select
			            placeholder="Select Type"
			            :items="names"
			            dense
			            @change="showcharData"
			            outlined
			         ></v-select>
					<v-progress-circular
				      :rotate="360"
				      :size="150"
				      :width="15"
				      :value="value"
				      color="teal"
				    >
				      {{ total }}
				    </v-progress-circular>
				</div>
				<p class="text-center mt-5">{{ name }} : <strong>{{ totalAmount }}</strong></p>

				<v-sheet
			      class="v-sheet--offset mx-auto mt-5"
			      color="cyan"
			      elevation="12"
			      max-width="calc(100% - 32px)"
			    >
			      <v-sparkline
			        :labels="names"
			        :value="sumTotal "
			        color="white"
			        line-width="2"
			        padding="16"
			      ></v-sparkline>
			    </v-sheet>

			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import expName from './expName'
	export default {
		name: 'chart-index',
		data () {
			return {
				names: expName,
				value: 0,
				totalAmount: '',
				name: '',
			} 
		},
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
	    	},
	    	sumTotal(){
	    		let sum = [];
	    		this.names.map(name => {
	    			let total=0;
	    			let fexp = this.expences.filter(i => i.title == name);
	    			if(fexp.length > 0){
	    				fexp.map(i => {
							total = total + parseInt(i.expence)
						});
						sum.push(total)
	    			}else{
	    				sum.push(0)
	    			}
	    		})
	    		return sum;
	    	}
	    },
		methods: {
			...mapActions({
		      getExpencesList: 'expence/ACT_EXPENCE',
		    }),
			showcharData(value) {
				this.name = value;
				let fexp = this.expences.filter(i => i.title == value)
				if(fexp.length > 0){
					let sum = 0;
					fexp.map(i => {
						sum = sum + parseInt(i.expence)
					})
					console.log(sum, 'fdfdf')
					this.totalAmount = sum;
					let just = parseInt(sum / this.total * 100);
					this.value = just;
				}else{
					this.value = 0;
					this.totalAmount = 0;
				}
			},
			async fetchExpenceList(){
	    		let response = await this.getExpencesList()
	    		if(!response.success){
	    			let message = 'Login again';
	    			this.$refs.snackbar.showNotification(message);
	    		}
	    	},
		}, //end of methods
		mounted(){
	    	this.fetchExpenceList();
	    }
	}
</script>