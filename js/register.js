let data = {
    input: {
        userName: "",
        password: "",
        email: ""
    },
}
const vm = new Vue({
    el: "#app",
    data: data,
    methods: {
        pushUser() {
            axios.post("http://localhost:5000/members", {
                userName: this.input.userName,
                password: this.input.password,
                email: this.input.email,
                like: [],
                shoppingCart: []
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }
})