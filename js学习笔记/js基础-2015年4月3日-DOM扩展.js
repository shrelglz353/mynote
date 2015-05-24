(function () {
    /*
        选择符API

        Selectors API Level 1

            在Document和Element的实例上面可以调用两个方法:querySelector(),querySelectorAll()
            这两个方法都接受一个css选择符，区别是第一个方法只返回所有匹配项的第一项，如果无匹配项则返回null，而第二个方法返回的是一个NodeList的实例。
            实际上第二个方法返回的是一个带有所有NodeList属性和方法，但底层却是一个类似数组的元素快照。这样实现可以避免对元素不断的查询

            只要传给querySelectorAll方法的css选择符有效，就会返回一个NodeList的实例，无论匹配的元素有多少，即便是一个都没有，也会返回一个空的NodeList

            如果给这两个函数传入了浏览器不支持的选择符或者选择符中有语法错误，就会抛出一个异常


        Selectors API Level 2

            Element类型新增了一个查询方法：matchesSelector(),该函数接受一个CSS选择符，如果调用元素与该选择符匹配就返回true，否则返回false
            如果想使用这个函数，最好编写一个通用的兼容方法
    */

    //通用的matchesSelector方法
    function matchesSelector(element, selector) {
        if (element.matchesSelector) {
            return element.matchesSelector(selector);
        } else if (element.msMatchesSelector) {
            return element.msMatchesSelector(selector);
        } else if (element.mozMatchesSelector) {
            return element.mozMatchesSelector(selector);
        } else if (element.webkitMatchesSelector) {
            return element.webkitMatchesSelector(selector);
        } else {
            throw new Error('Not supported');
        }
    }

    /*
        由于在调用childNodes时各个浏览器的行为不一致（IE只返回元素，其他浏览器会将空格、换行当成文本节点返回），为了弥补这一差异新定义了一组属性。
            childElementCount:返回子元素（不包括文本节点和注释）的个数
            firstElementChild:指向第一个子元素
            lastElementChild:指向最后一个子元素
            previousElementSibling:指向前一个同辈元素
            nextElementSibling:指向后一个同辈元素
    */



    /*
        HTML5
            
            getElementsByClassName() 该方法接受一个参数，即一个包含一或多个类名的字符串。返回带有指定类的所有元素的NodeList。传入多个类名时
            类名的先后顺序不重要。

            Element.classList。classList属性是新集合类型DOMTokenList的实例。与其他DOM集合类似。其定义的方法如下：
                add(value)      将给定的字符串添加到列表中，如果值已经存在，则不添加
                contains(value) 表示列表中是否存在给定的值，如果存在返回true，否则返回false
                remove(value)   删除列表中指定的字符串
                toggle(value)   如果列表中存在给定的值，删除它。如果列表中不存在给定的值，就添加它


            焦点管理
                document.activeElement指向当前获得焦点的DOM元素。在文档刚刚加载完成时document.activeElement元素指向document.body，文档加载
                期间为空
                document.hasFocus()方法用于确定文档是否获得焦点。通过检测文档是否获得焦点可以知道用户是不是在与页面交互

            HTMLDocument 的变化
                
                readyState:该属性有两个可能的值loading和complete，分别表示正在加载文档和已经加载完成。通过document.onload事件使用该属性

                兼容模式 document.compatMode:在标准模式下它的值为'CSS1Compat'，在混杂模式下它的值为'BackCompat'

                head属性：作为对document.body引用body标签的补充，增加了document.head属性，引用文档的head元素。可以结合使用这种模式和后备的方法引用
                    var head = document.body || document.getElementsByTagName('head')[0];

            字符属性集
                charset 表示文档使用的字符集，默认为 utf-16。可以通过meta元素、响应头、或者直接设置charset属性修改这个值:document.charset = 'utf-8'
            
            自定义数据属性
                HTML5规定可以使用以data-为前缀的自定义属性，目的是提供与渲染无关的的信息。添加了自定属性后可以使用dataset属性来访问。dataset是一个
                DOMStringMap类型的实例，也是一个名值对，在这个映射中，所有以data-开头的自定义数据属性都会保存在这里,只不过属性名没有data前缀
    */

    function example() {
        var div = document.getElementById('div1');

        //取得自定义属性
        var appid = div.dataset.appid;
        var myName = div.dataset.myname;

        //设置属性
        div.dataset.appid = '123';
        div.dataset.myname = 'zhangsan';
    }

    /*
        innerHTML 属性
            在读模式下 innerHTML返回的是调用该属性的子元素的html标记。在写模式下，innerHTML会根据指定的值创建新的DOM树,然后用这个DOM树完全
            替换调用元素原先所有的子节点。

            window.toStaticHTML()方法,这个方法接受一个参数,即一个HTML字符串，返回一个删除所有脚本节点和事件处理程序的无害的HTML字符串
        outerHTML 属性
            和innerHTML属性差不多，区别是innerHTML只对调用元素的子元素，而outerHTML对调用元素和调用元素的子元素都有效

        scrollIntoView()方法：该方法可以在所有的HTML元素上调用，通过滚动浏览器窗口或者某个容器元素，调用元素可以出现在是口中。如果给该方法出入
        一个true或者不传入任何参数，窗口滚动以后会让调用元素的顶部和视口的顶部对其。如果传入的是一个false则会将调用元素的底部和视口的底部对其，
    
            更多滚动《javascript高级程序设计》322p
    */



    /*
        
        专有扩展
        
            文档模式（针对IE）
                页面文档模式决定了可以使用什么功能，可以使用哪个级别的CSS或可以使用那些JS API，以及如何对待文档类型
                
                到IE9总共有4中文档模式：
                    IE5:以混杂模式渲染页面。IE8及更高版本中的新功能都无法使用
                    IE7：以IE7标准模式渲染页面。IE8及更高版本中的新功能都无法使用
                    IE8：以IE8标准模式渲染。IE8中的高级功能都可以使用,因此可以使用 Selectors API、更多的CSS2级选择符和某些CSS3功能，还有一些HTML5
                        功能，不过IE9中的新功能无法使用
                    IE9:以IE9标准模式渲染页面。IE9中的高级功能都可以使用，比如ECMAScript5、完整的CSS3以及更多的HTML5功能。这个文档模式是最高级的

                 要强制浏览器以某种模式渲染页面，可以使用HTTP头部信息X-UA-Compatible,或设置meta标签，具体设置看《javascript 高级程序设计第三版》318页

            children 属性
                该属性是为了弥补childNodes属性各个浏览器返回值的差异。返回一个同样是HTMLCollection的实例.

            contains方法
                该方法用来确认某个节点是否是调用节点的一个后代。如果传入的节点是调用方法节点的后代则返回true，否则返回false

    */

})();