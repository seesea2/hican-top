function loginId() {
  return window.sessionStorage.getItem("msiId");
}

function localLogin(id) {
  return window.sessionStorage.setItem("msiId", id);
}

function localLogout() {
  return window.sessionStorage.removeItem("msiId");
}

export { loginId, localLogin, localLogout };
