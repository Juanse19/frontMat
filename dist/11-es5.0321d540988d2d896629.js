function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{hX6p:function(e,t,n){"use strict";n.r(t);var i,r,o,s,a,c,l,p=n("ofXK"),u=n("aceb"),d=n("tyNb"),m=n("fXoL"),f=((i=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=m["\u0275\u0275defineComponent"]({type:i,selectors:[["ngx-analytics"]],decls:1,vars:0,template:function(e,t){1&e&&m["\u0275\u0275element"](0,"router-outlet")},directives:[d.h],encapsulation:2}),i),b=n("l5mm"),h=n("RS3s"),y=n("RTP8"),g=n("sZbP"),C=[{path:"",component:f,children:[{path:"ocupacion",component:(c=function(){function e(t,n){_classCallCheck(this,e),this.apiGetComp=t,this.api=n,this.settings1={actions:!1,columns:{id:{title:"ID",type:"number",filter:!1,hide:!0},name:{title:"Nombre",type:"string",filter:!1},totalOcupated:{title:"Capacidad Total (mt)",type:"number",filter:!1},currentOcupated:{title:"Ocupados (mt)",type:"number",filter:!1},available:{title:"Disponible (mt)",type:"number",filter:!1},percOcupation:{title:"%Ocupacion",type:"number",filter:!1}}},this.source1=new h.b,this.ChargeReportOcupation()}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ChargeReportOcupation",value:function(){var e=this;this.apiGetComp.GetJson(this.api.apiUrlMatbox+"/Reports/GeReportOcupation").subscribe((function(t){e.ReportOcupation=t,e.source1.load(t)})),Object(b.a)(6e4).subscribe((function(t){e.apiGetComp.GetJson(e.api.apiUrlMatbox+"/Reports/GeReportOcupation").subscribe((function(t){e.ReportOcupation=t,e.source1.load(t)}))}))}}]),e}(),c.\u0275fac=function(e){return new(e||c)(m["\u0275\u0275directiveInject"](y.a),m["\u0275\u0275directiveInject"](g.a))},c.\u0275cmp=m["\u0275\u0275defineComponent"]({type:c,selectors:[["ngx-ocupacion"]],decls:5,vars:2,consts:[[1,"example-smart-table",3,"settings","source"]],template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2," Ocupaci\xf3n del sistema "),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275element"](4,"ng2-smart-table",0),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e&&(m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("settings",t.settings1)("source",t.source1))},directives:[u.E,u.G,u.D,h.c],styles:[""]}),c)},{path:"ordenes",component:(a=function(){function e(t,n){_classCallCheck(this,e),this.apiGetComp=t,this.api=n,this.settings={actions:!1,columns:{id:{title:"ID",type:"number",filter:!1,hide:!0},batch:{title:"Batch",type:"number",filter:!1},order:{title:"Orden",type:"string",filter:!1},cutsNumberTotal:{title:"N\xb0 cortes Total",type:"number",filter:!1},currenCouts:{title:"Recuentos actuales",type:"number",filter:!1},diference:{title:"Diferencia",type:"number",filter:!1}}},this.source=new h.b,this.ChargeReportOrdens()}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ChargeReportOrdens",value:function(){var e=this;this.apiGetComp.GetJson(this.api.apiUrlMatbox+"/Reports/GetReportOrdersList").subscribe((function(t){console.log("Report Total Ordenes:",t),e.ReportOrdens=t,e.source.load(t)})),Object(b.a)(6e4).subscribe((function(t){e.apiGetComp.GetJson(e.api.apiUrlMatbox+"/Reports/GetReportOrdersList").subscribe((function(t){e.ReportOrdens=t,e.source.load(t)}))}))}}]),e}(),a.\u0275fac=function(e){return new(e||a)(m["\u0275\u0275directiveInject"](y.a),m["\u0275\u0275directiveInject"](g.a))},a.\u0275cmp=m["\u0275\u0275defineComponent"]({type:a,selectors:[["ngx-ordenes"]],decls:5,vars:2,consts:[[1,"example-smart-table",3,"settings","source"]],template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2," Ordenes "),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275element"](4,"ng2-smart-table",0),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e&&(m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("settings",t.settings)("source",t.ReportOrdens))},directives:[u.E,u.G,u.D,h.c],styles:[""]}),a)},{path:"ordenesNotWips",component:(s=function(){function e(t,n){_classCallCheck(this,e),this.apiGetComp=t,this.api=n,this.settings2={actions:!1,columns:{orderId:{title:"OrderId",type:"number",filter:!1,hide:!0},batch:{title:"Batch",type:"number",filter:!1},order:{title:"Orden",type:"string",filter:!1},cutsLength:{title:"Longitud cortes",type:"number",filter:!1},cutsWidth:{title:"Ancho corte",type:"number",filter:!1},anchoWip:{title:"Ancho Wip",type:"string",filter:!1},target:{title:"Target",type:"string",filter:!1},wip:{title:"Wip",type:"string",filter:!1},sizeDifference:{title:"Diferencia tama\xf1o",type:"number",filter:!1}}},this.source2=new h.b,this.ChargeOrdersnotwip()}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ChargeOrdersnotwip",value:function(){var e=this;this.apiGetComp.GetJson(this.api.apiUrlMatbox+"/Reports/GetnotwipList").subscribe((function(t){e.ReportOrdersnotwip=t,e.source2.load(t)})),Object(b.a)(3e4).subscribe((function(t){e.apiGetComp.GetJson(e.api.apiUrlMatbox+"/Reports/GetnotwipList").subscribe((function(t){e.ReportOrdersnotwip=t,e.source2.load(t)}))}))}}]),e}(),s.\u0275fac=function(e){return new(e||s)(m["\u0275\u0275directiveInject"](y.a),m["\u0275\u0275directiveInject"](g.a))},s.\u0275cmp=m["\u0275\u0275defineComponent"]({type:s,selectors:[["ngx-ordenes-no-wips"]],decls:5,vars:2,consts:[[1,"example-smart-table",3,"settings","source"]],template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2," Ordenes que no encajan en los wips "),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275element"](4,"ng2-smart-table",0),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e&&(m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("settings",t.settings2)("source",t.source2))},directives:[u.E,u.G,u.D,h.c],styles:[""]}),s)},{path:"predictivo",component:(o=function(){function e(t,n){_classCallCheck(this,e),this.apiGetComp=t,this.api=n,this.settings3={actions:!1,columns:{maquina:{title:"Maquina",type:"string",filter:!1},metrosPor10MinCorrugador:{title:"MetrosPor10MinCorrugador",type:"number",filter:!1},metrosPor10MinMaquina:{title:"MetrosPor10MinMaquina",type:"number",filter:!1},capacidadWip:{title:"CapacidadWip",type:"number",filter:!1},ocupacionActual:{title:"OcupacionActual",type:"number",filter:!1},anchoTotalAruumeOrden:{title:"AnchoTotalAruumeOrden",type:"number",filter:!1},ocupacionPredictiva:{title:"OcupacionPredictiva",type:"number",filter:!1},tiempoDetencionCorrugador:{title:"TiempoDetencionCorrugador",type:"number",filter:!1},duracionDetencion:{title:"DuracionDetencion",type:"number",filter:!1}}},this.source3=new h.b,this.ChargePredictive()}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ChargePredictive",value:function(){var e=this;this.apiGetComp.GetJson(this.api.apiUrlMatbox+"/Reports/GetPredictiveList").subscribe((function(t){e.GetPredictive=t,e.source3.load(t)})),Object(b.a)(3e4).subscribe((function(t){e.apiGetComp.GetJson(e.api.apiUrlMatbox+"/Reports/GetPredictiveList").subscribe((function(t){e.GetPredictive=t,e.source3.load(t)}))}))}}]),e}(),o.\u0275fac=function(e){return new(e||o)(m["\u0275\u0275directiveInject"](y.a),m["\u0275\u0275directiveInject"](g.a))},o.\u0275cmp=m["\u0275\u0275defineComponent"]({type:o,selectors:[["ngx-predictivo"]],decls:5,vars:2,consts:[[1,"example-smart-table",3,"settings","source"]],template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2," Predictivo "),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275element"](4,"ng2-smart-table",0),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e&&(m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("settings",t.settings3)("source",t.GetPredictive))},directives:[u.E,u.G,u.D,h.c],styles:[""]}),o)},{path:"reportes",component:(r=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}(),r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=m["\u0275\u0275defineComponent"]({type:r,selectors:[["ngx-reports"]],decls:2,vars:0,template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"p"),m["\u0275\u0275text"](1,"reports works!"),m["\u0275\u0275elementEnd"]())},styles:[""]}),r)}]}],v=((l=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:l}),l.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||l)},imports:[[d.g.forChild(C)],d.g]}),l),O=n("vTDv");n.d(t,"AnalyticsModule",(function(){return w}));var G,w=((G=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:G}),G.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||G)},imports:[[p.c,v,h.d,O.a,u.H,u.Ac,u.t,u.db,u.dc]]}),G)}}]);