/*
    对象的属性类型：
        属性的特性放在两对中括号中：[[]]
        ECMAScript有两种属性：数据属性和访问器属性
        数据属性有4个描述其行为的特性：
            [[Configurable]]:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性更改为访问器属性
            [[Enumerable]]:表示能否通过for-in循环返回属性。
            [[Writeble]]:表示能否修改属性的值
            [[Value]]:包含这个属性值的数据。读取属性值的时候从这个位置读；写入属性值的时候把新值保存在这个位置
        前三个属性的默认值都是true

        要修改这些特性的值,必须使用ECMAScript5的 Object.defineProperty()方法。这个方法接受三个参数：属性所在的对象、属性的名字和一个描述符对象。
        其中，描述符对象的属性必须是：configurable、enumerable、wirtable和value

*/

(function () {


    function example() {
        var people = {
            name: 'zhangsan',
            age: 19
        };

        Object.defineProperty(people, "name", {
            writable: false,
            value: 'lisi'
        });

        people.name = 'wangwu';

        console.log(people.name);       // lisi

    }

    /*
        如果将一个属性配置为configurable=false，那么后面对这个属性使用Object.defineProperty修改该属性将会失败。因为该属性已被改为不可配置

        调用Object.defineProperty方法是，不指定configurable,enumerable,writable方法，将会给这些属性赋默认值： false


        访问器属性：
            [[Configurable]]:同上
            [[Enumerable]]:同上
            [[Get]]:在读取属性时调用,默认值为undefined
            [[Set]]:在写入属性时调用，默认值为undefined
    */

    function example2() {
        var book = {
            _year: 2010,
            edition: 1
        };

        Object.defineProperty(book, "year", {
            get: function () {
                return this._year;
            },
            set: function (newValue) {
                if (newValue > 2004) {
                    this._year = newValue;
                    this.edition += newValue - 2004
                }
            }
        });

        book.year = 2005;
        console.log(book.edition);          //2

    }

})();


//工厂模式创建对象
(function () {

    function createPerson(name, age, sex) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.sex = sex;
        return o;
    }
    var person = createPerson('zhangsan', 19, 'nan');

})();




/*
    构造函数创建对象
    
    构造函数创建对象时必须要用 new 关键字
    构造函数创建对象会经历4个阶段
    
    1.创建一个新对象
    2.将构造函数的作用域赋值给创建的新对象（此时构造函数内的this指向该新建的对象）
    3.执行构造函数内的代码
    4.返回该新对象
    
    person1和person2是两个不同的对象，这两个对象都有一个属性 constructor 指向创建此对象的构造函数，这里是 Person
*/
(function () {

    function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sayName = function () {
            alert(this.name);
        }
    }

    var person1 = new Person('zhangsan', 19, 'nan');
    var person2 = new Person('lisi', 20, 'nv');

})();



/*
    原型模式
    
    在构造函数创建的对象中，每个对象的方法都要在各自的实例中重新创建一遍，例如：
    this.sayName = new Function('alert(this.name)');
    因为在ECMAScript中函数就是对象，因此完成同一件事情的函数，却要在每个实例中重新创建一遍。
    改进的方法：
    function Person(name,age,sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sayName = sayName;
        }
    function sayName(){
        alert(this.name);
        }
    这样做可以解决每个实例中都要重复创建一次的问题，可是却是要在Globle环境中定义。而且在Globle中定义的函数却只能在指定的对象中使用，
    所以继续改进的方法是原型模式：
*/

//原型模式
(function () {

    function Person() {
    }

    Person.prototype.name = 'zhangsan';
    Person.prototype.age = 19;
    Person.prototype.sex = 'nan';

    var person1 = new Person();
    var person2 = new Person();
})();
/*
    1.每定义一个函数时，就很根据特定的规则给这个函数创建一个prototype的属性，该属性指向一个原型对象，
        默认情况下原型对象自动获取一个constructor属性，这个属性包含一个指向prototype属性所在的函数指针。
        比如 Person.prototype.constructor 就是 Person
    
    2.所有该函数的实例共享该函数的prototype
    
    3.当构造函数创建一个实例后，该实例的内部包含一个指向构造函数的原型的指针。
        在ECMA第5版中管这个指针叫[[Prototype]],脚本中没有标准的方式访问[[Prototype]],在chrome等浏览器中可以通过_proto_属性访问。
        在其他浏览器中则没有提供访问方式。需要明确的是这个连接存在与实例和构造函数的原型之间，并不是实例和构造函数之间。
    
    4.可以通过 Person.prototype.isPrototypeOf(person1)来判断实例的[[Prototype]]是否指向Person.prototype。返回Boolean类型
    
    5.ECMAScript 5 中增加了一个新方法。Object.getPrototypeOf(person1),这个方法返回实例的[[Prototype]]值
    
    6.当读取某个实例的属性值时，会先从实例中搜索，如果搜索到了，则返回该值。
        如果没有搜索到，则继续搜索指针指向的原型对象。当实例和原型对象中存在相同名称的属性时，实例的属性总是会屏蔽原型对象的同名属性。
        通过 delete 删除掉实例中的属性时，会恢复对原型中属性的访问。使用hasOwnProperty()方法可以检测属性存在与实例中还是构造函数的原型中。
        这个方法只在给定的属性值存在与实例中才会返回true,例如：
*/
(function () {

    function Person() { }

    Person.prototype.name = 'zhangsan';

    var person1 = new Person();
    var person2 = new Person();

    person1.hasOwnProperty('name');	//false

    person1.name = 'lisi';
    person1.hasOwnProperty('name');	//true

    delete person1.name;
    person1.hasOwnProperty('name');	//false

})();

/*
    7.in 会在通过对象可以访问到指定属性时返回true,无论属性存在与实例还是存在与原型中
    
    8. 要取得对象上所有可枚举的属性值可以通过 Object.Keys(),接收一个对象，返回该对象中所有可以枚举的属性的字符串数组
    
    9. for in 可以枚举对象中所有的属性
    
    10. 更简单的原型方法：该方法可以一次性指定原型中要添加的所有属性和方法。但这种简单的原型方法等于重新创建了一个原型对象，
        将构造函数中的prototype指针重新指定到了新建的对象。所以构造函数默认的prototype.constructor会指向Object,
        可以通过在prototype中添加constructor:Person来指定，但是这种方法会使constructor属性的Enumerable特性变为true，
        默认情况下，原生的constructor默认值为false,所以可以通过Object.defineProperty(Person,'constructor',{enumerable:false,value:Person})
        指定属性值和不可枚举的特性。
    
    */

(function () {
    function Person() { }

    Person.prototype = {
        name: 'zhangsan',
        age: 19,
        sex: 'nan',
        sayName: function () {
            alert(this.name);
        }
    };

    Object.defineProperty(Person, 'constructor', {
        enumerable: false,
        value: Person
    });

})();

/*
    11.在用简单的原型方法时，重新创建构造函数的prototype对象前如果有创建好的实例，则通过该实例调用原型中的属性和方法会引起错误，因为构造函数默认的prototype指针和新建的prototype指针指向的地址是不同的。
*/

(function () {
    function Person() { }

    var person1 = new Person();

    Person.prototype = {
        name: 'zhangsan',
        age: 19,
        sex: 'nan',
        sayName: function () {
            alert(this.name);
        }
    };

    person1.sayName();		//error

})();

/*
    12.原型对象的问题：由于原型共享性，在原型中添加的引用类型，如果构造函数的一个实例改变了该引用类型的内容，则所有的实例的同名属性值都会改变
*/

(function () {
    function Person() { }

    Person.prototype = {
        friend: ['lisi', 'wangwu']
    };

    var person1 = new Person();
    var person2 = new Person();

    person1.friend.push('zhangsan')

    console.log(person1.friend);	// ['lisi','wangwu','zhangsan']
    console.log(person2.friend);	// ['lisi','wangwu','zhangsan']

})();

/*
    由于原型方式创建的对象会影响其他实例的引用类型值，所以改进的对象创建方法：
    
    组合使用构造函数模式和原型模式：
*/

(function () {
    function Person(name, age, sex, friend) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.friend = friend;
    }

    Person.prototype = {
        constructor: Person,
        sayName: function () {
            alert(this.name);
        }
    };

})();

/*
    组合模式是让构造函数创建实例属性，原型定义共享的属性和方法，最大限度的节省了内存，同时各个实例之间的属性不会相互影响。是应用最广泛的创建对象的方法
    
    
    动态原型模式：
    动态原型模式是在构造函数中动态的向原型中添加需要共享的属性和方法，只有在第一次执行此构造函数时会执行。此后原型已经构建完成，不需要再做什么修改。不过此时想原型中添加属性或方法会立即反映到各个实例中。因此这种方法可以说很完美。
    动态原型模式如下：
*/
(function () {
    function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;

        if (typeof this.sayName != 'function') {
            Person.prototype.sayName = function () {
                alert(this.name);
            };
        }
    }
})();

/*
    寄生构造函数：
*/
(function () {
    function Person(name, age, sex) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.sex = sex;
        return o;
    }

    var person = new Person(name, age, sex);
})();
/*
    在一个构造函数中，当构造函数中没有返回值的时候，调用new Person() 默认返回的是新创建的对象。
        如果有return语句，那么调用 new Person() 返回的不是新创建的对象，而是构造函数中 return 的值。
        使用寄生构造函数创建对象的场景一般是想重写 JS 提供的内置对象。假设我们要为Array类提供额外的方法时，就可以使用此方式创建：
*/
(function () {
    function newArray() {
        //创建数组
        var array = new Array();
        //添加值
        array.push.apply(array, arguments);
        //添加方法
        array.toPipedString = function () {
            return this.join('|');
        };
        return array;
    }

    var newarr = new newArray(['zhangsan', 'lisi']);
    newarr.toPipedString();		//zhangsan|lisi

})();

/*
    关于寄生构造函数模式，首先构造函数返回的对象和构造函数没有任何关系，与构造函数的原型之间也没有任何关系。
    也就是说，构造函数返回的对象与在构造函数外部创建的对象没什么不同。只是这种方法看起来更像是在创建一个自定义实例，
    但其实只是返回内部的一个对象。为此也不能使用instanceof来确定返回的对象与构造函数之间的关系，
    所以在需要使用instanceof来确定对象和构造函数之间是否存在关系的情况下应该使用其他的方法创建
    
    
    稳妥构造函数模式
    
    稳妥对象指的是没有任何公共属性，而且其他方法也不使用this对象。稳妥构造函数模式和寄生构造函数模式类似，但有两点不同：
    1.新创建对象的实例方法不使用this,
    2.不使用new操作符构造实例
    
*/
(function () {
    function Person(name, age, sex) {
        var o = new Object();
        //定义其他方法或私有变量
        o.sayName = function () {
            return name;
        };
        return o;
    }

    var person = Person('zhangsan', 19, 'nan');
    person.sayName();		//除了使用这种方式访问name，没有其他的方式，即便在得到对象后可以添加方法或属性，但通过构造函数传入的值只能公共此种方式获取；

})();
/*
    与寄生构造函数模式相似。使用稳妥构造函数模式返回的对象与构造函数和构造函数的原型没有任何关系，因此也不能是用 instanceof来确定对象与构造函数的关系
*/