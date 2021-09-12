function add(busStop) {
  try {
    if (get(busStop.BusStopCode)) {
      return false;
    }

    let bookmarks = getAll();
    bookmarks.push(busStop);
    localStorage.setItem("busStopBookmarks", JSON.stringify(bookmarks));
    console.log("add true");
    return true;
  } catch (err) {
    console.log("add false");
    console.log(err);
    return false;
  }
}

function get(busStopCode) {
  try {
    let bookmarks = getAll();
    return bookmarks.find((item) => item.BusStopCode === busStopCode);
  } catch {
    return;
  }
}

function getAll() {
  try {
    const storageStr = localStorage.getItem("busStopBookmarks");
    let bookmarks = [];
    if (storageStr) {
      bookmarks = JSON.parse(storageStr);
    }
    return bookmarks;
  } catch {
    return [];
  }
}

function remove(busStopCode) {
  try {
    let bookmarks = getAll();
    bookmarks = bookmarks.filter((item) => item.BusStopCode !== busStopCode);
    localStorage.setItem("busStopBookmarks", JSON.stringify(bookmarks));
    return true;
  } catch {
    return false;
  }
}

export { add, get, getAll, remove };
