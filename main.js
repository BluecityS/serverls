var api = "https://www.fly3949.com/";

$(document).ready(function () {
    $(".loading").hide();
    getAchives();
    gethitokoto();
});

$('.menu a').click(function () {
    target = $(this).attr('goto');
    switchTo(target);
});

function switchTo(target) {
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getAchives() {
    t = ``;
    $.ajax({
        type: "GET",
        url: api + "wp-json/wp/v2/posts?per_page=10&page=1",
        dataType: "json",
        success: function (json) {
            for (var i = 0; i < json.length; i++) {
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        }
    })
}

function gethitokoto() {
    $.ajax({
        url: "https://api.lwl12.com/hitokoto/v1?encode=json",
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        jsonpCallback: "echokoto",
        success: function (result) {
            write(result.hitokoto);
        },
        error: function () {
            write("Error...");
        }
    });
}

function write(text) {
    if (text.length < 30) {
        $('#hitokoto').html(text);
    } else {
        gethitokoto();
    }
}

// 瀵笵ate鐨勬墿灞曪紝灏� Date 杞寲涓烘寚瀹氭牸寮忕殑String
// 鏈�(M)銆佹棩(d)銆佸皬鏃�(h)銆佸垎(m)銆佺(s)銆佸搴�(q) 鍙互鐢� 1-2 涓崰浣嶇锛� 
// 骞�(y)鍙互鐢� 1-4 涓崰浣嶇锛屾绉�(S)鍙兘鐢� 1 涓崰浣嶇(鏄� 1-3 浣嶇殑鏁板瓧) 
// 渚嬪瓙锛� 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //鏈堜唤 
        "d+": this.getDate(), //鏃� 
        "h+": this.getHours(), //灏忔椂 
        "m+": this.getMinutes(), //鍒� 
        "s+": this.getSeconds(), //绉� 
        "q+": Math.floor((this.getMonth() + 3) / 3), //瀛ｅ害 
        "S": this.getMilliseconds() //姣 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}