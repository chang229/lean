(function(modules){
    // 缓存加载过后的模块
    let installedModules = {};

    // 定义inStalledChunks用于标识某个 chunkId 对应的chunk是否完成了加载
    // main:0;表示已经加载过了
    // main:'pending';表示正在加载
    // main:undefined;表示没有加载
    let inStalledChunks = {
        main:0
    };

    // 定义webpackJsonpCallback方法，实现：合并模块定义，改变promise状态执行后续行为
    function webpackJsonpCallback(data){
        //获取需要被动态加载的模块id
        let chunkIds = data[0];
        // 获取需要被动态加载的模块的依赖关系对象
        let moreModules = data[1];

        let chunkId,resolves = [];
        // 循环判断chunkIds里面的模块内容是否已经完成了加载
        for(let i = 0; i < chunkIds.length; i++){
            chunkId = chunkIds[i];
            if(Object.prototype.hasOwnProperty.call(inStalledChunks,chunkId) && inStalledChunks[chunkId]){
                resolves.push(inStalledChunks[chunkId][0])
            }
            // 更新当前chunk的状态
            inStalledChunks[chunkId] = 0;
        }

        // 合并模块
        for( let moduleId in moreModules){
            if(Object.prototype.hasOwnProperty.call(moreModules,moduleId)){
                modules[moduleId] = moreModules[moduleId]
            }
        }

        while(resolves.length){
            resolves.shift()();
        }
    }

    // 定义一个__webpack_require__方法用于替换import require加载操作
    function __webpack_require__(moduleId){
        // 判断当前缓存中使用存在要加载的模块，如果有则直接返回
        if(installedModules[moduleId]){
            return installedModules[moduleId].exports;
        }
        // 如果当前缓存中不存在要加载的模块，则执行加载模块
        let module = installedModules[moduleId] = {
            i:moduleId,
            l:false,
            exports:{}
        }
        // 调用当前moduleId对应的函数，执行模块的加载
        modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);
        // 当上述方法执行完之后，就可以修改 l 的值为true，表示当前模块已经加载完成了
        module.l = true;
        // 加载完成之后将拿到的内容返回给调用的地方
        return module.exports;
    }

    // 定义一个m属性用于保存传入的modules
    __webpack_require__.m = modules;

    // 定义一个c属性用于保存缓存对象
    __webpack_require__.c = installedModules;

    // 定义一个o方法用于判断一个对象上是否有指定的属性
    __webpack_require__.o = function(object,attr){
        return Object.prototype.hasOwnProperty(object,attr)
    }

    // 定义一个d方法用于为对象添加指定的属性，同时给该属性添加一个getter
    __webpack_require__.d = function(exports,name,getter){
        if(!__webpack_require__.o(exports,name)){
            Object.defineProperty(exports,name,{enumerable:true,get:getter})
        }
    }

    // 定义一个r属性，用于判断当前模块是否是ESModule模块
    __webpack_require__.r = function(exports){
        if(typeof Symbol !== undefined && Symbol.toStringTag){
            Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'})
        }
        Object.defineProperty(exports,'__esModule',{value:true})
    }

    // 定义一个n方法，用于处理具体的getter
    __webpack_require__.n = function(module){
        let getter = module && module.__esModule ?
                    function getDefault(){return module['default']}:
                    function getModuleExports(){return module};
        __webpack_require__.d(getter,'a',getter);
        return getter;
    }

    // 定义jsonpScriptSrc方法，实现src的处理
    function jsonpScriptSrc(chunkId){
        return __webpack_require__.p + '' + chunkId + '.budile.js'
    }

    //定义e方法用于实现：实现jsonp来加载内容，利用promise来实现异步加载操作
    __webpack_require__.e = function(chunkId){
        // 定义一个数组用于保存promise
        let promises = [];
        // 获取chunkId对应的chunk是否已经完成了加载
        let inStalledChunkData = inStalledChunks[chunkId];
        // 已经当前是否已经完成加载的状态来执行后续的路径
        if(inStalledChunkData !== 0){
            if(inStalledChunkData){
                promises.push(inStalledChunkData[2])
            }else{
                let promise = new Promise((resolve,rejected) => {
                    inStalledChunkData = inStalledChunks[chunkId] = [resolve,rejected]
                })
                promises.push(inStalledChunkData[2] = promise);
                // 创建script标签
                let script = document.createElement('script');
                // 设置script的src属性
                script.src = jsonpScriptSrc(chunkId);
                // 写入script标签
                document.head.appendChild(script)
            }
        }

        // 执行promise
        return Promise.all(promises)
    }

    // 定义一个t方法，用于加载指定value的模块内容，之后对内容处理后再返回
    __webpack_require__.t = function(value,mode){
        if(mode & 1) value = __webpack_require__(value);
        if(mode & 8) return value;
        if(mode & 4 && typeof value === 'object' && value && value.__esModule){
            return value
        } 

        let ns = Object.create(null);

        __webpack_require__.r(ns);

        Object.defineProperty(ns,'default',{enumerable:true,default:value});

        if(mode & 2 && typeof value !== 'string'){
            for(let k in value){
                __webpack_require__.d(ns,key, function(key){
                    return value[key]
                }.bind(null,key))
            }
        }
        return ns;
    }

    // 定义一个p属性，用于保存资源访问路径
    __webpack_require__.p = '';

    // 定义变量存放数组
    let jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] || [];

    // 保持原生的push方法
    let oldJsonpFunction = jsonpArray.push.bind(jsonpArray);

    // 重写原生的push方法
    jsonpArray.push = webpackJsonpCallback;

    // 执行__webpack_require__方法，执行模块导入与加载操作
    return __webpack_require__(__webpack_require__.s = './src/index.js')
})({
    "./src/index.js":
        /*! no static exports found */
        (function(module, exports, __webpack_require__) {
        let btn = document.getElementById('btn');
        btn.addEventListener('click',function(){
            __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7)).then((name) => {
                console.log(name);
            })
        })
        console.log('index 内容')
        })
})