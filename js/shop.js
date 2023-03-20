//建立商品圖
let data = {
    userData: {
        id: 0,
        userName: "",
        like: [],
        shoppingCart: [],
        birthDate: ''
    },
    merches: [
        {
            "id": 1,
            "merchPicSrc": "pictures/sausage6.png",
            "merchName": "normal sausage",
            "merchPrice": 180,
            "like": false
        },
        {
            "id": 2,
            "merchPicSrc": "pictures/sausage1.png",
            "merchName": "sweet sausage",
            "merchPrice": 150,
            "like": false
        },
        {
            "id": 3,
            "merchPicSrc": "pictures/sausage2.png",
            "merchName": "spicy sausage",
            "merchPrice": 180,
            "like": false
        },
        {
            "id": 4,
            "merchPicSrc": "pictures/sausage3.png",
            "merchName": "pepper sausage",
            "merchPrice": 120,
            "like": false
        },
        {
            "id": 5,
            "merchPicSrc": "pictures/sausage4.png",
            "merchName": "garlic sausage",
            "merchPrice": 130,
            "like": false
        },
        {
            "id": 6,
            "merchPicSrc": "pictures/sausage5.png",
            "merchName": "curry sausage",
            "merchPrice": 200,
            "like": false
        },
        {
            "id": 7,
            "merchPicSrc": "pictures/sausage6.png",
            "merchName": "wine sausage",
            "merchPrice": 150,
            "like": false
        },
        {
            "id": 8,
            "merchPicSrc": "pictures/sausage1.png",
            "merchName": "sweet sausage",
            "merchPrice": 185,
            "like": false
        },
        {
            "id": 9,
            "merchPicSrc": "pictures/sausage2.png",
            "merchName": "spicy sausage",
            "merchPrice": 185,
            "like": false
        },
        {
            "id": 10,
            "merchPicSrc": "pictures/sausage3.png",
            "merchName": "pepper sausage",
            "merchPrice": 199,
            "like": false
        },
        {
            "id": 11,
            "merchPicSrc": "pictures/sausage1.png",
            "merchName": "sweet sausage",
            "merchPrice": 100,
            "like": false
        },
        {
            "id": 12,
            "merchPicSrc": "pictures/sausage2.png",
            "merchName": "spicy sausage",
            "merchPrice": 250,
            "like": false
        }
    ],
    prevShowRange: 0,
    showRange: 9,
    merchesOnList: [],
    filter: {
        flavor: 'all',
        size: '15cm',
        price: 'none'
    },
    placeHolder: "輸入想搜尋的商品",
    inputSearch: '',
    loading: false,
    arr: [],
    couponCode: ''
}
// 篩選:熱銷，most View  會員:忘記密碼
const vm = new Vue({
    el: '#app',
    data: data,
    computed: {
        //filter
        onList() {
            if (this.inputSearch != "") {
                return this.merchesOnList = this.sortByPrice(this.merches.filter(item => {
                    let inputText = this.inputSearch.toLowerCase()
                    if (item.merchName.indexOf(inputText) != -1) {
                        return item
                    }
                }))
            }
            if (this.filter.price != "none" && this.filter.flavor == "all" && this.inputSearch == '') {
                return this.merchesOnList = this.sortByPrice(this.merches.filter((item, i) => {
                    if (i < this.showRange)
                        return item
                }))
            }
            else if (this.filter.flavor == "all") {
                return this.merchesOnList = this.sortByPrice(this.merches.filter((item, i) => {
                    if (i < this.showRange)
                        return item
                }))
            }
            else if (this.filter.flavor != "all") {
                return this.merchesOnList = this.sortByPrice(this.merches.filter(item => {
                    if (item.merchName.indexOf(this.filter.flavor) != -1)
                        return item
                }))
            }
            else {      //default
                if (this.merchesOnList.length == 0 || this.showRange != 9) {
                    for (let i = this.prevShowRange; i < this.showRange; i++) {
                        this.merchesOnList.push(this.merches[i])
                    }
                    return this.merchesOnList = this.sortByPrice(this.merchesOnList)
                }
                else {
                    return this.merchesOnList
                }

            }
        },
        //be chosen and like == false => add in collection
        collection() {
            return this.merches.filter(item => {
                if (item.like == true)
                    return item
            })
        }
    },
    methods: {
        //show more merches
        moreMerches() {
            this.prevShowRange = this.showRange
            if (this.merches.length - this.showRange < 9) {
                this.showRange = this.merches.length
            }
            else this.showRange += 9
        },
        sortByPrice(arr) {
            if (this.filter.price == 'price_highToLow')
                return arr.sort(function (first, second) {
                    return second.merchPrice - first.merchPrice
                })
            else if (this.filter.price == 'price_lowToHigh') {
                return arr.sort(function (first, second) {
                    return first.merchPrice - second.merchPrice
                })
            }
            else {
                return arr              //default
            }
        },
        changeLike(index) { //不應存index應存id
            console.log(index);
            let id = this.merchesOnList[index].id
            console.log(id);
            console.log(this.merchesOnList);
            let boolean = (this.merchesOnList[index].like ? false : true)
            console.log(boolean);
            // this.merchesOnList[id].like = boolean
            // console.log(this.merchesOnList[index].like);
            this.merches[id - 1].like = boolean
            let L = this.merches.length
            for (let i = 0; i < L; i++) {
                if (this.merches[i].id == this.merchesOnList[index].id) {
                    this.merches[i].like = boolean
                }
            }
            if (boolean) {    //add like
                this.userData.like.push(id)
                axios.patch(`http://localhost:5000/members/${this.userData.id}`,
                    {
                        like: this.userData.like
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {          //delete like
                let indexOfIndex
                for (let i = 0; i < this.userData.like.length; i++) {
                    if (id == this.userData.like[i]) {
                        indexOfIndex = i
                        console.log(indexOfIndex);
                    }
                }
                this.userData.like.splice(indexOfIndex, 1)
                axios.patch(`http://localhost:5000/members/${this.userData.id}`,
                    {
                        like: this.userData.like
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            let likeCookieStr = this.userData.like.join('|')
            document.cookie = `like=${likeCookieStr};max-age=3600*24`
            this.getUserData()
        },
        check() {
            for (let i = 0; i < this.merchesOnList.length; i++) {
                if (this.merchesOnList[i].like == true) {
                    console.log(this.merchesOnList[i].id);
                }
            }
        },
        getUserData() {
            if (this.getCookie("id") == "") {
                location.href = "login.html"
            }
            this.userData.id = this.getCookie("id")
            this.userData.userName = this.getCookie("userName")
            this.userData.like = this.getCookie("like")
            //注意空值
            if (!isNaN(this.userData.like[0])) {
                for (let i = 0; i < this.userData.like.length; i++) {
                    this.merches[this.userData.like[i] - 1].like = true
                }
            }
            axios.get(`http://localhost:5000/members/${this.userData.id}`)
                .then((res) => {
                    this.userData.shoppingCart = res.data.shoppingCart
                })
            this.loading = false
        },
        getCookie(cName) {
            let name = cName + "="
            let ca = document.cookie.split(';')
            if (cName == "like") {
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim()
                    if (c.indexOf(name) == 0) {
                        let arrStr = c.substring(name.length, c.length).split('|')
                        let arr = []
                        let start = 0
                        if (arrStr[0] == '')
                            start = 1
                        for (let i = start; i < arrStr.length; i++) {//避免第一個|
                            arr.push(parseInt(arrStr[i]))
                        }
                        return arr
                    }
                    //循環cookie陣列找尋名字為cName的cookie
                }
            }
            else {
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim()
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
                    //循環cookie陣列找尋名字為cName的cookie
                }
            }
            return ""
        },
        addToCart(id) {
            swal.fire({
                title: "新增到購物車?",
                showCancelButton: true,
                icon: 'question'
            })
                .then((res) => {
                    if (res.value) {
                        let findObj = this.userData.shoppingCart.filter((item, index) => {
                            if (item.id == id) {
                                item.quantity += 1
                                return item
                            }
                        })
                        if (!findObj.length) {
                            this.userData.shoppingCart.push({
                                id: id,
                                quantity: 1
                            })
                        }
                        console.log(this.userData.shoppingCart);
                        axios.patch(`http://localhost:5000/members/${this.userData.id}`,
                            {
                                shoppingCart: this.userData.shoppingCart
                            })
                            .then((res) => {
                                swal.fire("已新增至購物車!", '', 'success')
                            })
                    }
                    else {
                        swal.fire("您取消了新增")
                    }
                })
        },
        async generateCouponCode() {
            //axios不會按照work flow?   
            await axios.get(`http://localhost:5000/members/${this.userData.id}`)
                .then((res) => {
                    if (res.data.coupon == 'used') {
                        console.log(used);
                    }
                    else if (res.data.coupon) {
                        this.couponCode = res.data.coupon
                        swal.fire(`生日快樂! ${this.userData.userName}`, "這是您的100元折扣碼:" + this.couponCode, "info")
                    }
                    else {
                        let codeSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYNZ0123456789'
                        let length = codeSource.length
                        let randNum = 0
                        for (let i = 0; i < 8; i++) {
                            randNum = Math.floor(Math.random() * length)
                            this.couponCode += codeSource[randNum]
                        }
                        axios.patch(`http://localhost:5000/members/${this.userData.id}`, {
                            coupon: this.couponCode
                        })
                            .then((res) => {
                                console.log(res);
                            })
                        swal.fire(`生日快樂! ${this.userData.userName}`, "這是您的100元折扣碼:" + this.couponCode, "info")
                    }
                })

        },
        checkUserData() {
            location.href = `userData.html?id=${this.userData.id}`
        },
        //go to merch page
        goToMerch(id) {
            location.href = `merch.html?index=${id - 1}like=${this.merches[id - 1].like}userId=${this.userData.id}`;
        },
        logOut() {
            Swal.fire({
                title: "確認登出?",
                showCancelButton: true
            }).then(function (result) {
                if (result.value) {
                    document.cookie = `id=;expire${Date.toGMTString}`
                    document.cookie = `userName=;expire${Date.toGMTString}`
                    document.cookie = `like=;expire${Date.toGMTString}`
                    document.cookie = `shoppingCart=;expire${Date.toGMTString}`
                    location.href = "login.html"
                }
                else {
                    Swal.fire("您取消了登出");
                }
            });
        },
        shoppingCart() {
            location.href = "shoppingCart.html"
        },
        checkOrder() {
            location.href = "orders.html"
        }
    },
    created() {
    },
    mounted() {
        this.loading = true
        this.getUserData()
        this.userData.birthDate = parseInt(this.getCookie("birthDate").replace(/[^0-9]/ig, "")) % 10000 // ig代表全文查找，忽略大小寫，找到後已空字串replace
        let today = new Date
        let toDate = (today.getMonth() + 1) * 100 + today.getDate()
        if (toDate == this.userData.birthDate) {
            this.generateCouponCode()
        }

        //把原先的data蓋過去了
    },
    watch: {
        "merches": function (newValue, oldValue) {
            console.log(oldValue)
            console.log(newValue);
        },
        $route(newValue, oldValue) {
            if (newValue.name === 'UndertHandleIndex') {
                console.log(1345);
                this.getUserData()
            }
        }
    }
})


//animation
//searchBar
function unfold() {
    let searchBar = document.getElementById('searchBar');
    searchBar.className = 'unfold';
    setTimeout(
        () => {
            searchBar.className = '';
        }
        , 1000);
}
//picureSlideShow
function slideToLeft() {
    let slidePics = document.getElementsByClassName('slidePic');
    let translateValue = parseInt(slidePics[0].style.transform.match(/\d+/g)) * -1;
    if (translateValue == -80) {  //last one
        translateValue = 40;
    }
    let animationStyleText = `
        transform:translateX(${translateValue - 40}vw);
        transition: transform 1s ease-in-out;
    `;
    for (let i = 0; i < 3; i++) {
        slidePics[i].style.cssText += animationStyleText;
    }
}
function slideToRight() {
    let slidePics = document.getElementsByClassName('slidePic');
    let translateValue = parseInt(slidePics[0].style.transform.match(/\d+/g)) * -1;
    if (translateValue == 0) {  //first one
        translateValue = -120;
    }
    let animationStyleText = `
        transform:translateX(${translateValue + 40}vw);
        transition: transform 1s ease-in-out;
    `;
    for (let i = 0; i < 3; i++) {
        slidePics[i].style.cssText += animationStyleText
    }
}
setInterval(() => {
    slideToLeft();
}, 7000);


