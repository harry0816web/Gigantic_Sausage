let url = location.href
let index = parseInt(url[url.indexOf("index=") + 6])
let likeOrNot = url[url.indexOf("like=") + 5];
let userId = parseInt(url[url.indexOf("userId=") + 7])
let data = {
    merchIndex: 1,
    index: index + 1,
    likeOrNot: likeOrNot,
    userId: userId,
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
    userLike: [],
    quantity: 0
}
let vm = new Vue({
    el: "#app",
    data: data,
    computed: {
        merchPicSrc() {
            return this.merchData.merchPicSrc
        },
        merchName() {
            return this.merchData.merchName
        },
        description() {
            return this.merchData.description
        }
    },
    methods: {
        changeLike() {
            if (likeOrNot == "t") {
                this.likeOrNot = 'f'
                // let element = document.getElementById('likeBtn')
                // element.className = "fa-regular fa-heart"
                this.userLike.splice(this.userLike.indexOf(index), this.userLike.indexOf(index) + 1)
                let likeStr = this.userLike.join('|')
                document.cookie = `like=${likeStr};max-age=3600*24`
                axios.patch(`http://localhost:5000/members/${this.userId}`, {
                    like: this.userLike
                }).then((res) => {
                    console.log(res);
                    console.log(likeOrNot);
                })
                axios.get(`http://localhost:5000/members?id=${this.userId}`)
                    .then((res) => {
                        this.userLike = res.data[0].like
                        console.log(this.userLike);
                    })
            }
            else {
                this.likeOrNot = 't'
                // let element = document.getElementById('likeBtn')
                // element.className = "fa-solid fa-heart"
                this.userLike.push(this.index - 1)
                let likeStr = this.userLike.join('|')
                document.cookie = `like=${likeStr};max-age=3600*24`
                axios.patch(`http://localhost:5000/members/${this.userId}`, {
                    like: this.userLike
                }).then((res) => {
                    console.log(res);
                    console.log(likeOrNot);
                })
                axios.get(`http://localhost:5000/members?id=${this.userId}`)
                    .then((res) => {
                        this.userLike = res.data[0].like
                        console.log(this.userLike);
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
    },
    mounted() {
        axios.get(`http://localhost:5000/merches?id=${this.index}`)
            .then((res) => {
                this.merchData = res.data[0]
                console.log(this.merchData.comments);
            })

        axios.get(`http://localhost:5000/members?id=${this.userId}`)
            .then((res) => {
                if (res.data[0].like)
                    this.userLike = res.data[0].like
            })
        console.log(this.merchData.comments);
    },
    watch: {
        "quantity": function (newValue, oldValue) {
            if (this.quantity < 0) {
                this.quantity = 0
            }
            else if (this.quantity > this.merchData.quantity) {
                this.quantity = this.merchData.quantity
            }
        },
        "merchData.comments": function (now, old) {
            console.log(1234);
            console.log(now);
        }
    }
})