function ZoomPic ()
{
    this.initialize.apply(this, arguments)
}
ZoomPic.prototype =
{
    initThumbnails:function(childcount){
        this.tbList = new ThumbnailsList(1,childcount);
    },
    initialize : function (id,childcount)
    {
        var _this = this;
        var str="";
        this.initThumbnails(childcount);
        this.wrap = typeof id === "string" ? document.getElementById(id) : id;
        this.data=[];
        for(var j=0;j<childcount;j++){
            var obj={
              pageIndex:j
            };
            this.data.push(obj);
        }
        for(var k=0;k<5;k++){
            str+="<li data-flag="+k+"><img /></li>";
        }
        $(this.wrap).find("ul").html(str);
        this.oUl = $(this.wrap).find("ul")[0];
        this.aLi = $(this.wrap).find("li");
        this.prev =$(this.wrap).find("pre")[0];
        this.next =$(this.wrap).find("pre")[1];
        this.timer = null;
        this.aSort = [];
        this.iCenter = 2;
        this._doPrev = function () {return _this.doPrev.apply(_this)};
        this._doNext = function () {return _this.doNext.apply(_this)};
        this.options = [
            {width:267, height:398, top:60, left:0, zIndex:1},
            {width:318, height:474, top:30, left:130, zIndex:2},
            {width:370, height:550, top:0, left:330, zIndex:3},
            {width:318, height:474, top:30, left:582, zIndex:2},
            {width:267, height:398, top:75, left:774, zIndex:1}
        ];
        for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
        this.data.unshift(this.data.pop());
        this.setUp();
        this.addEvent(this.prev, "click", this._doPrev);
        this.addEvent(this.next, "click", this._doNext);
        this.doImgClick();
        this.timer = setInterval(function ()
        {
            _this.doNext()
        }, 3000);
        this.wrap.onmouseover = function ()
        {
            clearInterval(_this.timer)
        };
        this.wrap.onmouseout = function ()
        {
            _this.timer = setInterval(function ()
            {
                _this.doNext()
            }, 3000);
        }
    },
    doPrev : function ()
    {
        this.data.unshift(this.data.pop());
        this.setUp()
    },
    doNext : function ()
    {
        this.data.push(this.data.shift());
        this.setUp()
    },
    doImgClick : function ()
    {
        var _this = this;
        for (var i = 0; i < this.aSort.length; i++)
        {
            this.aSort[i].onclick = function ()
            {
                if($(this).data("scaleflag")){
                    $(this).data("scaleflag",false);
                }
                var index= $(this).data("data").index;
                if (index > _this.iCenter)
                {
                    for (var i = 0; i < index - _this.iCenter; i++) _this.data.push(_this.data.shift());
                    _this.setUp();
                }
                else if(index < _this.iCenter)
                {
                    for (var i = 0; i < _this.iCenter -index; i++) _this.data.unshift(_this.data.pop());
                    _this.setUp();
                }
            }
        }
        $(this.wrap).on("mouseenter","li img",function(){
            var parent=$(this).parent("li");
            parent.data("scaleflag",true);
            if(parent[0].timer){
                return;
            }
            $(this).stop().animate({
                "width":parent.width()*1.08,
                "height":parent.height()*1.08,
                "margin-top":-parent.height()*0.04
            },250);
        });
        $(this.wrap).on("mouseleave","li img",function(){
            var parent=$(this).parent("li");
            if(parent.data("scaleflag")){
                parent.data("scaleflag",false);
            }else{
                return;
            }
            if(parent[0].timer){
                return;
            }
            $(this).stop().animate({"width":parent.width(),"height":parent.height(), "margin-top":0},250,function(){
                $(this).attr("style","");
            });
            //$(this).animate({"width":"100%","height":"100%" },250);
        });
    },
    hideItem:function(el){
        this.css(el, "display", "none");
        this.css(el, "width", 0);
        this.css(el, "height", 0);
        this.css(el, "top", 70);
        this.css(el, "left", this.oUl.offsetWidth / 2);
    },
    setUp : function ()
    {
        var _this = this;
        var i = 0;
        //for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
        var unVisibleItems=[];
        var goIngVisibleItems=[];
        var aSortData=[];
        for(var j=0;j<5;j++){
            var da=$(this.aSort[j]).data("data");
            if(da){
                var flag=false;
                for(var s=0;s<5;s++){
                    if(da.pageIndex==this.data[s].pageIndex){
                        flag=true;
                        break;
                    }
                }
                if(flag){
                    aSortData.push({da:da,aSortIndex:j});
                }else{
                    this.hideItem(this.aSort[j]);
                    unVisibleItems.push(this.aSort[j]);
                    $(this.aSort[j]).data("data",null);
                }
            }else{
                unVisibleItems.push(this.aSort[j]);
            }
        }
        for(i=0;i<5;i++){
            flag=false;
            for( j=0;j<aSortData.length;j++){
                if( aSortData[j].da.pageIndex==this.data[i].pageIndex){
                    flag=true;
                    break;
                }
            }
            if(!flag){
                var item=unVisibleItems.shift();
                goIngVisibleItems.push(item);
                $(item).data("data",this.data[i]);
            }else{
                goIngVisibleItems.push(this.aSort[aSortData[j].aSortIndex]);
            }
        }
        for (i = 0; i < this.data.length; i++)
        {
            this.data[i].index=i;
            if (i < 5)
            {

                this.css(goIngVisibleItems[i], "display", "block");
                var index= this.data[i].pageIndex;
                var image=$(goIngVisibleItems[i]).find("img")[0];
                var src=decodeURIComponent("src/zh/ppt/幻灯片"+(index+1)+".JPG");
                if(!image.src||image.src.indexOf(src)){
                    $(goIngVisibleItems[i]).addClass(".loading");
                    image.onload=function(){
                        $(this).closest(".loading").removeClass(".loading");
                    };
                    image.src=src;
                }
                $(image).stop().removeAttr("style");
                this.doMove(goIngVisibleItems[i], this.options[i], function ()
                {
                    _this.doMove($(goIngVisibleItems[_this.iCenter]).find("img")[0], {opacity:1}, function ()
                    {
                        _this.doMove($(goIngVisibleItems[_this.iCenter]).find("img")[0], {opacity:1}, function ()
                        {
                            /* _this.aSort[_this.iCenter].onmouseover = function ()
                             {
                             _this.doMove(this.getElementsByTagName("div")[0], {bottom:0})
                             };
                             _this.aSort[_this.iCenter].onmouseout = function ()
                             {
                             _this.doMove(this.getElementsByTagName("div")[0], {bottom:-100})
                             }*/
                        })
                    })
                });
                if (i < this.iCenter || i > this.iCenter)
                {
                    this.css($(goIngVisibleItems[i]).find("img")[0], "opacity", 1);
                    goIngVisibleItems[i].onmouseover = function ()
                    {
                        _this.doMove($(this).find("img")[0], {opacity:1})
                    };
                    goIngVisibleItems[i].onmouseout = function ()
                    {
                        _this.doMove($(this).find("img")[0], {opacity:1})
                    };
                    goIngVisibleItems[i].onmouseout();
                }
                else
                {
                    goIngVisibleItems[i].onmouseover = this.aSort[i].onmouseout = null
                }
            }
        }
    },
    addEvent : function (oElement, sEventType, fnHandler)
    {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    css : function (oElement, attr, value)
    {
        if (arguments.length == 2)
        {
            return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
        }
        else if (arguments.length == 3)
        {
            $(oElement).css(attr,value);
        }
    },
    goPage:function(pagenumber){
        var $el=$(this.wrap).find("li[data-index="+(pagenumber-1)+"]");
        if($el.length>0){
            var el=$el[0];
            if (el.index > this.iCenter)
            {
                for (var i = 0; i < el.index - this.iCenter; i++) this.aSort.push(this.aSort.shift());
                this.setUp();
            }
            else if(el.index < this.iCenter)
            {
                for (var i = 0; i < this.iCenter - el.index; i++) this.aSort.unshift(this.aSort.pop());
                this.setUp();
            }
        }
    },
    doMove : function (oElement, oAttr, fnCallBack)
    {
        var _this = this;
        clearInterval(oElement.timer);
        oElement.timer = setInterval(function ()
        {
            var bStop = true;
            for (var property in oAttr)
            {
                var iCur = parseFloat(_this.css(oElement, property));
                property == "opacity" && (iCur = parseInt(iCur.toFixed(2)));
                var iSpeed = (oAttr[property] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (iCur != oAttr[property])
                {
                    bStop = false;
                    _this.css(oElement, property, iCur + iSpeed)
                }
            }
            if (bStop)
            {
                clearInterval(oElement.timer);
                oElement.timer=null;
                fnCallBack && fnCallBack.apply(_this, arguments)
            }
        }, 30)
    }
};
window.onload = function ()
{
    zoomPic= new ZoomPic("Index_Box",15);
};
function ThumbnailsList(itemnumber,totalNumber){
    this.totalCount=totalNumber;
    this.pagenumber=itemnumber;
    this.pageCount=9;
    this.itemWidh=106;
    this.$con=$("#tbn");
    this.$ul=this.$con.find("ul");
    this.$next= this.$con.find(".button-next");
    this.$previous= this.$con.find(".button-previous");
    this.currentIndex=Math.floor(this.pagenumber/this.pageCount);
    this.lastIndex=Math.floor(this.totalCount/this.pageCount);
    this.initEvent();
    this.$ul.width(this.itemWidh*18);
    var $liList=this.$ul.find("img:lt(9)");
    this.isOnRight=true;
    for(var j=this.pagenumber;j<(this.pagenumber+9);j++){
        var img=$liList[j-1];
        img.src='src/zh/ppt/幻灯片'+j+'.JPG';
        img.onload=function(){
          $(this).parent("li").removeClass("loading");
        };
    }
}
ThumbnailsList.prototype={
    initEvent:function(){
        var _this=this;
        this.$next.on("click",function(){
            _this.next();
        });
        this.$previous.on("click",function(){
            _this.previous();
        });
    },
    next:function(){
        if(this.currentIndex==this.lastIndex){
            alert("已经是最后一页啦");
            return;
        }
        if(this.$ul.is(":animated")){
            return;
        }
        var _this=this;
        var $lis;
        if(this.isOnRight){
            $lis=this.$ul.find("li:gt(8)");
        }else{
            $lis=this.$ul.find("li:lt(9)");
            for(var i=0;i<9;i++){
                this.$ul.append($lis[i]);
            }
        }
        this.$ul.css("left",0);
        this.isOnRight=false;
        this.$ul.animate({
            left:-this.pageCount*this.itemWidh
        },1000,function(){
            _this.currentIndex++;
        });
        var startPage=(_this.currentIndex+1)*this.pageCount;
        for(var j=startPage;j<startPage+9;j++){
            var img=$lis.eq(j-startPage).find("img")[0];
            img.src="";
            img.src='src/zh/ppt/幻灯片'+(j+1)+'.JPG';
            $(img).parent("li").addClass("loading");
            img.onload=function(){
                $(this).parent("li").removeClass("loading");
            };
        }
    },
    previous:function(){
        if(this.currentIndex==0){
            alert("当前已经是第一页啦");
            return;
        }
        if(this.$ul.is(":animated")){
            return;
        }
        var _this=this;
        var $lis;
        if(this.isOnRight){
            $lis=this.$ul.find("li:gt(8)");
            for(var i=0;i<9;i++){
                this.$ul.prepend($lis[i]);
            }
        }else{
            $lis=this.$ul.find("li:lt(9)");
        }
        this.$ul.css("left",-this.pageCount*this.itemWidh);
        this.isOnRight=true;
        this.$ul.animate({
            left:0
        },1000,function(){
            _this.currentIndex--;
        });
        var startPage=(_this.currentIndex-1)*this.pageCount;
        for(var j=startPage;j<startPage+9;j++){
            var img=$lis.eq(j-startPage).find("img")[0];
            img.src="";
            img.src='src/zh/ppt/幻灯片'+(j+1)+'.JPG';
            $(img).parent("li").addClass("loading");
            img.onload=function(){
                $(this).parent("li").removeClass("loading");
            };
        }




    }
};