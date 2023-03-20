let data = {
    id: '',
    orderDetail: [
    ],
    merches: [],
    listArr: []
}
const vm = new Vue({
    el: '#app',
    data,
    computed: {

    }
    ,
    methods: {
        showList() {
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
                axios.get(`http://localhost:5000/orders?member_id=${this.id}`)
                    .then((res) => {
                        for (let i = 0; i < res.data.length; i++) {
                            let sum = 0
                            this.orderDetail.push(res.data[i].order_detail)
                            for (let j = 0; j < this.orderDetail[i].length; j++) {
                                this.orderDetail[i][j].merchName = this.merches[this.orderDetail[i][j].id - 1].merchName
                                this.orderDetail[i][j].merchPrice = this.merches[this.orderDetail[i][j].id - 1].merchPrice
                                sum += parseInt(this.orderDetail[i][j].merchPrice) * parseInt(this.orderDetail[i][j].quantity)
                            }
                            this.orderDetail[i].sum = sum
                            this.orderDetail[i].dateTime = res.data[i].dateTime.substr(0, 10)
                            if (res.data[i].discount) {
                                this.orderDetail[i].discount = true
                                this.orderDetail[i].priceAfterDiscount = res.data[i].total_price
                            }
                        }
                    })
            })

        console.log(this.orderDetail);
    },
})