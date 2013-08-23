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
	//为li插入input元素并着色
    function colorElem(){
        var li = $('li');
        for(var i = 16; i < li.length; i++) {
            var color = li[i].getAttribute('color').toUpperCase();
            li[i].innerHTML = "<input type='text' style='background-color: " + color + ";'/>";
        }
    }
    //为input添加事件
    function showCode(){
        var input = $('input');
        for(var i = 17; i < input.length; i++) {
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
        for (var i = 1; i < 17; i++) {//HTML4的16个li特殊处理
        	input[i].onclick = function() {
        		this.focus();
        		this.select();
        	}
        };
    }
    addLoadEvent(colorElem);
    addLoadEvent(showCode);
    //清空元素上的内容
    function resetElem(elem){
        elem.setAttribute('value','');
        elem.blur();
    }

    //color picker主函数
    function colorPicker() {
        var toggle = $('#toggle');
    	var cp = $('#colorpicker');
        
        slideUp(cp);

        toggle.onclick = function() {
            if (cp.style.display == 'none') {
                slideDown(cp);
            }else{
                slideUp(cp);
            }
        }
        //取色器
        var hex = $('#hex');
    	hex.onkeyup = function() {
    		setTimeout(function() {
                var data = hex.value;
                
                if (data.indexOf('#') != -1) data = data.replace('#','');//如果有，就去掉#

                if (data.length == 0) hex.parentNode.style.backgroundColor = '#DDD';
                if (data.length == 1) data = data + data + data + data + data + data;
                if (data.length == 2) data = data + data + data;

                data = '#' + data;
                hex.parentNode.style.backgroundColor = data;
            }, 10)	
    	}
    }
    addLoadEvent(colorPicker);

    function slideDown(e) {
        var h = e.offsetHeight;
        var t = setInterval(function(){
            h++;
            if (h >= 150) {
                e.style.height = '150px';
                clearInterval(t);
            }else{
                e.style.display = 'block';
                e.style.height = h + 'px';
            }
        },1);
    }
    function slideUp(e) {
        var h = e.offsetHeight;
        var t = setInterval(function(){
            h--;
            if (h <= -20) {
                e.style.display = 'none';
                clearInterval(t);
            }else if (h < 0 && h > -20) {
                e.style.height = '0px';//IE兼容
            }else{
                e.style.height = h + 'px';
            }  
        },1);    
    }