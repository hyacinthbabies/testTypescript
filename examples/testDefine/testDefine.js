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
var myGreeter = new Greeters("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();
var SpecialGreeter = (function (_super) {
    __extends(SpecialGreeter, _super);
    function SpecialGreeter() {
        return _super.call(this, "Very special greetings") || this;
    }
    return SpecialGreeter;
}(Greeters));
