export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (process.browser) {
  	let userId = localStorage.getItem('UID');
	  	if(userId === null)
	    	return redirect('/login')
	  }
}
// loggedIn(){
//       if(process.browser){
//           //localStorage.setItem("authToken", token);
//           let userId = localStorage.getItem('UID')
//           return userId === null ? false : true
//       }
//     },