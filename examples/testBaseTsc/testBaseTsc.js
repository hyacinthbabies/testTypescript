import React from "react";
export default class Test extends React.Component{}
function greeters(person) {
    return "Hello, " + person;
}

var user = "hyacinth";

document.body.innerHTML = greeters(user);