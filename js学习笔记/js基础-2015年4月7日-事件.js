(function () {

    /*
         事件冒泡：事件开始时由最具体的元素接收，然后一层一层向上传播到文档的根节点
         事件捕获：事件开始时由最不具体的元素接受，然后依次下下传播，直到最具体的元素接收
         DOM事件流：先事件捕获后事件冒泡

         DOM2级事件流规定，事件流包括三个阶段，事件捕获阶段，处于目标阶段和事件冒泡阶段。在捕获阶段，事件最多只传递到目标的父级，然后再到处于目标阶段，
         并在事件执行中被看作是冒泡阶段的开始，即事件捕获阶段不涉及事件目标。但在浏览器的实现中都会在捕获阶段触发事件对象上的事件,结果就有两次在
         目标对象上操作事件


         事件处理程序          
    */

    //HTML事件处理程序
    //<input type='button' name='submit' onclick='alert("submit!")' />

    //DOM0级事件处理程序
    function example() {
        var btn = document.getElementById('id');
        btn.onclick = function () {
            alert('submit!');
        };
    }

    //DOM2级事件处理程序
    function example2() {
        var btn = document.getElementById('id');
        btn.addEventListener('click', function () {
            alert('submit!');
        }, false);              //最后一个参数为false表示事件在冒泡阶段触发，为true表示事件在捕获阶段触发
    }


    /*
        使用DOM2级方法添加事件处理程序的好处是可以给同一个元素的同一个事件指定多个处理程序，多个处理程序会按照注册顺序依次执行

        通过DOM2级方法添加的事件只能通过removeEventListener()来移除，接受的参数必须和注册时的参数相同.
    */

    //添加/移除事件
    function example3() {
        var btn = document.getElementById('id');

        var handler = function () {
            alert('submit!');
        };

        btn.addEventListener('click', handler, false);      //添加事件
        btn.removeEventListener('click', handler, false);   //移除事件
    }

    /*
        IE事件处理程序

        IE实现了与DOM2级事件方法的类似方法：attachEvent,detachEvent。这两个方法接受两个参数：事件名称和事件处理函数。与DOM级的方法不同的是，IE的
        事件名称前面会有一个 “on"；另一个不同的是由于IE只支持事件冒泡，所以在DOM中的第三个参数在IE中不用指定。还有一个是事件处理程序的作用域，
        在使用DOM0级方法添加的处理函数会在其所属元素的作用域中运行，而使用attachEvent添加的方法只能在全局的作用域中运行。最后，在IE下使用attachEvent
        添加多个函数，函数的执行顺学并不是添加函数时指定的顺序，而是按照注册处理程序时的相反的顺序执行的
    */

    //IE下的事件绑定与取消
    function example4() {
        var btn = document.getElementById('id');

        var handler = function () {
            alert('submit');
        };

        btn.attachEvent('onclick', handler);        //添加
        btn.detachEvent('onclick', handler);        //移除
    }


    //跨浏览器事件处理程序
    var EventUtil = {

        //绑定事件
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },

        //取消绑定事件
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        }
    };


    /*
         事件对象

         DOM中的事件对象
             在触发DOM事件时，会产生一个事件对象event，可以在事件处理函数中调用。无论在DOM0级或DOM2级都会有这个event对象。
             通过event对象可以知道和该事件所有的一切相关信息，比如以下属性：
                bubbles:        表明事件是否冒泡
                cancelable:     表明是否可以取消事件的默认行为
                currentTarget:  其事件处理程序当前正在处理事件的那个元素
                target:         事件的目标
                等等，具体《javascript高级程序设计》第三版 375P

        IE中的事件对象
            在DOM0级事件中，使用window.event可以获取事件对象；在使用attachEvent绑定的事件中，可以通过参数传递获得event事件对象，
            也可以使用window.event获得。

            在IE中，event对象，所有的事件也会因为类型不同而包含的内容不同，但所有的事件都包含下面几个属性：
                cancelBubble        默认值为false，将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation方法作用相同）
                returnValue         默认值为true，但将其设置为false就可以取消事件的默认行为（与DOM中preventDefault相同）
                srcElement          事件的目标（与DOM中target相同）
                type                被触发的事件类型
            因为事件处理成的作用域是根据它的方式来确定的，所以不能认为this会始终等于事件目标。

    */

    //跨浏览器的事件对象
    EventUtil.getEvent = function (event) {
        return event ? event : window.event;
    };
    EventUtil.getTarget = function (event) {
        return event.target || event.srcElement;
    };
    EventUtil.preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
    EventUtil.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };


    /*
        事件类型

        DOM3级规定的事件类型：
            UI事件：当用户与页面上的元素交互时触发
            焦点事件：当用户获得或失去焦点时触发
            鼠标事件：
            滚轮事件：
            文本事件：
            键盘事件：
            合成事件：党委IME（input method editor,输入法编辑器）输入字符时触发
            变动事件：当底层DOM结构发生变化是触发

        鼠标事件：
            只有在一个元素上连续触发mousedown和mouseup事件，才会触发click事件。如果其中一个事件被取消了，那么click事件是不会被触发的。
            类似的，只有连续触发两次click事件才会dblclick事件,事件的触发顺序为：mousedown->mouseup->click->mousedown->mouseup->click->dblclick

        相关元素：
            当鼠标从DIV1中移动到DIV2中，mouseover的目标元素就是DIV2，相关元素是DIV1。mouseout的目标元素是div1,相关元素是DIV2
            相关元素只对mouseover和mouseout事件有效
    */

    //跨浏览器获取相关元素
    EventUtil.getRelatedTarget = function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.formElement) {
            return event.formElement;
        } else {
            return null;
        }
    }

    /*
        鼠标按钮
            只有在主鼠标按钮被按下时才会触发click事件。对于mousedown和mouseup事件来说，在其event对象中有一个button属性，其中保存这鼠标的三个值：
            0：按下鼠标左键，1：按下鼠标中键，2：按下鼠标次键，在IE8以前也有和DOM中同名的属性，但返回的值不同。
    */

    //跨浏览器获取鼠标按键信息
    EventUtil.getButton = function (event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    };

    //跨浏览器获取按键的字符编码
    EventUtil.getCharCode = function (event) {
        if (typeof event.charCode == 'number')
            return event.charCode;
        return event.keyCode;
    };

    /*
        textInput事件
            textInput事件用户在可以编辑的区域输入字符时，会触发该事件。在触发textInput事件时event对象会有一个data属性，这个属性的值就是用户输入的
            值


        变动事件
            DOM2中的变动事件是指DOM结构中有任何变动时给出提示，
                DOMSubtreeModified:在DOM结构中发生任何变化时触发，这个事件在其他任何事件触发后都会触发
                DOMNodeInserted:在一个节点被作为子节点插入到另一个节点时触发
                DOMNodeRemoved:在一个节点从父节点中被删除后触发
                DOMNodeInsertedIntoDocument:在一个节点被直接插入文档或通过子树插入文档时触发。这个事件在DOMInserted事件后触发
                DOMNodeRemovedFromDocument:在一个节点被直接从文档或通过子树间接被删除时触发。这个事件在DOMRemoved事件后触发
                DOMAttrModified:一个几点被修改特性后触发
                DOMCharacterDataModified：在文本节点的值发生改变时触发




        HTML5事件
            contextmenu事件：右击调出上下文菜单时触发
            beforeunload事件：在卸载页面前触发该事件，可以为event.returnValue指定一个值，用来显示到提示框中，同时返回值也应该是event.returnValue
            指定的值
    */

    function example5() {
        EventUtil.addHandler(window, "beforeunload", function (event) {
            var event = EventUtil.getEvent(event);
            var message = '要离开吗?';
            event.returnValue = message;
            return message;
        });
    }

    /*
        DOMContentLoaded事件：
            window.load事件会在页面全部加载完成并下载完成所有外部资源时触发。而DOMContentLoaded只在页面DOM树加载完成后就会触发
        pageshow和pagehide事件:虽然事件的目标是document，但事件的处理程序要加在window上
            pageshow事件是在页面显示时触发。在重新加载的页面中，该事件是在load事件触发后触发，对于bfcache页面，pageshow会在页面完全恢复后触发
            pagehide事件是在浏览器卸载页面之前触发，并且是在unload之前触发。
        hashchange: 该事件的事件处理程序要添加到window对象上
            在URL的参数列表(#及后面)发生变化时触发该事件。触发该事件后，event对象将会有两个属性：oldURL,newURL,这两个属性分别保存这参数列表变化前后的
            完整URL
    */
    function example6() {
        EventUtil.addHandler(window, 'hashchange', function (event) {
            var oldURL = event.oldURL,
                newURL = event.newURL;
        });
    }


    /*
        设备事件

            苹果公司为orientationchange用来确定用户何时将设备由横向查看模式改变为竖向查看模式。移动safari的window.orientation属性中包含3个值：
                0：肖像模式
                90：向左旋转的横向模式
                -90：向后旋转的横向模式
            用户只要改变了查看模式就会触发该事件,此时的event对象不包含任何有价值的数据

            触摸与手势事件：
                
                iOS与Android相同的事件
                touchstart:当手机触摸屏幕时触发。即使已经有一个手指放在屏幕上也会触发
                touchmove:当手机在屏幕上滑动时连续的触发。在这个事件发生期间，调用preventDefault()可以阻止滚动事件
                touchend:当手指从屏幕上移开时触发
                touchcancel:当系统停止跟踪触摸时触发

                上面这些事件都会冒泡，也都可以取消冒泡。兼容DOM，提供event中的数据。除了DOM的属性外，还停供了三个用于跟踪触摸的属性
                touches：表示当前跟踪的触摸操作的Touch对象的数组
                targetTouchs:特定与事件目标的Touch对象的数组
                changeTouches：表示自上次触摸以来，发生了什么改变的Touch对象数组

                每个Touch对象包含下列属性：
                    clientX:触摸目标在视口中的X坐标
                    clientY：触摸目标在视口中Y的坐标
                    identifier:标识触摸的唯一ID
                    pageX:触摸目标在页面中的X坐标
                    pageY:触摸目标在页面中的Y坐标
                    screenX:触摸目标在屏幕中的X坐标
                    screenY:触摸目标在屏幕中的Y坐标
                    target:数模的DOM节点目标

                事件的触发顺序：touchstart->mouseover->mousemove->mousedown->mouseup->click->touchend

                iOS中的手势事件：当两个手指触摸屏幕是会触发手势事件
                    gesturestart:当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发
                    gesturechange:当触摸屏幕的任何一个手指的位置发生变化时触发
                    gestureend:当任何一个手指从屏幕上移开时触发

                    事件的触发顺序：touchstart->gesturestart->touchstart->gesturechange->gestureend->touchend
                    与触摸事件相同，每个手势事件都包含标准的鼠标事件属性，此外还包含两个额外的属性：rotation和scale
                        rotation:表示手指变化引起的角度旋转，负值表示逆时针旋转，正值表示顺时针,从0开始
                        scale:表示两个手指间的距离变化，从1开始。并随着距离的增大而增大，随距离的减小而减小
    */



    /*
        内存和性能

        
    */

    //事件委托
    function example7() {
        EventUtil.addHandler(document, 'click', function (event) {
            var e = EventUtil.getEvent(event),
                target = EventUtil.getTarget(e);

            switch (target.id) {
                case 'input':
                    alert("this is a input");
                    return
                default:

            }
        });
    }

    /*
        模拟事件 《javascript高级程序设计》第三版 p425
    */

    //模拟鼠标点击事件

    function example8() {
        var btn = document.getElementById('btn'),
            event = document.createEvent('MouseEvents');

        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        btn.dispatchEvent(event);
    }

    /*
        自定义DOM事件
        DOM3级可以创建自定义事件
        调用createEvent('CustomEvent')返回的对象包含一个名为initCustomEvent()的方法，包含4个参数
            type（字符串）:触发事件的类型，如：'keydown'
            bubbles(布尔值）：表示是否应该冒泡
            cancelable(布尔值）：表示事件是否可以取消
            detail(对象）：任意值，保存在event对象的detail属性中
    */

    //自定义事件对象
    function example9() {
        var div = document.getElementById('btn'),
            event;
        EventUtil.addHandler(div, 'myevent', function (event) {
            alert('myevent' + event.detail);
        });

        if (document.implementation.hasFeature('CustomEvents', '3.0')) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('myevent', true, true, 'hello world');
            div.dispatchEvent(event);
        }
    }

})();