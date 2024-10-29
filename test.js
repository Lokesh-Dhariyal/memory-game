let arr = []
const hash = new Map()
for (let i = 1; i <= 8; i++) {
  hash.set(i, 0);
}
while(arr.length < 16){
    let num = Math.round(Math.random()*8)
    if(num == 0){
        num +=1;
    }
    hash.set(num,hash.get(num)+1)
    if(hash.get(num)>2){
        hash.set(num,2)
        continue
    }
    else{
        arr.push(num)
    }
}
console.log(arr);
