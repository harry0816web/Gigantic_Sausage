let data = {
    id: '',
    shoppingList: [],
    merches: [],
    listArr: [],
    inputCouponCode: '',
    couponCode: '',
    discount: false,
    prevSum: 0
}
const vm = new Vue({
    el: '#app',
    data,
    computed: {
        List() {
            return JSON.parse(JSON.stringify(this.shoppingList))
        },
        price() {
            let sum = 0
            for (let i = 0; i < this.shoppingList.length; i++) {
                if (!this.shoppingList[i].quantity) {
                    this.shoppingList[i].quantity = 0
                }
                else {
                    sum += parseInt(this.merches[this.shoppingList[i].id - 1].merchPrice) * parseInt(this.shoppingList[i].quantity)
                }
            }
            if (this.discount) {
                return sum - 100
            } else {
                this.prevSum = sum
                return sum
            }
        }
    }
    ,
    methods: {
        showList() {
            this.listArr = []
            if (this.shoppingList.length) {
                for (let i = 0; i < this.shoppingList.length; i++) {
                    this.listArr.push(this.merches[this.shoppingList[i].id - 1])
                }
            }
            console.log(this.listArr);
        },
        plus(index) {
            this.shoppingList[index].quantity = parseInt(this.shoppingList[index].quantity) + 1
            console.log(this.shoppingList);
            axios.patch(`http://localhost:5000/members/${this.id}`, {
                shoppingCart: this.shoppingList
            })
                .then((res) => {
                    console.log(res);
                })
        },
        minus(index) {
            this.shoppingList[index].quantity = parseInt(this.shoppingList[index].quantity) - 1
            if (this.shoppingList[index].quantity < 1) {
                this.deleteItem(index, true)
            }
            console.log(this.shoppingList);
            axios.patch(`http://localhost:5000/members/${this.id}`, {
                shoppingCart: this.shoppingList
            })
                .then((res) => {
                    console.log(res);
                })
        },
        deleteItem(index, toZero) {
            swal.fire({
                title: "從購物車刪除此商品?",
                showCancelButton: true,
                icon: 'question'
            })
                .then((res) => {
                    if (res.value) {
                        console.log(index);
                        this.shoppingList.splice(index, 1)
                        axios.patch(`http://localhost:5000/members/${this.id}`, {
                            shoppingCart: this.shoppingList
                        })
                            .then((res) => {
                                console.log(res);
                            })
                        this.showList()
                        console.log(this.shoppingList);
                    }
                    else {
                        if (toZero) {
                            this.shoppingList[index].quantity = 1
                        }
                    }
                })
        },
        purchase() {
            let dd = new Date()
            let total = this.prevSum
            if (this.discount) {
                total -= 100
                axios.patch(`http://localhost:5000/members/${this.id}`, {
                    coupon: 'used'
                }).then((res) => {
                    console.log(res);
                })
            }
            axios.post("http://localhost:5000/orders", {
                member_id: this.id,
                order_detail: this.shoppingList,
                dateTime: dd,
                total_price: total,
                discount: true
            })
                .then((res) => {
                    swal.fire("結帳成功!", '', 'success')
                    axios.patch(`http://localhost:5000/members/${this.id}`, {
                        shoppingCart: []
                    })
                        .then((res) => {
                            console.log(res);
                            this.shoppingList = []
                            this.listArr = []
                        })
                })
                .catch((err) => {
                    console.log(err);
                })


        },
        backToHomepage() {
            location.href = "index.html"
        },
    },
    mounted() {
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim()
            if (c.indexOf('id=') == 0) {
                this.id = c.substr(3, c.length - 2)
                console.log(this.id);
            }
        }
        if (!this.id.length) {
            location.href = 'login.html'
        }
        axios.get(`http://localhost:5000/merches`)
            .then((res) => {
                this.merches = res.data
                axios.get(`http://localhost:5000/members/${this.id}`)
                    .then((res) => {
                        this.shoppingList = res.data.shoppingCart
                        if (res.data.coupon) {
                            this.couponCode = res.data.coupon
                            console.log(this.couponCode);
                        }
                        this.showList()
                    })
            })
        //axios 注意順序
    },
    watch: {
        "List": {
            handler(newVal, oldVal) {
                if (oldVal.length) {
                    for (let i = 0; i < newVal.length; i++) {
                        if (newVal[i].quantity) {
                            this.shoppingList[i].quantity = parseInt(newVal[i].quantity)
                            console.log(this.shoppingList[i].quantity);
                            if (oldVal[i].quantity != newVal[i].quantity) {
                                if (newVal[i].quantity < 0) {
                                    this.shoppingList[i].quantity = 1
                                    swal.fire("購買數量不可小於0!", '', 'warning')
                                }
                                else if (newVal[i].quantity > this.merches[i].quantity) {
                                    this.shoppingList[i].quantity = parseInt(this.merches[i].quantity)
                                    swal.fire("購買數量已達上限!", '', 'warning')
                                }
                            }
                        }
                    }
                }
            },
            deep: true
        },
        "inputCouponCode": function (newVal) {
            if (newVal == this.couponCode) {
                this.discount = true
                console.log(this.discount);
            }
            else {
                this.discount = false
            }
        }
    }
})