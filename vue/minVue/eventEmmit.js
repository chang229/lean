class EventEmmit{
    constructor(){
        this.subs = {}
    }

    $on(type,fn){
        this.subs[type] = this.subs[type] || [];
        this.subs[type].push(fn);
    }

    $emit(type){
        if(this.subs[type]){
            this.subs[type].forEach((fn) => fn())
        }
    }
}

let em = new EventEmmit();

em.$on('click',() => {
    console.log('click1')
})

em.$on('click',() => {
    console.log('click2')
})

em.$emit('click');