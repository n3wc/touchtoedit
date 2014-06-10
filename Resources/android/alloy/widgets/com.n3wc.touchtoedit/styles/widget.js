function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.n3wc.touchtoedit/" + s : s.substring(0, index) + "/com.n3wc.touchtoedit/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0002,
    key: "core",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "transparent"
    }
} ];