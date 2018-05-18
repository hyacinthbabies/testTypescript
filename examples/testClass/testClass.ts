// 面向对象编程
// 把客观世界所有事物看成一个个对象，每个对象具有行为和属性，属性会记录一些对象的数据
// 通过new 可以对类进行实例化，即创建一个对象
class Animal {
    name:string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

let animal = new Animal("dog");
console.log(animal.name,"name");
animal.move(20);


//继承
class Cat extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("miao~miao~");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("si~si~");
        super.move(distanceInMeters);
    }
}

let sam = new Cat("cat");
let tom: Animal = new Horse("horse");

sam.move();
tom.move(34);













// 修饰符public、privated、protected
// 默认为public
class Person {
    public name: string;
    private age: number;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

console.log(new Person("hyacinth").name,"test:public");
// private只能在内部被访问
// console.log(new Person("hyacinth").age,"test:private");


// protected能被派生类内部访问，但是不能再外部访问，并且构造函数中有protected，则此类不能被实例化
class Person1 {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person1 {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
// let john = new Person1("John"); // Error: The 'Person' constructor is protected















// --------------- readonly修饰符-------------
// readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number;
    constructor (theName: string,numberOfLegs:number) {
        this.name = theName;
    }
}
let dad = new Octopus("the person",33);
// dad.name = "Man with the 3-piece suit"; // error! name is readonly.













// --------------- 参数属性 ---------------
// 把声明和赋值合并至一处
class Vehicle {
    constructor(private readonly name: string) { }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

console.log(new Vehicle("car").move(20));














// --------------- 存取器 get和set两个方法是对数据进行设置和获取用的 ------------------
let passcode = "secret passcode";

class Employee1 {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee1();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}








// ------------ 类定义会创建：类的实例类型和一个构造函数-----------------
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");










// ----------- 把类当做接口使用 ------------------
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};