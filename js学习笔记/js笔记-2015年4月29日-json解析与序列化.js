(function () {

    /*
        JSON对象有两个方法：stringify()和parse()，用于将一个javascript对象转化成字符串和将一个字符串转化为JSON对象。

        在使用stringify将对象转为字符串时，所有的函数成员和原型对象将被忽略，值为undefinde的属性也会被忽略。结果中都是值为
        有效的json数据类型的实例属性

        将json字符串传给JSON.parse()就可以得到相应的json对象
    */

    function example() {
        var person = {
            name: 'zhangsan',
            age: 19,
            sex: '男'
        };

        var jsonStr = JSON.stringify(person);

        console.log(jsonStr);       //{"name":"zhangsan","age":19,"sex":"男"}


        var jsonObj = JSON.parse(jsonStr);

    }

    /*
        序列化选项

            JSON.stringity()方法可以接受三个参数，第二个参数用来过滤要序列化的属性，第三个参数表示缩进
            其中第二个参数可以接收一个数组，也可以是一个函数。如果是数组，数组内包含要序列化的属性名称。若是函数，该函数接受两个参数，
            第一个参数为属性成员名，第二个参数为属性值。该函数需要返回值，返回值就是序列化后属性的值
            第三个参数表示缩进，如果输入的是一个数值类型，则会缩进指定的空格。如果是字符类型，则以该字符替代缩进的空格
            注：指定了第三个缩进参数后，序列化的结果会自动换行。不换行的缩进没有任何意义
    */


    function example2() {
        var person = {
            name: 'zhangsan',
            age: 20,
            sex: '男',
            friends: ['lisi', 'wangwu']
        };

        var jsonStr1 = JSON.stringify(person, ['name', 'age', 'sex']);
        var jsonStr2 = JSON.stringify(person, function (key, value) {
            switch (key) {
                case "name":
                    return "张三";
                case "age":
                    return value + 5;
                case "friends":
                    return value.join(',');
                default:
                    return value;
            }
        });
        var jsonStr3 = JSON.stringify(person, ['name', 'age', 'sex'], 4);
        var jsonStr4 = JSON.stringify(person, ['name', 'age', 'sex', "friends"], '-');


        console.log(jsonStr1);      //{"name":"zhangsan","age":20,"sex":"男"}
        console.log(jsonStr2);      //{"name":"张三","age":25,"sex":"男","friends":"lisi,wangwu"}
        console.log(jsonStr3);      /*
                                        {
                                            "name": "zhangsan",
                                            "age": 20,
                                            "sex": "男"
                                        }
                
                                    */
        console.log(jsonStr4);      /*
                                        {
                                        -"name": "zhangsan",
                                        -"age": 20,
                                        -"sex": "男",
                                        -"friends": [
                                        --"lisi",
                                        --"wangwu"
                                        -]
                                        }
                                    */
    }

    /*
        toJSON()方法
            可以为任何对象添加toJSON方法用来自定义序列化的结果，定义了toJSON方法的对象在调用JSON.stringify()方法是会按照toJSON()方法
            的结果返回
    */

    function example3() {

        var person = {
            name: 'zhangsan',
            age: 20,
            sex: '男',
            friends: ['lisi', 'wangwu'],
            toJSON: function () {
                return this.name;
            }
        };

        var jsonStr = JSON.stringify(person);

        console.log(jsonStr);               // "zhangsan"
    }

    /*
        序列化对象时的顺序
            1、如果要序列化的对象中有toJSON()方法，并且可以返回有效的值，则调用该方法。否则按照默认顺序
            2、如果提供了第二个过滤参数，应用这个过滤器，传入函数过滤器的值是第一步返回的
            3、对第二步返回的值依次序列化
            4、如果提供了第三个函数，则进行相应的格式化
        如果同时提供了toJSON方法和第二个参数，则toJSON方法必须返回一个对象，这样才能应用stringify函数的第二个参数。如果toJSON方法返回
        的是一个非对象，比如字符串，那么stringify函数的第二个参数就无意义，stringify函数会直接返回toJSON的结果
    */

    function example4() {
        var person = {
            name: 'zhangsan',
            age: 20,
            sex: '男',
            friends: ['lisi', 'wangwu'],
            toJSON: function () {
                return this.name;
            }
        };

        var jsonStr = JSON.stringify(person, ['name', 'age'], 2);           //因为toJSON返回的是字符串，所以并不会使用第二个过滤条件。直接返回toJSON的结果:"zhangsan"

        var person1 = {
            name: 'zhangsan',
            age: 20,
            sex: '男',
            friends: ['lisi', 'wangwu'],
            toJSON: function () {
                return { name: this.name, sex: this.sex, age: this.age };
            }
        };

        var jsonStr1 = JSON.stringify(person1, ['name', 'age'], 3);         //toJSON返回的是一个对象，所以会使用第二个过滤条件

    }


    /*
    
        JSON.parse()方法的解析选项
        parse方法也可以接受一个额外的参数，该参数接受一个函数，函数可以接受两个参数，分别是转换后对象属性名和属性值。函数返回值将作为
        当前属性的值。如果返回值返回了undefined，则会在转换好的对象中删除该属性成员
    
    */

    function example5() {
        var jsonStr = '{"name":"张三","age":25,"sex":"男","friends":"lisi,wangwu"}';

        var jsonObj = JSON.parse(jsonStr, function (key, value) {

            switch (key) {
                case "name":
                    return 'zhangsan';
                case "age":
                    return value - 5;
                case "friends":
                    return value.split(',');
                default:
                    return value;

            }

        });
    }

})();