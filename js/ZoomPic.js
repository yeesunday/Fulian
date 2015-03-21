function ZoomPic ()
{
    this.initialize.apply(this, arguments)
}
ZoomPic.prototype =
{
    initialize : function (id,childcount)
    {
        var _this = this;
        var str="";
        this.wrap = typeof id === "string" ? document.getElementById(id) : id;
        for(var j=0;j<childcount;j++){
            str+="<li data-index=\""+j+"\"><div class=\"vessel\" ></div></li>";
        }
        $(this.wrap).find("ul").html(str);
        this.oUl = this.wrap.getElementsByTagName("ul")[0];
        this.aLi = this.wrap.getElementsByTagName("li");
        this.prev = this.wrap.getElementsByTagName("pre")[0];
        this.next = this.wrap.getElementsByTagName("pre")[1];
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
        this.aSort.unshift(this.aSort.pop());
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
        this.aSort.unshift(this.aSort.pop());
        this.setUp()
    },
    doNext : function ()
    {
        this.aSort.push(this.aSort.shift());
        this.setUp()
    },
    doImgClick : function ()
    {
        var _this = this;
        for (var i = 0; i < this.aSort.length; i++)
        {
            this.aSort[i].onclick = function ()
            {
                if (this.index > _this.iCenter)
                {
                    for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
                    _this.setUp();
                }
                else if(this.index < _this.iCenter)
                {
                    for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
                    _this.setUp();
                }
            }
        }
        $(this.wrap).on("mouseenter","li[data-index]",function(){
            if(this.timer){
                return;
            }
            var cur={
                width: $(this).css("width"),
                height: $(this).css("height"),
                left:$(this).css("left"),
                top:$(this).css("top")
            };
            $(this).data("original",cur);
            $(this).css("width",parseInt(cur.width)*1.08+"px");
            $(this).css("height",parseInt(cur.height)*1.08+"px");
            $(this).css({"width":parseInt(cur.width)*1.08+"px","height":parseInt(cur.height)*1.08+"px",left:parseInt(cur.left)-parseInt(cur.width)*0.04,top:parseInt(cur.top)-parseInt(cur.height)*0.04});
        });
        $(this.wrap).on("mouseleave","li[data-index]",function(){
            if(this.timer){
                return;
            }
            var org=$(this).data("original");
            if(org){
                $(this).css({"width":org.width,"height":org.height,"left":org.left,"top":org.top });
                $(this).data("original",null);
            }
        });
    },
    setUp : function ()
    {
        var _this = this;
        var i = 0;
        for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
        for (i = 0; i < this.aSort.length; i++)
        {
            this.aSort[i].index = i;
            if (i < 5)
            {
                this.css(this.aSort[i], "display", "block");
                var index= $(this.aSort[i]).data("index");
                if($(this.aSort[i]).find(".vessel").children().size()==0){
                    $(this.aSort[i]).find(".vessel").addClass("loading").load("src/zh/ppt/"+(index+1)+".html",null,function(response,status,xhr){
                        switch (status){
                            case "error":
                            case "timeout":
                            case "parsererror":
                                break;
                            default :
                                $(this).removeClass("loading");
                                break
                        }
                    });
                }

                var org=$(this.aSort[i]).data("original");
                if(org){
                    $(this.aSort[i]).css({"width":org.width,"height":org.height,"left":org.left,"top":org.top });
                    $(this.aSort[i]).data("original",null);
                }
                this.doMove(this.aSort[i], this.options[i], function ()
                {
                    _this.doMove($(_this.aSort[_this.iCenter]).find(".vessel")[0], {opacity:100}, function ()
                    {
                        _this.doMove($(_this.aSort[_this.iCenter]).find(".vessel")[0], {opacity:100}, function ()
                        {
                            _this.aSort[_this.iCenter].onmouseover = function ()
                            {
                                _this.doMove(this.getElementsByTagName("div")[0], {bottom:0})
                            };
                            _this.aSort[_this.iCenter].onmouseout = function ()
                            {
                                _this.doMove(this.getElementsByTagName("div")[0], {bottom:-100})
                            }
                        })
                    })
                });
            }
            else
            {
                this.css(this.aSort[i], "display", "none");
                this.css(this.aSort[i], "width", 0);
                this.css(this.aSort[i], "height", 0);
                this.css(this.aSort[i], "top", 37);
                this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
            }
            if (i < this.iCenter || i > this.iCenter)
            {
                this.css($(this.aSort[i]).find(".vessel")[0], "opacity", 100);
                this.aSort[i].onmouseover = function ()
                {
                    _this.doMove($(this).find(".vessel")[0], {opacity:100})
                };
                this.aSort[i].onmouseout = function ()
                {
                    _this.doMove($(this).find(".vessel")[0], {opacity:100})
                };
                this.aSort[i].onmouseout();
            }
            else
            {
                this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
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
            switch (attr)
            {
                case "width":
                case "height":
                case "top":
                case "left":
                case "bottom":
                    oElement.style[attr] = value + "px";
                    break;
                case "opacity" :
                    $(oElement).css({'opacity': value / 100});
                    break;
                default :
                    oElement.style[attr] = value;
                    break
            }
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
                property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
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