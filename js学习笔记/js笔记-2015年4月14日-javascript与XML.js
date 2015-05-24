(function () {
    /*
        浏览器对XML DOM的支持
            document.implementation.createDocument('','root',null) 方法创建一个空的XML文档，该方法的三个参数分别是：文档的命名空间、根节点和文档
            类型.

            检测浏览器是否支持DOM2级的xml:document.implementation.hasFeatrue('XML','2.0');

            DOMParser类型:
                将XML解析为DOM文档,先创建该类型的实例，再调用该实例的parseFromString方法将XML转换为DOM文档。parseFromString方法接收两个参数，
                第一个参数是要转为DOM文档的XML字符串，第二个参数应该始终都是'text/xml'
    */

    function example() {
        var domParser = new DOMParser();
        var dom = domParser.parseFromString('<root><child>the first child</child></root>', 'text/xml');

        console.log(dom.documentElement.tagName);       //root
    }

    /*
            如果调用parseFromString方法时给第一个参数传入了错误的、不符合XML格式的参数，该方法任然会返回一个DOM文档，不过该文档是以parsererror为根元素
            内容以错误描述构建的DOM文档

            由于各个浏览器对parseFromString的错误调用处理方法不同，所以要使用try...catch语句来捕获：在try中首先调用parseFromString 方法，如果未抛出
            异常，则在返回的DOM对象中调用getElementsByTagName方法判断是否有parsererror元素。如果有则证明转换错误。在catch语句中永远返回转换错误

        XMLSerializer类型：
            XMLSerializer类型提供了与parseFromString相反的功能：将DOM对象转化为格式良好的XML字符串。要讲一个DOM对象转化为XML格式的字符串，必须先
            实例化XMLserializer，然后调用该实例的serializeToString方法。serializeToString方法接受一个DOM对象，返回XML字符串
    */

    //将DOM对象转化为XML字符串
    function example1() {
        var xmlSerializer = new XMLSerializer();

        var xmlStr = xmlSerializer.serializeToString(document.documentElement);
    }

    /*
        在IE8及以前的版本中，要创建一个XML文档的实例，必须调用ActiveXObject类型，并传入一个字符串参数表示版本
        new ActiveXObject('MSXML2.DOMDocument.6.0')

        要解析XML字符串，必须创建一个DOM文档，然后调用loadXML方法。新创建的XML文档完全是一个空文档，所以要调用loadXML方法传入XML字符串经解析之后
        填充到DOM文档

        如果在解析中出错、加载XML文档、序列换XML的详细内容 《javascript 高级程序设计》第三版 p544
    */

    //IE下创建并解析XML
    function example2() {
        var xmlDom = new ActiveXObject('MSXML2.DOMDocument.6.0');

        xmlDom.loadXML('<xml><child>first child</child></xml>');

        console.log(xmlDom.documentElement.tagName);        //xml

    }

    //跨浏览器创建XMLDOM对象
    function example3(xml) {
        var xmlDom = '';

        if (typeof DOMParser != "undefined") {
            xmlDom = (new DOMParser()).parseFromString(xml, 'text/xml');
            var errors = xmlDom.getElementsByTagName('parsererror');
            if (errors.length) {
                throw new Error('XML parsing Error');
            }
        } else if (typeof ActiveXObject != 'undefined') {
            xmlDom = new ActiveXObject('MSXML2.DOMDocument.6.0');
            xmlDom.loadXML(xml);
            if (xmlDom.parseError != 0) {
                throw new Error('XML parsing Error');
            }
        } else {
            throw new Error('no xml parser available');
        }

        return xmlDom;
    }

    //跨浏览器序列化DOM文档
    function example4(dom) {
        if (typeof XMLSerializer != 'undefined') {
            return (new XMLSerializer()).serializeToString(dom);
        } else if (typeof ActiveXObject != 'undefined') {
            var object = dom.xml;
        } else {
            throw new Error("Could not serializer XML DOM");
        }
    }

    /*
    
        浏览器对XPath的支持
        XPath在DOM3中首次出现在推荐标准行列,很多浏览器都实现了推荐的标准，IE以自己的方式实现

        浏览器是否支持DOM3级XPath：document.implementation.hasFeature('XPath','3.0')
    */

})();