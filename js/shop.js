//animation
//searchBar
function unfold() {
    let searchBar = document.getElementById('searchBar');
    searchBar.className = 'unfold';
    setTimeout(
        ()=>{
            searchBar.className = '';
        }
    ,1000);
}
//picureSlideShow
function slideToLeft() {
    let slidePics = document.getElementsByClassName('slidePic');
    let translateValue = parseInt(slidePics[0].style.transform.match(/\d+/g)) * -1;
    if(translateValue == -80){  //last one
        translateValue = 40;
    }
    let animationStyleText = `
        transform:translateX(${translateValue - 40}vw);
        transition: transform 1s ease-in-out;
    `;
    for(let i = 0;i < 3;i ++){
        slidePics[i].style.cssText += animationStyleText;
    }
}
function slideToRight() {
    let slidePics = document.getElementsByClassName('slidePic');
    let translateValue = parseInt(slidePics[0].style.transform.match(/\d+/g)) * -1;
    if(translateValue == 0){  //first one
        translateValue = -120;
    }
    let animationStyleText = `
        transform:translateX(${translateValue + 40}vw);
        transition: transform 1s ease-in-out;
    `;
    for(let i = 0;i < 3;i ++){
        slidePics[i].style.cssText += animationStyleText;
    }
}
setInterval(() => {
    slideToLeft(); 
}, 7000);

//建立商品圖
let data = {
    merches:[
        {
            merchPicSrc:'pictures/sausage6.png',
            merchName:'normal sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage1.png',
            merchName:'sweet sausage',
            merchPrice:'150',
        },
        {
            merchPicSrc:'pictures/sausage2.png',
            merchName:'spicy sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage3.png',
            merchName:'pepper sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage4.png',
            merchName:'garlic sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage5.png',
            merchName:'curry sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage6.png',
            merchName:'wine sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage1.png',
            merchName:'sweet sausage',
            merchPrice:'150',
        },
        {
            merchPicSrc:'pictures/sausage2.png',
            merchName:'spicy sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage3.png',
            merchName:'pepper sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage1.png',
            merchName:'sweet sausage',
            merchPrice:'150',
        },
        {
            merchPicSrc:'pictures/sausage2.png',
            merchName:'spicy sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage3.png',
            merchName:'pepper sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage4.png',
            merchName:'spicy sausage',
            merchPrice:'180',
        },
        {
            merchPicSrc:'pictures/sausage5.png',
            merchName:'spicy sausage',
            merchPrice:'180',
        }
    ],
    showRange:9,
    merchesOnList:[],
    filter:{
        flavor:'all',
        size:'15cm',
        price:'none'
    },
    placeHolder:"輸入想搜尋的商品",
    inputSearch:''
}
const vm = new Vue({
    el: '#app',
    data: data,
    computed:{
        //filter
        OnList(){
            if(this.inputSearch != ""){
                let inputSearchMerches = this.merches.filter(item => {
                    let inputText = this.inputSearch.toLowerCase()
                        if(item.merchName.indexOf(inputText) != -1){
                            return item
                        }
                })
                if(this.filter.flavor == 'all')
                    return inputSearchMerches
                else{
                    return inputSearchMerches.filter(item => {
                        if(item.merchName.indexOf(this.filter.flavor) != -1)
                            return item
                    })
                }
            }
            else if(this.filter.flavor != "all"){
                    return this.merches.filter(item => {
                        if(item.merchName.indexOf(this.filter.flavor) != -1)
                            return item
                    })
            }
            else {      //default
                for(let i = 0;i < this.showRange;i ++){
                    this.merchesOnList.push(this.merches[i])
                }
                return this.merchesOnList
            }
        }
    },
    methods:{
        //show more merches
        moreMerches() {
            if(this.merches.length - this.showRange < 9){
                this.showRange = this.merches.length
            }
            else this.showRange += 9
        },
        //go to merch page
        goToMerch(index){
            location.href = `merch.html?index=${index}`;
        }
    }
})


// 添加商品至收藏
// heart
var collectionId = [];
function changeHeart(id) {
    let heart = document.getElementById(id);
    if(heart.innerHTML == '<i class="fa-regular fa-heart"></i>'){   //put into collection
        heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        collectionId.push('id'+id.match(/\d+/g));
    }
    else {
        heart.innerHTML =`<i class="fa-regular fa-heart"></i>`;     //out of collection
        let index = collectionId.indexOf('id'+id.match(/\d+/g));
        if(index+1 == collectionId.length){         //若元素是最後一個=>直接Pop
            collectionId.pop();
            console.log('pop');
            for(let i = 0;i < collectionId.length;i ++){
                console.log(collectionId[i]);
            }
        }
        else{
            collectionId.splice(index,index);      //用splice刪除
            console.log('slice');
            for(let i = 0;i < collectionId.length;i ++){
                console.log(collectionId[i]);
            }
        }
    }
}   
//openCollection
function openCollection() {
    let collection = document.getElementById('collection');
    collection.innerHTML = '';
    let length = collectionId.length;
    for(let i = 0;i < length;i ++){
        let innerText = document.getElementById("collectionInnerText"+collectionId[i].match(/\d+/g)).innerHTML;
        collection.innerHTML += innerText;
    }
}

               



