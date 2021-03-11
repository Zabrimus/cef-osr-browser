import { keyEventInit } from "./keyevent-init.js";
import { hbbtvFn } from "./hbbtv.js";
import { VideoHandler } from "./hbb-video-handler.js";

function init() {
    window._HBBTV_DEBUG_ && console.log("hbbtv-polyfill: load");

    // convenience method: Javascript to VDR wrapper method, one-way
    window.signalCef = function(command) {
        window.cefQuery({
            request: command,
            persistent: false,
            onSuccess: function(response) {},
            onFailure: function(error_code, error_message) {}
        });
    };

    window.signalVdr = function(command) {
        signalCef('VDR:' + command);
    };

    window.cefChangeUrl = function(uri) {
        signalCef('CHANGE_URL: ' + uri);
    }

    window.cefStopVideo = function() {
        var videoplayer = document.getElementById("hbbtv-polyfill-video-player");
        if (typeof videoplayer !== 'undefined' && videoplayer !== null) {
            videoplayer.stop();
        }
    }

    window.cefVideoSize = function() {
        var video = document.getElementById("video");
        var videoplayer = document.getElementById("hbbtv-polyfill-video-player");
        var playerobject = document.getElementById("playerObject");
        var videocontainer = document.getElementById("videocontainer");

        // calculate size only if a broadcast player exists, otherwise set video to fullscreen
        var isBroadcast = false;
        if (videocontainer !== null && typeof videocontainer !== 'undefined') {
            var containerChilds = videocontainer.childNodes;
            for (var i = 0; i < containerChilds.length; i++) {
                if (containerChilds[i].tagName === 'object' && containerChilds[i].getAttribute('type') === 'video/broadcast') {
                    isBroadcast = true;
                }
            }
        }

        if (video !== null && typeof video !== 'undefined' && videoplayer !== null && typeof videoplayer !== 'undefined') {
            // copy size attributes from videocontainer to video
            videoplayer.style.width = video.style.width;
            videoplayer.style.height = video.style.height;
            videoplayer.style.left = video.style.left;
            videoplayer.style.top = video.style.top;
            videoplayer.style.position = video.style.position;
        }

        if (!isBroadcast) {
            // no video/broadcast => size is always fullscreen
            signalCef("VIDEO_SIZE: 1280,720,0,0");
            return;
        }

        var target = null;
        var position;
        var maxwidth = 0, maxheight = 0;

        // --------------------------------------------------
        // quirks:
        // ignore videocontainer on hbbtv.daserste.de
        // --------------------------------------------------
        /*
        if (document.location.href.search('hbbtv.daserste.de') > 0) {
            videocontainer = null;
        }
        */

        if (typeof video !== 'undefined' && video !== null) {
            position = video.getBoundingClientRect();
            if (position.width > 0 && position.height > 0) {
                target = video;
                maxwidth = position.width;
                maxheight = position.height;
            }

            // window._HBBTV_DEBUG_ && console.log("===> VIDEO: "+ position.width + "," + position.height + "," + position.x + "," + position.y);
        }

        if (typeof videocontainer !== 'undefined' && videocontainer !== null) {
            position = videocontainer.getBoundingClientRect();

            if (position.width > 0 && position.height > 0 && position.width >= maxwidth && position.height >= maxheight) {
                target = videocontainer;
                maxwidth = position.width;
                maxheight = position.height;
            }

            // window._HBBTV_DEBUG_ && console.log("===> VIDEOCONTAINER: "+ position.width + "," + position.height + "," + position.x + "," + position.y);
        }

        if (typeof videoplayer !== 'undefined' && videoplayer !== null) {
            position = videoplayer.getBoundingClientRect();

            if (position.width === 0 && position.height === 0) {
                // use parent element
                videoplayer = videoplayer.parentElement;
                position = videoplayer.getBoundingClientRect();
            }

            if (position.width > 0 && position.height > 0 && position.width >= maxwidth && position.height >= maxheight) {
                target = videoplayer;
                maxwidth = position.width;
                maxheight = position.height;
            }

            // window._HBBTV_DEBUG_ && console.log("===> VIDEOPLAYER: "+ position.width + "," + position.height + "," + position.x + "," + position.y);
        }

        if (typeof playerobject !== 'undefined' && playerobject !== null) {
            position = playerobject.getBoundingClientRect();

            if (position.width > 0 && position.height > 0 && position.width >= maxwidth && position.height >= maxheight) {
                target = playerobject;
            }

            // window._HBBTV_DEBUG_ && console.log("===> PLAYEROBJECT: "+ position.width + "," + position.height + "," + position.x + "," + position.y);
        }

        if (target) {
            var position = target.getBoundingClientRect();
            var x = parseInt(position.x, 10);
            var y = parseInt(position.y, 10);
            var width = parseInt(position.width, 10);
            var height = parseInt(position.height, 10);

            // window._HBBTV_DEBUG_ && console.log("===> TARGET: "+ position.width + "," + position.height + "," + position.x + "," + position.y);

            // window.process_video_quirk(position, target);

            signalCef("VIDEO_SIZE: " + width + "," + height + "," + x + "," + y);
        } else {
            // no video tag found -> fullscreen
            signalCef("VIDEO_SIZE: 1280,720,0,0");
        }
    }

    // intercept XMLHttpRequest
    /* Enable/Disable if ajax module shall be used */
    if (location.href.search("hbbtv.swisstxt.ch") === -1) {
        let cefOldXHROpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            // do something with the method, url and etc.
            window._HBBTV_DEBUG_ && console.log("XMLHttpRequest.method: " + method);
            window._HBBTV_DEBUG_ && console.log("XMLHttpRequest.async: " + async);
            window._HBBTV_DEBUG_ && console.log("XMLHttpRequest.url: " + url);

            url = window.cefXmlHttpRequestQuirk(url);

            window._HBBTV_DEBUG_ && console.log("XMLHttpRequest.newurl: " + url);

            this.addEventListener('load', function () {
                // do something with the response text

                // disabled: Too much information
                // window._HBBTV_DEBUG_ && console.log('XMLHttpRequest: url ' + url + ', load: ' + this.responseText);
            });

            /*
            this.addEventListener('readystatechange', function (event) {
                if (this.readyState === 4) {
                    var res = event.target.responseText;
                    Object.defineProperty(this, 'response', {writable: true});
                    Object.defineProperty(this, 'responseText', {writable: true});

                    this.response = this.responseText = res.split("&#034;").join("\\\"");

                    console.log("Res = " + this.responseText);
                }
            });
            */

            // return cefOldXHROpen.call(this, method, url, async, user, password);
            return cefOldXHROpen.call(this, method, url, true, user, password);
        };
    }
    /* Enable/Disable if ajax module shall be used */

    // global helper namespace to simplify testing
    window.HBBTV_POLYFILL_NS = window.HBBTV_POLYFILL_NS || {
    };
    window.HBBTV_POLYFILL_NS = {
        ...window.HBBTV_POLYFILL_NS, ...{
            keysetSetValueCount: 0,
            streamEventListeners: [],
        }
    };
    window.HBBTV_POLYFILL_NS.currentChannel = window.HBBTV_POLYFILL_NS.currentChannel || {
        'TYPE_TV': 12,
        'channelType': 12,
        'sid': 1,
        'onid': 1,
        'tsid': 1,
        'name': 'test',
        'ccid': 'ccid:dvbt.0',
        'dsd': ''
    };

    keyEventInit();

    hbbtvFn();

    window.HBBTV_VIDEOHANDLER = new VideoHandler();
    window.HBBTV_VIDEOHANDLER.initialize();

    window._HBBTV_DEBUG_ && console.log("hbbtv-polyfill: loaded");
}

if (!document.body) {
    window._HBBTV_DEBUG_ && console.log("hbbtv-polyfill: add as event listener, DOMContentLoaded");
    document.addEventListener("DOMContentLoaded", init);
} else {
    window._HBBTV_DEBUG_ && console.log("hbbtv-polyfill: call init");
    init();
}
