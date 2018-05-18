//在参数中使用泛型
var picUrl;
picUrl = ["ssss", "222"];
console.log(picUrl);
//在函数中使用泛型
//当希望传参与返参类型一样，但是又不想限制传入的具体类型
function identity1(arg) {
    return arg;
}
function identity2(arg) {
    return arg;
}
console.log(identity2(2), "number");
console.log(identity2(true), "boolean");
function identity(arg) {
    return arg;
}
var myIdentity = identity;
console.log(myIdentity(2));
//泛型类
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
console.log(myGenericNumber.add(1, 2));
