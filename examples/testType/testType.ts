// ------------- 布尔值 ---------------
let isDone: boolean;
isDone = true;





//------------- 数字 -------------
let decLiteral: number = 6;







//------------- 字符串 -------------
// 可以使用模版字符串，它可以定义多行文本和内嵌表达式。
// 这种字符串是被反引号包围（` ），并且以${ expr }这种形式嵌入表达式
let username: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ username }.
I'll be ${ age + 1 } years old next month.`;






//------------- 数组 -------------
class Test{
    list:number[];
}
let list: Array<Test>;
new Test().list.map((list,index)=>{

})






//------------- 元组 Tuple -------------
let x: [string, number,number];
x = ['hello', 1,2];
x.push("sss");




//------------- 枚举 -------------
enum Color {Red, Green=2, Blue}
let c: Color = Color.Green;//不赋值默认索引；赋值则得到具体的值
console.log(c,"enum");






//------------- 任意值 -------------
let notSure: any = 4;
notSure = "maybe a string instead";//  ok
notSure = false; // ok
// 当只知道一部分数据
let list1: any[] = [1, true, "free"];
list1[1] = 100;





//------------- 空值void -------------
function warnUser(): void {
    console.log("我没有任何返回");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = undefined;






//------------- Null 和 Undefined -------------
// 默认情况下null和undefined是所有类型的子类型
let u: undefined = undefined;
let n: string = null;
decLiteral = null;







//------------- Never -------------
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

fail();

infiniteLoop();








//------------- 类型断言 -------------
// 类型转换；没有运行时的影响，只是在编译阶段起作用

// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue1: any = 9;
let strLength1: number = (<string>someValue1).length;

// 另一个为as语法：
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;