let btn = document.getElementById('btn');

btn.addEventListener('click',function(){
    import(/*webpackChunkName:login*/'./login.js').then((name) => {
        console.log(name);
    })
})

console.log('index 内容')