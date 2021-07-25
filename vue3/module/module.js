export function myEach(array,callback){
    array.forEach((v) => {
        callback && callback(v)
    })
}