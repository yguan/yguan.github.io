!function(window){var indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.oIndexedDB||window.msIndexedDB,IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange,transactionModes={readonly:"readonly",readwrite:"readwrite"},hasOwn=Object.prototype.hasOwnProperty;if(!indexedDB)throw"IndexedDB required";var CallbackList=function(){var state,list=[],exec=function(context,args){if(list){args=args||[],state=state||[context,args];for(var i=0,il=list.length;il>i;i++)list[i]&&list[i].apply(state[0],state[1]);list=[]}};this.add=function(){for(var i=0,il=arguments.length;il>i;i++)list.push(arguments[i]);return state&&exec(),this},this.execute=function(){return exec(this,arguments),this}},Deferred=function(func){var state="progress",actions=[["resolve","done",new CallbackList,"resolved"],["reject","fail",new CallbackList,"rejected"],["notify","progress",new CallbackList]],deferred={},promise={state:function(){return state},then:function(){var handlers=arguments;return Deferred(function(newDefer){actions.forEach(function(action,i){var handler=handlers[i];deferred[action[1]]("function"==typeof handler?function(){var returned=handler.apply(this,arguments);returned&&"function"==typeof returned.promise&&returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)}:newDefer[action[0]])})}).promise()},promise:function(obj){return obj?(Object.keys(promise).forEach(function(key){obj[key]=promise[key]}),obj):promise}};return actions.forEach(function(action){var list=action[2],actionState=action[3];promise[action[1]]=list.add,actionState&&list.add(function(){state=actionState}),deferred[action[0]]=list.execute}),promise.promise(deferred),func&&func.call(deferred,deferred),deferred},Server=function(db,name){var that=this,closed=!1;this.add=function(table){if(closed)throw"Database has been closed";for(var records=[],i=0;i<arguments.length-1;i++)records[i]=arguments[i+1];var transaction=db.transaction(table,transactionModes.readwrite),store=transaction.objectStore(table),deferred=Deferred();return records.forEach(function(record){var req;if(record.item&&record.key){var key=record.key;record=record.item,req=store.add(record,key)}else req=store.add(record);req.onsuccess=function(e){var target=e.target,keyPath=target.source.keyPath;null===keyPath&&(keyPath="__id__"),Object.defineProperty(record,keyPath,{value:target.result,enumerable:!0}),deferred.notify()}}),transaction.oncomplete=function(){deferred.resolve(records,that)},transaction.onerror=function(e){deferred.reject(records,e)},transaction.onabort=function(e){deferred.reject(records,e)},deferred.promise()},this.update=function(table){if(closed)throw"Database has been closed";for(var records=[],i=0;i<arguments.length-1;i++)records[i]=arguments[i+1];var transaction=db.transaction(table,transactionModes.readwrite),store=transaction.objectStore(table),deferred=(store.keyPath,Deferred());return records.forEach(function(record){var req;if(record.item&&record.key){var key=record.key;record=record.item,req=store.put(record,key)}else req=store.put(record);req.onsuccess=function(){deferred.notify()}}),transaction.oncomplete=function(){deferred.resolve(records,that)},transaction.onerror=function(e){deferred.reject(records,e)},transaction.onabort=function(e){deferred.reject(records,e)},deferred.promise()},this.remove=function(table,key){if(closed)throw"Database has been closed";var transaction=db.transaction(table,transactionModes.readwrite),store=transaction.objectStore(table),deferred=Deferred();return store.delete(key),transaction.oncomplete=function(){deferred.resolve(key)},transaction.onerror=function(e){deferred.reject(e)},deferred.promise()},this.close=function(){if(closed)throw"Database has been closed";db.close(),closed=!0,delete dbCache[name]},this.get=function(table,id){if(closed)throw"Database has been closed";var transaction=db.transaction(table),store=transaction.objectStore(table),deferred=Deferred(),req=store.get(id);return req.onsuccess=function(e){deferred.resolve(e.target.result)},transaction.onerror=function(e){deferred.reject(e)},deferred.promise()},this.query=function(table,index){if(closed)throw"Database has been closed";return new IndexQuery(table,db,index)};for(var i=0,il=db.objectStoreNames.length;il>i;i++)!function(storeName){that[storeName]={};for(var i in that)hasOwn.call(that,i)&&"close"!==i&&(that[storeName][i]=function(i){return function(){var args=[storeName].concat([].slice.call(arguments,0));return that[i].apply(that,args)}}(i))}(db.objectStoreNames[i])},IndexQuery=function(table,db,indexName){var that=this,runQuery=function(type,args,cursorType,direction){var transaction=db.transaction(table),store=transaction.objectStore(table),index=indexName?store.index(indexName):store,keyRange=type?IDBKeyRange[type].apply(null,args):null,results=[],deferred=Deferred(),indexArgs=[keyRange];return"count"!==cursorType&&indexArgs.push(direction||"next"),index[cursorType].apply(index,indexArgs).onsuccess=function(e){var cursor=e.target.result;"number"==typeof cursor?results=cursor:cursor&&(results.push("value"in cursor?cursor.value:cursor.key),cursor.continue())},transaction.oncomplete=function(){deferred.resolve(results)},transaction.onerror=function(e){deferred.reject(e)},transaction.onabort=function(e){deferred.reject(e)},deferred.promise()},Query=function(type,args){var direction="next",cursorType="openCursor",filters=[],unique=!1,execute=function(){var deferred=Deferred();return runQuery(type,args,cursorType,unique?direction+"unique":direction).then(function(data){data.constructor===Array&&filters.forEach(function(filter){filter&&filter.length&&(data=2===filter.length?data.filter(function(x){return x[filter[0]]===filter[1]}):data.filter(filter[0]))}),deferred.resolve(data)},deferred.reject,deferred.notify),deferred.promise()},count=function(){return direction=null,cursorType="count",{execute:execute}},keys=function(){return cursorType="openKeyCursor",{desc:desc,execute:execute,filter:filter,distinct:distinct}},filter=function(){return filters.push(Array.prototype.slice.call(arguments,0,2)),{keys:keys,execute:execute,filter:filter,desc:desc,distinct:distinct}},desc=function(){return direction="prev",{keys:keys,execute:execute,filter:filter,distinct:distinct}},distinct=function(){return unique=!0,{keys:keys,count:count,execute:execute,filter:filter,desc:desc}};return{execute:execute,count:count,keys:keys,filter:filter,desc:desc,distinct:distinct}};"only bound upperBound lowerBound".split(" ").forEach(function(name){that[name]=function(){return new Query(name,arguments)}}),this.filter=function(){var query=new Query(null,null);return query.filter.apply(query,arguments)},this.all=function(){return this.filter()}},createSchema=function(e,schema,db){"function"==typeof schema&&(schema=schema());for(var tableName in schema){var table=schema[tableName];if(hasOwn.call(schema,tableName)&&!db.objectStoreNames.contains(tableName)){var store=db.createObjectStore(tableName,table.key);for(var indexKey in table.indexes){var index=table.indexes[indexKey];store.createIndex(indexKey,index.key||indexKey,Object.keys(index).length?index:{unique:!1})}}}},open=function(e,server){var db=e.target.result,s=new Server(db,server),deferred=Deferred();return deferred.resolve(s),dbCache[server]=db,deferred.promise()},dbCache={},db={version:"0.8.0",open:function(options){var request,deferred=Deferred();return dbCache[options.server]?open({target:{result:dbCache[options.server]}},options.server,options.version,options.schema).done(deferred.resolve).fail(deferred.reject).progress(deferred.notify):(request=indexedDB.open(options.server,options.version),request.onsuccess=function(e){open(e,options.server,options.version,options.schema).done(deferred.resolve).fail(deferred.reject).progress(deferred.notify)},request.onupgradeneeded=function(e){createSchema(e,options.schema,e.target.result)},request.onerror=function(e){deferred.reject(e)}),deferred.promise()}};"function"==typeof define&&define.amd?define("lib/db",[],function(){return db}):window.db=db}(window),define("data/idb",["require","exports","module","lib/db"],function(require,exports,module){var db=require("lib/db"),idb={schema:{note:{key:{keyPath:"id",autoIncrement:!0},indexes:{title:{},dateCreated:{},dateModified:{}}},theme:{key:{keyPath:"id",autoIncrement:!1},indexes:{}}},loadIndexedDB:function(op){var me=this;me.db||db.open({server:"flexnote",version:1,schema:me.schema}).done(function(dbInstance){me.db=dbInstance,op&&op.success&&op.success(dbInstance)}).fail(function(error){op&&op.failure&&op.failure(error)})},db:null,get:function(dbKey,id,op){idb.db[dbKey].get(id).done(function(item){op.success(item)}).fail(op.failure)},create:function(dbKey,item,op){idb.db[dbKey].add(item).done(function(results){op.success(results[0])}).fail(op.failure)},add:function(dbKey,item,uniqueItemKey,op){var me=this;me.findExact(dbKey,uniqueItemKey,item[uniqueItemKey],{success:function(results){if(results&&results.length>0){var oldItem=results[0];_.extend(oldItem,item),me.update(dbKey,oldItem,{success:function(results){op.success(results[0])},failure:op.failure})}else me.create(dbKey,item,op)},failure:op.failure})},findAll:function(dbKey,filterFn,op){idb.db[dbKey].query().filter(filterFn).execute().done(op.success).fail(op.failure)},findAllByKey:function(dbKey,key,value,op){idb.db[dbKey].query(key).only(value).execute().done(op.success).fail(op.failure)},findExact:function(dbKey,key,value,op){idb.db[dbKey].query(key).only(value).execute().done(op.success).fail(op.failure)},update:function(dbKey,item,op){idb.db[dbKey].update(item).done(op.success).fail(op.failure)},each:function(dbKey,eachFn,op){idb.db[dbKey].query().filter(function(item){return eachFn(item),!1}).execute().done(op.success).fail(op.failure)},getAll:function(dbkey,op){idb.db[dbkey].query().all().execute().done(op.success).fail(op.failure)},"export":function(op){var dbKeys=Object.keys(this.schema),data={},dbKeysCount=dbKeys.length,dataKeyCount=0,addData=function(key,items){data[key]=items,dataKeyCount+=1,dbKeysCount===dataKeyCount&&op.success(data)};_.each(dbKeys,function(key){idb.db[key].query().all().execute().done(function(items){addData(key,items)}).fail(op.failure)})},updateAll:function(dbKey,items,op){function updateNext(){len>i?db.update(items[i]).done(function(){i+=1,updateNext()}).fail(op.failure):op.success()}var i=0,len=items.length,db=idb.db[dbKey];updateNext()},remove:function(dbKey,id,op){idb.db[dbKey].remove(id).done(op.success).fail(op.error)}};module.exports=idb}),define("data/theme-repository",["require","exports","module","data/idb"],function(require,exports,module){var idb=require("data/idb"),dbKey="theme";module.exports={create:function(theme,op){idb.create(dbKey,theme,op)},get:function(id,op){idb.get(dbKey,id,op)},update:function(theme,op){idb.update(dbKey,theme,op)}}}),define("data/app-data-loader",["require","exports","module","data/idb","data/theme-repository"],function(require,exports){var idb=require("data/idb"),themeRepo=require("data/theme-repository");exports.init=function(op){idb.loadIndexedDB({success:function(){themeRepo.get(1,{success:function(theme){theme?op.success():themeRepo.create({id:1,bgColor:"#220e58"},op)},failure:op.failure})},failure:op.failure})}}),define("view/gridster-size-calculator",["require","exports","module"],function(require,exports){function getGridsterSize(gridsterContainerSelector){var container=angular.element(gridsterContainerSelector).first();return{height:container.height(),width:container.width()}}exports.getSizeInfo=function(config){var gridsterSize=getGridsterSize(config.container),widgetWidthWithPadding=config.widgetMinWidth+config.padding||0,numberOfWidget=Math.floor(gridsterSize.width/widgetWidthWithPadding),remainder=gridsterSize.width%widgetWidthWithPadding,adjustedWidgetWidth=remainder>0?remainder/numberOfWidget+config.widgetMinWidth:config.widgetMinWidth;return{widgetMinWidth:adjustedWidgetWidth,widgetMinHeight:config.widgetMinHeight,maxColumns:Math.floor(gridsterSize.width/config.widgetMinWidth),maxRows:Math.floor(gridsterSize.height/config.widgetMinHeight)}}}),define("data/note-repository",["require","exports","module","data/idb"],function(require,exports,module){var idb=require("data/idb"),dbKey="note";module.exports={add:function(note,op){idb.create(dbKey,note,op)},addAll:function(notes,op){function addNext(){len>i?me.add(notes[i],{success:function(){i+=1,addNext()},failure:function(){errorCount+=1}}):0===errorCount?op.success():op.failure()}var me=this,i=0,len=notes.length,errorCount=0;addNext()},remove:function(id,op){idb.remove(dbKey,id,op)},findByKey:function(key,value,op){idb.findAllByKey(dbKey,key,value,op)},findByTitle:function(keywords,op){var lowercaseKeywords=_.map(keywords,function(keyword){return keyword.toLowerCase()}),keywordCount=keywords.length;idb.findAll(dbKey,function(note){var matchedCount=0,title=note.title.toLowerCase();return _.each(lowercaseKeywords,function(keyword){-1!==title.indexOf(keyword)&&(matchedCount+=1)}),keywordCount===matchedCount},op)},update:function(note,op){idb.update(dbKey,note,op)},updateAll:function(notes,op){idb.updateAll(dbKey,notes,op)},each:function(fn,op){idb.db[dbKey].query().filter(function(item){return fn(item),!1}).execute().done(op.success).fail(op.failure)},getAll:function(op){idb.getAll(dbKey,op)}}}),define("view/generic-handlers",["require","exports","module"],function(require,exports){exports.noop=function(){},exports.error=function(error){console.log(error)}}),define("view/edit-note",["require","exports","module","data/note-repository","view/generic-handlers"],function(require,exports){var noteEditor,noteRepo=require("data/note-repository"),genericHandlers=require("view/generic-handlers"),textAngularOpts={textAngularEditors:{note:{toolbar:[{icon:'<i class="fa fa-code"></i>',name:"html",title:"Toggle Html"},{icon:"h1",name:"h1",title:"H1"},{icon:"h2",name:"h2",title:"H2"},{icon:"h3",name:"h3",title:"H3"},{icon:"pre",name:"pre",title:"Pre"},{icon:'<i class="fa fa-bold"></i>',name:"b",title:"Bold"},{icon:'<i class="fa fa-italic"></i>',name:"i",title:"Italics"},{icon:"p",name:"p",title:"Paragraph"},{icon:'<i class="fa fa-list-ul"></i>',name:"ul",title:"Unordered List"},{icon:'<i class="fa fa-list-ol"></i>',name:"ol",title:"Ordered List"},{icon:'<i class="fa fa-align-left"></i>',name:"justifyLeft",title:"Justify Left"},{icon:'<i class="fa fa-align-center"></i>',name:"justifyCenter",title:"Justify Center"},{icon:'<i class="fa fa-align-right"></i>',name:"justifyRight",title:"Justify Right"},{icon:'<i class="fa fa-ban"></i>',name:"clear",title:"Clear"},{icon:'<i class="fa fa-file"></i>',name:"insertImage",title:"Insert Image"},{icon:'<i class="fa fa-html5"></i>',name:"insertHtml",title:"Insert Html"},{icon:'<i class="fa fa-link"></i>',name:"createLink",title:"Create Link"},{icon:'<i class="fa fa-rotate-right"></i>',name:"redo",title:"Redo"},{icon:'<i class="fa fa-undo"></i>',name:"undo",title:"Undo"}],html:"",disableStyle:!1,theme:{editor:{"font-family":"Roboto","font-size":"1.2em",color:"black","border-radius":"4px",padding:"11px",background:"white",border:"1px solid rgba(2,2,2,0.1)"},insertFormBtn:{background:"red",color:"white",padding:"2px 3px","font-size":"15px","margin-top":"4px","border-radius":"4px","font-family":"Roboto",border:"2px solid red"}}}}},getModalWidth=function(){var element=angular.element(".notes").first();return{width:element.width()-200+"px"}};exports.showEditor=function(note,$scope,$timeout,$modal){function createContentWatcher(scope,note){return scope.$watch("textAngularOpts.textAngularEditors.note.html",function(){$timeout(function(){note.content=scope.textAngularOpts.textAngularEditors.note.html,note.dateModified=new Date,noteRepo.update(note,{succes:genericHandlers.noop,failure:genericHandlers.error})},200)},!0)}function createTitleWatcher(scope,note){return scope.$watch("title",function(newVal){$timeout(function(){note.title=newVal,note.dateModified=new Date,noteRepo.update(note,{succes:genericHandlers.noop,failure:genericHandlers.error})},200)},!0)}if(noteEditor)noteEditor.modal.then(function(modalEl){modalEl.modal("show")});else{var scope=$scope.$new(!0);scope.modalWidth=getModalWidth,scope.textAngularOpts=textAngularOpts,noteEditor={modal:$modal({template:"js/view/partial/edit-note.html",show:!0,backdrop:"static",persist:!0,scope:scope}),scope:scope}}noteEditor.titleWatcher&&noteEditor.titleWatcher(),noteEditor.contentWatcher&&noteEditor.contentWatcher(),noteEditor.scope.title=note.title,noteEditor.scope.textAngularOpts.textAngularEditors.note.html=note.content,noteEditor.titleWatcher=createTitleWatcher(noteEditor.scope,note),noteEditor.contentWatcher=createContentWatcher(noteEditor.scope,note)}}),define("view/theme",["require","exports","module","data/theme-repository","view/generic-handlers"],function(require,exports){function setBgColor(color){$("body").css("background-color",color)}var themeRepo=require("data/theme-repository"),genericHandlers=require("view/generic-handlers");exports.init=function(){themeRepo.get(1,{success:function(theme){setBgColor(theme.bgColor)},failure:genericHandlers.error})},exports.setBgColor=function(color){var theme={id:1,bgColor:color};setBgColor(color),themeRepo.update(theme,{success:genericHandlers.noop,failure:genericHandlers.error})}}),define("view/notes",["require","exports","module","view/gridster-size-calculator","data/note-repository","view/edit-note","view/generic-handlers","view/theme"],function(require,exports){var gridsterSizeCalculator=require("view/gridster-size-calculator"),noteRepo=require("data/note-repository"),editNoteCtrl=require("view/edit-note"),genericHandlers=require("view/generic-handlers"),theme=require("view/theme");exports.name="NotesCtrl",exports.controller=function($scope,$location,$document,$timeout,$modal,$sce){function getDefaultGridsterItemOptions(){return{row:1,col:1,size_x:1,size_y:1}}function getDefaultNote(){return{title:"",content:"",dateCreated:new Date,gridsterOptions:getDefaultGridsterItemOptions()}}function saveLayout(notes,gridsterWidgetOptions){_.each(notes,function(note,index){angular.extend(note.gridsterOptions,gridsterWidgetOptions[index])}),noteRepo.updateAll(notes,{success:genericHandlers.noop,failure:genericHandlers.error})}function getNotes(){noteRepo.getAll({success:function(notes){notes.length>0&&($scope.notes=_.sortBy(notes,function(note){return note.gridsterOptions.row}),$scope.$apply())},failure:genericHandlers.error})}var gridsterSize=gridsterSizeCalculator.getSizeInfo({container:".notes",widgetMinWidth:300,widgetMinHeight:250,padding:5});$scope.notes=[],getNotes(),$scope.isAddingNote=!1,$scope.addNote=function(){$scope.isAddingNote||(noteRepo.add(getDefaultNote(),{success:function(note){$scope.notes.push(note),$scope.$apply(),$scope.isAddingNote=!1,$scope.editNote(note)},failure:function(error){genericHandlers.error(error),$scope.isAddingNote=!1}}),$scope.isAddingNote=!0)},$scope.gridster={options:{widget_margins:[5,5],widget_base_dimensions:[gridsterSize.widgetMinWidth,gridsterSize.widgetMinHeight],min_cols:gridsterSize.maxColumns}},$scope.gridsterWidgetOptions=[],$scope.$watch("gridsterWidgetOptions",function(newVal){newVal.length>0&&saveLayout($scope.notes,newVal)}),$scope.bgColor="",$scope.$watch("bgColor",function(newVal){newVal.length>0&&theme.setBgColor(newVal)}),$scope.editNote=function(note){editNoteCtrl.showEditor(note,$scope,$timeout,$modal)},$scope.showDeleteIcon=function(note){return 0===note.content.length},$scope.deleteNote=function(note){var index=_.indexOf($scope.notes,note);$scope.notes.splice(index,1),noteRepo.remove(note.id,{success:genericHandlers.noop,failure:genericHandlers.error})},$scope.trustAsHtml=function(content){return $sce.trustAsHtml(content)}}}),define("view/all-views",["require","exports","module","view/notes","view/theme"],function(require,exports){function registerController(app,controller){app.controller(controller.name,["$scope","$location","$document","$timeout","$modal","$sce",controller.controller])}function configViewRouting(app){app.config(function($routeProvider){$routeProvider.when("/notes",{templateUrl:"js/view/partial/notes.html",controller:notes.name}).otherwise({redirectTo:"/notes"})})}var notes=require("view/notes"),theme=require("view/theme");exports.init=function(){theme.init(),angular.element(document).ready(function(){var noteApp=angular.module("note",["ngRoute","ngSanitize","angular-gridster","$strap.directives","bootstrap-tagsinput","angularFileUpload","styling","textAngular","colorpicker.module"]);configViewRouting(noteApp),registerController(noteApp,notes),angular.bootstrap(document,["note"])})}}),require.config({baseUrl:"js",paths:{data:"./data",view:"./view",partial:"./view/partial",extension:"./extension"}}),require(["data/app-data-loader","view/all-views"],function(loader,views){loader.init({success:views.init,failure:views.init})}),define("app",function(){});