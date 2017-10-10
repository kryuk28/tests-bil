/*
* возвращает ответы теста в виде массива
* */
export const parseAnswerKey = (keys) => {
    let keysArray = [];
    let current = [];
    let inStack = false
    for(let i=0; i<keys.length;i++) {
        if (keys[i]=="[") {
            current = [];
            inStack = true;
        }
        else if (keys[i]=="]") {
            keysArray.push(current);
            current = [];
            inStack=false;
        } else {
            if (inStack) {
                current.push(keys[i]);
            } else {
                keysArray.push([keys[i]])
                current=[]
            }

        }
    }
    return keysArray;
}

/*
* возвращает правильные ответы для теста
* */
export const check = (ansKeys,studentKeys) => {
    let s=0;
    for (let i=0;i<ansKeys.length;i++) {
        let p=1
        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")
        if (stKeys.length == ansKeys[i].length) {
            for(let j=0; j<stKeys.length;j++) {
                if (ansKeys[i][0] != "+" && !ansKeys[i].includes(stKeys[j]))
                    p = 0
            }
        } else {
            p=0
        }
        s+=p;
    }
    return s;
}