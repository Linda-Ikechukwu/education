(function ($, window, document, undefined) {
'use strict';

$(function () {


  // new TimelineMax({onComplete:myFunction, repeat:2, repeatDelay:1, yoyo:true});

  function animateImg(xPosSource, yPosSource, xPosDest, yPosDest) {
    var tl = new TimelineMax();  
    tl.fromTo(".lightbox-bg", .4, {scaleX:0}, {scaleX:1, transformOrigin:"right center", ease:Power4.easeInOut})
      .fromTo(".lightbox-img", .4, {display:'block', left:xPosSource, top:yPosSource, scale:1.1, opacity:0, z:0 }, { scale:1.3, opacity:1, z:0, ease:Power1.easeOut},"-=.3")
      .to(".lightbox-img", .5, {left:xPosDest, top:yPosDest, scale:1, z:0, ease:Power4.easeInOut})
      .fromTo(".lightbox-item .headshot", .3, {opacity:0}, {opacity:1})
      .to(".lightbox-img", 0, {display:'none'})
      .fromTo(".lightbox-item-backdrop", 1.8, {opacity: 0, x:-80, scaleX:0 }, {scaleX:1, x:0, opacity:1, transformOrigin: "left center", ease:Power4.easeOut},"-=.7")
      .fromTo(".lightbox-item .person-info-wrap", .8, {opacity:0, scale:0}, {opacity: 1, scale:1, transformOrigin: "left center", ease:Power4.easeOut},"-=1.5")
      .fromTo(".lightbox-item .gallery-department", .8, {opacity: 0, y:50, z:0}, {opacity: 1, y:0, z:0, ease:Power4.easeOut},"-=1.2")
      .from(".lightbox-item .page-link", 1, {opacity: 0, x:-80, ease:Power4.easeOut}, "-=1.3")
      ;
  }
  function setImg(xPosSource, yPosSource, xPosDest, yPosDest) {
    var tl = new TimelineMax();
    tl.set(".lightbox-bg", {scaleX:1, transformOrigin:"right center"})
      .set(".lightbox-item .headshot", {opacity:1})
      .set(".lightbox-item-backdrop", {scaleX:1, x:0, opacity:1, transformOrigin: "left center"})
      .set(".lightbox-item .person-info-wrap", {opacity: 1, scale:1, transformOrigin: "left center"})
      .set(".lightbox-item .gallery-department", {opacity: 1, y:0, z:0})
      ;
  }

  var viewportWidth = window.innerWidth;

  function openLightbox(obj) {
    $(".lightbox-bg, .lightbox-img, .lightbox-item").removeClass("hidden");
    
    var content = obj.contents().clone();
    $(".lightbox-item").append(content, "<div class='lightbox-item-backdrop'></div>");
    
    var sourceImg         = obj.children('.headshot');
    var sourceImgPos      = sourceImg.offset(); 
    var destinationImgPos = $(".lightbox-item .headshot").offset(); 
    var $imgAni           = sourceImg.clone().appendTo(".lightbox-img");
  
    if (viewportWidth <= 480) {
      setImg(sourceImgPos.left, sourceImgPos.top, destinationImgPos.left, destinationImgPos.top);
    } else {
      animateImg(sourceImgPos.left, sourceImgPos.top, destinationImgPos.left, destinationImgPos.top);
    }
  }

  function closeLightbox() {
    // tl1.clear;
    var tl2 = new TimelineMax({onComplete:function(){ 
      TweenMax.killAll(); 
      $(".lightbox-bg, .lightbox-item, .lightbox-img").addClass("hidden");
      $(".lightbox-bg, .lightbox-item, .lightbox-img").removeAttr( "style" );
      $(".lightbox-img, .lightbox-item").contents().remove();
    }})
    tl2.fromTo(".lightbox-item", .4, {opacity:1, scale:1, ease:Power4.easeInOut}, {opacity:0, scale:0, ease:Power4.easeInOut});
    
  } 


  var olderThanIe10 = $("html").hasClass("lt-ie10");

  if (!olderThanIe10) { 
    $(".gallery-link").click(function(event) {
      event.preventDefault();
      openLightbox( $(this) );
    });
  }
  
  $(".lightbox-bg").click(function(event) {
    closeLightbox();
  });



});
})(jQuery, window, document);