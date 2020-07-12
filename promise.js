class Promise{
    constructor(extrect){
        this.state = 'pending';// 定义promise状态
        this.value = '';//定义成功的返回值
        this.reason = '';//定义失败的返回值
        this.onFuiFilledCallbacks = [];//成功的回调
        this.onRejectedCallbacks = [];//失败的回调
        //定义成功的回调函数
        let resolve = (value) => {
            // 判断是否是pending状态，是则执行，不是则返回
            if(this.state === 'pending'){
                this.state = 'fulFilled';
                this.value = value;
                this.onFuiFilledCallbacks.forEach((fn) => fn());
            }
        }
        //定义失败的回调函数
        let reject = (reason) => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn());
            }
        }
        
        try{
            extrect(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    // 定义then方法
    then(onFuilled,onRejected){
        if(this.state === 'fulFilled'){
            onFuilled(this.value)
        };
        if(this.state === 'rejected'){
            onRejected(this.reason)
        };
        if(this.state === 'pending'){
            this.onFuiFilledCallbacks.push(() => onFuilled(this.value));
            this.onRejectedCallbacks.push(() => onRejected(this.reason))
        }
    }
}

let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        // resolve('success');
        reject('error')
    },1000)
})
p.then((res) => {
    console.log(res);
},(err) => {
    console.log(err);
})