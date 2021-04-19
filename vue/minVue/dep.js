class Dep{
    constructor(){
        this.subs = []
    }

    addSubs(sub){
        if(sub && sub.update){
            this.subs.push(sub)
        }
    }

    notify(){
        this.subs.forEach((sub) => sub.update())
    }
}

class Watcher{
    update(){
        console.log('watcher')
    }
}

let dep = new Dep();
let watch = new Watcher();

dep.addSubs(watch);
dep.notify();