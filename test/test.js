
const vm = new Vue({
    el: '#app',
    data: {
        a : [
            {
                title:'asdf',
                price:3,
            },
            {
                title:'qwer',
                price:2
            },
            {
                title:'dsfe',
                price:1
            }
        ]
    },
    computed:{
        sortedArr(){
            return this.a.sort(function (first,second) {
                return first.price - second.price
            })
        }
    }
})