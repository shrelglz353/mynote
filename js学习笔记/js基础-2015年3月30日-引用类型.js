(function () {

    /*
        Object 类型

        在使用对象字面量创建对象时，是不会调用Object的构造函数

        在ECMAScript中，可以使用中括号加字符串的方式访问对象的属性:obj["name"] == obj.name

        数组：Array
            检测数组：在同一个全局环境下使用 instanceof Array,非同一个全局环境使用Array.isArray()方法
            数组的栈方法：push() 入栈,添加至数组的最后一个位置。pop()出栈，从数组最后一个位置弹出。shift()出队列，从数组第一位出队
            reverse()反转数组。sort()对数组排序,sort方法比较的是字符串，即使是数字，也是转换后比较字符串。sort方法接受一个比较函数
            用作排序。比较函数接受两个参数,如果第一个参数应该在第二个参数之前，返回负数。如果第二个参数和第二个参数相同返回0.否则
            返回正数
    */
    function example() {
        var arr = ['1', '2', '3', '5', '4'];
        arr.sort(compare);
    }

    function compare(value1, value2) {
        return Number(value1) - Number(value2);
    }

    /*
        使用concat可以拼接数组，复制一个数组，然后将传入的数组拼接到复制的数组的后面。如果传入的并非数组，那就简单的将传入值添加的后面。

        slice()如果在只有一个参数的情况下，返回从指定位置开始到结束位置的一个新数组。如果有两个参数，返回从指定起始位置到指定终止位置的
        一个数组。 slice方法不会影响原始数组

        splice() 删除：指定两个参数，其实位置和要删除的个数。添加\替换，指定三个或以上的参数，第一个参数指定起始位置，第二个参数指定
        删除的个数，第三个以后参数指定要在指定起始位置后面添加的项。splice函数总是返回一个数组，返回的是被删除的。如果没有被删除的则返回
        一个空数组
    */

    function example2() {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var removed = arr.splice(0, 2);

        console.log(removed);       //1,2
        console.log(arr);           //3,4,5,6,7

        removed = arr.splice(1, 2, 10, 11, 12);
        console.log(removed);       //4,5
        console.log(arr);           //3,10,11,12,6,7);
    }

    /*
        indexOf()和lastIndexOf()。这两个方法都是查找指定参数在数组中的位置，indexOf从数组头开始查找。lastIndexOf从数组末尾查找

        数组的迭代方法
        ECMAScript5中给数组定义了5个迭代方法，这5个方法都接受两个参数：要在每项上运行的函数和运行该函数的作用域。函数接受三个参数：
        数组项的值、该项在数组中的位置和数组对象本身。
        这5个方法分别是：
            every：对数组中的每一项执行给定的函数，如果所有的都返回true，则该方法返回true
            filter：对数组中的每一项执行给定函数，返回该函数会返回true的数组项组成的数组
            forEach:对数组每一项执行给定函数，无返回值
            map:对数组中的每一项执行给定函数，返回每次的调用结果组成数组
            some：。。。。。，如果任意有一项返回true，则该函数返回true
    */

    function example3() {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            context = { name: 'zhangsan', lvl: 4 },

            everyResult = arr.every(function (node, index, arr) {
                console.log(this.name);         //作用域
                return node > 0;
            }, context),

            filterResult = arr.filter(function (node, index, arr) {
                return node == this.lvl;
            }, context),

            foreachResult = arr.forEach(function (node, index, arr) {
                console.log(node);
            }, context),

            mapResult = arr.map(function (node, index, arr) {
                return 'node:' + node + ',index:' + index;
            }, context),

            someResult = arr.some(function (node, index, arr) {
                return node == this.lvl;
            }, context);


        console.log([everyResult, filterResult, foreachResult, mapResult, someResult]);
    }

    /*
        ECMAScript还定义了两个缩小方法：reduce和reduceRight，这两个方法都会迭代所有项，一个从前往后，一个从后往前。同样接受两个参数，
        在每一项上执行的函数和可作为缩小基础的初始值。函数接受四个参数：前一项，当前项，项的索引和数组对象。其中pre为上一次执行函数的
        返回值，如果是第一次执行则返回第一个项，因此函数是从第二个项开始的
    */

    function example4() {
        var arr = [1, 2, 3, 4, 5],

            reduceResult = arr.reduce(function (pre, cur, index, arr) {
                return pre + cur;
            });

        console.log(reduceResult);          //15
    }

    /*
        正则表达式

        正则表达式的匹配模式：
        /g表示全局模式，即模式将被应用于所有字符串，而非在发现第一个匹配项后立即停止
        /i表示不区分大小写。
        /m表示多行模式，即在到达一行的末尾时继续查找下一行中匹配的模式
    */

    /*
    
        Function 类型

        每个函数都是Function的实例，并且和其他类型一样都有属性和方法。

        函数声明和函数表达式之间的区别：使用函数声明时，在声明函数的前面调用函数是有效的，因为在代码开始执行前，解析器会通过一个名叫
        “函数声明提升”的过程，将函数声明提升到运行环境的最前面。所以在函数声明前面调用函数是有效的。但如果使用函数表达式的话就会抛出
        错误。而函数表达式则必须在定义函数的后面调用才有效。除此之外函数声明和函数表达式是一样的

        函数内部有两个属性：arguments和this。arguments对象有一个callee属性，该属性是一个指针，指向拥有这个arguments对象的函数,例子：
            
    */

    function example5(num) {
        if (num <= 1)
            return 1
        return num * arguments.callee(num - 1);
    }

    /*
        ECMAScript也规范化了另一个函数属性：caller,这个属性中保存这调用当前函数的函数的引用，如果是在全局作用域中调用，这个属性为null
    */

    function example6() {
        console.log(arguments.callee.caller);
    }

    function example7() {
        example6();
    }

    example6();             //null
    example7();             //example7

    /*
        函数的length、prototype属性。

        length属性指定函数的命名参数的个数。
        prototype属性指向函数的原型对象。

        每个函数都包含两个非继承的方法：apply()和call()方法，这两个方法的作用都是在特定的执行环境中调用指定的方法。
        这两个方法的第一个参数都是要调用的对象，唯一的区别就是第二个参数
        区别：
            apply方法的第二个参数可以指定一个数组，数组中包含要调用方法的参数。
            要给使用call方法调用的函数的参数，必须依次指定参数。
    */

    function example8(arg1, arg2) {
        console.log(this.name + '|' + arg1 + '|' + arg2);
    }

    function example9() {

        var people = { name: 'zhangsan', age: 18 };

        example8.apply(people, [2, 3]);      //zhangsan|2|3
        example8.call(people, 2, 3);        //zhangsan|2|3
    }

    /*
        ECMAScript5还定义了一个方法Bind(),这个方法会创建一个函数的实例，其this值会被绑定到传给Bind()函数的值


        基本包装类型：

        在基本类型中调用方法会经过几个步骤：1、创建该基本类型的包装类型。2、在该类型上面调用方法。3、在销毁该基本包装类型。
        
    */

    function example10() {
        var str = 'asdfg';              
        var str2 = str.substring(1);
    }

    /*
        str = 'asdfg' 调用这行代码时 创建一个对象。
        str2 = str.substring(1)  调用这行代码时，执行前一行代码创建的对象的方法，然后销毁该方法

        等价于

        var str = new String('asdfg');
        var str2 = str.substring(1);

        由于在使用完基本包装类型后就立即销毁该对象，所以在给该对象上添加任何属性和方法都会无效

        Object的构造函数也会像工厂方法一样，根据传入的值类型返回相应的基本包装类型

        var str = new Object('asdfg');
        console.log(str instanceof String);     //true

        var number = new Number(12);
        console.log(number instanceof Number);  //true

        Number 类型的格式化方法：
            toFixed()：按照指定的小数位返回数值的字符串表示方法 ,例子：var x = 3; x.toFixed(2);     3.00
            toExponential():按照指定的小数位返回数值的字符串，以指数表示法表示
            toPrecision():该方法接受一个参数，指定显示数字的位数，以最合适的方式显示。不包括小数点和指数部分
        
        String 类型方法
            replace():
                该函数接受两个参数，第一个参数可以是字符串，也可以是正则表达式。如果是字符串的话，只替换调用方法的字符串中第一个匹配的
            字符。如果是正则表达式，并且加/g全局参数时，可以替换整个字符串中所有的匹配项
                第二个参数可以是一个字符串，也可以是一个函数。如果是字符串的话，可以使用一些特殊的字符序列

                    字符序列                                替换文本
                        $&                      匹配整个模式的子字符串。与RegExp.lastMatch相同
                        $'                      匹配的子字符串之前的子字符串。与RegExp.leftContext值相同
                        $~                      匹配的子字符串之后的子字符串。与RegExp.rightContext值相同
                        $n                      匹配第n个捕获组的子字符串，其中n等于0-9。例如$1是第一个捕获组，$2是第二个捕获组。以此类推、
                                                    如果没有捕获组，则使用空字符串
                        $nn                     匹配第nn个捕获组的子字符串，其中nn等于00-99
    */

    function example11() {
        var text = 'cat,bat,sat,fat';
        var result = text.replace(/(.at)/g, 'word($1)');
        console.log(result);                //word(cat),word(bat),word(sat),word(fat)
    }

    /*
        replace()函数第二个参数也可以接受一个函数。在只有一个匹配项的时候，这个函数接受三个参数：匹配项，匹配项的位置和原始字符串。
        在有多个匹配项的时候，前几个参数都是匹配项，最后两个参数是第一个匹配项的位置和原始字符串。
    */

    function example12() {
        return text.replace(/[<>"&]/g, function (match, pos, originalText) {
            switch (match) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "\"":
                    return "&quot;";
            }
        });
    }

    /*
        String类型还有一个与匹配模式有关的方法：split(),这个方法表示以指定的分隔符分割字符串，返回数组。分割符可以使一个字符串，也可以是一个
        RegExp实例。split方法还有第二个参数，指定返回的数组大小。

        String类型最后一个与匹配模式有关的方法：localeCompare方法，用来比较两个字符串并返回下列值中的一个：
            如果字符串在字母表中应该排在传入的字符串参数前面，返回一个负数
            如果字符串等于传入的字符串参数，返回0
            如果字符串在字母表中应该排在传入的字符串参数后面，返回一个正数

        String类型还有一个静态方法：formCharCode() ，该方法接受一个或一组字符编码,然后转换为字符串。从本质上讲，这个方法和实力方法charCodeAt()是
        相反的操作


        单体内置对象
            ECMAScript规定的内置对象是不依赖宿主环境的对象。

            ECMAScript定义的两个单体的宿主对象：Global和Math

            Global对象：
                不属于任何对象的方法或属性，都是Global对象的，包括isNull,isNaN,parseInt,encodeURI,decodeURI等。
                encodeURI是对整个URL编码，而encodeURIComponent主要用于对URI中的某一段进行编码。
                encodeURI不对本身属于URI的特殊字符进行编码，而encodeURIComponent对遇到的所有的特使字符都会进行编码

                eval方法相当于一个javascript解析器，可以解析任意的代码字符串。缺点：耗费性能

                Global对象虽然不能直接访问,但Web浏览器都是将这个对象作为window对象的一部分加以实现，因此在全局作用域中声明的个中属性和方法都是
                window对象的一部分

            Math属性用来进行各种数学计算的
    */

})();