data={id:"",userData:{userName:"",password:"",birthday:""},checkUser:"false",input:{userName:"",password:""},alredyHad:!1},new Vue({el:"#app",data,methods:{check(){this.checkUser="checking",console.log(this.checkUser)},checkData(){axios.get(`http://localhost:5000/members/${this.id}`).then((s=>{console.log(s.data),this.input.password==s.data.password?(this.input.userName=this.userData.userName,this.checkUser="true"):(swal("密碼錯誤","","error"),this.input.password="")}))},update(){swal.fire({title:"確認更改?",showCancelButton:!0}).then((s=>{s.value?this.input.userName.length&&this.input.password&&axios.patch(`http://localhost:5000/members/${this.id}`,{userName:this.input.userName,password:this.input.password}).then((s=>{swal("成功更改","","success"),this.input.password="",this.input.userName="",this.userData=s.data,this.checkUser="false"})):swal.fire("您取消了更改")}))},backToHomepage(){location.href="index.html"}},mounted(){let s=location.href;this.id=parseInt(s.substr(s.indexOf("id=")).replace(/[^0-9]/gi,"")),axios.get(`http://localhost:5000/members/${this.id}`).then((s=>{this.userData=s.data,console.log(this.userData)})),isNaN(this.id)&&console.log(this.id)},watch:{"input.userName":function(s,e){axios.get(`http://localhost:5000/members?userName=${this.input.userName}`).then((s=>{s.data.length&&this.input.userName!=this.userData.userName?this.alredyHad=!0:this.alredyHad=!1}))}}});