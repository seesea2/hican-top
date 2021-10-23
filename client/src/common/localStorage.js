function getByName(name) {
  try {
    const storageStr = localStorage.getItem(name);
    if (storageStr) {
      return JSON.parse(storageStr);
    }
    return [];
  } catch {
    return [];
  }
}

function getParam(name, param) {
  try {
    let storageJson = getByName(name);
    if (storageJson.length > 0) {
      return storageJson[0][param];
    }
    return;
  } catch {
    return;
  }
}

function addParam(name, param, value) {
  try {
    let storageJson = getByName(name);
    if (storageJson.length <= 0) {
      storageJson[0] = {};
    }
    storageJson[0][param] = value;

    localStorage.setItem(name, JSON.stringify(storageJson));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { getParam, addParam };
