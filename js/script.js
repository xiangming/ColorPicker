/*
* JavaScript Template v0.1
* Copyright 2013, Jason Xiang
* www.xiguabaobao.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 2013-9-9
*/


/* Table of Content
==================================================
	#Basic Scripts
	#Site Scripts 
	#Page Scripts */


/* #Basic Scripts（当使用jQuery时，为避免冲突，请删除或者注释此部分。）
==================================================*/
	//将一个或多个函数绑定到window.onload事件
	//参数func：函数名(不含括号)
	function addLoadEvent(func){
		var oldonload = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = func;
		} else {
			window.onload = function(){
				oldonload();
				func();
			}
		}
	}
	//为DOM增加insertAfter方法
	//参数newElement：	 将要插入的元素
	//参数targetElement：目标元素
	function insertAfter(newElement, targetElement) {
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement) {
			parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	}
	//给一个元素追加新的class
	//参数element：	需要添加新class的元素，对象引用
	//参数value：	新的class名称，字符串
	function addClass(element,value) {
		if(!element.className) {
			element.className = value;
		} else {
			newClassName = element.className;
			newClassName += " ";
			newClassName += value;
			element.className = newClassName;
		}
	}
    //给js增加类似jQuery的选择器$
    //参数s：类似jQuery的选择匹配符#.*
    function $(s){
        if (s.indexOf('#') != -1) {
            s = s.replace('#','');
            return document.getElementById(s);//id选择器
        };
        if (s.indexOf('.') != -1) {
            s = s.replace('.','');
            return document.getElementsByClassName(s);//class选择器
        };
        return document.getElementsByTagName(s);//tag选择器和*选择器
    }
    

/* #Site Scripts
==================================================*/


/* #Page Scripts
==================================================*/
	//根据li的color生成彩色块
    function colorElem(){
        var li = $('li');
        if (li.length == 0) return false;
        for(var i = 0; i < li.length; i++) {
            var color = li[i].getAttribute('color')?li[i].getAttribute('color').toUpperCase():li[i].getAttribute('color');
            li[i].innerHTML = "<input type='text' style='background-color: " + color + ";'/>";
        }
    }

    //点击彩色块显示颜色code
    function showCode(){
        var input = $('input');
        if (input.length == 0) return false;
        for(var i = 0; i < input.length; i++) {
            input[i].onclick = function() {
                var elem = this;
                var color = elem.parentNode.getAttribute('color')?elem.parentNode.getAttribute('color').toUpperCase():elem.parentNode.getAttribute('color');
                elem.setAttribute('value',color);
                elem.focus();
                elem.select();
            }
            input[i].onblur = function() {
            	var elem = this;//this不能直接传参
            	setTimeout(function(){resetElem(elem)},2000);//2000毫秒后清除code
            }
        }
    }
    
    //页面load后执行
    addLoadEvent(colorElem);
    addLoadEvent(showCode);
    
    //清空元素上的内容
    function resetElem(elem){
        elem.setAttribute('value','');
        elem.blur();
    }
