(function () {
    /*
        跨文档消息传递

        使用postMessage(message,host) 可以将消息传递给当前页面包含的iframe框架或着当前页面弹出的页面中,第一个参数是消息的内容，第二个参数是
        一个域名，表示要接受消息的文档必须来自指定的域名。如果域名匹配则将数据发送，如果不匹配则什么都不做。

        该方法是一个异步的方法，当接受消息的文档接受到该消息的时候会触发 message事件，传递给message事件处理程序的事件对象包含3个重要的参数
        data:作为postMessage方法第一个参数的字符串
        origin:发送消息文档的所在域
        source:发送消息的文档window对象的代理。

    */

    //发送消息
    function sendMessage() {
        var iframe = document.getElementById('iframe');

        iframe.postMessage('hello world', 'http://www.myhost.com');
    }

    //在iframe中接受消息
    document.addEventListener('message', function (event) {
        var data = event.data,
            origin = event.origin,
            source = event.source;
        if (origin === 'http://www.myhost.com') {
            //处理消息

            //发送消息
            source.postMessage('success', 'http://m.myhost.com');
        }
    }, false);


    /*
        原生拖放

        拖动某元素时依次触发以下事件：
            dragstart
            drag
            dragend
        当拖动的元素被放置到一个目标上时，下列事件会依次触发
            dragenter
            dragover
            dragleave
            drop

        在某些默认不允许放置的元素上面，重写dragenter和dragover事件可以使元素变为可放置，方法是在事件处理程序中取消默认行为。
        为了让firefox支持正常拖放，也要重写drop事件，在处理程序中取消默认行为

        可以也只能在拖放事件中访问事件对象的dataTransfer对象，dataTransfer对象有两个方法：getData()和setData(),getData用于获取由setData方法
        保存的数据
        
        例子： event.dataTransfer.set('text','1'); var id = event.dataTransfer.getData('text');

        HTML5的这两个方法可以接受所有的MIME类型，因为考虑到向后兼容，也可以使用url和text，他们会被相应的映射为text/uri-list和text/plain
        可以为每个MIME类型保存一个参数,保存在dataTransfer中的数据只能在drop事件中处理

        利用dataTransfer对象可以确定被拖动的元素和要作为目标放置的元素可以做什么：dropEffect属性和effectAllowed，通过dropEffect属性可以知道被拖动
        的元素能够执行哪些放置行为，dropEffect的值有以下几个：
            none:表示不能把拖动的元素放在这里。这是除文本框外所有元素的默认值
            move:表示应该把拖动的元素移动到放置目标
            copy:表示应该把拖动的元素复制到放置目标
            link:表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接,有url）
        要使用dropEffect属性必须要在ondragenter事件处理程序中针对目标放置元素设置它

        dropEffect属性要搭配effectAllowed属性才有用，该属性表示允许拖动元素的哪种dropEffect
            uninitialized:没有给被拖动元素设置任何行为
            none:被拖动元素不能有任何行为
            copy:只允许值为copy的dropEffect
            link:只允许值为link的dropEffect
            move:只允许值为move的dropEffect
            copyLink:只允许值为copy和link的dropEffect
            copyMove:只允许值为copy和move的dropEffect
            linkMove:只允许值为link和move的dropEffect
            all:允许任意dropEffect
        必须在ondragstart事件处理程序中设置该属性

        draggable属性可以指定元素是否可以拖动
    */


    /*
        媒体元素    《javascript 高级程序设计》第三版 p505

        历史状态管理  《javascript 高级程序设计》第三版 p510


    */

})();