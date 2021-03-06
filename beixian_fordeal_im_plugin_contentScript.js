function execBxContent() {
    _execBxContent();
    return true;
}

function _execBxContent() {
    setInterval(function () {
        try {
            appendLocationBtn2A()
        } catch (err) {
            console.log(err)
        }
        try {
            appendBtn2A()
        } catch (err) {
            console.log(err)
        }
        try {
            appendImg2A()
        } catch (err) {
            console.log(err)
        }
    }, 2000);
}

function appendLocationBtn2A() {
    $('a').each(function () {
        var href = $(this).attr('href');
        if (!$(this).is('.bx_location_added')) {
            if (href.indexOf("https://www.google.com/maps?q=") != -1) {
                $(this).after('<button onclick="add_location(this)" class="bx_btn" data-url="' + href + '" style="margin-left: 10px;background-color: #FEDB43;cursor:pointer;border: 1px solid transparent;outline: none;"><i class="el-icon-location-information" style="font-size:16px;background-color: #FEDB43"></i></button>');
                $(this).addClass("bx_location_added")
            }
        }
    })
}

function appendImg2A() {
    $('img').each(function () {
        var src = $(this).attr('src');
        if (!$(this).is('.bx_searchimg_added')) {
            // if (src.indexOf("https://s3.forcloudcdn.com") != -1) {
            $(this).after('<button onclick="add_img_link(this)" class="bx_btn" data-url="' + src + '" style="margin-left: 10px;background-color: #FEDB43;cursor:pointer;border: 1px solid transparent;outline: none;"><i class="el-icon-search" style="font-size:16px;background-color: #FEDB43"></i></button>');
            $(this).addClass("bx_searchimg_added")
            // }
        }
    })
}

function appendBtn2A() {
    $('a').each(function () {
        var href = $(this).attr('href');
        if (!$(this).is('.bx_added')) {
            if (href.indexOf("fordeal.com") != -1) {
                initIndexDB().then((db) => {
                    getDataByKey(db, 'keyValueCache', "bx_fordeal_hrefArr").then((data) => {
                        var bx_fordeal_hrefArr = ['bx']
                        var bx_fordeal_hrefArr_exclude = ['bx']
                        if (data && data.value) {
                            bx_fordeal_hrefArr = data.value
                        }
                        initIndexDB().then((db) => {

                            getDataByKey(db, 'keyValueCache', "bx_fordeal_hrefArr_exclude").then((data1) => {
                                if (data1 && data1.value) {
                                    bx_fordeal_hrefArr_exclude = data1.value
                                }
                                if (bx_fordeal_hrefArr_exclude.indexOf(href) == -1) {
                                    if (bx_fordeal_hrefArr.indexOf(href) != -1) {
                                        $(this).after('<button onclick="ship_to(this)" class="bx_btn" data-url="' + href + '" style="margin-left: 10px;background-color: #FEDB43;cursor:pointer;border: 1px solid transparent;outline: none;"><i class="el-icon-sell" style="font-size:16px;background-color: #FEDB43"></i></button>');
                                        $(this).addClass("bx_added")
                                    } else {
                                        isCorrectLink(href).then((res) => {
                                            if (res == true) {
                                                $(this).after('<button onclick="ship_to(this)" class="bx_btn" data-url="' + href + '" style="margin-left: 10px;background-color: #FEDB43;cursor:pointer;border: 1px solid transparent;outline: none;"><i class="el-icon-sell" style="font-size:16px;background-color: #FEDB43"></i></button>');
                                                $(this).addClass("bx_added")
                                                bx_fordeal_hrefArr.push(href);
                                                initIndexDB().then((db) => {
                                                    updateDataByKey(db, 'keyValueCache', {
                                                        'key': "bx_fordeal_hrefArr",
                                                        'value': bx_fordeal_hrefArr,
                                                    });
                                                });
                                            } else {
                                                bx_fordeal_hrefArr_exclude.push(href);
                                                initIndexDB().then((db) => {
                                                    updateDataByKey(db, 'keyValueCache', {
                                                        'key': "bx_fordeal_hrefArr_exclude",
                                                        'value': bx_fordeal_hrefArr_exclude,

                                                    });
                                                });
                                            }
                                        })
                                    }
                                }
                            });
                        });
                    });
                });
            }
        }
    })
}

function add_img_link(val) {
    var dataUrl = val.getAttribute("data-url");
    console.log("dataUrl:" + dataUrl);

    sleep(50).then(() => {
        var url = $(".page-iframe").attr("src");
        if (url.indexOf("www.fordeal.com/customer-service-helper/index.html") === -1) {
            alert("Please click the order guide link mark first or open the shopping guide center and enter the order guide link ???????????????????????????????????????????????????????????????????????????????????????")
        } else {
            $(".page-iframe").attr("src", "data:text/html;charset=utf-8,???????????????????????????????????????");
            url = changeURLArg(url, "searchImageLink", escape(dataUrl));
            console.log("??????????????????" + url);
            sleep(100).then(() => {
                $(".page-iframe").attr("src", url);
            })
        }
    })

}

function add_location(val) {
    var dataUrl = val.getAttribute("data-url");
    console.log("dataUrl:" + dataUrl);
    sleep(50).then(() => {
        var url = $(".page-iframe").attr("src");
        if (getParamFromUrl(url, "link") == null || getParamFromUrl(url, "link") == "") {
            alert("Please click the order guide link mark first or open the shopping guide center and enter the order guide link ???????????????????????????????????????????????????????????????????????????????????????")
        } else {
            $(".page-iframe").attr("src", "data:text/html;charset=utf-8,???????????????????????????????????????");
            url = changeURLArg(url, "whatsapppAddressUrl", escape(dataUrl));
            console.log("??????????????????" + url);
            sleep(100).then(() => {
                $(".page-iframe").attr("src", url);
            })
        }

    })
}

function isCorrectLink(url) {
    return new Promise((resolve, reject) => {
        console.log("???beixian????????????" + url)
        $.ajax({
            type: "GET",
            url: "https://cn-odyssey.fordeal.com/api/verify?url=" + escape(url),
            dataType: 'jsonp',
            timeout: 5000,
            jsonp: 'callbackName',
            success: function (res) {
                console.log("???beixian????????????" + url)
                console.log("???beixian??????????????????" + JSON.stringify(res))
                if (res.result == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (res) {
                console.log("???beixian????????????" + url)
                console.log("???beixian????????????????????????" + JSON.stringify(res))
                console.log(res.jqXHR + " " + res.status + " " + res.error);
                console.log(res)
                resolve(false);
            }
        });
    })
}


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var flag = false;

function ship_to(val) {
    var dataUrl = val.getAttribute("data-url");
    console.log("dataUrl:" + dataUrl);
    var lis = $('.tool-item-list .tool-item');
    var pane_splitter_button = $('.pane-splitter-button');
    for (var i = 0; i < pane_splitter_button.length; i++) {
        if (pane_splitter_button[i].innerHTML.indexOf('el-icon-d-arrow-left') > -1) {
            pane_splitter_button[i].click();
        }
    }
    flag = false;
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].innerText.indexOf('Shopping guide center') > -1) {
            lis[i].click();
            flag = true;
        }
    }
    if (!flag) {
        var links = $('.mod-tool-inner-links .link-item');
        for (var i = 0; i < links.length; i++) {
            if (links[i].innerHTML.indexOf('Shopping guide center') > -1) {
                links[i].click();
                flag = true;
            }
        }
    }

    if (flag == false) {
        alert("???????????????Shopping guide center??????????????????????????????????????????")
        return;
    }
    sleep(50).then(() => {
        var url = $(".page-iframe").attr("src");
        $(".page-iframe").attr("src", "data:text/html;charset=utf-8,???????????????????????????????????????");
        url = changeURLArg(url, "link", escape(dataUrl));
        console.log("??????????????????" + url);
        sleep(100).then(() => {
            $(".page-iframe").attr("src", url);
        })
    })
}

function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}

function getParamFromUrl(url, arg) {
    var pattern = arg + '=([^&]*)';
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        return tmp;
    }
    return null;
}

let indexedDB = window.indexedDB || window.webkitindexedDB || window.msIndexedDB || mozIndexedDB;

function openDB(dbname, version, newStore, callback) {
    var version = version || 1;
    var request = indexedDB.open(dbname, version);
    request.onerror = function (event) {
        console.log('IndexedDB?????????????????????');
    };
    request.onsuccess = function (event) {
        let db = event.target.result;
        if (callback && (typeof callback === 'function')) {
            callback(db);
        }
    };
    // onupgradeneeded?????????????????????????????????
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        if (newStore) {
            if (!db.objectStoreNames.contains(newStore.name)) {
                var objectStore = db.createObjectStore(newStore.name, {
                    keyPath: newStore.key,
                });
            }
        }
    };
}

//??????key????????????
function updateDataByKey(db, storeName, value) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.put(value);
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            var stocktable = e.target.result;
            if (stocktable) {
                resolve(true);
            } else {
                reject(false);
            }
        };
    })
}

//??????key????????????
function getDataByKey(db, storeName, key) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.get(key);
    return new Promise((resolve, reject) => {
        request.onsuccess = function (e) {
            resolve(request.result);
        };
    })
}

function initIndexDB() {
    return new Promise(function (resolve, reject) {
        openDB('bxCache', 1, {
            name: 'keyValueCache',
            key: 'key',
        }, function (db) {
            resolve(db);
        })
    }).catch(function (reason) {
        console.log('Failed: ' + reason);
    }).finally(function () {
    });

}
