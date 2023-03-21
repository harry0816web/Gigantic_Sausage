let url = location.href
let index = parseInt(url.substring(url.indexOf('index='), url.indexOf('like=')).replace(/[^0-9]/ig, ""))
let likeOrNot = url[url.indexOf('like=') + 5]
let userId = parseInt(url.substring(url.indexOf('userId=')).replace(/[^0-9]/ig, ""))
let data = {
    merchIndex: 1,
    index: index + 1,
    likeOrNot: likeOrNot,
    userId: userId,
    userLike: [],
    userName: '',
    merchData: {
        id: 0,
        merchPicSrc: '',
        merchName: '',
        merchPrice: '',
        like: '',
        description: '',
        quantity: 0,
        comments: []
    },
    quantity: 0,
    newComments: '',
    shoppingList: [],
    merches: [],
    collection: []
}
let vm = new Vue({
    el: "#app",
    data: data,
    // computed: {
    //     merchPicSrc() {
    //         return this.merchData.merchPicSrc
    //     },
    //     merchName() {
    //         return this.merchData.merchName
    //     },
    //     description() {
    //         return this.merchData.description
    //     }
    // },
    methods: {
        changeLike() {
            if (this.likeOrNot == "t") {
                this.likeOrNot = 'f'
                //不要在外部設定與data內部相同名稱的變數
                this.userLike.splice(this.userLike.indexOf(this.index), 1)
                let likeStr = this.userLike.join('|')
                document.cookie = `like=${likeStr};max-age=3600*24`
                axios.patch(`http://localhost:5000/members/${this.userId}`, {
                    like: this.userLike
                }).then((res) => {
                    console.log(res);
                })
            }
            else {
                this.likeOrNot = 't'
                this.userLike.push(this.index)
                let likeStr = this.userLike.join('|')
                document.cookie = `like=${likeStr};max-age=3600*24`
                axios.patch(`http://localhost:5000/members/${this.userId}`, {
                    like: this.userLike
                })
            }
        },
        minus() {
            if (this.quantity >= 0) {
                this.quantity--
            }
            else {
                this.quantity = 0
            }
        },
        plus() {
            this.quantity++
        },
        submit_comments() {
            if (this.newComments.length) {
                this.merchData.comments.push({
                    user: this.userName,
                    text: this.newComments
                })
                axios.patch(`http://localhost:5000/merches/${this.index}`, {
                    comments: this.merchData.comments
                })
                    .then((res) => {
                        this.newComments = ''
                    })
            }
            else {
                swal("內容為空", '', 'error')
            }
        },
        backToHomepage() {
            location.href = "index.html"
        },
        addToCart() {
            let findObj = this.shoppingList.filter((item) => {
                if (item.id == this.index) {
                    item.quantity += this.quantity
                    return item
                }
            })
            if (!findObj.length) {
                this.shoppingList.push({
                    id: this.index,
                    quantity: this.quantity
                })
            }
            axios.patch(`http://localhost:5000/members/${this.userId}`,
                {
                    shoppingCart: this.shoppingList
                })
                .then((res) => {
                    console.log(res);
                    swal.fire("已新增至購物車!", '', 'success')
                })
        },
        checkUserData() {
            location.href = `userData.html?id=${this.userId}`
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
        showCollection() {
            axios.get('http://localhost:5000/merches')
                .then((res) => {
                    console.log(this.userLike.length);
                    for (let i = 0; i < this.userLike.length; i++) {
                        this.collection.push(res.data[this.userLike[i] - 1])
                    }
                    console.log(this.collection);
                })
        },
        checkOrder() {
            location.href = "orders.html"
        }
    },
    mounted() {
        let ca = document.cookie.split(';')
        let findId = ca.filter((item) => {
            if (item.indexOf('id=') != -1)
                return item
        })
        if (!findId.length)
            location.href = "login.html"
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim()
            //循環cookie陣列找尋名字為cName的cookie
        }

        axios.get(`http://localhost:5000/merches?id=${this.index}`)
            .then((res) => {
                this.merchData = res.data[0]
                console.log(this.merchData);
            })

        axios.get(`http://localhost:5000/members?id=${this.userId}`)
            .then((res) => {
                if (res.data[0].like) {
                    this.userLike = res.data[0].like
                    console.log(this.userLike);
                }
                this.userName = res.data[0].userName
                this.shoppingList = res.data[0].shoppingCart
                this.showCollection()
            })

    },
    watch: {
        "quantity": function (newValue, oldValue) {
            if (this.quantity < 0) {
                swal.fire('購買數量不可小於0', '', 'warning')
                this.quantity = 0
            }
            else if (this.quantity > this.merchData.quantity) {
                swal.fire('購買數量已達上限', '', 'warning')
                this.quantity = this.merchData.quantity
            }
        },
        // "merchData.comments": function (now, old) {
        //     console.log(1234);
        //     console.log(now);
        // }
    }
})