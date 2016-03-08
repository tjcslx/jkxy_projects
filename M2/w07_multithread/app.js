//Concurrent.Thread.js代码
//Concurrent.Thread.create(function () {
//    $('#click').click(function () {
//        alert("Clicked!");
//    });
//
//    for (var i = 0; i < 1000000; i++) {
//        console.log(i);
//    };
//})

//Web Worker代码
var worker = new Worker("task.js");
worker.onmessage = function (event) {
    alert(event.data);
}
worker.postMessage(100000000);