(function () {

    /*
        DOM 变化
        
        DOM2级HTML 为 document.implementation 添加了一个名叫 createHTMLDocument()的方法，这个方法会创建一个完整的HTML文档。这个方法接受一个参数，
        即新创建文档的标题，这个方法返回创建好的新HTML文档

            Node类型的变化:添加了isSupported()方法，该方法用来判断指定的节点是否具有指定的能力。接受两个参数：特性名和特性的版本号。返回bool值
                document.documentElement.isSupported('html','2.0')

            DOM3引入了两个辅助的方法：isSameNode()和isEqualNode(),分别表示传入的节点和调用的节点是否相同或相等。相同指是否是引用同一个节点对象。
            相等只是否是同一个类型的节点，是否有相等的属性、子节点等；这两个方法返回bool类型的值

            DOM3针对DOM节点添加额外数据引入方法：setUserData()，该方法接受三个参数：要设置的键，实际的数据和处理函数，处理函数接受5个参数：
            表示操作类型的5个数值（1复制；2导入；3删除；4重命名），数据键，数据值，源节点和目标节点。
    */

    function example() {
        var div = document.createElement('div');

        div.setUserData('name', 'Nicholas', function (operation, key, value, src, dest) {
            switch (operation) {
                case "1":
                    alert('copy');
                    break;
                case "2":
                    alert('import');
                    break;
                default:
                    alert('else');
                    break;
            }
        });
    }

    /*
    
         在iframe元素上调用contentDocument属性可以返回iframe内包含的文档对象。例: document.getElementById('myFrame').contentDocument;
        

        样式

            确定浏览器是否支持DOM2级定义的CSS可以使用一下方法：
                var supportsDOM2CSS = document.implementation.hasFeature('CSS','2.0');
                var supportsDOM2CSS2 = document.implementation.hasFeature('CSS2','2.0');

            DOM2级样式添加的属性和方法见《javascript高级程序设计》第三版 333页
    */

})();