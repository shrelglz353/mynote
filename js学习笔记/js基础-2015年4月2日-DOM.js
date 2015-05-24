(function () {

    /*
        节点类型和相对应的常量

        Node.ELEMENT_NODE: 1                        元素节点
        Node.ATTRIBUTE_NODE:2                       属性节点
        Node.TEXT_NODE:3                            文本节点
        Node.CDATA_SECTION_NODE:4                   
        Node.ENTITY_REFERENCE_NODE:5
        Node.ENTITY_NODE:6
        Node.PROCESSING_INSTRUCTION_NODE:7
        Node.COMMENT_NODE:8
        Node.DOCUMENT_NODE:9                        文档节点
        Node.DOCUMENT_TYPE_NODE:10                  文档类型节点
        Node.DOCUMENT_FRAGMENT_NODE:11      
        Node.NOTATION_NODE:12
    */

    function example() {
        console.log(document.nodeType == Node.DOCUMENT_NODE);       //true
        console.log(document.nodeType == 9);     //由于IE没有公开Node的构造函数，为了保证兼容性，最好与节点类型对应的常量进行比较
    }

    /*
          NodeList对象并不是Array的实例，而是基于DOM结构动态执行查询的类数组；
          NodeList操作方法和数组一样。也可以使用slice将NodeList转换成Array
    */

    function example2() {
        var nodeList = document.body.childNodes;

        var nodeArr = Array.prototype.slice.call(nodeList, 0);
    }

    /*
        每个节点都有一个ownerDocument属性，指向当前文档

        操作节点：

            appendChild()用于向childNodes列表的末尾添加一个节点。返回新添加的节点。如果传入该函数的节点已经是文档中的某个节点，那结果就是将
            该节点从原来的位置上移动到新的位置

            任何节点不能在文档中的多个地方同时出现

            insertBefore()用于插入节点

            replaceChild() 替换节点、删除节点

            removeChild() 移除节点


            所有节点共有的两个方法：cloneNode()、normalize()
            cloneNode方法用于复制调用该方法的节点，返回他的副本。传入的参数为true的话为深复制，深复制会复制节点的子节点。为false的话值复制该节点本身
            normalize方法只应用于文本节点，如果文本节点只是一个空节点的话，删除该节点。如果包含两个文本节点，则合并为一个
    */


    /*
        Document 节点
            Document类型表示文档，document对象是HTMLDocument的一个实例，表示整个文档（HTMLDocument继承自Document），document对象是window对象的
            一个属性，因此将其作为全局对象使用

            在HTML中所有的标签名都以大写表示

            document.nodeType = 9
            document.nodeName ='#document'
            document.nodeValue=null

            document.write方法和document.writeln方法可以在文档加载的过程中动态的向页面写入。如果页面加载已经完成，调用这两个方法会重写整个页面

            document.open方法和document.close方法用于打开和关闭网页的输出流，如果是在页面加载的过程中调用write或writeln方法则不用打开和变比输出流

        DOM一致性检测
            document.implementation.hasFeature('html','2.0')   检测浏览器是否支持指定的功能和版本号。如果支持返回true，否则返回false。
    */

    /*
        Element 节点

        nodeType = 1
        nodeName = 'tagName'        
        nodeValue = null

        所有标签类型都有HTMLElement表示，不是直接通过这个类型，也是通过它的子类型表示。HTMLElement类型继承自Element并添加了一些属性：
            id:元素在文档中的唯一标示符
            title：元素的附加说明
            lang:元素内容的语言代码
            dir：语言的方向
            className：指定的样式

        直接在元素对象中改变属性值，也会修改标签对应的特性值

        更多的标签对应的具体类型看《javascript高级程序设计第三版》282页

        操作标签特性的方法：
            getAttribute('')  返回指定特性的值，也可以通过此方法返回一个自定义的特性值，如果不存在返回null。 
            setAttribute('','') 设置一个特性的值，如果特性的值已经存在，则替换。如果不存在就添加。使用该方法也可以设置一个自定义的特性
            removeAttribute('') 彻底删除元素的特性，不但删除特性值，也会直接删除特性

            标签所有的特性有对应的对象属性，所以可以直接设置对象的属性来给设置特性。自定义特性的值不会添加到元素对象的属性中去，
            因为在元素对象中只有公认的特性才会添加到对象属性中，例如id。在对象中也不能设置自定义的特性

            调用对象的style属性或onclick属性返回的值和调用getAttribute返回标签中实际的值不一样。在对象上面调用style属性返回的是对象，而调用
            getAttribute返回的则是字符串，该属性值并没有直接映射到特性。和style一样，onclick属性返回的是函数，而onclick特性返回的是字符串

            Element类型是使用Attributes属性的唯一一个DOM节点类型。

        Attributes属性
            
            Attributes属性包含一个NamedNodeMap，与NodeList类似，也是一个执行时动态查询的集合。元素的每个特性都由一个Attr节点表示，每个节点都保存
            在NamedNodeMap对象中，NamedNodeMap对象拥有下列方法
                getNamedItem(name)      返回NodeName属性等于name的节点
                removeNamedItem(name)   删除指定节点,与removeAttribute方法一样，唯一的区别是removeNamedItem返回被删除特性的Attr节点
                setnamedItem(name)      向列表中添加节点
                item(pos)           返回位于数字pos位置的Attr节点




        使用document.createElement('tagName')可以创建元素

        在循环访问一个元素的子元素时，最好先判断一下该元素的类型。因为在ie下使用childNodes会忽略子元素之间的空白、换行符，而在其他的浏览器中
        会将这些解析成空的文本节点。
        例:
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            <ul>

    */

    function example3() {
        var ul = document.getElementsByTagName('ul')[0],
            node = null;

        for (var i = 0, len = ul.childNodes.length; i < len; i++) {
            node = ul.childNodes[i];
            if (node.nodeType == 1) {
                //操作
            }
        }
    }

    /*
        Text类型

        nodeType=3
        nodeName='#text'
        nodeValue='节点包含的文本'
        没有子节点

        提供的方法：  
            appendData(text)        将text添加到节点的末尾
            deleteData(offset,count)    从指定的位置删除count个字符
            insertData(offset,text)     将text插入到指定的位置
            replaceData(offset,count,text)  用text替换从offset开始到offset+count的字符
            splitText(offset)       从指定的位置将字符串分割成两个文本节点
            substringData(offset,count)     从指定的位置提取count个字符

            length属性保存着文本节点中字符的数目

        默认情况下，每个包含内容的元素最多只能包含一个文本节点。并且确实有内容存在


        Comment 类型
            nodeType=8
            nodeName = '#comment'
            nodeValue = '注释的内容'
            同Text类型节点一样，不支持也没有子节点



        Attr 类型
            nodeType=11
            nodeName='特性名称'
            nodeValue='特性的值'
            HTML中没有/不支持子节点
    */
})();