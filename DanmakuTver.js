(async () => {
    const testURL = getResourceURL("/test.json")
    await waitVidPlay()
    const comments = await fetch(testURL).then(r => r.json())
    window.td = new Danmaku({
        container: document.querySelector(".player_container__768VH"),
        media: document.querySelector("video-js video"),
        comments: comments
    });
    addElements()
})()

function waitVidPlay(){
    return new Promise((resolve, reject) => {
        setInterval(()=>{
            if(
                document.querySelector("video-js") &&
                document.querySelector(".controller_spacer__w_0YX") &&
                Array.from(document.querySelector("video-js").classList).includes("vjs-playing")
            ){
                resolve();
            }
        },120)
    })
}

function getResourceURL(path){
    let orig = window.orig ? window.orig : (new URL(document.currentScript.src)).origin
    window.orig = orig
    return orig + path
}

function addElements(){
    document.querySelector(".controller_spacer__w_0YX").insertAdjacentHTML("afterend", `<div id="toggleComment" class="tooltip_container__YBRR6"><button type="button" class="button_button__GOl5m"><img width="40" height="40" src="${getResourceURL('/images/comments-on.svg')}" alt="1.0"></button><div class="tooltip_tooltip__XifNz tooltip_middle__QOno_">コメントをオフ</div></div>`)
    window.isCommentOn = true
    document.querySelector("#toggleComment button").addEventListener("click", toggleComment)

    document.querySelector(".series-player-layout_body__9k3c5").insertAdjacentHTML("afterbegin", `
        <form id="composeComment" class="titles_container__xoZSV">
            <input name="text" type="text"/>
            <select id="color">
                <option value="#000000">黒</option>
                <option value="#ffffff">白</option>
                <option value="#0000ff">青</option>
                <option value="#006400">緑</option>
                <option value="#ff0000">赤</option>
            </select>
            <input type="submit"/>
        </form>
    `)
    document.querySelector("#composeComment").addEventListener("submit", composeComment)
}

function toggleComment(){
    document.querySelector("#toggleComment div").innerText = window.isCommentOn ? "コメントをオフ" : "コメントをオン"
    document.querySelector("#toggleComment img").src = window.isCommentOn ? getResourceURL('/images/comments-off.svg') : getResourceURL('/images/comments-on.svg')
    window.isCommentOn ? window.td.hide() : window.td.show()
    window.isCommentOn = window.isCommentOn ? false : true
}

function composeComment(e){
    e.preventDefault()
    let comment = {
        text: document.querySelector("#composeComment #text").value,
        style: {
            fontSize: '25px',
            color: document.querySelector("#composeComment #color").value
        }
    }
    window.td.emit(comment)
}
