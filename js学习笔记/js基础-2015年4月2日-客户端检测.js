(function () {
    /*
        能力检测

        能力检测的目的不是识别特定的浏览器，而是识别浏览器的能力。
    */

    //检测某个对象的某个特性是否存在

    function example(object, property) {
        var t = typeof object[property];

        return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
    }


    //客户端检测的完整代码

    var client = function () {

        //呈现引擎
        var engine = {
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,

            //完整的版本号
            ver: null
        };

        //浏览器
        var browser = {
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,

            //具体的版本号
            ver: null
        };

        //检测呈现引擎和浏览器
        var ua = navigator.userAgent;
        if (window.opera) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            engine.ver = RegExp["$1"];
            engine.webkit = parseFloat(engine.ver);

            //确认是chrome 还是 safari
            if (/Chrome\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Version\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.safari = parseFloat(browser.ver);
            } else {
                //近似的确定版本号
                var safariVersion = 1;
                if (engine.webkit < 100) {
                    safariVersion = 1;
                } else if (engine.webkit < 312) {
                    safariVersion = 1.2;
                } else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }
            }

            browser.safari = browser.ver = safariVersion;
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            engine.ver = RegExp['$1'];
            engine.gecko = parseFloat(engine.ver);

            //确定是不是firefox
            if (/Firefox\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.firefox = parseFloat(browser.ver);
            }
        } else if (/MSIE ([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }

        browser.ie = engine.ie;
        browser.opera = engine.opera;

        return {
            engine: engine,
            browser: browser
        };
    }

})();