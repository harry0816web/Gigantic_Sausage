//建立商品圖
let data = {
    userData: {
        id: 0,
        userName: "",
        like: [],
        shoppingCart: []
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
    arr: []
}
const vm = new Vue({
    el: '#app',
    data: data,
    computed: {
        //filter
        onList() {
            if (this.filter.price != "none" && this.filter.flavor == "all" && this.inputSearch == '') {
                return this.sortByPrice(this.merchesOnList)
            }
            if (this.inputSearch != "") {
                return this.sortByPrice(this.merches.filter(item => {
                    let inputText = this.inputSearch.toLowerCase()
                    if (item.merchName.indexOf(inputText) != -1) {
                        return item
                    }
                }))
            }
            else if (this.filter.flavor != "all") {
                return this.sortByPrice(this.merches.filter(item => {
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
            return this.merchesOnList.filter(item => {
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
        //go to merch page
        goToMerch(index) {
            location.href = `merch.html?index=${index}like=${this.merchesOnList[index].like}userId=${this.userData.id}`;
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
        changeLike(index) {
            let boolean = (this.merchesOnList[index].like ? false : true)
            this.merchesOnList[index].like = boolean
            this.merches[index].like = boolean
            if (boolean) {    //add like
                this.userData.like.push(index)
                let changeLike = this.userData.like
                axios.patch(`http://localhost:5000/members/${this.userData.id}`,
                    {
                        like: changeLike
                    })
                    .then((res) => {
                        this.userData.like = res.data.like
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {          //delete like
                let indexOfIndex
                for (let i = 0; i < this.userData.like.length; i++) {
                    if (index == this.userData.like[i]) {
                        indexOfIndex = i
                        console.log(indexOfIndex);
                    }
                }
                console.log(this.userData.like);
                this.userData.like.splice(indexOfIndex, indexOfIndex + 1)
                console.log(this.userData.like);
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
            this.userData.shoppingCart = this.getCookie("shoppingCart")
            //注意空值
            if (!isNaN(this.userData.like[0])) {
                for (let i = 0; i < this.userData.like.length; i++) {
                    this.merches[this.userData.like[i]].like = true
                }
            }
            if (!isNaN(this.userData.shoppingCart[0])) {
                for (let i = 0; i < this.userData.shoppingCart.length; i++) {
                    this.merches[this.userData.shoppingCart[i]].shoppinCart = true
                }
            }
            this.loading = false
        },
        getCookie(cName) {
            let name = cName + "="
            let ca = document.cookie.split(';')
            if (cName == "like" || cName == "shoppingCart") {
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim()
                    if (c.indexOf(name) == 0) {
                        let arrStr = c.substring(name.length, c.length).split('|')
                        let arr = []
                        for (let i = 0; i < arrStr.length; i++) {
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
        }
    },
    created() {
    },
    mounted() {
        this.loading = true
        this.getUserData()
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


