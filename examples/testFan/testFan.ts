//在参数中使用泛型
let picUrl:Array<string>;
picUrl = ["ssss","222"];
console.log(picUrl);





//在函数中使用泛型
//当希望传参与返参类型一样，但是又不想限制传入的具体类型
function identity1(arg: any): any {
    return arg;
}

function identity2<T>(arg: T): T {
    return arg;
}

console.log(identity2(2),"number");
console.log(identity2(true),"boolean");





//泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
console.log(myIdentity(2));









//泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
console.log(myGenericNumber.add(1,2));


