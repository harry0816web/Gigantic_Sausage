let data = {
    input: {
        userName: "",
        password: "",
        email: ""
    },
    userData: {
        userName: "",
        password: "",
        email: "",
        like: [],
        shoppingCart: []
    }
}
const vm = new Vue({
    el: "#app",
    data: data,
    methods: {
        getUser() {
            axios("http://localhost:5000/members", {
                params: {
                    userName: this.input.userName
                }
            })
                .then((res) => {
                    if (res.data == '') {
                        console.log("沒有此帳號");      //[]?
                    }
                    else if (res.data[0].password == this.input.password) {
                        console.log("登入成功");
                        let like = res.data[0].like.join('|')
                        let shoppingCart = res.data[0].like.join('|')
                        document.cookie = `id=${res.data[0].id};max-age=3600*24`
                        document.cookie = `userName=${res.data[0].userName};max-age=3600*24`
                        if (res.data[0].like)
                            document.cookie = `like=${like};max-age=3600*24`
                        if (res.data[0].shoppingCart)
                            document.cookie = `shoppingCart=${shoppingCart};max-age=3600*24`
                        location.href = "index.html"
                    }
                    else {
                        console.log("密碼錯誤");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
})