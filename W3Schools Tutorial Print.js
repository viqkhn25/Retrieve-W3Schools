var a4Height = 1030;
/*
 * Jqeuryを読み込む
 * return 
 */
var loadJquery = function(){
/****************** Inject Jquery into Current Page ***********************/
    var script = document.createElement('script');
    script.setAttribute('src', "https://code.jquery.com/jquery-3.3.1.min.js");
    document.getElementsByTagName('head')[0].appendChild(script);
}

var removeAd = function() {
    $("[title='3rd party ad content']").parent().parent().parent().each(function() {
        $(this).prev().remove();
        $(this).remove();
    });
    $(".top").remove();
    $("#topnav").remove();
    $("#tryitLeaderboard").remove();
    $("#mainitLeaderboard").remove();
    $(".nextprev").remove();
    $("#footer").remove();
    $("#right").remove();
    $("iframe").remove();
    $("#belowtopnav").nextAll().remove();
    $("#sidenav").prevAll().remove();
    $("#belowtopnav").css("padding-top","0px").removeClass("w3-light-grey");

};

var r = function(obj) {
    $("#leftmenuinnerinner h2").each(function(index) {
        console.log("Iterator Over Category Index:" + index + " :" + $(this).text());
        
        if (index == targetHeadIndex) {
            $(this).text($(this).text() + "(" + index + ")");
            
            $(this).nextUntil("br").each(function(index) {
                //console.log("Iterator Over Index:" + index + " :" + $(this).text());

                if (index == obj) {
                    console.log("Start to get Page Index : " + index + "[" + $(this).text() + "]");
                    $(this).text($(this).text() + "(" + index + ")")

                    var ele = document.createElement("iframe");
                    ele.src = this.href;
                    $(ele).on('load', function(e) {
                        var iwin = e.target.contentWindow;
                        var idoc = e.target.contentDocument;
                        var con = idoc.getElementById("main");
                        if (con != null) {
                            var nodes = con.childNodes;

                            for (i = 0; i < nodes.length; i++) {
                                if (nodes[i].nodeType == 1) {
                                    $("#main").append(nodes[i]);
                                }
                            }
                        }
                        $(this).remove();
                    });
                    $("#belowtopnav").after(ele);
                    $("#mainitLeaderboard").remove();
                    $("#mainLeaderboard").remove();
                }
            });
        }
    });
};

/*
 * ①全ページ読み込み
 * intVal 第iページの実行遅延タイミング（ミリ秒単位）
 * startIndex 第iページの実行遅延タイミング（ミリ秒単位）
 * endIndex 第iページの実行遅延タイミング（ミリ秒単位）
 * return 
 */
var loadpage = function(intVal, startIndex, endIndex) {
    for (i = startIndex; i <= endIndex; i++) {
        setTimeout("r(" + i + ")", intVal * (i - startIndex));
        console.log("Setting Page Load After: " + intVal * (i - startIndex) / 1000 + "s");
    }
}

/* テーブルと前方に直近のH2をブロックに設定 */
var buildBlockIncludingH2 = function(selector) {

    $("#main").removeAttr("id").removeClass("l10").removeClass("m12").addClass("section");

    console.log("setting3 : 本文と前方に直近のH2をブロックに設定 Start")
    $(".section").children(selector).each(function() {

        var distanceToH1 = $(this).prevUntil("h1").length;
        var distanceToH2 = $(this).prevUntil("h2").length;
        var distanceToBlock = $(this).prevUntil("[title='pblock']").length;
        var distanceToExample = $(this).prevUntil(".w3-example").length;

        if(distanceToH1 < distanceToH2){
            return true;
        }

        console.log("distanceToH2 :" + distanceToH2);
        console.log("distanceToBlock :" + distanceToBlock);
        console.log("distanceToExample :" + distanceToExample);

        /* 遡って、H2要素が近かった場合 */
        if ((distanceToH2 < distanceToBlock) && (distanceToH2 < distanceToExample) && this.offsetHeight < a4Height) {
            var titleEle = $(this).prevAll("h2").first();
            if ((this.offsetTop + this.offsetHeight - titleEle.get(0).offsetTop) < a4Height) {
                titleEle.before("<div title='pblock' style = 'page-break-inside : avoid'/>");

                var parentNode = titleEle.prev();

                parentNode.nextUntil(selector).each(function() {
                    parentNode.append($(this).clone());
                    $(this).remove();
                });

                parentNode.append($(this).clone());
                $(this).remove();

            }
        }
        /* 遡って、Block要素が近かった場合 */
        if ((distanceToBlock < distanceToH2) && (distanceToBlock < distanceToExample) && this.offsetHeight < a4Height && distanceToBlock > 0) {
            var frontOne = $(this).prevUntil("[title='pblock']").last();
            if ((this.offsetTop + this.offsetHeight - frontOne.get(0).offsetTop) < a4Height) {
                frontOne.before("<div title='pblock' style = 'page-break-inside : avoid'/>");

                var parentNode = frontOne.prev();
                parentNode.nextUntil(selector).each(function() {
                    parentNode.append($(this).clone());
                    $(this).remove();
                });

                parentNode.append($(this).clone());
                $(this).remove();
            }
        }
        
        /* 遡って、直前がBlock要素の場合 */
        if(this.offsetHeight < a4Height && distanceToBlock === 0){
            var prevE = $(this).prev();
            if((this.offsetTop + this.offsetHeight - prevE.get(0).offsetTop) < a4Height){
                prevE.append($(this).clone());
                $(this).remove();
            }
        }
    });
    console.log("setting3 : 本文と前方に直近のH2をブロックに設定 End")

}

/* ②ページブレイク設定など */
var trim_page = function() {

    console.log("Step3 : 画面上不要なもの削除 Start");

    $("hr").remove();
    $("#googleSearch").remove();
    $("#google_translate_element").remove();
    $("[style='overflow:auto;text-align:center']").remove();
    $("h2:contains(Test Yourself with Exercises)").nextUntil("br").remove();
    $("h2:contains(Test Yourself with Exercises)").remove();
    $("h2:contains(Diploma)").nextUntil("br").remove();
    $("h2:contains(Diploma)").remove();
    $("h2:contains(Related Pages)").nextUntil("br").remove();
    $("h2:contains(Related Pages)").remove();
    $("h3:contains(Result)").nextUntil("br").remove();
    $("h3:contains(Result)").remove();
    $("h3:contains(Quiz)").nextUntil("br").remove();
    $("h3:contains(Quiz)").remove();
    $("[title='jQuery Selectors']").parent().remove();
    $("[title='jQuery Event Methods']").parent().remove();
    $("[title='jQuery Event Methods']").parent().remove();
    $("[title='jQuery Effect Methods']").parent().remove();
    $("[title='jQuery HTML/CSS Methods']").parent().remove();
    $("[title='jQuery AJAX Methods']").parent().remove();
    $("[title='jQuery Misc Methods']").parent().remove();
    $("[title='jQuery Properties']").parent().remove();
    $(".w3-example a:contains(Yourself)").remove();
    $(".w3-container.w3-dark-grey.w3-padding").remove();
    $(".nextprev").remove();
    console.log("画面上不要なもの削除 End");

    console.log("基本ページトリム設定 Start")
    $("br:not(.w3-example br)").remove();
    $("p").css("margin-top", "1px").css("margin-bottom", "0px");
    console.log("Step3 : 基本ページトリム設定 End")

    console.log("テーブルヘッダ調整 Start")
    $("table").each(function(index){
        if($(this).find("thead").length === 0) {
            var theadE = document.createElement("thead");
            var firstTr = $(this).find("tr").first();
            $(theadE).append(firstTr.clone())
            $(this).append(theadE);
            firstTr.remove();
        }
    });
    console.log("テーブルヘッダ調整 End")
};

var paging = function() {
    var offsetTopAdjust = 0;
    $(".section").children().each(function(index) {
        if (this.nodeType == 1) {
            this.classList.remove("newPage");
            /*
            console.log("@" + i + ":" + this.tagName);
            console.log("Adjusted Top: " + (this.offsetTop + offsetTopAdjust));
            console.log("offsetTopAdjust:" + offsetTopAdjust);
            console.log("offsetHeight: " + this.offsetHeight);
            */

            if (((this.offsetTop + offsetTopAdjust) % a4Height + this.offsetHeight > a4Height && this.offsetHeight < a4Height) || this.tagName == "H1") {
                offsetTopAdjust += (a4Height - (this.offsetTop + offsetTopAdjust) % a4Height);
                this.classList.add("newPage");
                /*
                console.log("offsetTopAdjust After Paging:" + offsetTopAdjust);
                console.log("Original Top: " + this.offsetTop);
                console.log("Adjusted Top After Paging: " + this.offsetTop + offsetTopAdjust);
                */
                //console.log("InnerText: "  + this.innerText);
            }
        }
    });
}

/*
 * 実行
 */
var exec = function (){
    loadJquery();
    setTimeout("removeAd()", 2000);
    setTimeout("loadpage(pageLoadingIntval, startPageIndex, endPageIndex)", 3000);;
    setTimeout("trim_page()", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 5000);
    setTimeout("buildBlockIncludingH2('table')", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 7000);
    setTimeout("buildBlockIncludingH2('.w3-example')", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 8000);
    setTimeout("buildBlockIncludingH2('.w3-panel.w3-note')", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 9000);
    setTimeout("buildBlockIncludingH2('ul')", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 10000);
    setTimeout("paging()", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 11000);
}

var targetHeadIndex = 0;
var startPageIndex = 1;
var endPageIndex = 5;
var pageLoadingIntval = 8000;
exec();
