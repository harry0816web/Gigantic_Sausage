new Vue({el:"#app",data:{input:{userName:"",password:"",birthday:""}},methods:{pushUser(){this.input.userName&&this.input.password&&this.input.birthday?axios.get(`http://localhost:5000/members?userName=${this.input.userName}`).then((t=>{void 0===t.data[0]?axios.post("http://localhost:5000/members",{userName:this.input.userName,password:this.input.password,birthday:this.input.birthday,like:[],shoppingCart:[]}).then((t=>{console.log(t.data),location.href="login.html"})).catch((t=>{alert(t)})):swal("帳號已存在","","error")})):swal("資料未填寫完整","","error")}}});