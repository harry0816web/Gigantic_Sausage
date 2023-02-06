let urlString = location.href;
let url = new URL(urlString);
let id = parseInt(url.searchParams.get('merchId'));
let indexOfI = Math.floor(id/10);
let indexOfJ = id%10;
console.log(merchesInfo[indexOfI][indexOfJ]);
