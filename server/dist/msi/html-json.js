"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlJsonToString = exports.createHtmlJson = void 0;
function createHtmlJson(tag) {
    if (!tag) {
        return;
    }
    try {
        tag = tag.toLowerCase();
        let elm = {
            tag: tag,
            properties: [],
            styles: [],
            innerText: "",
            children: [],
        };
        if (tag == "body") {
            elm.styles.push("width:100%;margin:0;font-family:Helvetica,Arial,sans-serif;");
        }
        return elm;
    }
    catch (e) {
        console.log(e);
        return;
    }
}
exports.createHtmlJson = createHtmlJson;
function htmlJsonToString(elmJson) {
    try {
        let childrenStr = "";
        for (let child of elmJson.children) {
            childrenStr += htmlJsonToString(child);
        }
        let propertiesStr = "";
        for (let property of elmJson.properties) {
            propertiesStr += property + " ";
        }
        let styles = "";
        for (let style of elmJson.styles) {
            styles += " " + style + ";";
        }
        let htmlStr = "<" + elmJson.tag;
        if (propertiesStr) {
            htmlStr += " " + propertiesStr;
        }
        if (styles) {
            htmlStr += " style='" + styles + "'";
        }
        htmlStr += ">";
        let innerText = elmJson.innerText.replace(/\r\n/g, "<br/>");
        innerText = innerText.replace(/\n/g, "<br/>");
        htmlStr += " " + innerText + " " + childrenStr;
        htmlStr += "</" + elmJson.tag + ">";
        return htmlStr;
    }
    catch (e) {
        console.log(e);
        return "";
    }
}
exports.htmlJsonToString = htmlJsonToString;
