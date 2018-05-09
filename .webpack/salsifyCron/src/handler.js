!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=13)}([function(e,t){e.exports=require("source-map-support/register")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("envdotjs")},function(e){e.exports={configuration:{entity_type:"product",filter:"=list:default",properties:"'sku','Name','Supplier','Release Date','NEW_COLUMN_JC','Long Description'",include_all_columns:!0,product_type:"all"}}},function(e,t,r){"use strict";r(0);var n=r(1),o=new n.Schema({sheetId:String,status:String,url:String});e.exports=n.model("Sheet",o)},function(e,t){e.exports=require("babel-runtime/core-js/promise")},function(e,t,r){"use strict";var n=s(r(5));r(0);s(r(2));var o=s(r(1));function s(e){return e&&e.__esModule?e:{default:e}}o.default.Promise=global.Promise;var u=void 0;e.exports={connectToDatabase:function(){return u?n.default.resolve():o.default.connect("mongodb://tbaustin:password@ds141406.mlab.com:41406/salsify-test-api").then(function(e){u=e.connections[0].readyState})}}},function(e,t){e.exports=require("middy/middlewares")},function(e,t){e.exports=require("middy")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,t){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,t){e.exports=require("babel-runtime/regenerator")},function(e,t,r){"use strict";var n=p(r(12)),o=p(r(11)),s=p(r(10));r(0);var u,a=p(r(9)),i=p(r(8)),c=r(7),l=r(6),d=p(r(4)),f=p(r(3));function p(e){return e&&e.__esModule?e:{default:e}}r(2).load(),e.exports.salsifyCron=(0,i.default)((u=(0,s.default)(n.default.mark(function e(t,r,s){var u,i,c,p,b;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.callbackWaitsForEmptyEventLoop=!1,u=void 0,i={url:"https://app.salsify.com/api/orgs/s-9c2a072b-2f59-495e-b089-121deba82448/export_runs",headers:{Authorization:"Bearer f2653e0a682e8f524222533233bad7c54a0f5377d3920ddd302353bdb3652f42","Content-Type":"application/json"}},e.next=5,(0,l.connectToDatabase)();case 5:return e.next=7,d.default.find({});case 7:if(!(c=e.sent)[0]||"completed"!==c[0].status||null===c[0].url){e.next=12;break}return console.log("There is already a completed sheet in the DB: \nSheet ID: "+c[0].sheetId+", \nSheet status: "+c[0].status+", \nSheet url: "+c[0].url),process.exit(0),e.abrupt("return");case 12:if(c[0]&&(u=c[0].sheetId),0!==c.length){e.next=25;break}return e.next=16,(0,a.default)(i.url,{method:"POST",headers:i.headers,body:(0,o.default)(f.default)}).then(function(e){return e.json()});case 16:if(!(p=e.sent).id||!p.status){e.next=23;break}return e.next=20,d.default.create({sheetId:p.id,url:null,status:p.status});case 20:u=p.id,e.next=25;break;case 23:console.log(p),process.exit(1);case 25:return e.next=27,(0,a.default)(i.url+"/"+u,{method:"GET",headers:i.headers}).then(function(e){return e.json()});case 27:if("running"===(b=e.sent).status&&(console.log("running cron job"),console.log(b.estimated_time_remaining)),"completed"!==b.status){e.next=33;break}return console.log("completed cron job"),e.next=33,d.default.findByIdAndUpdate(c[0],{status:b.status,url:b.url},{new:!0});case 33:case"end":return e.stop()}},e,void 0)})),function(e,t,r){return u.apply(this,arguments)})).use((0,c.cors)()).use((0,c.jsonBodyParser)()).use((0,c.httpErrorHandler)())}]));
//# sourceMappingURL=handler.js.map