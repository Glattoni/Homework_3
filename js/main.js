!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=document.querySelector(".form__btn"),r=document.querySelector(".form"),o=document.querySelector(".form__input"),u=document.querySelector(".result__content");r.addEventListener("submit",(function(e){e.preventDefault()})),n.addEventListener("click",(function(){var e=o.value;u.innerText="Your age is: ".concat(e);var t=e.split("");switch(parseInt(t[t.length-1])){case 0:case 5:case 6:case 7:case 8:case 9:u.innerText+=" лет";break;case 2:case 3:case 4:u.innerText+=" года";break;case 1:u.innerText+=" год"}}))}]);
//# sourceMappingURL=main.js.map
