(function () {

    /*
        WINDOW对象

        定义全局变量与在window上直接定义属性有差异：定义全局的变量不能删除，而直接在window上定义的属性可以删除。因为使用 var 定义的全局变量
        的特性[[configurable]]为false,所以不能删除
    */

    var name = 'zhangsan';
    window.age = 19;

    delete window.name;     //false
    delete window.age;      //true

    /*
        另外尝试访问未声明的变量会抛出错误，而通过window查询对象则不会
    */

    function example() {
        console.log(asd);       //错误,因为未声明变量asd
        console.log(window.asd);    //undefined
    }

    /*
        框架：iframe

        每个iframe包含一个window对象
        可以使用window.iframes[index] 或者 window.iframes["iframe"]来访问具体的 框架(iframe)
        最好使用 top.iframes 来访问具体框架，因为如果在框架中调用window，则调用的只是当前的框架。而top始终是最高层的框架，所以使用top调用
            可以保证调用的框架是你想要的
        
        parent指向当前框架的直接父级框架，如果没有父级框架，parent指向的是当前的框架window

        self 指向当前框架，与window对象可以互换使用

        除非最高层的框架是使用window.open打开的，否则 window.name属性不会包含任何值
    */


    //跨浏览器取得窗口位置，表示窗口相对于屏幕左方和上方的位置
    function example2() {
        var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;

        var topPos = (typeof window.screenLeft == 'number') ? window.screenTop : window.screenY;
    }


    //跨浏览器取得页面视口的大小
    function example3() {
        var pageWidth = window.innerWidth,
            pageHeight = window.innerHeight;

        if (typeof pageWidth != 'number') {
            if (document.compatMode == 'CSS1Compat') {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = document.body.clientHeight;
            }
        }
    }

    /*
        系统对话框

        alert('content')        //提示内容
        confirm('content')      //请求确认
        prompt('content','')    //输入框

        print()             //打印
        find('content')     //查找
    */

    /*
    
        location 对象

        location对象既是window对象的属性，也是document对象的属性，他们引用的是同一个对象:window.location == document.location   true

    */

    //location对象的属性
    function example4() {
        location.hash;      //#后跟的字符串
        location.host;      //域名和端口号
        location.hostname;  //域名
        location.href;      //返回完整的请求路径。调用location的toString()方法也会返回该属性的值
        location.pathname;  //返回目录和文件名
        location.port;      //返回端口号
        location.protocol;  //返回页面的使用协议。
        location.search;    //返回请求路径中的查询字符串

        location.replace('url');        //在调用该方法后，不会再浏览器中生成新的历史记录，即不能点击返回按钮返回到调用该方法以前的url    
        location.reload();              //重新加载当前页。如果不传递任何参数，则使用缓存的静态资源。如果要强制从服务器下载，可以传入一个true
    }

    //通用的查询字符串函数
    function example5() {
        var queryString = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = queryString.length ? queryString.split('&') : [],
            item = null,
            name = null,
            value = null;

        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);    

            if (name) {
                args[name] = value;
            }
        }

        return args;
    }



    /*
        navigator   对象
        navigator 对象的具体属性和方法查看 《javascript高级程序设计》第三版 229页
    */


    /*
        history 对象

        history对象中保存着用户的上网历史记录。
        使用history.go()可以使用户前进或后退页面
        example:history.go(-1)  //后退一页
        history.go(1)       //前进一页

        history.back()      //模仿后退按钮
        history.forward()   //前进按钮
    */

})();