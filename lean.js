class MyPromise{
    constructor(executor){
        try{
            executor(this.resolve,this.rejected)
        }catch(e){
            this.rejected(e)
        }
    }

    status = 'pending';
    value = '';
    reason = '';
    successCallback = [];
    errorCallback = [];

    resolve = (value) => {
        if(this.status === 'pending'){
            this.status = 'fulFilled'
            this.value = value
            while(this.successCallback.length) this.successCallback.shift()(value)
        }
    }

    rejected = (reason) => {
        if(this.status === 'pending'){
            this.status = 'rejected'
            this.reason = reason
            while(this.errorCallback.length) this.errorCallback.shift()(reason)
        }
    }

    then(successCallback,errorCallback){
        successCallback = successCallback ? successCallback : value => value;
        errorCallback = errorCallback ? errorCallback : reason => {throw reason};
        let promise2 = new MyPromise((resolve,rejected) => {
            if(this.status === 'fulFilled'){
                setTimeout(() => {
                    try{
                        let x = successCallback(this.value)
                        this.resolvePromise(promise2,x,resolve,rejected)
                    }catch(e){
                        rejected(e)
                    }
                },0)
            }
            if(this.status === 'rejected'){
                setTimeout(() => {
                    try{
                        let x = errorCallback(this.reason)
                        this.resolvePromise(promise2,x,resolve,rejected)
                    }catch(e){
                        rejected(e)
                    }
                },0)
            }
            if(this.status === 'pending'){
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try{
                            let x = successCallback(this.value)
                            this.resolvePromise(promise2,x,resolve,rejected)
                        }catch(e){
                            rejected(e)
                        }
                    },0)
                });
                this.errorCallback.push(() => {
                    setTimeout(() => {
                        try{
                            let x = errorCallback(this.reason)
                            this.resolvePromise(promise2,x,resolve,rejected)
                        }catch(e){
                            rejected(e)
                        }
                    },0)
                });
            }
        })
        return promise2
    }

    resolvePromise(promise2,x,resolve,rejected){
        if(promise2 === x){
            return rejected(new TypeError('promise对象发生了循环引用'))
        }
        if(x instanceof MyPromise){
            x.then(resolve,rejected)
        }else{
            resolve(x)
        }
    }

    finall(callback){
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => value)
        },(reason) => {
            return MyPromise.resolve(callback()).then(() => {throw reason})
        })
    }

    catch(fileCallback){
        return this.then(undefined,fileCallback)
    }

    static all(array){
        let result = [];//返回的结果数组
        let index = 0;
        return new MyPromise((resolve,rejected) => {
            function addResult(key,value){
                result[key] = value;
                index++;
                if(index === array.length) resolve(result)
            }
            array.forEach((v,k) => {
                if(v instanceof MyPromise){
                    v.then(value => addResult(k,value),reason => rejected(reason))
                }else{
                    addResult(k,v)
                }
            })
        })
    }

    static resolve(value){
        if(value instanceof MyPromise) return value;
        return new MyPromise((resolve,rejected) => resolve(value))
    }

    static rejected(value){
        if(value instanceof MyPromise) return value;
        return new MyPromise((resolve,rejected) => rejected(value))
    }
}

let promise = new MyPromise((resolve,rejected) => {
    setTimeout(() => {
        // resolve('success');
        rejected('error')
    },2000)
})

function other(){
    return new MyPromise((resolve,rejected) => {
        resolve('other')
    })
}

promise.then((res) => console.log(res)).catch(reason => console.log(reason))