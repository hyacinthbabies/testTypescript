// ------------------  函数参数类型  -------------------
function add(x, y) {
    return x + y;
}
var myAdd = function (x, y) { return x + y; };
console.log(myAdd(3, 4), "函数参数类型");
// ------------------  可选参数  -------------------
function buildName1(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName1("Bob", "22"); // ok
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
var result3 = buildName1("Bob", "Adams"); // ok
console.log(result3);
// ------------------  默认参数  -------------------
function buildName2(firstName, lastName) {
    if (firstName === void 0) { firstName = "Will"; }
    return firstName + " " + lastName;
}
// let result4 = buildName("Bob");                  // error, too few parameters
// let result5 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
var result6 = buildName2("Bob", "Adams"); // okay and returns "Bob Adams"
var result7 = buildName2(undefined, "Adams"); // okay and returns "Will Adams"
console.log(result6);
// ------------------  剩余参数  -------------------
function buildName3(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie", "ss");
console.log(employeeName);
// ------------------  重载函数  -------------------
// 方法根据传入参数的不同会返回两种不同的类型
