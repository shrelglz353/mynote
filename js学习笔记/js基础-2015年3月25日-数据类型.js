(function () {

    /*
        局部变量声明时要使用 var 关键字，否则会变为全部变量.在严格模式下则会抛出ReferenceError错误
    */

    function example() {
        var str = 'zhangsan';
    }

    function example2() {
        str = 'lisi';           //执行到这里时 变量 str 会被添加到全局作用域,在严格模式下会抛出 ReferenceError错误 
    }

})();

//数据类型
(function () {
    //ECMAScript 有5中简单数据类型：Undefined,Null,Boolean,Number,String
    //还有一种复杂类型 Object,所有自定义的复杂类型都继承自 Object

    //typeof 用于检测给定变量的数据类型 

    /*
        "undefined" :如果给定变量未初始化
        "boolean": 如果给定的变量为Boolean类型
        "string":如果给定的变量为String类型
        "number":如果给定的变量为Number
        "object":如果这个值是对象或null(如果变量为null，调用typeof会返回object,这是因为null被认为是一个空的对象引用)
        "function":如果这个值是函数
    */

    function example() {
        var str = 'hello world';

        console.log(typeof (str));      //"string"
        console.log(typeof str);        //"string"
        console.log(typeof 95);         //"number"
    }

    /*
        Undefined 类型就只有一个值：undefined,在使用 var 关键字声明变量但未对其初始化时，这个变量的值就是 undefined
    */

    function example2() {
        var str;
        console.log(typeof str === "undefined");        //true
    }

    /*
        使用未声明的变量会抛出错误，但是对未声明的变量执行 typeof操作却不会抛出任何错误,反而会返回 undefined 
    */

    function example3() {
        var str;
        console.log(typeof str);            //undefined
        console.log(typeof age);            //undefined
    }


    /*
        Null 类型的第二个只有一个值的类型：null,表示空对象的指针，这也解释了使用 typeof null 返回 object的原因
    */

    function example4() {
        var str = null;
        console.log(typeof str);        //object
    }

    /*
        不鼓励对变量手动赋 undefined,但却可以对变量赋 null,假设你要在一个变量上保存对象，可以初始化变量为 null，这样在检查变量时只需要
        判断不为null就行了
    */
    function example5() {
        var obj = null;

        if (obj != null) {
            //执行操作
        }
    }

    /*
        undefined 派生自 null,所以对他们两个进行相等型测试返回的值为 true
    */

    function example6() {
        console.log(undefined == null);        //true
    }

    /*
        Boolean 类型的值有两个 true 和 false。Ture,False不是 布尔类型的值，只是标识符.
        true 不一定等于 1，false 也不一定等于0.但在ECMAScript中所有的类型都可以转换为Boolea类型的值
    */

    function example7() {
        var message = 'hellow world';
        var messageAsBoolean = Boolean(message);        // true
    }

    /*
        各种类型转会为 bool 类型的对应值

        数据类型            转换为true的值           转换为 false 的值
        Boolean                 true                    false
        String              任何非空字符串              '' 空的字符串
        Number              任何非0数字值                 0和NaN
        Object              任何对象                        null
        Undefined                                        undefined
    */


    /*
        Number 类型
        ECMAScript 中的 Number 类型，表示整型和浮点型.
        ECMAScript 支持 八进制，十进制和十六进制。计算时会全部转换为十进制进行计算
        八进制的字面量以0开头，十六进制的字面量以 0x开头
    */
    function example8() {
        var a = 017;        //八进制，转为十进制为 15
        var b = 0x12;       //十六进制，转为十进制为 18
        var c = 21;         //十进制
    }

    /*
        浮点型数值 包含一个小数点，小数点后面至少有一位数字。小数点前可以没有数字，但不推荐这样做
    */
    function example9() {
        var a = 0.1;
        var b = .2;     //正确，但不推荐
        var c = 1.0;        //浮点型，但编译器会转换为整型。
        var d = 1.;         //小数点后没有数字，解析为整型
    }

    /*
        浮点的保存空间是整型的2倍，所以ECMAScript会将可以转换为整型的转为整型保存。
        warning：不要做此测试  0.1+0.2==0.3 结果为 0.300000000000004

        Number 类型最小值保存在 Number.MIN_VALUE中，最大值保存在Number.MAX_VALUE
        如果某次计算的数值超过最大或最小限制，则会返回 Infinity, 检查某个变量是否限制范围之内
    */

    function example10() {
        var result = Number.MAX_VALUE + Number.MAX_VALUE;
        console.log(isFinite(result));          //false
    }

    /*
        NaN(Not a Number) 表示非数值。在要返回数值的时候不能返回数值，就会返回NaN。例如 任何数都不能除以0，在ECMAScript 中，任何数除以0
        就会返回NaN。而不会导致错误。任何涉及NaN的计算都会返回NaN。NaN和任何值都不相等，包括NaN本身
        判断一个值是否为NaN可以调用 isNaN()函数，这个函数接受一个参数，该参数可以是任意类型的。如果传入的参数不能被转换为数值，就会返回
        true
    */

    function example11() {
        console.log(isNaN(NaN));       //true
        console.log(isNaN(10));         //false
        console.log(isNaN('10'));       //尝试转换为数字10.  false
        console.log(isNaN('blue'));     //true
        console.log(isNaN(true));       //false 将会被转换为1
    }

    /*
        isNaN()也可以传入对象。如果传入的是一个对象，则会调用该对象的valueOf()方法，然后尝试将调用该方法的结果转换为数值。如果转换失败，
        则继续调用toString()方法再尝试转换为数值。然后测试


        有三个方法可以将非数值转换为数值：Number(),parseInt(),parseFloat();
        Number()方法适用与任何对象。可以将对象传入该方法。后两个方法只接受字符串类型
        这三个方法对于同样的输入会有不同的结果

        Number函数的转换规则如下:
            如果是Boolean类型的值，true和false将分别转为1和0
            如果是数值类型，则只是简单的传入和传出
            如果是null，转换为0
            如果是undefined,转换为NaN
            如果是字符串类型：
                如果字符串中只包含数字，则将其转换为十进制的数字（可以在字符串最前面包含正号和负号），前导的0将被忽略
                如果字符串包含有效的浮点类型，则会将其转换为浮点类，同样前导的0将被忽略
                如果字符中包含十六进制，将转换为同样大小的十进制数
                如果字符串是空的，则转换为0
                如果字符串包含上述格式之外的，则返回NaN
            如果是对象，先调用对象的valueOf方法，如果转换的结果是NaN,再继续调用toString()方法。然后再依照前面的规则转换
    */

    function example12() {
        console.log(Number(true));      //1
        console.log(Number(false));     //0
        console.log(Number(null));      //0
        console.log(Number(undefined)); //NaN
        console.log(Number('123'));     //123
        console.log(Number('070'));     //56
        console.log(Number('0x12'));    //18
    }

    /*

        parseInt()函数的转换规则
            1、从传入的字符串首位开始搜索如果不为数字则返回NaN
            2、如果首位是数字或者负号，接续搜索下一位，知道碰到不为数值的字符，然后对前面搜索到的字符进行转换
            3、空字符串会返回NaN
            4、如果字符串以0开头，则以八进制解析，再转换为十进制。如果以0x开头，以十六进制解析后转换为十进制
            5、推荐转换时给函数传入第二个参数，标识以某种进制进行解析,在指定了解析规则后，不用为要转换的字符串前面加 0 或 0x前导。(推荐)
    */

    function example13() {
        console.log(parseInt('we123'));     //NaN
        console.log(parseInt('123qw'));     //123
        console.log(parseInt(''));          //NaN
        console.log(parseInt('070'));       //56
        console.log(parseInt('0x12'));      //18

        console.log(parseInt('10', 2));     //2
        console.log(parseInt('10', 8));     //8
        console.log(parseInt('10', 10));    //10
        console.log(parseInt('10', 16));    //16
    }

    /*
        parseFloat()函数的转换规则和parseInt()函数的转换规则大致相同。区别只有parseFloat在遇到.字符的时候会解析，但如果遇到第二个.会
        忽略后面的字符
        第二个区别是parseFloat总是会忽略前导的0，因为parseFloat只解释十进制的数
        如果parseFloat遇到可以解析为整数的字符串，会将他转换为整数
    */

    function example14() {
        console.log(parseFloat('123.123.123'));     //123.123
        console.log(parseFloat('0123.212'));        //123.212
        console.log(parseFloat('12.'));             //12
        console.log(parseFloat('12.0'));            //12
    }

    /*
        String 类型由0个或多个 Unicode字符组成的字符序列。
        字符字面量：
            \n      换行
            \t      制表符
            \b      空格
            \r      回车
            \f      进纸
            \\      斜杠
            \xnn    以十六进制代码nn表示的一个字符（nn为0-F）
            \unnnn  以十六进制代码nnnn表示的一个Unicode字符（n为0-F）

        字符字面量可以出现在字符串中的任意位置
        ECMAScript 中的字符串是不可变的，要改变某个字符串，首先会销毁原来的字符串，然后在把新的字符串赋值给该变量

        要将一个其他类型转为字符串类型，因为几乎所有的类型都有一个toString()方法，可以调用次方法来进行转换,undefined和null没有次方法

        数值类型的转化为字符串类型时可以给toString()方法传递一个参数，表示以指定的进制输出
    */

    function example15() {
        var i = 10;
        console.log(i.toString(2));     //以二进制输出：1010
        console.log(i.toString(8));     //12
        console.log(i.toString(10));    //10
        console.log(i.toString(16));    //A
    }

    /*
        在不知道要转换的值是不是null或undefined时，可以调用转换函数String()，遵循一下规则

        1、如果要转换的类型拥有toString()方法，则调用该方法
        2、如果值是null，则返回 "null"
        3、如果值是undefined,则返回 "undefined"
    */

    /*
        Object 类型 
        1、Object类型是所有类型的基类
        2、以new关键字来实例化对象
        3、Object的每个实例都具有一下的属性和方法
            Constructor:保存着创建当前对象的函数
            hasOwnProperty(propertyName):用于检查指定树形是否存在与当前对象实例中（不是在实例的原型中），作为参数的属性名必须以字符串
                格式传入
            isPrototypeOf(object)：检查传入的对象是否是当前对象实例的原型
            propertyIsEnumerable(propertyName):用户检查传入的属性是否可以调用 for in 来枚举。
            toLocaleString():返回对象的字符串表示形式。结果与当前的执行环境区域对应
            toString():返回对象的字符串表示形式
            valueOf():返回对象的字符串、数值或布尔表示形式，通常与toString()返回的相同
    */

})();