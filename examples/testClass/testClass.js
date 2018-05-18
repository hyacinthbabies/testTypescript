var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 面向对象编程
// 把客观世界所有事物看成一个个对象，每个对象具有行为和属性，属性会记录一些对象的数据
// 通过new 可以对类进行实例化，即创建一个对象
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var animal = new Animal("dog");
console.log(animal.name, "name");
animal.move(20);
//继承
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("miao~miao~");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Cat;
}(Animal));
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("si~si~");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Cat("cat");
var tom = new Horse("horse");
sam.move();
tom.move(34);
// 修饰符public、privated、protected
// 默认为public
var Person = (function () {
    function Person(theName) {
        this.name = theName;
    }
    Person.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Person;
}());
console.log(new Person("hyacinth").name, "test:public");
// private只能在内部被访问
// console.log(new Person("hyacinth").age,"test:private");
// protected能被派生类内部访问，但是不能再外部访问，并且构造函数中有protected，则此类不能被实例化
var Person1 = (function () {
    function Person1(theName) {
        this.name = theName;
    }
    return Person1;
}());
// Employee can extend Person
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person1));
var howard = new Employee("Howard", "Sales");
// let john = new Person1("John"); // Error: The 'Person' constructor is protected
// --------------- readonly修饰符-------------
// readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化
var Octopus = (function () {
    function Octopus(theName, numberOfLegs) {
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("the person", 33);
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.
// --------------- 参数属性 ---------------
// 把声明和赋值合并至一处
var Vehicle = (function () {
    function Vehicle(name) {
        this.name = name;
    }
    Vehicle.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Vehicle;
}());
console.log(new Vehicle("car").move(20));
// --------------- 存取器 get和set两个方法是对数据进行设置和获取用的 ------------------
var passcode = "secret passcode";
var Employee1 = (function () {
    function Employee1() {
    }
    Object.defineProperty(Employee1.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee1;
}());
var employee = new Employee1();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
// ------------ 类定义会创建：类的实例类型和一个构造函数-----------------
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter;
greeter = new Greeter("world");
// ----------- 把类当做接口使用 ------------------
var Point = (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
