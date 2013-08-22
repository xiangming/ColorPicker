/*
* JavaScript Template v0.1
* Copyright 2013, Jason Xiang
* www.xiguabaobao.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 2013-8-7
*/


/* Table of Content
==================================================
	#Basic Scripts
	#Site Scripts 
	#Page Scripts */


/* #Basic Scripts
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
	//参数element：	需要添加新class的元素
	//参数value：	新的class名称
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


/* #Site Scripts
==================================================*/


/* #Page Scripts
==================================================*/
	//为li插入input元素并着色
    function colorElem(){
        var li = document.getElementsByTagName('li');
        for(var i = 16; i < li.length; i++) {
            var color = li[i].getAttribute('color').toUpperCase();
            li[i].innerHTML = "<input type='text' style='background-color: " + color + ";'/>";
        }
    }
    //为input添加事件
    function showCode(){
        var input = document.getElementsByTagName('input');
        for(var i = 16; i < input.length; i++) {
            input[i].onclick = function() {
                var elem = this;
                var color = elem.parentNode.getAttribute('color').toUpperCase();
                elem.setAttribute('value',color);
                elem.focus();
                elem.select();
            }
            input[i].onblur = function() {
            	var elem = this;//this不能直接传参
            	setTimeout(function(){resetElem(elem)},2000);
            }
        }
        for (var i = 0; i < 16; i++) {//前16个li特殊处理
        	input[i].onclick = function() {
        		this.focus();
        		this.select();
        	}
        };
    }
    addLoadEvent(colorElem);
    addLoadEvent(showCode);
    function resetElem(elem){
        elem.setAttribute('value','');
        elem.blur();
    }