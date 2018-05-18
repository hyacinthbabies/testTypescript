// ------------- 布尔值 ---------------
var isDone;
isDone = true;
//------------- 数字 -------------
var decLiteral = 6;
//------------- 字符串 -------------
// 可以使用模版字符串，它可以定义多行文本和内嵌表达式。
// 这种字符串是被反引号包围（` ），并且以${ expr }这种形式嵌入表达式
var username = "Gene";
var age = 37;
var sentence = "Hello, my name is " + username + ".\nI'll be " + (age + 1) + " years old next month.";
//------------- 数组 -------------
var Test = (function () {
    function Test() {
    }
    return Test;
}());
var list;
//------------- 元组 Tuple -------------
var x;
x = ['hello', 1, 2];
x.push("sss");
//------------- 枚举 -------------
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green; //不赋值默认索引；赋值则得到具体的值
console.log(c, "enum");
//------------- 任意值 -------------
var notSure = 4;
notSure = "maybe a string instead"; //  ok
notSure = false; // ok
// 当只知道一部分数据
var list1 = [1, true, "free"];
list1[1] = 100;
//------------- 空值void -------------
function warnUser() {
    console.log("我没有任何返回");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
var unusable = undefined;
//------------- Null 和 Undefined -------------
// 默认情况下null和undefined是所有类型的子类型
var u = undefined;
var n = null;
decLiteral = null;
//------------- Never -------------
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
fail();
infiniteLoop();
//------------- 类型断言 -------------
// 类型转换；没有运行时的影响，只是在编译阶段起作用
// 类型断言有两种形式。 其一是“尖括号”语法：
var someValue1 = 9;
var strLength1 = someValue1.length;
// 另一个为as语法：
var someValue2 = "this is a string";
var strLength2 = someValue2.length;
