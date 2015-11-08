window.onload=function() {

    var imgData = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}
        , {'src': '5.jpg'}, {'src': '6.jpg'}, {'src': '7.jpg'}, {'src': '8.jpg'}]};

	var contWarp = getId('container');
    imgSort(contWarp);

    window.onresize = function() {
        imgSort(contWarp);
    }

    window.onscroll = function() {
        if(checkFlag()) {
            for( var i = 0; i < imgData.data.length; i++) {
               var oBox = document.createElement('div');
                oBox.className = 'box';
                contWarp.appendChild(oBox);

                var oBoxImg = document.createElement('div');
                oBoxImg.className = 'img-box';
                oBox.appendChild(oBoxImg);
                var oImg = document.createElement('img');
                oImg.src = './images/' + imgData.data[i].src;
                oBoxImg.appendChild(oImg);
                contWarp.appendChild(oBox);

                imgSort(contWarp);

            }
        }
    }
};

function checkFlag() {
    var contWarp = getId('container');
    var boxArr = contWarp.getElementsByClassName('box');
    var lastBoxTop = boxArr[boxArr.length-1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if(scrollTop + pageHeight > lastBoxTop) {
        return true;
    }
}

function getId(id) {
	return document.getElementById(id);
}

function imgSort(cont) {
    console.log('开始');
    var boxArr = cont.getElementsByClassName('box');
    //获取窗口大小
    var cW = document.documentElement.clientWidth || document.body.clientWidth;
    var num = Math.floor(cW/(boxArr[0].offsetWidth));
    //存储图片盒子的高度数组
    var boxArrH = [];

    cont.style.width = num * (boxArr[0].offsetWidth) + 'px';


    for(var i = 0; i < boxArr.length; i++) {
        if(i < num) {
            var boxh = boxArr[i].offsetHeight;
            boxArrH.push(boxh);
            boxArr[i].style.position = 'static';
        } else {
            //列中最小高度
            var minH = Math.min.apply(null,boxArrH);
            var currentN = boxArrH.indexOf(minH);

            boxArr[i].style.position = 'absolute';
            boxArr[i].style.top = minH + 'px';
            boxArr[i].style.left = boxArr[currentN].offsetLeft + 'px';
            minH = minH + boxArr[i].offsetHeight;
            boxArrH[currentN] = minH;
        }
    }
}
	