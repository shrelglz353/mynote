/*
	原型链：
	
	通过原型链继承是将子类的 prototype 对象指定为父类的实例。这样子类可以使用父类的所以属性和方法：当调用某个属性或方法时，
    先查找实例中是否存在，如果存在则直接调用，不存在的话查找构造函数的原型，因为原型已被覆盖为父类的实例，
    所以此时通过子类的[[Prototype]]内部属性找到构造函数的原型对象，也就是父类的实例，在父类的实例中继续查找，
    如果父类的实例中还没有找到，则通过父类的内部属性[[Prototype]]找到父类的构造函数的原型继续找，直到找到为止。
	
	原型链中有一个问题，就是如果父类的实例中有引用类型的属性时，那么所有的子类实例使用的就是同一个引用属性，
    一个子类改变此引用类型的值也会影响到另一个。
	另外一个问题就是在实例化子类的时候不能想父类构造函数传递参数
*/
(function () {

    function SuperType() {
        this.property = true;
        this.friend = ['zhangsan', 'lisi'];
    }

    SuperType.prototype.getSuperValue = function () {
        alert(this.property);
    };

    function SubType() {
        this.subproperty = false;
    }

    SubType.prototype = new SuperType();

    SubType.prototype.getSubValue = function () {
        alert(this.subproperty);
    };

    var sub1 = new SubType();
    var sub2 = new SubType();

    sub1.friend.push('wangwu');
    console.log(sub1.friend);	//['zhangsan','lisi','wangwu']
    console.log(sub2.friend);	//['zhangsan','lisi','wangwu']
})();

/*
	借用构造函数：
	
	借用构造函数的实现原理是：在子类的构造函数中通过call或者apply调用父类的构造函数，同时传递this，这样在实例化一个子类时，
    子类的构造函数中的this就指向新的对象，而构造函数调用的父类的构造函数中的this同样也指向了新的对象，相当与父类的实例属性复制了一份到子类中。
	
	借用构造函数解决了子类实例改变引用类型的属性时也会改变其他实例的同名属性和子类想父类构造函数传递参数的问题。
    但同时借用构造函数也存在一个问题。方法要在构造函数中创建，每次创建一个实例都要 new Function()。方法复用也无从谈起
*/
(function () {

    function SuperType(name, age) {
        this.name = name;
        this.age = age;
        this.friend = ['zhangsan', 'lisi', 'wangwu'];
    }

    function SubType(name, age, sex) {
        SuperType.apply(this, name, age)
        this.sex = sex;
    }

    var sub1 = new SubType('zhangsan', 19, 'nan');
    var sub2 = new SubType('lisi', 20, 'nan');

    sub1.firend.push('maliu');

    console.log(sub1.friend);	//['zhangsan','lisi','wangwu','maliu']
    console.log(sub2.friend);	//['zhangsan','lisi','wangwu']

})();

/*
	组合继承：
	
	组合继承是将借用构造函数模式和原型链模式进行组合使用的。使用借用构造函数模式给父类传值，并且保证引用类型不被公用。
    使用原型链模式将公用的方法和属性继承到子类，使其可复用。
*/
(function () {

    function SuperType(name, age) {
        this.name = name;
        this.age = age;
        this.friend = ['zhangsan', 'lisi'];
    }

    SuperType.prototype.sayName = function () {
        alert(this.name);
    };

    function SubType(name, age, sex) {
        SuperType.apply(this, name, age);
        this.sex = sex;
    }

    SubType.prototype = new SuperType();

    var sub1 = new SubType('zhangsan', 19, 'nan');
    var sub2 = new SubType('lisi', 20, 'nan');

})();
/*
	使用组合继承模式不仅何以保证子类各自属性的独立性，也能保证公用的方法和属性的复用性。 
    但是使用组合继承模式也有一个问题：就是父类的构造函数会调用两次。第一次在子类的prototype赋值时调用，第二次在调用子类的构造函数时调用了。
    这两次调用父类的构造函数，使得子类的实例和prototype中都存在父类的属性。只不过在子类调用的时候实例中的属性会屏蔽prototype中的同名属性。
    所以组合继承虽然解决了问题，但同时也引起新问题。
	
	
	原型式继承：
	
	以某个实例为基础，将新的函数的prototype指向此实例对象。返回新的对象。
    注意，如果实例中存在引用类型的属性时，所有依赖此实例创建的实例共享此引用类型属性。
*/
(function () {

    function object(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }

    var person = {
        name: 'zhangsan',
        friends: ['lisi', 'wangwu']
    };

    var anotherPerson = object(person);
    anotherPerson.name = 'lisi';
    anotherPerson.friends.push('zhangsan');

    var yetAnotherPerson = object(person);
    yetAnotherPerson.name = 'maliu';
    yetAnotherPerson.friends.push('lisi');

    alert(person.friends);		//['lisi','wangwu','zhangsan','lisi']
})();

/*
    寄生式继承：
    
    由其他可以生成一个新对象的函数返回一个新对象，再以某种方式增强此对象。此种方式严格意义上说不算继承。
    只是创建一个对象，再给此对象添加额外方法或属性，例如
*/
(function () {
    function createAnother(o) {
        var clone = object(o);		//创建对象
        clone.sayHi = function () {	//增强对象
            alert('hi');
        };
    }

    var person = {
        name: 'zhangsan',
        age: 19
    };

    var anotherPerson = createAnother(person);
    anotherPerson.sayHi();

})();

/*
    寄生组合式继承：
    
    子类继承父类的原型对象，使用借用构造函数方法继承父类的实例属性，非常完美
*/
(function () {

    function object(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }

    function inheritPrototype(subType, superType) {
        var prototype = object(superType.prototype);		//创建对象
        prototype.constructor = subType;					//增强对象，给新创建好的对象指定constructor
        subType.prototype = prototype;						//将子类的构造函数原型指向新创建好的对象
    }

    function SuperType(name) {
        this.name = name;
    }

    SuperType.prototype.sayName = function () {
        alert(this.name);
    };

    function SubType(name, age) {
        SuperType.call(this, name);			//借用构造函数模式使父类的实例属性都复制一份副本到子类中
        this.age = age;
    }

    inheritPrototype(SubType, SuperType);	//寄生式继承使子类直接继承父类的原型对象，保持原型链

    SubType.prototype.sayAge = function () {
        alert(this.age);
    };

})();

/*
	寄生组合式继承的高效体现在 SuperType 只执行一次构造函数，并且因此避免了在 SubType.prototype上面创建不必要的、多余的属性。
    原型链也能保持不变，因此可以正常使用 instanceof 和 isPrototypeOf 。所以继承组合式继承是最佳的继承方式
*/