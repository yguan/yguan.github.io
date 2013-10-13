/**
 * fullPage 1.0
 * https://github.com/alvarotrigo/fullPage.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */

(function(e){e.fn.fullpage=function(t){function h(){return function(n){if(t.autoScrolling){n=window.event||n;var r=Math.max(-1,Math.min(1,n.wheelDelta||-n.detail));if(!s){var i=e(".section.active").find(".scrollable");if(r<0)if(i.length>0){if(!E("bottom",i))return!0;e.fn.fullpage.moveSlideDown()}else e.fn.fullpage.moveSlideDown();else if(i.length>0){if(!E("top",i))return!0;e.fn.fullpage.moveSlideUp()}else e.fn.fullpage.moveSlideUp()}return!1}}}function p(n){var r={},i,u=n.position(),a=u!==null?u.top:null;s=!0,typeof n.data("anchor")!="undefined"?location.hash=n.data("anchor"):location.hash="",t.autoScrolling?(r.top=-a,i="#superContainer"):(r.scrollTop=a,i="html, body"),e(i).animate(r,t.scrollingSpeed,t.easing,function(){e.isFunction(t.afterLoad)&&t.afterLoad.call(this,f,n.index(".section")+1),setTimeout(function(){s=!1},700)});var f=n.attr("data-anchor");o=f,w(f),b(f),n.hasClass("slide")&&v(f)}function d(){var t=window.location.hash.replace("#","");if(t){var n=e('[data-anchor="'+t+'"]');n.addClass("active").siblings().removeClass("active"),p(n)}}function v(t){var r=e(".slide.active"),i=e(".slide[data-anchor="+t+"]"),s=i.position(),o=i.parent(".slidesContainer").parent();r.removeClass("active"),i.addClass("active"),o.animate({scrollLeft:s.left},500,function(){n=!0})}function g(){var n=e(window).width(),r=e(window).height();t.scrollOverflow&&e(".section").each(function(){e(this).find(".scrollable").css("height",r+"px").parent().css("height",r+"px")}),t.resize&&y(r,n),e(".section").each(function(){e(this).css("height",r+"px");var n=e(this).find(".slides");if(n.length>0){var i=n.find(".slide.active").position();n.animate({scrollLeft:i.left},t.scrollingSpeed)}});var i=e(".section.active").position();e("#superContainer").animate({top:-i.top},t.scrollingSpeed,t.easing)}function y(t,n){var r=825,i=t;if(t<825||n<900){n<900&&(i=n,r=900);var s=i*100/r,o=s.toFixed(2);e("body").css("font-size",o+"%")}else e("body").css("font-size","100%")}function b(n){t.navigation&&(e("#fullPage-nav").find(".active").removeClass("active"),e("#fullPage-nav").find('a[href="#'+n+'"]').addClass("active"))}function w(n){t.menu&&(e(t.menu).find(".active").removeClass("active"),e(t.menu).find('[data-menuanchor="'+n+'"]').addClass("active"))}function E(e,t){if(e==="top")return!t.scrollTop();if(e==="bottom")return t.scrollTop()+t.innerHeight()>=t[0].scrollHeight}t=e.extend({verticalCentered:!0,resize:!0,slidesColor:[],anchors:[],scrollingSpeed:700,easing:"easeInQuart",menu:!1,navigation:!1,navigationPosition:"right",navigationColor:"#000",controlArrowColor:"#fff",loopBottom:!1,loopTop:!1,autoScrolling:!0,scrollOverflow:!1,afterLoad:null,afterRender:null},t),e.fn.fullpage.setAutoScrolling=function(n){t.autoScrolling=n,t.autoScrolling?e("html, body").css({overflow:"hidden",height:"100%"}):(e("html, body").css({overflow:"auto",height:"auto"}),e("#superContainer").css("top","0px"))};var n=!0,r=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/),i=e(window).height(),s=!1,o;e.fn.fullpage.setAutoScrolling(t.autoScrolling),t.verticalCentered&&e(".section").addClass("table").wrapInner('<div class="tableCell" />'),e("body").wrapInner('<div id="superContainer" />');if(t.navigation){e("body").append('<div id="fullPage-nav"><ul></ul></div>');var u=e("#fullPage-nav");u.css("color",t.navigationColor),t.navigationPosition==="right"?u.css("right","17px"):u.css("left","17px")}e(".section").each(function(n){var r=e(this).find(".slide"),s=r.length;n||e(this).addClass("active"),e(this).css("height",i+"px"),typeof t.slidesColor[n]!="undefined"&&e(this).css("background-color",t.slidesColor[n]),typeof t.anchors[n]!="undefined"&&e(this).attr("data-anchor",t.anchors[n]),t.navigation&&e("#fullPage-nav").find("ul").append('<li><a href="#'+t.anchors[n]+'"><span></span></a></li>');if(s>0){var o=s*100,u=100/s;r.wrapAll('<div class="slidesContainer" />'),r.parent().wrap('<div class="slides" />'),e(this).find(".slidesContainer").css("width",o+"%"),e(this).find(".slides").after('<div class="controlArrow prev"></div><div class="controlArrow next"></div>'),e(".controlArrow.next").css("border-color","transparent transparent transparent "+t.controlArrowColor),e(".controlArrow.prev").css("border-color","transparent "+t.controlArrowColor+" transparent transparent"),r.each(function(t){t||e(this).addClass("active"),e(this).css("width",u+"%")})}}).promise().done(function(){e.isFunction(t.afterRender)&&t.afterRender.call(this),t.scrollOverflow&&e(".section").each(function(){e(this).height()>i&&(t.verticalCentered?e(this).find(".tableCell").wrapInner('<div class="scrollable" />'):e(this).wrapInner('<div class="scrollable" />'),e(this).find(".scrollable").slimScroll({height:i+"px",size:"10px",alwaysVisible:!0}))}),d()}),e(window).scroll(function(n){if(t.menu&&!t.autoScrolling){var r=e(window).scrollTop(),i=e(".section").map(function(){if(e(this).offset().top<r+100)return e(this)}),s=i[i.length-1];e(".section.active").removeClass("active"),s.addClass("active");var o=s.attr("data-anchor");e.isFunction(t.afterLoad)&&t.afterLoad.call(this,o,s.index(".section")+1),w(o)}});var a=0,f=0,l=0;e(document).on("touchmove",function(n){if(t.autoScrolling&&r){n.preventDefault();var i=n.originalEvent;if(!s){var o=e(".section.active").find(".scrollable");f=i.touches[0].pageY,l=i.touches[0].pageX;if(a>f)if(o.length>0){if(!E("bottom",o))return!0;e.fn.fullpage.moveSlideDown()}else e.fn.fullpage.moveSlideDown();else if(o.length>0){if(!E("top",o))return!0;e.fn.fullpage.moveSlideUp()}else e.fn.fullpage.moveSlideUp()}}}),e(document).on("touchstart",function(e){if(t.autoScrolling&&r){var n=e.originalEvent;a=n.touches[0].pageY}});var c={};c=document,c.addEventListener?(c.addEventListener("mousewheel",h(),!1),c.addEventListener("DOMMouseScroll",h(),!1)):c.attachEvent("onmousewheel",h()),e.fn.fullpage.moveSlideUp=function(){var n=e(".section.active").prev(".section");t.loopTop&&!n.length&&(n=e(".section").last());if(n.length>0||!n.length&&t.loopTop)n.addClass("active").siblings().removeClass("active"),p(n)},e.fn.fullpage.moveSlideDown=function(){var n=e(".section.active").next(".section");t.loopBottom&&!n.length&&(n=e(".section").first());if(n.length>0||!n.length&&t.loopBottom)n.addClass("active").siblings().removeClass("active"),p(n)},e.fn.fullpage.moveToSlide=function(t){var n="";isNaN(t)?n=e('[data-anchor="'+t+'"]'):n=e(".section").eq(t-1),n.length>0&&(n.addClass("active").siblings().removeClass("active"),p(n))},e(window).on("hashchange",function(){var t=window.location.hash.replace("#","");if(t!==o){var n=e('[data-anchor="'+t+'"]');n.addClass("active").siblings().removeClass("active"),p(n)}}),e(document).keydown(function(t){if(!s)switch(t.which){case 38:case 33:e.fn.fullpage.moveSlideUp();break;case 40:case 34:e.fn.fullpage.moveSlideDown();break;case 37:e(".section.active").find(".controlArrow.prev").trigger("click");break;case 39:e(".section.active").find(".controlArrow.next").trigger("click");break;default:return}}),e(".section").on("click",".controlArrow",function(){if(!n)return;n=!1;var t=e(this).closest(".section").find(".slides"),r=t.find(".slidesContainer").parent(),i=t.find(".slide.active"),s=null,o=0;i.removeClass("active"),e(this).hasClass("prev")?s=i.prev(".slide"):s=i.next(".slide"),s.length>0?o=s.position():(e(this).hasClass("prev")?s=i.siblings(":last"):s=i.siblings(":first"),o=s.position()),r.animate({scrollLeft:o.left},500,function(){n=!0}),s.addClass("active"),w(s.attr("data-anchor"))});if(!r){var m;e(window).resize(function(){clearTimeout(m),m=setTimeout(g,500)})}e(window).bind("orientationchange",function(){g()})}})(jQuery);