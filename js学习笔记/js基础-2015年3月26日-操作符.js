(function () {


    /*
        一元操作符：
            递增和递减操作符应用到各个类型中：
                1、应用到一个包含有效数字的字符串中时，先将其转换为数值，再进行运算
                2、不包含有效数字时，将其转换为NaN
                3、应用到布尔类型的false时，先将其转化为0，然后再递增或递减
                4、应用到true时，转换为1，再计算
                5、应用到浮点或整型，直接递增或递减
                6、应用到对象时，先调用对象的valueOf，得到有效的数值后进行计算。如果未得到有效的数值则继续调用toString()方法
    */

    function example() {
        var a = '2',
            b = 'a',
            c = false,
            d = true,
            e = 1.1,
            f = {
                valueOf: function () {
                    return -1;
                }
            };

        console.log(a++);       //3
        console.log(b++);       //NaN
        console.log(c++);       //1
        console.log(d++);       //2
        console.log(e++);       //2.1
        console.log(f++);       //0
    }

    /*
        一元加、减操作符

        对非数值类型进行一元加操作的时候，会像调用Number()函数一样对其进行转换
    */
    function example2() {
        var a = +'2',
            b = +'a',
            c = +false,
            d = +true,
            e = +1.1,
            f = {
                valueOf: function () {
                    return -1;
                }
            };

        console.log(a);       //3
        console.log(b);       //NaN
        console.log(c);       //1
        console.log(d);       //2
        console.log(e);       //2.1
        console.log(+f);       //-1
    }

    /*
        一元减操作符用于将数值转换为负数，对于非数值类型，其转换规则和一元加操作符的转换规则相同


        位操作符

        正数保存二进制码，负数保存二进制反码的补码
        
        按位非：由~表示，返回二进制反码
    */

    function example3() {
        var num1 = 25;      //00000000000000000000000000011001
        var num2 = ~num1;   /*
                                求出num1的反码
                                11111111111111111111111111100110

                                转10进制方法
                                减一
                                11111111111111111111111111100101
                                求反码
                                00000000000000000000000000011010
                                10进制就是-26
                            */
        console.log(num2);          //-26
    }

    /*
        按位与：将要操作的两个数值的二进制码对其，如果同一位置都为1，则结果为1，否则为0
    */

    function example4() {
        var result = 25 & 3;
        console.log(result);        //1
        /*
            25: 0000 0000 0000 0000 0000 0000 0001 1001
            3:  0000 0000 0000 0000 0000 0000 0000 0011
        result: 0000 0000 0000 0000 0000 0000 0000 0001     == 1
        */
    }

    function example5() {
        var result = 25 & -24;
        console.log(result);        //8

        /*
             25: 0000 0000 0000 0000 0000 0000 0001 1001
            -24: 1111 1111 1111 1111 1111 1111 1110 1000
         result: 0000 0000 0000 0000 0000 0000 0000 1000    == 8
        */
    }

    /*
        按位或：将要操作的两个数值的二进制码对齐，如果同一位置有任意一个为1，则结果为1，否则为0
    */

    function example6() {
        var result = 25 | -24;
        console.log(result);        //

        /*
            25: 0000 0000 0000 0000 0000 0000 0001 1001
           -24: 1111 1111 1111 1111 1111 1111 1110 1000
        result: 1111 1111 1111 1111 1111 1111 1111 1001

        将结果转换为10进制的

        减一，取反码，再转10进制
        1111 1111 1111 1111 1111 1111 1111 1000
        0000 0000 0000 0000 0000 0000 0000 0111         == -7
        */
    }

    /*
        按位异或：将要操作的两个数值的二进制码对齐，如果同一位置只有一个为1，则结果为1，否则为0
    */

    function example7() {
        var result = 25 ^ -24;
        console.log(result);            //-15

        /*
             25: 0000 0000 0000 0000 0000 0000 0001 1001
            -24: 1111 1111 1111 1111 1111 1111 1110 1000  
         result: 1111 1111 1111 1111 1111 1111 1111 0001

         将结果转化为10进制的 减一，取反码，再转10进制
         1111 1111 1111 1111 1111 1111 1111 0000
         0000 0000 0000 0000 0000 0000 0000 1111    == -15
        */
    }

    /*
        按位移动：左移
        将指定数值的二进制数值向左移动指定的位置，多出的空位以0填充。左移不会影响到标识位
    */

    function example8() {
        var result = 3 << 4;
        console.log(result);        // 48

        /*
            0000 0000 0000 0000 0000 0000 0000 0011
            0000 0000 0000 0000 0000 0000 0011 0000     == 48
        */
    }

    /*
        按位移动：有符号的右移
        将指定数值的二进制数值向右移动指定的位置，多出来的位置在数值的左边、标识位的右边以标识位的值填充
    */

    function example9() {
        var result = 48 >> 4;
        console.log(result);        // 3

        /*
            0000 0000 0000 0000 0000 0000 0011 0000
            0000 0000 0000 0000 0000 0000 0000 0011     ==3
        */
    }

    /*
        按位移动：无符号的右移
        用三个大于号表示无符号的右移。无符号的右移以0填充空白位。对于正数来说，无符号的右移和有负号的右移结果相同，但对于负数，
        无符号右移的结果将非常大，因为负数通常用二进制补码来表示
    */

    function example10() {
        var result = -48 >>> 3;
        console.log(result);        //

        /*
            1111 1111 1111 1111 1111 1111 1101 0000
            0001 1111 1111 1111 1111 1111 1111 1010
        */
    }

    /*
        布尔操作符

        布尔操作符有三个 ：与（AND)=&&,或(OR)=||,非(NOT)=!

        逻辑非操作符用感叹号!表示，可以在任何对象上使用逻辑非操作符。在对非Boolean类型使用逻辑非操作符时先将操作数转换为Boolean类型
        然后再对其求反.转换规则和 《js基础-2015年3月25日-数据类型》中Boolean类型的转换规则相同

        可以使用两个逻辑非操作符将操作数转换为Boolean类型
    */
    function example11() {
        console.log(!false);        //true
        console.log(!'blue');       //false
        console.log(!0);            //true
        console.log(!'');           //true
        console.log(!NaN);          //true
        console.log(!123);          //false

        console.log(!!123);         //true
    }

    /*
        逻辑与操作符

        逻辑与操作符不一定返回bool值

        逻辑与操作符是一个短路操作符，
        1、如果第一个操作数是 Boolean类型，先检查第一个操作数，如果第一个操作数为false,则返回false,如果第一个
            操作数为true，则返回第二个操作数.
        2、如果第一个操作数不是Boolean类型，则先对他进行转换,然后检查转换结果，为true的话返回第二个，为false返回第一个
        3、如果第一个操作数为true，而第二个操作数是一个未声明的变量，那么在返回第二个操作数时会抛出错误
    */

    function example12() {
        console.log(true && false);     //false
        console.log(false && true);     //false
        console.log(null && 123);       //null
        console.log(true && 123);       //123
        console.log(true && null);      //null
        console.log(true && asd);       // throw error
        console.log(false && asdf);     //false
    }

    /*
        逻辑或操作符

        逻辑或操作符同样也不一定返回bool值

        逻辑或操作符也是一个短路操作，不过它的验证规则和逻辑与操作符相反
        1、如果第一个操作符是 Boolean类型，先检查第一个操作数，如果为true，则返回第一个操作数，如果为false返回第二个操作数
        2、如果第一个操作符不是Boolean类型，则先对第一个操作数进行转换，如果转换结果为true，返回第一个操作数，如果为false返回第二个操作数
        3、和逻辑与操作符一样，第一个操作符为false、当检查第二个操作数是一个未声明的变量的时候，会抛出错误
    */

    function example13() {
        console.log(true || false);     //true
        console.log(false || true);     //true
        console.log(12 || false);       //12
        console.log(undefined || 12);   //12
        console.log(null || asd);       //throw error

    }

    /*
        乘性操作符

        乘法 *，除法/，取模%

        如果两个操作符中有一个或两个都不是数值类型，则先对他们调用Number()进行转换，再继续计算
    */

    function example14() {
        console.log(undefined * 1);     //NaN
        console.log(null * 1);          //NaN
        console.log('123a' * 1);        //NaN
        console.log(true * 2);          //2

        console.log(true / 2);          //0.5

        console.log(10 % 9);            // 1
    }

    /*
        加性操作符

        加+，减-

        加法：如果两个操作数都为数值，则进行普通计算，如果有一位操作数为字符串，则将另一位转换为字符串并返回拼接后的字符串
        减法：如果两个操作数为数值，进行普通计算。如果有一位操作数为字符串，则将其转换为数字后再对其计算。如果有对象参与计算，则先调用
        该对象的valueOf()后转换位数字进行计算。
    */

    function example15() {
        console.log(1 + 1);     //2
        console.log(1 + '1');   // "11"

        console.log(1 - 1);     //0
        console.log(1 - "1");       //0
    }

    /*
        比较操作符

        <,>,<=,>=

        比较操作符返回bool值

        比较操作符的规则

        1、如果两个操作数都为数字的话，则进行大小比较
        2、如果两个操作数都为字符串的话，则对字符串对应的字符编码进行比较
        3、如果有非数字，有一个数字的话，则先对字符串进行转换，然后再进行比较，如果转换失败，返回false。因为转换失败后会成为 NaN，
            而任何和NaN的比较都会返回false。
        4、如果有一个对象的话，调用该对象的valueOf方法，在使用以上规则。如果该对象没有valueOf方法，则调用toString()方法
    */

    function example16() {
        console.log(1 > 1);     //false
        console.log('a' > 'A'); //true      由于大写的字符编码小于小写的字符编码
        console.log('1' > 0);   //true

        console.log('a' > 0);   //false     'a'转换为NaN,
        console.log('a' <= 0);  //false
    }


    /*
        相等操作符

        ==,!=

        相等操作服返回Boolean类型的值

        使用相等操作符的规则：
            1、如果有一个操作符为bool类型，则现将其转换为数值型再进行比较
            2、如果有一个是字符串，有一个是数字，则先将字符串转换为数字后进行比较
            3、如果有一个是对象，另一个操作数不是，则调用对象的valueOf方法后进行比较
            4、如果两个操作数是指向同一个对象的变量，则相等
            5、null和undefined 是相等的
    */

    function example17() {
        console.log(true == 1);     //true
        console.log(true == 'a');   //false     true转换为1，‘a'转换为NaN
        console.log('55' == 55);    //true
        console.log(null == undefined);     //true

        console.log(NaN == NaN);        //false
        console.log(NaN != NaN);        //true
    }

    /*
        全等操作符

        ===,!==

        全等操作符返回Boolean类型的值

        使用全等操作符时不会对两个操作数进行转换，必须类型相等、值相等才会返回true，否则返回false
    */

    function example18() {
        console.log(true === 1);        //false
        console.log(null === undefined);        //false
        console.log('55' === 55);       //false
    }

    /*
        条件操作符

        a?b:c  如果a成立返回b，否则返回c

        赋值操作符

        赋值操作符可以和其他操作符结合使用
        例如：+=,-=,*=等,意思为先计算再赋值

        逗号操作符
        逗号操作符可以在一条语句中执行多个操作
        例如：var a=1,v=2,c=3
        逗号操作符可以用于赋值，
        var a = (1,2,3,4,5) 这种情况下，总是返回最后一个数，这里是5
    */
})();