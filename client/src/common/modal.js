// to overcome Bootstrp Modal limit for Vue 3.

let curOpenModalId = "";

function toggleModal(id) {
  console.log("common toggleModal:", id);
  let bodyEl = document.getElementsByTagName("body");

  // console.log("bodyEl.className : ", bodyEl.className);

  let doClose = false;
  let doOpen = false;
  if (!id) {
    doClose = true;
    doOpen = false;
  } else if (
    curOpenModalId ||
    (bodyEl.className && bodyEl.className.indexOf(" modal-open") != -1)
  ) {
    doClose = true;
    if (id != curOpenModalId) {
      doOpen = true;
    }
  } else {
    doOpen = true;
  }

  console.log(
    `doClose: ${doClose}, doOpen: ${doOpen},  curOpenModalId: ${curOpenModalId}`
  );
  if (doClose) {
    if (bodyEl.className) {
      bodyEl.className = bodyEl.className.replace(" modal-open", "");
    }
    if (bodyEl.style) {
      bodyEl.style.overflow = "";
      bodyEl.style.paddingRight = "";
    }

    bodyEl[0].removeChild(bodyEl[0].lastChild);

    if (curOpenModalId) {
      let elm = document.getElementById(curOpenModalId);
      elm.style.display = "none";
      if (elm.className) {
        elm.className = elm.className.replace(" show", "");
      }
      curOpenModalId = "";
    }
  }

  if (doOpen) {
    if (!bodyEl.className) {
      bodyEl.className = " modal-open";
    } else {
      bodyEl.className += " modal-open";
    }
    if (!bodyEl.style) {
      bodyEl.style = {};
    }
    bodyEl.style.overflow = "hidden";
    bodyEl.style.paddingRight = "17px";

    let divEl = document.createElement("div");
    divEl.className = "modal-backdrop fade show";
    bodyEl[0].appendChild(divEl);

    curOpenModalId = id;
    let elm = document.getElementById(id);
    if (!elm.style) {
      elm.style = {};
    }
    elm.style.display = "block";
    if (!elm.className) {
      elm.className = " show";
    } else {
      elm.className += " show";
    }
  }
  return true;
}

export default toggleModal;
