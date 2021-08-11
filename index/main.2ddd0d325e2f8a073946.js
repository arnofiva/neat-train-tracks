/*! For license information please see main.2ddd0d325e2f8a073946.js.LICENSE.txt */
define(["esri/Camera","esri/Color","esri/Graphic","esri/Map","esri/core/Accessor","esri/core/accessorSupport/decorators","esri/core/promiseUtils","esri/core/watchUtils","esri/geometry","esri/geometry/Point","esri/geometry/Polyline","esri/layers/FeatureLayer","esri/layers/GraphicsLayer","esri/layers/TileLayer","esri/layers/VectorTileLayer","esri/layers/support/LabelClass","esri/renderers","esri/renderers/SimpleRenderer","esri/symbols","esri/symbols/FillSymbol3DLayer","esri/symbols/LabelSymbol3D","esri/symbols/LineSymbol3D","esri/symbols/LineSymbol3DLayer","esri/symbols/PolygonSymbol3D","esri/symbols/TextSymbol3DLayer","esri/views/SceneView","esri/widgets/ElevationProfile","esri/widgets/Widget","esri/widgets/support/widget","simplify"],((e,t,r,o,n,i,a,s,l,c,u,p,d,f,h,y,v,m,w,b,_,g,x,P,E,k,T,O,D,S)=>(()=>{var M={432:(e,t,r)=>{"use strict";r.r(t)},584:(e,t,r)=>{var o,n;o=[r,t,r(655),r(325),r(843),r(764),r(573),r(433),r(153),r(330),r(604),r(341)],void 0===(n=function(e,t,r,o,n,i,a,s,l,c,u,p){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a=r.__importDefault(a),p=r.__importDefault(p);var d=function(e){function t(t){var o=e.call(this,t)||this;return o.scene=s.scene,o.updateProfiles=l.debounce((function(){return r.__awaiter(o,void 0,void 0,(function(){var e,t,o;return r.__generator(this,(function(r){switch(r.label){case 0:return u.tracks2D.removeAll(),u.tracks3D.removeAll(),e=this.tracks.fadedTracks(this.trackProfiles.showNew,this.trackProfiles.section),u.tracks2D.addMany(e.map((function(e){return e.clone()}))),u.tracks3D.addMany(e),o=(t=Promise).all,[4,this.scene.highlightTracks3D(this.trackProfiles.showNew?c.slowColorFaded:c.fastColorFaded)];case 1:return[4,o.apply(t,[[r.sent()]])];case 2:return r.sent(),[2]}}))}))})),o}return r.__extends(t,e),t.prototype.postInitialize=function(){var e=this;this.trackProfiles=new a.default({tracks:this.tracks}),this.timeDistance=new p.default({profile:this.trackProfiles}),window.addEventListener("resize",(function(t){e.evaluateLayout()})),document.addEventListener("keydown",(function(t){return r.__awaiter(e,void 0,void 0,(function(){var e;return r.__generator(this,(function(r){switch(r.label){case 0:return" "!==t.key?[3,2]:[4,this.toggleTracks()];case 1:return r.sent(),[3,4];case 2:return e=Number.parseInt(t.key),[4,this.selectSection(e)];case 3:r.sent(),r.label=4;case 4:return[2]}}))}))})),this.evaluateLayout(),this.updateProfiles()},t.prototype.render=function(){var e=this.trackProfiles.render(),t=this.timeDistance.render();return i.tsx("div",null,i.tsx("div",{class:"wrapper"},i.tsx("div",{class:"grid-container"},i.tsx("div",{class:"column-24 tablet-column-9 phone-column-6"},i.tsx("h1",null,"Zurich - Milan by Train"),i.tsx("div",{class:"column-6 tablet-column-3 phone-column-2"},i.tsx("div",{id:"leftPadding"},i.tsx("span",{class:"placeholder"},"Track selector"))),i.tsx("div",{class:"column-18 tablet-column-6 phone-pre-2 phone-column-2 text-right"},"phone"===this.layout?t:i.tsx("div",null))),i.tsx("div",{class:"column-24 tablet-column-3 phone-column-6 text-right"},"tablet"===this.layout?t:i.tsx("div",null)),i.tsx("div",{class:"column-6 tablet-column-1 phone-column-1"},"desktop"===this.layout?t:i.tsx("div",null)))),i.tsx("div",{class:"footer"},i.tsx("div",{class:"grid-container"},i.tsx("div",{class:"column-6 tablet-column-6 phone-column-1"},i.tsx("span",{class:"placeholder tablet-hide"},"Legend")),i.tsx("div",{class:"column-18 tablet-column-6 phone-column-2"},i.tsx("span",{class:"placeholder tablet-hide"},"Sections")),i.tsx("div",{class:"column-12 tablet-column-9 phone-column-3"},i.tsx("span",{class:"placeholder tablet-only"},"Sections (Tablet)")),i.tsx("div",{class:"column-12 tablet-column-3 phone-column-3"},i.tsx("span",{class:"placeholder tablet-only"},"Legend (Tablet)")),i.tsx("div",{class:"column-8 tablet-column-4 phone-column-2"},i.tsx("span",{class:"placeholder phone-show"},"Play (Phone)")),i.tsx("div",{class:"column-8 tablet-column-4 phone-column-2"},i.tsx("span",{class:"placeholder phone-show"},"Sections (Phone)")),i.tsx("div",{class:"column-8 tablet-column-4 phone-column-2"},i.tsx("span",{class:"placeholder phone-show"},"Legend (phone)")),i.tsx("div",{class:"column-6 tablet-column-3 phone-column-6"},i.tsx("span",{class:"placeholder phone-hide"},"Play")),i.tsx("div",{class:"column-18 tablet-column-9 phone-column-6"},i.tsx("div",{class:"interactive"},e)))))},t.prototype.toggleTracks=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(e){switch(e.label){case 0:return this.trackProfiles.showNew=!this.trackProfiles.showNew,[4,this.updateProfiles()];case 1:return e.sent(),[2]}}))}))},t.prototype.selectSection=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){switch(r.label){case 0:return 0<=e&&e<=3?(t=c.Section.fromIndex(e),this.trackProfiles.section=t,[4,this.updateProfiles()]):[3,2];case 1:r.sent(),this.scene.view.goTo(t.camera),r.label=2;case 2:return[2]}}))}))},t.prototype.bindTopPadding=function(e){console.log("Bind",{e})},t.prototype.evaluateLayout=function(){var e=window.innerWidth;860<=e?(this.layout="desktop",this.scene.view.padding={top:50,left:220,bottom:200}):480<=e?(this.layout="tablet",this.scene.view.padding={top:60,left:40,right:40,bottom:150}):(this.layout="phone",this.scene.view.padding={top:60,bottom:150})},r.__decorate([n.property()],t.prototype,"tracks",void 0),r.__decorate([n.property()],t.prototype,"trackProfiles",void 0),r.__decorate([n.property()],t.prototype,"timeDistance",void 0),r.__decorate([n.property()],t.prototype,"scene",void 0),r.__decorate([n.property()],t.prototype,"layout",void 0),r.__decorate([n.subclass("app")],t)}(o);t.default=d}.apply(t,o))||(e.exports=n)},433:(e,t,r)=>{var o,n;o=[r,t,r(655),r(843),r(815),r(254),r(604),r(330),r(806)],void 0===(n=function(e,t,r,o,n,i,a,s,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scene=void 0,n=r.__importDefault(n);var c=new i({ground:"world-elevation",layers:[a.countries,a.hillshade,a.water,a.tracks2D,a.tracks3D]}),u=new n.default({container:"viewDiv",map:c,camera:s.Section.TOTAL.camera,environment:{background:{type:"color",color:[20,20,20]},atmosphereEnabled:!1,starsEnabled:!1},highlightOptions:{fillOpacity:1,haloOpacity:0}});u.ui.remove(["navigation-toggle","compass","zoom"]);var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.view=u,t.clearHighlight=function(){},t}return r.__extends(t,e),t.prototype.highlightTracks3D=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){switch(r.label){case 0:return this.clearHighlight(),u.highlightOptions.color=e,[4,u.whenLayerView(a.tracks3D)];case 1:return t=r.sent(),this.clearHighlight=t.highlight(a.tracks3D.graphics.toArray()).remove,[2]}}))}))},r.__decorate([o.property()],t.prototype,"view",void 0),t}(l);t.scene=new p}.apply(t,o))||(e.exports=n)},341:(e,t,r)=>{var o,n;o=[r,t,r(655),r(843),r(764),r(325)],void 0===(n=function(e,t,r,o,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){function t(t){return e.call(this,t)||this}return r.__extends(t,e),t.prototype.render=function(){var e=this.profile.time,t=e%60,r=Math.floor(e/60);return n.tsx("div",null,n.tsx("h4",null,"Time"),n.tsx("span",null,r,"h ",t,"m"),n.tsx("h4",null,"Distance"),n.tsx("span",null,this.profile.distance.toFixed(1),"km"))},r.__decorate([o.property()],t.prototype,"profile",void 0),r.__decorate([o.subclass("app.timedistance")],t)}((i=r.__importDefault(i)).default);t.default=a}.apply(t,o))||(e.exports=n)},573:(e,t,r)=>{var o,n;o=[r,t,r(655),r(843),r(303),r(325),r(330),r(433),r(764),r(24)],void 0===(n=function(e,t,r,o,n,i,a,s,l,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n=r.__importDefault(n),i=r.__importDefault(i),c=r.__importDefault(c);var u=s.scene.view,p={legend:!1,chart:!0,clearButton:!1,settingsButton:!1,sketchButton:!1,selectButton:!1,uniformChartScalingToggle:!1};function d(e,t){var r=new n.default({view:u,profiles:[{type:"input",viewVisualizationEnabled:!0,color:e},{type:"ground",viewVisualizationEnabled:!0,color:t}],visibleElements:p});return r.viewModel.highlightEnabled=!1,window.ep=r,r}var f=function(e){function t(t){var r=e.call(this,t)||this;return r.slowEP=d(a.slowColor,a.slowColorFaded),r.fastEP=d(a.fastColor,a.fastColorFaded),r.showNew=!0,r.section=a.Section.TOTAL,r}return r.__extends(t,e),Object.defineProperty(t.prototype,"activeEP",{get:function(){return this.showNew?this.fastEP:this.slowEP},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"inactiveEP",{get:function(){return this.showNew?this.slowEP:this.fastEP},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"time",{get:function(){return this.showNew?this.section.fastTime:this.section.slowTime},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"distance",{get:function(){var e=this.activeEP.viewModel.profiles.find((function(e){return"input"===e.type}));return e.statistics?e.statistics.maxDistance:0},enumerable:!1,configurable:!0}),t.prototype.postInitialize=function(){var e=this;[this.fastEP,this.slowEP].forEach((function(t){t.viewModel.watch("hoveredChartPosition",(function(){return e.updateTimeDistance()})),t.watch("_chart",(function(e){e&&(e.amChart.cursor.behavior="none")}))}))},t.prototype.render=function(){var e=this;return this.slowEP.profiles.forEach((function(t){return t.viewVisualizationEnabled=!e.showNew})),this.slowEP.input=this.tracks.slowEPInput(this.section),this.fastEP.input=this.tracks.fastEPInput(this.section),this.fastEP.profiles.forEach((function(t){return t.viewVisualizationEnabled=e.showNew})),l.tsx("div",null,this.activeEP.render())},t.prototype.updateTimeDistance=function(){var e=this.activeEP.viewModel.hoveredChartPosition;if(e){var t=this.section.startCam,r=this.section.endCam;if(t&&r){var o=c.default(t,r,e);s.scene.view.goTo(o,{speedFactor:2,easing:"linear"})}this.activeEP.viewModel.profiles.getItemAt(0).hoveredPoint;var n=this.section.fastTime/this.section.slowTime,i=Math.min(1,Math.max(0,this.showNew?e*n:e/n));this.inactiveEP.viewModel.hoveredChartPosition=i}else this.inactiveEP.viewModel.hoveredChartPosition=e},r.__decorate([o.property()],t.prototype,"tracks",void 0),r.__decorate([o.property()],t.prototype,"slowEP",void 0),r.__decorate([o.property()],t.prototype,"fastEP",void 0),r.__decorate([o.property()],t.prototype,"showNew",void 0),r.__decorate([o.property()],t.prototype,"activeEP",null),r.__decorate([o.property()],t.prototype,"inactiveEP",null),r.__decorate([o.property()],t.prototype,"time",null),r.__decorate([o.property()],t.prototype,"distance",null),r.__decorate([o.property()],t.prototype,"section",void 0),r.__decorate([o.subclass("app.trackprofiles")],t)}(i.default);t.default=f}.apply(t,o))||(e.exports=n)},546:(e,t,r)=>{var o,n;o=[r,t,r(655),r(806),r(843),r(242),r(282),r(351),r(330),r(604),r(617)],void 0===(n=function(e,t,r,o,n,i,a,s,l,c,u){"use strict";function p(e,t,r){void 0===r&&(r=!1);var o=e.geometry.paths[0].concat(t.geometry.paths[0]),n=r?e.clone():e;return n.geometry=new i.Polyline({spatialReference:e.geometry.spatialReference,paths:[o]}),n}function d(){return r.__awaiter(this,void 0,void 0,(function(){var e,t,o,n;return r.__generator(this,(function(d){switch(d.label){case 0:return[4,c.tracksLayer.load()];case 1:return d.sent(),(e=c.tracksLayer.createQuery()).returnGeometry=!0,e.returnZ=!0,e.orderByFields=["PathIndex"],[4,c.tracksLayer.queryFeatures(e)];case 2:return t=d.sent(),o=new a.default,n=[],t.features.forEach((function(e){var t=e.getAttribute("Membership");o.getAttribute("Membership")!==t?(o=new a.default({attributes:r.__assign({},e.attributes),geometry:e.geometry,symbol:new s.LineSymbol3D({symbolLayers:[new s.LineSymbol3DLayer({material:{color:"NEAT"===t?l.fastColorFaded:l.slowColorFaded},size:1})]})}),n.push(o)):p(o,e)})),n.forEach((function(e){var r=e.geometry.paths[0].map((function(e){return{x:e[0],y:e[1],z:e[2]}})),o=u(r,10,!1);console.log("From "+r.length+" to "+o.length),e.geometry=new i.Polyline({spatialReference:t.spatialReference,paths:[o.map((function(e){return[e.x,e.y,e.z]}))]})})),[2,n]}}))}))}Object.defineProperty(t,"__esModule",{value:!0}),o=r.__importDefault(o),a=r.__importDefault(a);var f=function(e){function t(t){return e.call(this,t)||this}var o;return r.__extends(t,e),o=t,t.load=function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t,n,i,a,s,l;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,d()];case 1:return e=r.sent(),t=e.filter((function(e){return"NEAT"!==e.getAttribute("Membership")})),n=e.filter((function(e){return"Old"===e.getAttribute("Membership")})),i=t.reduce((function(e,t){return e?p(e,t,!0):t})),a=e.filter((function(e){return"Old"!==e.getAttribute("Membership")})),s=e.filter((function(e){return"NEAT"===e.getAttribute("Membership")})),l=a.reduce((function(e,t){return e?p(e,t,!0):t})),[2,new o({tracks:e,slowTracks:t,oldTracks:n,slowRoute:i,fastTracks:a,neatTracks:s,fastRoute:l})]}}))}))},t.prototype.fastEPInput=function(e){switch(e){case l.Section.ZIMMERBERG:return this.tracks[1];case l.Section.GOTTHARD:return this.tracks[4];case l.Section.CENERI:return this.tracks[7];default:return this.fastRoute}},t.prototype.slowEPInput=function(e){switch(e){case l.Section.ZIMMERBERG:return this.tracks[2];case l.Section.GOTTHARD:return this.tracks[5];case l.Section.CENERI:return this.tracks[8];default:return this.slowRoute}},t.prototype.fadedTracks=function(e,t){return t===l.Section.TOTAL?e?this.oldTracks:this.neatTracks:[e?this.slowEPInput(t):this.fastEPInput(t)]},r.__decorate([n.property()],t.prototype,"tracks",void 0),r.__decorate([n.property()],t.prototype,"slowTracks",void 0),r.__decorate([n.property()],t.prototype,"oldTracks",void 0),r.__decorate([n.property()],t.prototype,"slowRoute",void 0),r.__decorate([n.property()],t.prototype,"fastTracks",void 0),r.__decorate([n.property()],t.prototype,"neatTracks",void 0),r.__decorate([n.property()],t.prototype,"fastRoute",void 0),o=r.__decorate([n.subclass("tracks")],t)}(o.default);t.default=f}.apply(t,o))||(e.exports=n)},330:(e,t,r)=>{var o,n;o=[r,t,r(655),r(601),r(944)],void 0===(n=function(e,t,r,o,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Section=t.fastColor=t.fastColorFaded=t.fadedColor=t.slowColorFaded=t.slowColor=void 0,o=r.__importDefault(o),n=r.__importDefault(n),t.slowColor=new n.default("#ff7d00"),t.slowColorFaded=new n.default("#9b5c20"),t.fadedColor=new n.default("#808080"),t.fastColorFaded=new n.default("#007f00"),t.fastColor=new n.default("#00ff00");var i=function(){function e(e,t,r,o,n){this.slowTime=e,this.fastTime=t,this.camera=r,this.startCam=o,this.endCam=n}return e.fromIndex=function(e){switch(e){case 1:return this.ZIMMERBERG;case 2:return this.GOTTHARD;case 3:return this.CENERI;default:return this.TOTAL}},e.TOTAL=new e(262,197,new o.default({position:{longitude:7.0337771,latitude:45.12086495,z:159916.61637},heading:48.74,tilt:51.89})),e.ZIMMERBERG=new e(10,5,new o.default({position:{longitude:8.4723133,latitude:47.30302987,z:11415.02525},heading:55.49,tilt:27.64})),e.GOTTHARD=new e(50,20,new o.default({position:{longitude:8.27547022,latitude:46.01335477,z:35950.15826},heading:37.04,tilt:65.7}),new o.default({position:{longitude:8.5110929,latitude:46.45750037,z:15605.80733},heading:26.58,tilt:66.73}),new o.default({position:{longitude:9.21189998,latitude:46.22905008,z:10283.893},heading:307.62,tilt:70.09})),e.CENERI=new e(20,10,new o.default({position:{longitude:8.90117572,latitude:46.24280383,z:5614.57732},heading:156.83,tilt:68.33})),e}();t.Section=i}.apply(t,o))||(e.exports=n)},604:(e,t,r)=>{var o,n;o=[r,t,r(655),r(37),r(121),r(470),r(594),r(918),r(290),r(351)],void 0===(n=function(e,t,r,o,n,i,a,s,l,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tracks2D=t.tracks3D=t.tracksLayer=t.countries=t.pois=t.water=t.hillshade=void 0,o=r.__importDefault(o),n=r.__importDefault(n),i=r.__importDefault(i),a=r.__importDefault(a),s=r.__importDefault(s),t.hillshade=new a.default({portalItem:{id:"428539ef9cab4017b69d15a40a9ee98b"}}),t.water=new s.default({portalItem:{id:"cd266578c33f4724acb93b9fff57cbb6"}}),t.pois=new o.default({visible:!1,portalItem:{id:"7ad19e912ce84d138ca6544610fa9643"},labelingInfo:[new i.default({labelExpressionInfo:{expression:"$feature.Label"},symbol:new c.LabelSymbol3D({symbolLayers:[new c.TextSymbol3DLayer({material:{color:[255,255,255]},size:12,halo:{color:[30,30,30,.8],size:1.5}})],callout:{type:"line",size:1.5,color:[150,150,150],border:{color:[50,50,50]}},verticalOffset:{screenLength:40,maxWorldLength:100,minWorldLength:20}})})]}),t.countries=new o.default({portalItem:{id:"2b93b06dc0dc4e809d3c8db5cb96ba69"},popupEnabled:!1,definitionExpression:"Country in ('Switzerland')",renderer:new l.SimpleRenderer({symbol:new c.PolygonSymbol3D({symbolLayers:[new c.FillSymbol3DLayer({outline:{color:[180,180,180],size:2.5}})]})})}),t.tracksLayer=new o.default({portalItem:{id:"cec8a4790ccc4727bf54fa6e86a4d26c"}}),t.tracks3D=new n.default({title:"3D Tracks",elevationInfo:{mode:"absolute-height"}}),t.tracks2D=new n.default({title:"2D Tracks",elevationInfo:{mode:"on-the-ground"},opacity:.5})}.apply(t,o))||(e.exports=n)},24:(e,t,r)=>{var o,n;o=[r,t,r(655),r(601),r(570)],void 0===(n=function(e,t,r,o,n){"use strict";o=r.__importDefault(o),n=r.__importDefault(n);var i=function(e,t,r,o,n){return o||(o=1),e+function(e,t,r){var o=t-e;return r&&(o>r/2?o-=r:o<-r/2&&(o+=r)),o}(e,t,n)*(r/o)},a=function(e,t,r,s,l){if(e.declaredClass&&e.declaredClass===t.declaredClass){if("esri.Camera"===e.declaredClass){var c=e,u=t,p=i(c.heading,u.heading,r,s,360);return console.log("Heading",c.heading,u.heading,p),new o.default({heading:p,position:a(c.position,u.position,r,s),tilt:i(c.tilt,u.tilt,r,s)})}if("esri.geometry.Point"===e.declaredClass){var d=e,f=t,h=d.spatialReference;return new n.default({spatialReference:h,x:i(d.x,f.x,r,s,l),y:i(d.y,f.y,r,s,l),z:i(d.z,f.z,r,s,l)})}}throw new Error("Values a and b do not have compatible types for interpolation")},s=function(e){return e&&"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e)},l=function(e,t,r,o,n){var c=typeof e;if(typeof t===c){if("number"===c)return i(e,t,r,o,n);if("object"===c)return Array.isArray(e)&&Array.isArray(t)?function(e,t,r,o,n){if(e.length===t.length)return e.map((function(e,i){return l(e,t[i],r,o,n)}));throw new Error("Value arrays must have same length for interpolation")}(e,t,r,o,n):s(e)&&s(t)?function(e,t,r,o){var n=e.getTime(),a=t.getTime();return new Date(i(n,a,r,o))}(e,t,r,o):a(e,t,r,o);if(void 0===e)return e}throw new Error("Values a and b do not have compatible types for interpolation")};return l}.apply(t,o))||(e.exports=n)},297:(e,t,r)=>{var o,n;o=[r,t,r(655),r(601),r(918),r(594),r(944),r(481),r(120),r(762),r(470),r(443),r(211),r(758),r(374),r(33),r(254),r(37),r(815),r(121),r(282),r(617),r(303),r(153),r(41),r(584),r(546)],void 0===(n=function(e,t,r,o,n,i,a,s,l,c,u,p,d,f,h,y,v,m,w,b,_,g,x,P,E,k,T){"use strict";if(k=r.__importDefault(k),(T=r.__importDefault(T)).default.load().then((function(e){new k.default({tracks:e,container:"app"})})),!window){var O=new a("#ff7d00"),D=new a("#9b5c20"),S=new a("#808080"),M=new a("#007f00"),I=new a("#00ff00"),L=new o({position:{longitude:7.0337771,latitude:45.12086495,z:159916.61637},heading:48.74,tilt:51.89}),C=new i({portalItem:{id:"428539ef9cab4017b69d15a40a9ee98b"}}),z=new n({portalItem:{id:"cd266578c33f4724acb93b9fff57cbb6"}}),j=(new m({visible:!1,portalItem:{id:"7ad19e912ce84d138ca6544610fa9643"},labelingInfo:[new u({labelExpressionInfo:{expression:"$feature.Label"},symbol:new c({symbolLayers:[new l({material:{color:[255,255,255]},size:12,halo:{color:[30,30,30,.8],size:1.5}})],callout:{type:"line",size:1.5,color:[150,150,150],border:{color:[50,50,50]}},verticalOffset:{screenLength:40,maxWorldLength:100,minWorldLength:20}})})]}),new m({portalItem:{id:"2b93b06dc0dc4e809d3c8db5cb96ba69"},popupEnabled:!1,definitionExpression:"Country in ('Switzerland')",renderer:new y({symbol:new f({symbolLayers:[new d({outline:{color:[180,180,180],size:2.5}})]})})})),A=new m({portalItem:{id:"cec8a4790ccc4727bf54fa6e86a4d26c"}}),R=new b({title:"3D Tracks",elevationInfo:{mode:"absolute-height"}}),B=new b({title:"2D Tracks",elevationInfo:{mode:"on-the-ground"},opacity:.5}),N=new w({container:"viewDiv",map:new v({basemap:"topo-vector",ground:"world-elevation",layers:[j,C,z,B,R]}),camera:L,environment:{background:{type:"color",color:[20,20,20]},atmosphereEnabled:!1,starsEnabled:!1},highlightOptions:{color:S,fillOpacity:1,haloOpacity:0}});N.ui.add("trackSwitch","top-right"),N.ui.add("segments","bottom-left"),N.when().then((function(){return r.__awaiter(void 0,void 0,void 0,(function(){function e(e,t,r){void 0===r&&(r=!1);var o=e.geometry.paths[0].concat(t.geometry.paths[0]),n=r?e.clone():e;return n.geometry=new s({spatialReference:e.geometry.spatialReference,paths:[o]}),n}var t,n,i,a,l,c,u,d,f,y,v,m,w,b,k,T,S,C,z,j,F,V,G,H;return r.__generator(this,(function(Z){switch(Z.label){case 0:return N.popup.defaultPopupTemplateEnabled=!0,N.popup.autoOpenEnabled=!0,N.popup.dockEnabled=!0,N.popup.dockOptions={position:"bottom-left"},[4,A.load()];case 1:return Z.sent(),(t=A.createQuery()).returnGeometry=!0,t.returnZ=!0,t.orderByFields=["PathIndex"],[4,A.queryFeatures(t)];case 2:return n=Z.sent(),i=new _,a=[],n.features.forEach((function(t){var o=t.getAttribute("Membership");i.getAttribute("Membership")!==o?(i=new _({attributes:r.__assign({},t.attributes),geometry:t.geometry,symbol:new h({symbolLayers:[new p({material:{color:"NEAT"===o?M:D},size:1})]})}),a.push(i)):e(i,t)})),a.forEach((function(e){var t=e.geometry.paths[0].map((function(e){return{x:e[0],y:e[1],z:e[2]}})),r=g(t,10,!1);console.log("From "+t.length+" to "+r.length),e.geometry=new s({spatialReference:n.spatialReference,paths:[r.map((function(e){return[e.x,e.y,e.z]}))]})})),l=a.filter((function(e){return"NEAT"!==e.getAttribute("Membership")})),c=a.filter((function(e){return"Old"===e.getAttribute("Membership")})),u=l.reduce((function(t,r){return t?e(t,r,!0):r})),d=a.filter((function(e){return"Old"!==e.getAttribute("Membership")})),f=a.filter((function(e){return"NEAT"===e.getAttribute("Membership")})),y=d.reduce((function(t,r){return t?e(t,r,!0):r})),(m=new x({view:N,container:"leftProfile",profiles:[{type:"input",viewVisualizationEnabled:!0,color:O},{type:"ground",viewVisualizationEnabled:!0,color:D}],visibleElements:v={legend:!1,chart:!0,clearButton:!1,settingsButton:!1,sketchButton:!1,selectButton:!1,uniformChartScalingToggle:!1},input:u})).viewModel.highlightEnabled=!1,(w=new x({container:"rightProfile",view:N,profiles:[{type:"input",viewVisualizationEnabled:!1,color:I},{type:"ground",viewVisualizationEnabled:!1,color:M}],visibleElements:v,input:y})).viewModel.highlightEnabled=!1,m.viewModel.watch("hoveredChartPosition",(function(){w.viewModel.hoveredChartPosition=m.viewModel.hoveredChartPosition})),w.viewModel.watch("hoveredChartPosition",(function(){m.viewModel.hoveredChartPosition=w.viewModel.hoveredChartPosition})),b=function(){},k=function(e){switch(e){case 1:return a[4];case 2:return a[7];case 3:return a[1];default:return y}},T=function(e){switch(e){case 1:return a[5];case 2:return a[8];case 3:return a[2];default:return u}},S=function(e,t){return 0===t?e?c:f:[e?T(t):k(t)]},C=0,z=!0,j=P.debounce((function(){return r.__awaiter(void 0,void 0,void 0,(function(){var e,t;return r.__generator(this,(function(r){switch(r.label){case 0:return b(),B.removeAll(),R.removeAll(),e=S(z,C),B.addMany(e.map((function(e){return e.clone()}))),R.addMany(e),m.profiles.forEach((function(e){return e.viewVisualizationEnabled=!z})),m.input=T(C),w.input=k(C),w.profiles.forEach((function(e){return e.viewVisualizationEnabled=z})),N.highlightOptions.color=z?D:M,[4,N.whenLayerView(R)];case 1:return t=r.sent(),b=t.highlight(e).remove,[4,E.whenEqualOnce(m.viewModel,"progress",1)];case 2:return r.sent(),[4,E.whenEqualOnce(w.viewModel,"progress",1)];case 3:return r.sent(),[2]}}))}))})),(F=document.getElementById("trackSwitchInput")).onchange=function(){z=F.checked,j()},j(),V=new o({position:{longitude:8.4723133,latitude:47.30302987,z:11415.02525},heading:55.49,tilt:27.64}),G=new o({position:{longitude:8.27547022,latitude:46.01335477,z:35950.15826},heading:37.04,tilt:65.7}),H=new o({position:{longitude:8.90117572,latitude:46.24280383,z:5614.57732},heading:156.83,tilt:68.33}),document.getElementById("allButton").onclick=function(){return r.__awaiter(void 0,void 0,void 0,(function(){return r.__generator(this,(function(e){switch(e.label){case 0:return C=0,[4,j()];case 1:return e.sent(),N.goTo(L),[2]}}))}))},document.getElementById("gotthardButton").onclick=function(){return r.__awaiter(void 0,void 0,void 0,(function(){return r.__generator(this,(function(e){switch(e.label){case 0:return C=1,[4,j()];case 1:return e.sent(),N.goTo(G),[2]}}))}))},document.getElementById("ceneriButton").onclick=function(){return r.__awaiter(void 0,void 0,void 0,(function(){return r.__generator(this,(function(e){switch(e.label){case 0:return C=2,[4,j()];case 1:return e.sent(),N.goTo(H),[2]}}))}))},document.getElementById("zimmerbergButton").onclick=function(){return r.__awaiter(void 0,void 0,void 0,(function(){return r.__generator(this,(function(e){switch(e.label){case 0:return C=3,[4,j()];case 1:return e.sent(),N.goTo(V),[2]}}))}))},[2]}}))}))}))}}.apply(t,o))||(e.exports=n)},655:(e,t,r)=>{"use strict";r.r(t),r.d(t,{__extends:()=>n,__assign:()=>i,__rest:()=>a,__decorate:()=>s,__param:()=>l,__metadata:()=>c,__awaiter:()=>u,__generator:()=>p,__createBinding:()=>d,__exportStar:()=>f,__values:()=>h,__read:()=>y,__spread:()=>v,__spreadArrays:()=>m,__await:()=>w,__asyncGenerator:()=>b,__asyncDelegator:()=>_,__asyncValues:()=>g,__makeTemplateObject:()=>x,__importStar:()=>E,__importDefault:()=>k,__classPrivateFieldGet:()=>T,__classPrivateFieldSet:()=>O});var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function n(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function a(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r}function s(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a}function l(e,t){return function(r,o){t(r,o,e)}}function c(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e,t,r,o){return new(r||(r=Promise))((function(n,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((o=o.apply(e,t||[])).next())}))}function p(e,t){var r,o,n,i,a={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,o&&(n=2&i[0]?o.return:i[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,i[1])).done)return n;switch(o=0,n&&(i=[2&i[0],n.value]),i[0]){case 0:case 1:n=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((n=(n=a.trys).length>0&&n[n.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!n||i[1]>n[0]&&i[1]<n[3])){a.label=i[1];break}if(6===i[0]&&a.label<n[1]){a.label=n[1],n=i;break}if(n&&a.label<n[2]){a.label=n[2],a.ops.push(i);break}n[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{r=n=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}var d=Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]};function f(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||d(t,e,r)}function h(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function y(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(o=i.next()).done;)a.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return a}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(y(arguments[t]));return e}function m(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var o=Array(e),n=0;for(t=0;t<r;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,n++)o[n]=i[a];return o}function w(e){return this instanceof w?(this.v=e,this):new w(e)}function b(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,n=r.apply(e,t||[]),i=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(e){n[e]&&(o[e]=function(t){return new Promise((function(r,o){i.push([e,t,r,o])>1||s(e,t)}))})}function s(e,t){try{(r=n[e](t)).value instanceof w?Promise.resolve(r.value.v).then(l,c):u(i[0][2],r)}catch(e){u(i[0][3],e)}var r}function l(e){s("next",e)}function c(e){s("throw",e)}function u(e,t){e(t),i.shift(),i.length&&s(i[0][0],i[0][1])}}function _(e){var t,r;return t={},o("next"),o("throw",(function(e){throw e})),o("return"),t[Symbol.iterator]=function(){return this},t;function o(o,n){t[o]=e[o]?function(t){return(r=!r)?{value:w(e[o](t)),done:"return"===o}:n?n(t):t}:n}}function g(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=h(e),t={},o("next"),o("throw"),o("return"),t[Symbol.asyncIterator]=function(){return this},t);function o(r){t[r]=e[r]&&function(t){return new Promise((function(o,n){!function(e,t,r,o){Promise.resolve(o).then((function(t){e({value:t,done:r})}),t)}(o,n,(t=e[r](t)).done,t.value)}))}}}function x(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var P=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function E(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&d(t,e,r);return P(t,e),t}function k(e){return e&&e.__esModule?e:{default:e}}function T(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function O(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}},601:t=>{"use strict";t.exports=e},944:e=>{"use strict";e.exports=t},282:e=>{"use strict";e.exports=r},254:e=>{"use strict";e.exports=o},806:e=>{"use strict";e.exports=n},843:e=>{"use strict";e.exports=i},153:e=>{"use strict";e.exports=a},41:e=>{"use strict";e.exports=s},242:e=>{"use strict";e.exports=l},570:e=>{"use strict";e.exports=c},481:e=>{"use strict";e.exports=u},37:e=>{"use strict";e.exports=p},121:e=>{"use strict";e.exports=d},594:e=>{"use strict";e.exports=f},918:e=>{"use strict";e.exports=h},470:e=>{"use strict";e.exports=y},290:e=>{"use strict";e.exports=v},33:e=>{"use strict";e.exports=m},351:e=>{"use strict";e.exports=w},211:e=>{"use strict";e.exports=b},762:e=>{"use strict";e.exports=_},374:e=>{"use strict";e.exports=g},443:e=>{"use strict";e.exports=x},758:e=>{"use strict";e.exports=P},120:e=>{"use strict";e.exports=E},815:e=>{"use strict";e.exports=k},303:e=>{"use strict";e.exports=T},325:e=>{"use strict";e.exports=O},764:e=>{"use strict";e.exports=D},617:e=>{"use strict";e.exports=S}},I={};function L(e){var t=I[e];if(void 0!==t)return t.exports;var r=I[e]={exports:{}};return M[e](r,r.exports,L),r.exports}return L.d=(e,t)=>{for(var r in t)L.o(t,r)&&!L.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},L.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),L.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},L(297),L(432)})()));