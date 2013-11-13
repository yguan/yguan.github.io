
(function ( window , undefined ) {
    
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.oIndexedDB || window.msIndexedDB,
        IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange,
        transactionModes = {
            readonly: 'readonly',
            readwrite: 'readwrite'
        };
        
    var hasOwn = Object.prototype.hasOwnProperty;

    if ( !indexedDB ) {
        throw 'IndexedDB required';
    }

    var CallbackList = function () {
        var state,
            list = [];

        var exec = function ( context , args ) {
            if ( list ) {
                args = args || [];
                state = state || [ context , args ];

                for ( var i = 0 , il = list.length ; i < il ; i++ ) {
                    if (list[i]) {
                        list[ i ].apply( state[ 0 ] , state[ 1 ] );
                    }
                }

                list = [];
            }
        };

        this.add = function () {
            for ( var i = 0 , il = arguments.length ; i < il ; i ++ ) {
                list.push( arguments[ i ] );
            }

            if ( state ) {
                exec();
            }

            return this;
        };

        this.execute = function () {
            exec( this , arguments );
            return this;
        };
    };

    var Deferred = function ( func ) {
        var state = 'progress',
            actions = [
                [ 'resolve' , 'done' , new CallbackList() , 'resolved' ],
                [ 'reject' , 'fail' , new CallbackList() , 'rejected' ],
                [ 'notify' , 'progress' , new CallbackList() ],
            ],
            deferred = {},
            promise = {
                state: function () {
                    return state;
                },
                then: function ( /* doneHandler , failedHandler , progressHandler */ ) {
                    var handlers = arguments;

                    return Deferred(function ( newDefer ) {
                        actions.forEach(function ( action , i ) {
                            var handler = handlers[ i ];

                            deferred[ action[ 1 ] ]( typeof handler === 'function' ?
                                function () {
                                    var returned = handler.apply( this , arguments );

                                    if ( returned && typeof returned.promise === 'function' ) {
                                        returned.promise()
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject )
                                            .progress( newDefer.notify );
                                    }
                                } : newDefer[ action[ 0 ] ]
                            );
                        });
                    }).promise();
                },
                promise: function ( obj ) {
                    if ( obj ) {
                        Object.keys( promise )
                            .forEach(function ( key ) {
                                obj[ key ] = promise[ key ];
                            });

                        return obj;
                    }
                    return promise;
                }
            };

        actions.forEach(function ( action , i ) {
            var list = action[ 2 ],
                actionState = action[ 3 ];

            promise[ action[ 1 ] ] = list.add;

            if ( actionState ) {
                list.add(function () {
                    state = actionState;
                });
            }

            deferred[ action[ 0 ] ] = list.execute;
        });

        promise.promise( deferred );

        if ( func ) {
            func.call( deferred , deferred );
        }

        return deferred;
    };

    var Server = function ( db , name ) {
        var that = this,
            closed = false;

        this.add = function( table ) {
            if ( closed ) {
                throw 'Database has been closed';
            }

            var records = [];
            for (var i = 0; i < arguments.length - 1; i++) {
                records[i] = arguments[i + 1];
            }

            var transaction = db.transaction( table , transactionModes.readwrite ),
                store = transaction.objectStore( table ),
                deferred = Deferred();
            
            records.forEach( function ( record ) {
                var req;
                if ( record.item && record.key ) {
                    var key = record.key;
                    record = record.item;
                    req = store.add( record , key );
                } else {
                    req = store.add( record );
                }

                req.onsuccess = function ( e ) {
                    var target = e.target;
                    var keyPath = target.source.keyPath;
                    if ( keyPath === null ) {
                        keyPath = '__id__';
                    }
                    Object.defineProperty( record , keyPath , {
                        value: target.result,
                        enumerable: true
                    });
                    deferred.notify();
                };
            } );
            
            transaction.oncomplete = function () {
                deferred.resolve( records , that );
            };
            transaction.onerror = function ( e ) {
                deferred.reject( records , e );
            };
            transaction.onabort = function ( e ) {
                deferred.reject( records , e );
            };
            return deferred.promise();
        };

        this.update = function( table ) {
            if ( closed ) {
                throw 'Database has been closed';
            }

            var records = [];
            for ( var i = 0 ; i < arguments.length - 1 ; i++ ) {
                records[ i ] = arguments[ i + 1 ];
            }

            var transaction = db.transaction( table , transactionModes.readwrite ),
                store = transaction.objectStore( table ),
                keyPath = store.keyPath,
                deferred = Deferred();

            records.forEach( function ( record ) {
                var req;
                if ( record.item && record.key ) {
                    var key = record.key;
                    record = record.item;
                    req = store.put( record , key );
                } else {
                    req = store.put( record );
                }

                req.onsuccess = function ( e ) {
                    deferred.notify();
                };
            } );
            
            transaction.oncomplete = function () {
                deferred.resolve( records , that );
            };
            transaction.onerror = function ( e ) {
                deferred.reject( records , e );
            };
            transaction.onabort = function ( e ) {
                deferred.reject( records , e );
            };
            return deferred.promise();
        };
        
        this.remove = function ( table , key ) {
            if ( closed ) {
                throw 'Database has been closed';
            }
            var transaction = db.transaction( table , transactionModes.readwrite ),
                store = transaction.objectStore( table ),
                deferred = Deferred();
            
            var req = store.delete( key );
            transaction.oncomplete = function ( ) {
                deferred.resolve( key );
            };
            transaction.onerror = function ( e ) {
                deferred.reject( e );
            };
            return deferred.promise();
        };
        
        this.close = function ( ) {
            if ( closed ) {
                throw 'Database has been closed';
            }
            db.close();
            closed = true;
            delete dbCache[ name ];
        };

        this.get = function ( table , id ) {
            if ( closed ) {
                throw 'Database has been closed';
            }
            var transaction = db.transaction( table ),
                store = transaction.objectStore( table ),
                deferred = Deferred();

            var req = store.get( id );
            req.onsuccess = function ( e ) {
                deferred.resolve( e.target.result );
            };
            transaction.onerror = function ( e ) {
                deferred.reject( e );
            };
            return deferred.promise();
        };

        this.query = function ( table , index ) {
            if ( closed ) {
                throw 'Database has been closed';
            }
            return new IndexQuery( table , db , index );
        };

        for ( var i = 0 , il = db.objectStoreNames.length ; i < il ; i++ ) {
            (function ( storeName ) {
                that[ storeName ] = { };
                for ( var i in that ) {
                    if ( !hasOwn.call( that , i ) || i === 'close' ) {
                        continue;
                    }
                    that[ storeName ][ i ] = (function ( i ) {
                        return function () {
                            var args = [ storeName ].concat( [].slice.call( arguments , 0 ) );
                            return that[ i ].apply( that , args );
                        };
                    })( i );
                }
            })( db.objectStoreNames[ i ] );
        }
    };

    var IndexQuery = function ( table , db , indexName ) {
        var that = this;
        var runQuery = function ( type, args , cursorType , direction ) {
            var transaction = db.transaction( table ),
                store = transaction.objectStore( table ),
                index = indexName ? store.index( indexName ) : store,
                keyRange = type ? IDBKeyRange[ type ].apply( null, args ) : null,
                results = [],
                deferred = Deferred(),
                indexArgs = [ keyRange ];

            if ( cursorType !== 'count' ) {
                indexArgs.push( direction || 'next' );
            };

            index[cursorType].apply( index , indexArgs ).onsuccess = function ( e ) {
                var cursor = e.target.result;

                if ( typeof cursor === typeof 0 ) {
                    results = cursor;
                } else if ( cursor ) {
                    results.push( 'value' in cursor ? cursor.value : cursor.key );
                    cursor.continue();
                }
            };

            transaction.oncomplete = function () {
                deferred.resolve( results );
            };
            transaction.onerror = function ( e ) {
                deferred.reject( e );
            };
            transaction.onabort = function ( e ) {
                deferred.reject( e );
            };
            return deferred.promise();
        };

        var Query = function ( type , args ) {
            var direction = 'next',
                cursorType = 'openCursor',
                filters = [],
                unique = false;

            var execute = function () {
                var deferred = Deferred();
                
                runQuery( type , args , cursorType , unique ? direction + 'unique' : direction )
                    .then( function ( data ) {
                        if ( data.constructor === Array ) {
                            filters.forEach( function ( filter ) {
                                if ( !filter || !filter.length ) {
                                    return;
                                }

                                if ( filter.length === 2 ) {
                                    data = data.filter( function ( x ) {
                                        return x[ filter[ 0 ] ] === filter[ 1 ];
                                    });
                                } else {
                                    data = data.filter( filter[ 0 ] );
                                }
                            });
                        }
                        deferred.resolve( data );
                    }, deferred.reject , deferred.notify );
                ;

                return deferred.promise();
            };
            var count = function () {
                direction = null;
                cursorType = 'count';

                return {
                    execute: execute
                };
            };
            var keys = function () {
                cursorType = 'openKeyCursor';

                return {
                    desc: desc,
                    execute: execute,
                    filter: filter,
                    distinct: distinct
                };
            };
            var filter = function ( ) {
                filters.push( Array.prototype.slice.call( arguments , 0 , 2 ) );

                return {
                    keys: keys,
                    execute: execute,
                    filter: filter,
                    desc: desc,
                    distinct: distinct
                };
            };
            var desc = function () {
                direction = 'prev';

                return {
                    keys: keys,
                    execute: execute,
                    filter: filter,
                    distinct: distinct
                };
            };
            var distinct = function () {
                unique = true;
                return {
                    keys: keys,
                    count: count,
                    execute: execute,
                    filter: filter,
                    desc: desc
                };
            };

            return {
                execute: execute,
                count: count,
                keys: keys,
                filter: filter,
                desc: desc,
                distinct: distinct
            };
        };
        
        'only bound upperBound lowerBound'.split(' ').forEach(function (name) {
            that[name] = function () {
                return new Query( name , arguments );
            };
        });

        this.filter = function () {
            var query = new Query( null , null );
            return query.filter.apply( query , arguments );
        };

        this.all = function () {
            return this.filter();
        };
    };
    
    var createSchema = function ( e , schema , db ) {
        if ( typeof schema === 'function' ) {
            schema = schema();
        }
        
        for ( var tableName in schema ) {
            var table = schema[ tableName ];
            if ( !hasOwn.call( schema , tableName ) || db.objectStoreNames.contains( tableName ) ) {
                continue;
            }

            var store = db.createObjectStore( tableName , table.key );

            for ( var indexKey in table.indexes ) {
                var index = table.indexes[ indexKey ];
                store.createIndex( indexKey , index.key || indexKey , Object.keys(index).length ? index : { unique: false } );
            }
        }
    };
    
    var open = function ( e , server , version , schema ) {
        var db = e.target.result;
        var s = new Server( db , server );
        var upgrade;

        var deferred = Deferred();
        deferred.resolve( s );
        dbCache[ server ] = db;

        return deferred.promise();
    };

    var dbCache = {};

    var db = {
        version: '0.8.0',
        open: function ( options ) {
            var request;

            var deferred = Deferred();

            if ( dbCache[ options.server ] ) {
                open( {
                    target: {
                        result: dbCache[ options.server ]
                    }
                } , options.server , options.version , options.schema )
                .done(deferred.resolve)
                .fail(deferred.reject)
                .progress(deferred.notify);
            } else {
                request = indexedDB.open( options.server , options.version );
                            
                request.onsuccess = function ( e ) {
                    open( e , options.server , options.version , options.schema )
                        .done(deferred.resolve)
                        .fail(deferred.reject)
                        .progress(deferred.notify);
                };
            
                request.onupgradeneeded = function ( e ) {
                    createSchema( e , options.schema , e.target.result );
                };
                request.onerror = function ( e ) {
                    deferred.reject( e );
                };
            }

            return deferred.promise();
        }
    };
    if ( typeof define === 'function' && define.amd ) {
        define( 'lib/db',[],function() { return db; } );
    } else {
        window.db = db;
    }
})( window );

/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define('data/idb',['require','exports','module','lib/db'],function (require, exports, module) {
    

    var db = require('lib/db'),
        idb = {
            schema: {
                note: {
                    key: {
                        keyPath: 'id',
                        autoIncrement: true
                    },
                    indexes: {
                        title: {},
                        dateCreated: {},
                        dateModified: {}
                    }
                },
                theme: {
                    key: {
                        keyPath: 'id',
                        autoIncrement: false
                    },
                    indexes: {}
                }
            },
            loadIndexedDB: function (op) {
                var me = this;

                if (me.db) {
                    return;
                }
                db.open({
                    server: 'app-db',
                    version: 1,
                    schema: me.schema
                })
                    .done(function (dbInstance) {
                        me.db = dbInstance;
                        op && op.success && op.success(dbInstance);
                    })
                    .fail(function (error) {
                        op && op.failure && op.failure(error);
                    });
            },
            db: null,
            get: function (dbKey, id, op) {
                idb.db[dbKey]
                    .get(id)
                    .done(function (item) {
                        op.success(item);
                    })
                    .fail(op.failure);
            },
            create: function (dbKey, item, op) {
                idb.db[dbKey].add(item).done(function (results) {
                    op.success(results[0]);
                }).fail(op.failure);
            },
            add: function (dbKey, item, uniqueItemKey, op) {
                var me = this;

                me.findExact(dbKey, uniqueItemKey, item[uniqueItemKey], {
                    success: function (results) {
                        if (results && results.length > 0) {
                            var oldItem = results[0];
                            _.extend(oldItem, item);
                            me.update(dbKey, oldItem, {
                                success: function (results) {
                                    op.success(results[0]);
                                },
                                failure: op.failure
                            });
                        } else {
                            me.create(dbKey, item, op);
                        }
                    },
                    failure: op.failure
                });
            },
            findAll: function (dbKey, filterFn, op) {
                idb.db[dbKey]
                    .query()
                    .filter(filterFn)
                    .execute()
                    .done(op.success)
                    .fail(op.failure);
            },
            findAllByKey: function (dbKey, key, value, op) {
                idb.db[dbKey]
                    .query(key)
                    .only(value)
                    .execute()
                    .done(op.success)
                    .fail(op.failure);
            },
            findExact: function (dbKey, key, value, op) {
                idb.db[dbKey].query(key).only(value).execute().done(op.success).fail(op.failure);
            },
            update: function (dbKey, item, op) {
                idb.db[dbKey]
                    .update(item)
                    .done(op.success)
                    .fail(op.failure);
            },
            each: function (dbKey, eachFn, op) {
                idb.db[dbKey]
                    .query()
                    .filter(function (item) {
                        eachFn(item);
                        return false;
                    })
                    .execute()
                    .done(op.success)
                    .fail(op.failure);
            },
            getAll: function (dbkey, op) {
                idb.db[dbkey]
                    .query()
                    .all()
                    .execute()
                    .done(op.success)
                    .fail(op.failure);
            },
            export: function (op) {
                var dbKeys = Object.keys(this.schema),
                    data = {},
                    dbKeysCount = dbKeys.length,
                    dataKeyCount = 0,
                    addData = function (key, items) {
                        data[key] = items;
                        dataKeyCount = dataKeyCount + 1;

                        if (dbKeysCount === dataKeyCount) {
                            op.success(data);
                        }
                    };

                _.each(dbKeys, function (key) {
                    idb.db[key]
                        .query()
                        .all()
                        .execute()
                        .done(function (items) {
                            addData(key, items);
                        }).fail(op.failure);
                });
            },
//        addAll: function (dbKey, items, uniqueKey, op) {
//            var me = this,
//                i = 0,
//                len = items.length;
//
//            function addNext() {
//                if (i < len) {
//                    me.add(dbKey, items[i], uniqueKey, {
//                        success: function () {
//                            ++i;
//                            addNext();
//                        },
//                        failure: function () {
//                            op.failure();
//                        }
//                    });
//                } else {   // complete
//                    op.success();
//                }
//            }
//            addNext();
//        },
            updateAll: function (dbKey, items, op) {
                var i = 0,
                    len = items.length,
                    db = idb.db[dbKey];

                function updateNext() {
                    if (i < len) {
                        db.update(items[i]).done(function () {
                            i = i + 1;
                            updateNext();
                        }).fail(op.failure);
                    } else {   // complete
                        op.success();
                    }
                }

                updateNext();
            },
            remove: function (dbKey, id, op) {
                idb.db[dbKey].remove(id).done(op.success).fail(op.error);
            }
        };

    module.exports = idb;

});

/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define('data/theme-repository',['require','exports','module','data/idb'],function (require, exports, module) {
    
    var idb = require('data/idb'),
        dbKey = 'theme';

    module.exports = {
        create: function (theme, op) {
            idb.create(dbKey, theme, op);
        },
        get: function (id, op) {
            idb.get(dbKey, id, op);
        },
        update: function (theme, op) {
            idb.update(dbKey, theme, op);
        }
    };

});

/*jslint nomen: true*/
/*global $,define,require,angular,window */

define('data/app-data-loader',['require','exports','module','data/idb','data/theme-repository'],function (require, exports, module) {
    

    var idb = require('data/idb');

    /**
     * init should be called first and wait for loadIndexedDB completed before calling other methods
     */
    exports.init = function (op) {
        idb.loadIndexedDB({
            success: function () {
                var themeRepo = require('data/theme-repository');
                themeRepo.get(1, {
                    success: function (theme) {
                        if (!theme) {
                            themeRepo.create({
                                id: 1,
                                bgColor: '#220e58'
                            }, op);
                        } else {
                            op.success();
                        }
                    },
                    failure: op.failure
                });
            },
            failure: op.failure
        });
    };
});
/*jslint nomen: true*/
/*global $,define,require,angular,window */

define('view/gridster-size-calculator',['require','exports','module'],function (require, exports, module) {
    

    function getGridsterSize(gridsterContainerSelector) {
        var container = angular.element(gridsterContainerSelector).first();

        return {
            height: container.height(),
            width: container.width()
        };
    }

    exports.getSizeInfo = function (config) {
        var gridsterSize = getGridsterSize(config.container),
            widgetWidthWithPadding = config.widgetMinWidth + config.padding || 0,
            numberOfWidget = Math.floor(gridsterSize.width / widgetWidthWithPadding),
            remainder = gridsterSize.width % widgetWidthWithPadding,
            adjustedWidgetWidth = remainder > 0 ? (remainder / numberOfWidget + config.widgetMinWidth) : config.widgetMinWidth;

        return {
            widgetMinWidth: adjustedWidgetWidth,
            widgetMinHeight: config.widgetMinHeight,
            maxColumns: Math.floor(gridsterSize.width / config.widgetMinWidth),
            maxRows: Math.floor(gridsterSize.height / config.widgetMinHeight)
        };
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,window,_ */

define('data/note-repository',['require','exports','module','data/idb'],function (require, exports, module) {
    
    var idb = require('data/idb'),
        dbKey = 'note';

    module.exports = {
        add: function (note, op) {
            idb.create(dbKey, note, op);
        },
        addAll: function (notes, op) {
            var me = this,
                i = 0,
                len = notes.length,
                errorCount = 0;

            function addNext() {
                if (i < len) {
                    me.add(notes[i], {
                        success: function () {
                            i = i + 1;
                            addNext();
                        },
                        failure: function () {
                            errorCount = errorCount + 1;
                        }
                    });
                } else {   // complete
                    if (errorCount === 0) {
                        op.success();
                    } else {
                        op.failure();
                    }
                }
            }

            addNext();
        },
        remove: function (id, op) {
            idb.remove(dbKey, id, op);
        },
        findByKey: function (key, value, op) {
            idb.findAllByKey(dbKey, key, value, op);
        },
        findByTitle: function (keywords, op) {
            var lowercaseKeywords = _.map(keywords, function (keyword) {
                    return keyword.toLowerCase();
                }),
                keywordCount = keywords.length;

            idb.findAll(dbKey, function (note) {
                var matchedCount = 0,
                    title = note.title.toLowerCase();
                _.each(lowercaseKeywords, function (keyword) {
                    if (title.indexOf(keyword) !== -1) {
                        matchedCount = matchedCount + 1;
                    }
                });
                return keywordCount === matchedCount;
            }, op);
        },
        update: function (note, op) {
            idb.update(dbKey, note, op);
        },
        updateAll: function (notes, op) {
            idb.updateAll(dbKey, notes, op);
        },
        each: function (fn, op) {
            idb.db[dbKey]
                .query()
                .filter(function (item) {
                    fn(item);
                    return false;
                })
                .execute()
                .done(op.success)
                .fail(op.failure);
        },
        getAll: function (op) {
            idb.getAll(dbKey, op);
        }
    };

});

/*jslint nomen: true*/
/*global $,define,require,angular,window,console */

define('view/generic-handlers',['require','exports','module'],function (require, exports, module) {
    

    exports.noop = function () {
    };

    exports.error = function (error) {
        console.log(error);
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,window */

define('view/edit-note',['require','exports','module','data/note-repository','view/generic-handlers'],function (require, exports, module) {
    

    var noteRepo = require('data/note-repository'),
        genericHandlers = require('view/generic-handlers'),
        textAngularOpts = {
            textAngularEditors: {
                note: {
                    toolbar: [
                        {icon: '<i class="fa fa-code"></i>', name: 'html', title: 'Toggle Html'},
                        {icon: 'h1', name: 'h1', title: 'H1'},
                        {icon: 'h2', name: 'h2', title: 'H2'},
                        {icon: 'h3', name: 'h3', title: 'H3'},
                        {icon: 'pre', name: 'pre', title: 'Pre'},
                        {icon: '<i class="fa fa-bold"></i>', name: 'b', title: 'Bold'},
                        {icon: '<i class="fa fa-italic"></i>', name: 'i', title: 'Italics'},
                        {icon: 'p', name: 'p', title: 'Paragraph'},
                        {icon: '<i class="fa fa-list-ul"></i>', name: 'ul', title: 'Unordered List'},
                        {icon: '<i class="fa fa-list-ol"></i>', name: 'ol', title: 'Ordered List'},
                        {icon: '<i class="fa fa-align-left"></i>', name: 'justifyLeft', title: 'Justify Left'},
                        {icon: '<i class="fa fa-align-center"></i>', name: 'justifyCenter', title: 'Justify Center'},
                        {icon: '<i class="fa fa-align-right"></i>', name: 'justifyRight', title: 'Justify Right'},
                        {icon: '<i class="fa fa-ban"></i>', name: 'clear', title: 'Clear'},
                        {icon: '<i class="fa fa-file"></i>', name: 'insertImage', title: 'Insert Image'},
                        {icon: '<i class="fa fa-html5"></i>', name: 'insertHtml', title: 'Insert Html'},
                        {icon: '<i class="fa fa-link"></i>', name: 'createLink', title: 'Create Link'},
                        {icon: '<i class="fa fa-rotate-right"></i>', name: 'redo', title: 'Redo'},
                        {icon: '<i class="fa fa-undo"></i>', name: 'undo', title: 'Undo'}
                    ],
                    html: '',
                    disableStyle: false,
                    theme: {
                        editor: {
                            'font-family': 'Roboto',
                            'font-size': '1.2em',
                            'color': 'black',
                            'border-radius': '4px',
                            'padding': '11px',
                            'background': 'white',
                            'border': '1px solid rgba(2,2,2,0.1)'
                        },
                        insertFormBtn: {
                            'background': 'red',
                            'color': 'white',
                            'padding': '2px 3px',
                            'font-size': '15px',
                            'margin-top': '4px',
                            'border-radius': '4px',
                            'font-family': 'Roboto',
                            'border': '2px solid red'
                        }
                    }
                }

            }
        },
        getModalWidth = function () {
            var element = angular.element('.notes').first();
            return {
                'width': (element.width() - 200) + 'px'
            };
        },
        noteEditor;

    exports.showEditor = function (note, $scope, $timeout, $modal) {
        function createContentWatcher(scope, note) {
            return scope.$watch('textAngularOpts.textAngularEditors.note.html', function (newVal, oldVal) {
                $timeout(function () {
                    note.content = scope.textAngularOpts.textAngularEditors.note.html;
                    note.dateModified = new Date();
                    noteRepo.update(note, {succes: genericHandlers.noop, failure: genericHandlers.error});
                }, 200);
            }, true);
        }

        function createTitleWatcher(scope, note) {
            return scope.$watch('title', function (newVal, oldVal) {
                $timeout(function () {
                    note.title = newVal;
                    note.dateModified = new Date();
                    noteRepo.update(note, {succes: genericHandlers.noop, failure: genericHandlers.error});
                }, 200);
            }, true);
        }

        if (noteEditor) {
            noteEditor.modal.then(function (modalEl) {
                modalEl.modal('show');
            });
        } else {
            var scope = $scope.$new(true);
            scope.modalWidth = getModalWidth;
            scope.textAngularOpts = textAngularOpts;

            noteEditor = {
                modal: $modal({
                    template: 'js/view/partial/edit-note.html',
                    show: true,
                    backdrop: 'static',
                    persist: true,
                    scope: scope
                }),
                scope: scope
            };
        }

        if (noteEditor.titleWatcher) {
            noteEditor.titleWatcher();
        }
        if (noteEditor.contentWatcher) {
            noteEditor.contentWatcher();
        }

        noteEditor.scope.title = note.title;
        noteEditor.scope.textAngularOpts.textAngularEditors.note.html = note.content;

        noteEditor.titleWatcher = createTitleWatcher(noteEditor.scope, note);
        noteEditor.contentWatcher = createContentWatcher(noteEditor.scope, note);
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,document */

define('view/theme',['require','exports','module','data/theme-repository','view/generic-handlers'],function (require, exports, module) {
    

    var themeRepo = require('data/theme-repository'),
        genericHandlers = require('view/generic-handlers');

    function setBgColor(color) {
        $('body').css('background-color', color);
    }

    exports.init = function () {
        themeRepo.get(1, {
            success: function (theme) {
                setBgColor(theme.bgColor);
            },
            failure: genericHandlers.error
        });
    };

    exports.setBgColor = function (color) {
        var theme = {
            id: 1,
            bgColor: color
        };

        setBgColor(color);

        themeRepo.update(theme, {
            success: genericHandlers.noop,
            failure: genericHandlers.error
        });
    };

});
/*jslint nomen: true*/
/*global $,define,require,angular,window,console,_ */

define('view/notes',['require','exports','module','view/gridster-size-calculator','data/note-repository','view/edit-note','view/generic-handlers','view/theme'],function (require, exports, module) {
    

    var gridsterSizeCalculator = require('view/gridster-size-calculator'),
        noteRepo = require('data/note-repository'),
        editNoteCtrl = require('view/edit-note'),
        genericHandlers = require('view/generic-handlers'),
        theme = require('view/theme');

    exports.name = 'NotesCtrl';

    exports.controller = function ($scope, $location, $document, $timeout, $modal, $sce) {
        var gridsterSize = gridsterSizeCalculator.getSizeInfo({
            container: '.notes',
            widgetMinWidth: 300,
            widgetMinHeight: 250,
            padding: 5
        });

        $scope.notes = [];

        function getDefaultGridsterItemOptions() {
            return {row: 1, col: 1, size_x: 1, size_y: 1};
        }

        function getDefaultNote() {
            return {
                title: '',
                content: '',
                dateCreated: new Date(),
                gridsterOptions: getDefaultGridsterItemOptions()
            };
        }

        function saveLayout(notes, gridsterWidgetOptions) {
            _.each(notes, function (note, index) {
                angular.extend(note.gridsterOptions, gridsterWidgetOptions[index]);
            });
            noteRepo.updateAll(notes, {success: genericHandlers.noop, failure: genericHandlers.error});
        }

        function getNotes() {
            noteRepo.getAll({
                success: function (notes) {
                    if (notes.length > 0) {
                        $scope.notes = _.sortBy(notes, function (note) {
                            return note.gridsterOptions.row;
                        });
                        $scope.$apply();
                    }
                },
                failure: genericHandlers.error
            });
        }

        getNotes();

        $scope.isAddingNote = false;

        $scope.addNote = function () {
            if ($scope.isAddingNote) {
                return;
            }
            noteRepo.add(getDefaultNote(), {
                success: function (note) {
                    $scope.notes.push(note);
                    $scope.$apply();
                    $scope.isAddingNote = false;
                    $scope.editNote(note);
                },
                failure: function (error) {
                    genericHandlers.error(error);
                    $scope.isAddingNote = false;
                }
            });
            $scope.isAddingNote = true;
        };

        $scope.gridster = {
            options: {
                widget_margins: [5, 5],
                widget_base_dimensions: [gridsterSize.widgetMinWidth, gridsterSize.widgetMinHeight],
                min_cols: gridsterSize.maxColumns
            }
        };
        $scope.gridsterWidgetOptions = [];

        $scope.$watch('gridsterWidgetOptions', function (newVal, oldVal) {
            if (newVal.length > 0) {
                saveLayout($scope.notes, newVal);
            }
        });

        $scope.bgColor = '';

        $scope.$watch('bgColor', function (newVal, oldVal) {
            if (newVal.length > 0) {
                theme.setBgColor(newVal);
            }
        });

        $scope.editNote = function (note) {
            editNoteCtrl.showEditor(note, $scope, $timeout, $modal);
        };

        $scope.showDeleteIcon = function (note) {
            return note.content.length === 0;
        };

        $scope.deleteNote = function (note) {
            var index = _.indexOf($scope.notes, note);
            $scope.notes.splice(index, 1);

            noteRepo.remove(note.id, { success: genericHandlers.noop, failure: genericHandlers.error });
        };

        $scope.trustAsHtml = function (content) {
            return $sce.trustAsHtml(content);
        };
    };
});

/*jslint nomen: true*/
/*global $,define,require,angular,document */

define('view/all-views',['require','exports','module','view/notes','view/theme'],function (require, exports, module) {
    

    var notes = require('view/notes'),
        theme = require('view/theme');

    function registerController(app, controller) {
        app.controller(controller.name, ['$scope', '$location', '$document', '$timeout', '$modal', '$sce', controller.controller]);
    }

    function configViewRouting(app) {
        app.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/notes', {templateUrl: 'js/view/partial/notes.html', controller: notes.name})
                .otherwise({redirectTo: '/notes'});
        });
    }

    exports.init = function () {
        theme.init();

        angular.element(document).ready(function () {
            var noteApp = angular.module('note', [
                'ngRoute',
                'ngSanitize',
                'angular-gridster',
                '$strap.directives',
                'bootstrap-tagsinput',
                'angularFileUpload',
                'styling',
                'textAngular',
                'colorpicker.module'
            ]);

            configViewRouting(noteApp);
            registerController(noteApp, notes);
            angular.bootstrap(document, ['note']);
        });
    };

});
/*jslint nomen: true*/
/*global $,define,require */

require.config({
    baseUrl: 'js',
    paths: {
        data: './data',
        view: './view',
        partial: './view/partial',
        extension: './extension'
    }
});

require(['data/app-data-loader', 'view/all-views'], function (loader, views) {
    

    loader.init({
        success: views.init,
        failure: views.init
    });
});

define("app", function(){});
