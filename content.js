["DanmakuTver.js", "libs/danmaku.min.js"].forEach(inj => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = false;
    script.async = false;
    script.src = chrome.runtime.getURL(inj);
    (document.head || document.documentElement).appendChild(script);
})
