// 第一級主題
var firstLevelElements = [];
firstLevelElements[0] = null;
// 第二級主題
var subtitlesElmentArray = [];
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

var r = function(obj) {
    $("#leftmenuinnerinner h2").each(function(index) {
        
        // 対象章のみを処理対象にする
        if (index == targetHeadIndex) {

            // 章タイトルから<br>まですべてのタイトル
            $(this).nextUntil("br").each(function(index) {
                //console.log("Iterator Over Index:" + index + " :" + $(this).text());

                // 対象節のみを処理対象にする
                if (index == obj) {
                    console.log("Start to get Page Index : " + index + "[" + $(this).text() + "]");
                    $(this).text($(this).text() + "(" + index + ")");

                    firstLevelElements.push(this);
                    subtitlesElmentArray[obj] = [];

                    var ele = document.createElement("iframe");
                    ele.src = this.href;
                    $(ele).on('load', function(e) {
                        var iwin = e.target.contentWindow;
                        var idoc = e.target.contentDocument;

                        var tables = idoc.querySelectorAll("table.w3-table-all.notranslate");

                        for (var ti=0; ti < tables.length; ti++){
                            var table = tables[ti];
                            var subtitles = tables[ti].querySelectorAll("td:nth-child(1) a");
                            for (var si=0; si < subtitles.length; si++) {
                                subtitlesElmentArray[obj].push(subtitles[si]);
                            }
                        }
                    });
                    $("#belowtopnav").after(ele);
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

/*
 * ②サブページ組み込み
 * return 
 */
var embedSubMenu = function() {
    for (var i=0; i < firstLevelElements.length; i++) {
        var firstLevelTitleE = firstLevelElements[i];
        var secondeLevelTitles = subtitlesElmentArray[i];

        if (subtitlesElmentArray[i] != undefined) {
	        var currentElement = firstLevelElements[i];
	        for (var j=0; j < secondeLevelTitles.length; j++) {
	            $(secondeLevelTitles[j]).insertAfter(currentElement);
	            currentElement = secondeLevelTitles[j];
	        }
        }
    }
}

/*
 * 実行
 */
var exec = function (){
    loadJquery();
    setTimeout("loadpage(pageLoadingIntval, startPageIndex, endPageIndex)", 2000);;
    setTimeout("embedSubMenu()", (endPageIndex - startPageIndex + 1) * pageLoadingIntval + 2000);
}


var targetHeadIndex = 7;
// 対象開始主題（第一級）
var startPageIndex = 1;
// 対象終了主題（第一級）
var endPageIndex = 8;
// ページ処理時間（ミリ秒単位）
var pageLoadingIntval = 7000;

exec();