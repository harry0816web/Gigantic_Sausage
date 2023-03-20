let data = {
    input: {
        userName: "",
        password: "",
        birthday: ''
    },
}
const vm = new Vue({
    el: "#app",
    data: data,
    methods: {
        pushUser() {
            if (this.input.userName && this.input.password && this.input.birthday) {
                axios.get(`http://localhost:5000/members?userName=${this.input.userName}`)
                    .then((res) => {
                        if (res.data[0] === undefined) {
                            axios.post("http://localhost:5000/members", {
                                userName: this.input.userName,
                                password: this.input.password,
                                birthday: this.input.birthday,
                                like: [],
                                shoppingCart: []
                            })
                                .then((res) => {
                                    console.log(res.data);
                                    location.href = "login.html"
                                })
                                .catch((err) => {
                                    alert(err)
                                })
                        }
                        else {
                            swal("帳號已存在", "", "error")
                        }

                    })
            }
            else {
                swal('資料未填寫完整', '', 'error')
            }
        }
    }
})