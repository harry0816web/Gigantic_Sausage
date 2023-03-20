new Vue({el:"#app",data:{userData:{id:0,userName:"",like:[],shoppingCart:[],birthDate:""},merches:[{id:1,merchPicSrc:"pictures/sausage6.png",merchName:"normal sausage",merchPrice:180,like:!1},{id:2,merchPicSrc:"pictures/sausage1.png",merchName:"sweet sausage",merchPrice:150,like:!1},{id:3,merchPicSrc:"pictures/sausage2.png",merchName:"spicy sausage",merchPrice:180,like:!1},{id:4,merchPicSrc:"pictures/sausage3.png",merchName:"pepper sausage",merchPrice:120,like:!1},{id:5,merchPicSrc:"pictures/sausage4.png",merchName:"garlic sausage",merchPrice:130,like:!1},{id:6,merchPicSrc:"pictures/sausage5.png",merchName:"curry sausage",merchPrice:200,like:!1},{id:7,merchPicSrc:"pictures/sausage6.png",merchName:"wine sausage",merchPrice:150,like:!1},{id:8,merchPicSrc:"pictures/sausage1.png",merchName:"sweet sausage",merchPrice:185,like:!1},{id:9,merchPicSrc:"pictures/sausage2.png",merchName:"spicy sausage",merchPrice:185,like:!1},{id:10,merchPicSrc:"pictures/sausage3.png",merchName:"pepper sausage",merchPrice:199,like:!1},{id:11,merchPicSrc:"pictures/sausage1.png",merchName:"sweet sausage",merchPrice:100,like:!1},{id:12,merchPicSrc:"pictures/sausage2.png",merchName:"spicy sausage",merchPrice:250,like:!1}],prevShowRange:0,showRange:9,merchesOnList:[],filter:{flavor:"all",size:"15cm",price:"none"},placeHolder:"輸入想搜尋的商品",inputSearch:"",loading:!1,arr:[],couponCode:""},computed:{onList(){if(""!=this.inputSearch)return this.merchesOnList=this.sortByPrice(this.merches.filter((e=>{let t=this.inputSearch.toLowerCase();if(-1!=e.merchName.indexOf(t))return e})));if("none"!=this.filter.price&&"all"==this.filter.flavor&&""==this.inputSearch)return this.merchesOnList=this.sortByPrice(this.merches.filter(((e,t)=>{if(t<this.showRange)return e})));if("all"==this.filter.flavor)return this.merchesOnList=this.sortByPrice(this.merches.filter(((e,t)=>{if(t<this.showRange)return e})));if("all"!=this.filter.flavor)return this.merchesOnList=this.sortByPrice(this.merches.filter((e=>{if(-1!=e.merchName.indexOf(this.filter.flavor))return e})));if(0==this.merchesOnList.length||9!=this.showRange){for(let e=this.prevShowRange;e<this.showRange;e++)this.merchesOnList.push(this.merches[e]);return this.merchesOnList=this.sortByPrice(this.merchesOnList)}return this.merchesOnList},collection(){return this.merches.filter((e=>{if(1==e.like)return e}))}},methods:{moreMerches(){this.prevShowRange=this.showRange,this.merches.length-this.showRange<9?this.showRange=this.merches.length:this.showRange+=9},sortByPrice(e){return"price_highToLow"==this.filter.price?e.sort((function(e,t){return t.merchPrice-e.merchPrice})):"price_lowToHigh"==this.filter.price?e.sort((function(e,t){return e.merchPrice-t.merchPrice})):e},changeLike(e){console.log(e);let t=this.merchesOnList[e].id;console.log(t),console.log(this.merchesOnList);let i=!this.merchesOnList[e].like;console.log(i),this.merches[t-1].like=i;let s=this.merches.length;for(let t=0;t<s;t++)this.merches[t].id==this.merchesOnList[e].id&&(this.merches[t].like=i);if(i)this.userData.like.push(t),axios.patch(`http://localhost:5000/members/${this.userData.id}`,{like:this.userData.like}).catch((e=>{console.log(e)}));else{let e;for(let i=0;i<this.userData.like.length;i++)t==this.userData.like[i]&&(e=i,console.log(e));this.userData.like.splice(e,1),axios.patch(`http://localhost:5000/members/${this.userData.id}`,{like:this.userData.like}).catch((e=>{console.log(e)}))}let r=this.userData.like.join("|");document.cookie=`like=${r};max-age=3600*24`,this.getUserData()},check(){for(let e=0;e<this.merchesOnList.length;e++)1==this.merchesOnList[e].like&&console.log(this.merchesOnList[e].id)},getUserData(){if(""==this.getCookie("id")&&(location.href="login.html"),this.userData.id=this.getCookie("id"),this.userData.userName=this.getCookie("userName"),this.userData.like=this.getCookie("like"),!isNaN(this.userData.like[0]))for(let e=0;e<this.userData.like.length;e++)this.merches[this.userData.like[e]-1].like=!0;axios.get(`http://localhost:5000/members/${this.userData.id}`).then((e=>{this.userData.shoppingCart=e.data.shoppingCart})),this.loading=!1},getCookie(e){let t=e+"=",i=document.cookie.split(";");if("like"==e)for(let e=0;e<i.length;e++){let s=i[e].trim();if(0==s.indexOf(t)){let e=s.substring(t.length,s.length).split("|"),i=[],r=0;""==e[0]&&(r=1);for(let t=r;t<e.length;t++)i.push(parseInt(e[t]));return i}}else for(let e=0;e<i.length;e++){let s=i[e].trim();if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""},addToCart(e){swal.fire({title:"新增到購物車?",showCancelButton:!0,icon:"question"}).then((t=>{t.value?(this.userData.shoppingCart.filter(((t,i)=>{if(t.id==e)return t.quantity+=1,t})).length||this.userData.shoppingCart.push({id:e,quantity:1}),console.log(this.userData.shoppingCart),axios.patch(`http://localhost:5000/members/${this.userData.id}`,{shoppingCart:this.userData.shoppingCart}).then((e=>{swal.fire("已新增至購物車!","","success")}))):swal.fire("您取消了新增")}))},async generateCouponCode(){await axios.get(`http://localhost:5000/members/${this.userData.id}`).then((e=>{if("used"==e.data.coupon)console.log(used);else if(e.data.coupon)this.couponCode=e.data.coupon,swal.fire(`生日快樂! ${this.userData.userName}`,"這是您的100元折扣碼:"+this.couponCode,"info");else{let e="ABCDEFGHIJKLMNOPQRSTUVWXYNZ0123456789",t=e.length,i=0;for(let s=0;s<8;s++)i=Math.floor(Math.random()*t),this.couponCode+=e[i];axios.patch(`http://localhost:5000/members/${this.userData.id}`,{coupon:this.couponCode}).then((e=>{console.log(e)})),swal.fire(`生日快樂! ${this.userData.userName}`,"這是您的100元折扣碼:"+this.couponCode,"info")}}))},checkUserData(){location.href=`userData.html?id=${this.userData.id}`},goToMerch(e){location.href=`merch.html?index=${e-1}like=${this.merches[e-1].like}userId=${this.userData.id}`},logOut(){Swal.fire({title:"確認登出?",showCancelButton:!0}).then((function(e){e.value?(document.cookie=`id=;expire${Date.toGMTString}`,document.cookie=`userName=;expire${Date.toGMTString}`,document.cookie=`like=;expire${Date.toGMTString}`,document.cookie=`shoppingCart=;expire${Date.toGMTString}`,location.href="login.html"):Swal.fire("您取消了登出")}))},shoppingCart(){location.href="shoppingCart.html"},checkOrder(){location.href="orders.html"}},created(){},mounted(){this.loading=!0,this.getUserData(),this.userData.birthDate=parseInt(this.getCookie("birthDate").replace(/[^0-9]/gi,""))%1e4;let e=new Date;100*(e.getMonth()+1)+e.getDate()==this.userData.birthDate&&this.generateCouponCode()},watch:{merches:function(e,t){console.log(t),console.log(e)},$route(e,t){"UndertHandleIndex"===e.name&&(console.log(1345),this.getUserData())}}}),setInterval((()=>{!function(){let e=document.getElementsByClassName("slidePic"),t=-1*parseInt(e[0].style.transform.match(/\d+/g));-80==t&&(t=40);let i=`\n        transform:translateX(${t-40}vw);\n        transition: transform 1s ease-in-out;\n    `;for(let t=0;t<3;t++)e[t].style.cssText+=i}()}),7e3);