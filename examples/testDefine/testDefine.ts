const myGreeter = new Greeters("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeters {
    constructor() {
        super("Very special greetings");
    }
}