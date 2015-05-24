(function () {
    /*
    要使用Canvas进行绘图，先要在页面上创建一个Canvas元素，并指定它的大小。然后再通过getContext方法回去上下文，getContext方法接受一个参数，
    指定要要获取的上下文，该参数有：2D,WebGL
    */

    //获取2d上下文
    function example() {
        var canvas = document.getElementById('c');
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
        }
    }

    /*
        可以使用toDataURL()方法导出在canvas中绘制的图像，接受一个参数，即图像的MIME格式
    */
    function example2() {
        var canvas = document.getElementById('c');
        if (canvas.getContext) {
            var context = canvas.getContext('2d');

            var img = context.toDataURL('image/png');
            document.getElementById('img').src = img;
        }
    }



    /*
        2D上下文

        使用2D上下文可以绘制矩形，弧线和路径。2D上下文坐标开始于canvas的左上角，坐标原点是（0,0）

            填充和描边：填充指用指定的样式填充图型。描边指在图形的边缘画线。
            fillStyle:  填充
            strokeStyle:描边
            这两个属性的值可以是字符串，渐变对象和模式对象。

            绘制矩形：矩形是唯一一个可以在2D上下文中直接绘制的形状。绘制矩形的相关方法有三个，这三个方法都接收4个参数，即矩形的X坐标，矩形的Y坐标，
            矩形的宽和矩形的高，这些参数的单位都是像素：
                fillRect()              绘制的矩形会以指定的颜色填充
                strokeRect()            以指定的颜色在绘制的矩形上描边
                clearRect()             清除画布上指定矩形区域的内容,本质上会让被清除的区域变透明

    */

    function example3() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var context = canvas.getContext('2d');

            //以红色填充在画布中绘制的距离上、左分别10像素，宽、高50像素的矩形
            context.fillStyle = 'red';
            context.fillRect(10, 10, 50, 50);

            //以指定的颜色对在画布中绘制的距离上、左分别30像素，宽、高50像素的矩形描边
            context.strokeStyle = 'rgba(0,0,255,0.5)';
            context.strokeRect(30, 30, 50, 50);

            //清除画布中距离上、左分别60像素，宽高10像素的一块区域
            context.clearRect(60, 60, 10, 10);
        }
    }

    /*
            绘制路径：p468
            在开始绘制路径时，先要调用beginPath()方法，
            isPointInPath(x,y);     用于确定给定的坐标点是否位于路径上


    */

})();