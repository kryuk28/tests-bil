/*
* возвращает ответы для теста в виде массива символов
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

        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")

        let p=0
        let sum=0

        if (ansKeys[i].length == 5) {
            p=2
        } else if (stKeys.length <= ansKeys[i].length) {
            for(let j=0;j<stKeys.length;j++) {
                if(ansKeys[i].includes(stKeys[j]))
                    sum+=1
            }
            if(sum == ansKeys[i].length) {
                p=2
            } else if(sum < ansKeys[i].length) {
                if (ansKeys[i].length == 2 && sum == 1) {
                    p=1
                } else if (sum > 1) {
                    p=1
                }
            } else {
                p=0
            }

        }
        s+=p;
    }
    return s;
}