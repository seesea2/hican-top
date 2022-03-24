// to overcome Bootstrp Modal limit for Vue 3.

let curOpenModalId = "";

function goBackEventListern() {
  console.log("in goBackEventListern");
  toggleModal();
}

function toggleModal(id) {
  // console.log("common toggleModal:", id);
  let bodyEl = document.getElementsByTagName("BODY")[0];
  // console.log(bodyEl);
  // console.log(bodyEl);

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

  // console.log(
  //   `doClose: ${doClose}, doOpen: ${doOpen},  curOpenModalId: ${curOpenModalId}`
  // );
  // console.log("bodyEl.className : ", bodyEl.className);
  if (doClose) {
    if (bodyEl.className) {
      bodyEl.className = bodyEl.className.replace(" modal-open", "");
    }
    if (bodyEl.style) {
      bodyEl.style.overflow = "";
      bodyEl.style.paddingRight = "";
    }

    let backDropEl = document.getElementById("modal-backdrop");
    if (backDropEl) {
      bodyEl.removeChild(backDropEl);
    }

    if (curOpenModalId) {
      let elm = document.getElementById(curOpenModalId);
      // console.log("elm,", elm);
      if (elm) {
        elm.style.display = "none";
        if (elm.className) {
          elm.className = elm.className.replace(" show", "");
        }
      }
      curOpenModalId = "";
    }

    window.removeEventListener("popstate", goBackEventListern);
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
    divEl.id = "modal-backdrop";
    divEl.className = "modal-backdrop fade show";
    bodyEl.appendChild(divEl);

    curOpenModalId = id;
    let elm = document.getElementById(id);
    // console.log("elm,", elm);
    if (!elm.style) {
      elm.style = {};
    }
    elm.style.display = "block";
    if (!elm.className) {
      elm.className = " show";
    } else {
      elm.className += " show";
    }

    window.addEventListener("popstate", goBackEventListern);
  }
  // console.log(
  //   "end: ",
  //   `doClose: ${doClose}, doOpen: ${doOpen},  curOpenModalId: ${curOpenModalId}`
  // );
  // console.log("bodyEl.className : ", bodyEl.className);
  return true;
}

export default toggleModal;
