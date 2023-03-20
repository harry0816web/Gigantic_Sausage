data = {
    id: '',
    userData: {
        userName: '',
        password: '',
        birthday: ''
    },
    checkUser: "false",
    input: {
        userName: '',
        password: '',
    },
    alredyHad: false
}
let vm = new Vue({
    el: '#app',
    data: data,
    methods: {
        check() {
            this.checkUser = 'checking'
            console.log(this.checkUser);
        },
        checkData() {
            axios.get(`http://localhost:5000/members/${this.id}`)
                .then((res) => {
                    console.log(res.data);
                    if (this.input.password == res.data.password) {
                        this.input.userName = this.userData.userName
                        this.checkUser = 'true'
                    }
                    else {
                        swal("密碼錯誤", "", "error")
                        this.input.password = ''
                    }
                })
        },
        update() {
            swal.fire({
                title: "確認更改?",
                showCancelButton: true
            })
                .then((res) => {
                    if (res.value) {
                        if (this.input.userName.length && this.input.password) {
                            axios.patch(`http://localhost:5000/members/${this.id}`, {
                                userName: this.input.userName,
                                password: this.input.password
                            })
                                .then((res) => {
                                    swal("成功更改", '', 'success')
                                    this.input.password = ''
                                    this.input.userName = ''
                                    this.userData = res.data
                                    this.checkUser = "false"
                                })

                        }
                    }
                    else {
                        swal.fire("您取消了更改")
                    }
                })
        },
        backToHomepage() {
            location.href = "index.html"
        }
    },
    mounted() {
        let urlStr = location.href
        this.id = parseInt(urlStr.substr(urlStr.indexOf('id=')).replace(/[^0-9]/ig, ""))
        axios.get(`http://localhost:5000/members/${this.id}`)
            .then((res) => {
                this.userData = res.data
                console.log(this.userData);
            })
        if (isNaN(this.id)) {
            // location.href = "login.html"
            console.log(this.id);
        }
    },
    watch: {
        "input.userName": function (oldVal, newVal) {
            axios.get(`http://localhost:5000/members?userName=${this.input.userName}`)
                .then((res) => {
                    if (res.data.length) {
                        if (this.input.userName != this.userData.userName) {
                            this.alredyHad = true
                        } else {
                            this.alredyHad = false
                        }
                    }
                    else {
                        this.alredyHad = false
                    }
                })
        }
    }
})
