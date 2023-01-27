//建立商品圖
// 迴圈跑div Id 一個一個填入資料=>innerHTML
let merchesInfo = [
    ['pepper',150,'../pictures/sausage1.png'],
    ['spicy',100,'../pictures/sausage2.png'],
    ['sweet',120,'../pictures/sausage3.png'],
    ['pepper',150,'../pictures/sausage4.png'],
    ['spicy',100,'../pictures/sausage5.png'],
    ['sweet',120,'../pictures/sausage6.png'],
    ['pepper',150,'../pictures/sausage1.png'],
    ['spicy',100,'../pictures/sausage1.png'],
    ['sweet',120],
    ['pepper',150],
    ['spicy',100],
    ['sweet',120],
    ['pepper',150],
    ['spicy',100],
    ['sweet',120],
    ['pepper',150],
    ['spicy',100],
    ['sweet',120]
];
let arrLength = parseInt(merchesInfo.length)/3;
let cnt = 0;
for(let i = 0;i < arrLength;i ++){
    let column = document.getElementById(`column${i}`);
    let divsText = '';
    for(let j = 0;j < 3;j ++,cnt ++){
        let merchName = merchesInfo[cnt][0];
        let merchPrice = merchesInfo[cnt][1];
        let merchPicPath = merchesInfo[cnt][2];
        divsText += `
            <div id='merch${i}${j}' class='merch'>
                <img src='${merchPicPath}' alt='sausagePic' class='merchPic'>
                <ul>
                    <li>口味:${merchName}</li>
                    <li>價格:${merchPrice}</li>
                </ul>
            </div>
        `;
    }
    column.innerHTML += divsText;
}


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
    console.log(translateValue);
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
    console.log(translateValue);
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