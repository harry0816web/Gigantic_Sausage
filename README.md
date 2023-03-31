# Gigantic_Sausage(一個賣香腸的商城)
※此專案的所有圖片及圖示，除logo是自己設計外，其餘皆取自網路
<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/pictures/logo.png" height="200" width="200" >
</p>

### 這個商城的功能有
* 透過文字輸入搜尋商品，並透過篩選器(口味、價格)檢視
* 可以收藏喜歡的商品
* 將商品加入購物車
* 在商品頁留下對商品的評論。
* 檢視每次交易的明細
* 會員有生日優惠

# 一、使用的技術及套件
### 1.Node.js
  * 後端使用Node.js的套件json-server來當作伺服器

 <img src="https://user-images.githubusercontent.com/65772569/227523874-6e995898-f702-4c25-8fd4-d85e28ad5c56.png" height="100" width="150" >

### 2.Vue.js 
  * 前端使用Vue.js讓介面與資料狀態同步

<img src="https://user-images.githubusercontent.com/65772569/227523637-52d66fc7-27e9-4e9d-aa99-c1ec83c25d22.png" height="100" width="100" >

### 3.Axios
  * 使用axios作為HTTP請求工具從json資料庫操作資料

<img src="https://user-images.githubusercontent.com/65772569/227525171-224483a9-0940-4d42-ad5b-a1c55bf5b7cd.png" height="100" width="250" >

### 4.Fontawesome
  * 使用了一些免費的icon

<img src="https://user-images.githubusercontent.com/65772569/227525534-31fb6aaa-de85-405f-ad48-180e3dd3208c.png" height="100" width="100" >

### 5.Sweetalert
  * 美化網頁的彈出式提醒

<img src="https://user-images.githubusercontent.com/65772569/229045183-e411a255-2ddc-45bb-8500-96b521fb0206.png" height="100" width="250" >

# 二、功能介紹
## :closed_lock_with_key:註冊會員及登入
### 註冊頁面
#### 為避免資料儲存出現問題，會驗證資料的不重複性及完整性
* 驗證填入資料是否完整(以下是沒填生日的例子)

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/dataNotComplete.gif" height="300" width="650" >
</p>

* 不可有重複的帳號名稱

<p align="center">
<img src="https://user-images.githubusercontent.com/65772569/227520856-93ad294b-87fe-4831-a259-58e2e18d4803.gif" height="300" width="650" >
</p>

### 登入頁面
* 驗證輸入的密碼與資料庫中該帳號密碼相同後，登入並且建立使用者帳號的cookie

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/login.gif" height="300" width="650" >
</p>

* 網頁會提示那些資料輸入錯誤

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/NoThisAcc.gif" height="300" width="650" >
</p>

## :house:主頁
### 廣告輪播圖
* 可以讓使用者瀏覽新推出的產品

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/pictureSlideShow.gif" height="300" width="650" >
</p>

### 檢視商品
* 在主頁可以檢視所有商品

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/merchesTable.gif" height="300" width="650" >
</p>

### 篩選器
* 透過條件篩選想要的商品(若只擷取頁面會無法顯示下拉選單，所以擷取整個畫面)

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/filter.gif" height="400" width="650" >
</p>

### 輸入搜尋
* 也能夠直接輸入品名搜尋，接著同樣可以使用篩選器排序價格(若只擷取頁面會無法顯示下拉選單，所以擷取整個畫面)

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/search.gif" height="400" width="650" >
</p>

### 收藏喜歡的商品
* 點擊愛心圖是可以收藏喜歡的商品
* 在功能列上的愛心可以檢視所有收藏的商品

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/collection.gif" height="300" width="650" >
</p>

## :meat_on_bone:商品頁
* 可以收藏或將商品加入購物車
* 留下對商品的評論

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/merch.gif" height="300" width="650" >
</p>

## :moneybag:購物車
### 將商品加入購物車
* 按下購物車圖示即可將商品加入購物車

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/addToCart.gif" height="300" width="650" >
</p>

### 將商品從購物車移除
* 按下垃圾桶圖示，或是數量減少至0

<p align="center">
<img src="https://user-images.githubusercontent.com/65772569/227417971-1b613a8a-9429-4b5e-a27c-01bf4fc2fc01.gif" height="300" width="650" >
</p>

### 結帳
* 購買數量會有上下限，不可大於商品數量，不可小於等於0
* 網頁會隨著每一筆更動計算總共的金額

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/purchase.gif" height="300" width="650" >
</p>

## :page_with_curl:購物明細
* 點擊功能列的發票圖示，即可檢視每一筆交易的明細

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/orders_detail.gif" height="300" width="650" >
</p>

## :sunglasses:	會員資料
* 點擊功能列的人頭圖示，即可進到會員資料頁面
### 此時還只能看到帳號，且無法更改任何欄位
* 需先輸入正確的密碼，才能看到帳號及密碼，並且更改

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/checkUserData.gif" height="300" width="650" >
</p>

### 驗證成功後，即可更改帳號及密碼
* 在更改帳號時，若欲更改的帳號名稱已存在，網頁會警示

<p align="center">
<img src="https://github.com/harry0816web/Gigantic_Sausage/blob/main/result_pictures/updateUserData.gif" height="300" width="650" >
</p>

## :birthday:會員生日優惠
### 100元折扣券
* 若該天是會員的生日，則在當日會員登入時，畫面會顯示出折扣碼

<p align="center">
<img src="https://user-images.githubusercontent.com/65772569/227448888-79598877-1ee6-4ae8-b4f6-6b7c823160cc.gif" height="300" width="650" >
</p>

### 折扣碼使用方法
* 在購物車要結帳時，輸入折扣碼即可獲得100元折扣

<p align="center">
<img src="https://user-images.githubusercontent.com/65772569/227449715-12b0200c-7fe7-4158-83aa-6d604455443b.gif" height="300" width="650" >
</p>

