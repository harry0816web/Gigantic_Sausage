//建立商品圖
// 迴圈跑div Id 一個一個填入資料=>innerHTML
let merchesInfo = [
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
        divsText += `
            <div id='merch${i}${j}'>
                <ul>
                    <li>${merchName}</li>
                    <li>${merchPrice}</li>
                </ul>
            </div>
        `;
    }
    column.innerHTML += divsText;
}