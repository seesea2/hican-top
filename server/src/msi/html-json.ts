interface HtmlJson {
  tag: string;
  properties: any[];
  styles: any[];
  innerText: string;
  children: any[];
}

function createHtmlJson(tag: string) {
  if (!tag) {
    return;
  }

  try {
    tag = tag.toLowerCase();
    let elm: HtmlJson = {
      tag: tag,
      properties: [],
      styles: [],
      innerText: "",
      children: [],
    };

    if (tag == "body") {
      elm.styles.push(
        "width:100%;margin:0;font-family:Helvetica,Arial,sans-serif;"
      );
    }
    // if (["table", "td", "th"].includes(tag)) {
    //   elm.properties.push('style="border: 1px solid;"');
    // }
    return elm;
  } catch (e) {
    console.log(e);
    return;
  }
}

function htmlJsonToString(elmJson: HtmlJson) {
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
  } catch (e) {
    console.log(e);
    return "";
  }
}

export { HtmlJson, createHtmlJson, htmlJsonToString };
