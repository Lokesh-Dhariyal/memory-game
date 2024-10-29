const start = document.getElementById("start");
const main = document.getElementById("main");
let final = document.getElementById("final");
let win = document.getElementById("winner");
let move = 0;
let moves = document.getElementById("moves");
let arr = [];
let time = 0;
let times = document.getElementById("time");
let stop = document.getElementById("stop");
let some;

start.addEventListener('click',()=>{
    if(start.innerHTML == "Again?"){
        window.location.reload();
    }
    win.innerHTML = "";
    setTimeout(function (){
    win.style.visibility = "hidden";
    final.style.visibility = "hidden";
    main.style.filter = "blur(0px)";
    win.style.visibility = "hidden";
        make();
        change(arr);
        flip(arr);
        wakt();
        stop.style.visibility = "visible";
    },300)
    start.style.visibility = "hidden";
    
})

function stopp(){
    stop.style.visibility = "hidden";
    start.style.visibility = "visible";
    time = 0;
    times.innerHTML = "time(sec) : 0";
    move = 0;
    moves.innerHTML = "moves : 0";
    let box = document.querySelectorAll(".outer");
    box.forEach((front) => {
        for (let i = 0; i < 16; i++) {
            if (front.id == `o${i + 1}`) {
                front.style.transform = "rotateY(0deg)";
            }
        }
    });
    clearInterval(some);
}

stop.addEventListener('click',()=>{
    window.location.reload();
})

function wakt(){
    some = setInterval(function () {
        time++;
        times.innerHTML = `time(sec) : ${time}`;
    }, 1000);
}

function make(){
    arr = [];
    const hash = new Map();
    for (let i = 1; i <= 8; i++) {
        hash.set(i, 0);
    }
    while (arr.length < 16) {
        let num = Math.round(Math.random() * 8);
        if (num == 0) {
            num += 1;
        }
        hash.set(num, hash.get(num) + 1);
        if (hash.get(num) > 2) {
            hash.set(num, 2);
            continue;
        } else {
            arr.push(num);
        }
    }
}

function change(array){
    let hold = document.querySelectorAll(".back");
    hold.forEach(back=>{
        for(let i = 1; i<=16; i++){
            if (back.id == `back${i}`) {
                back.style.backgroundImage = `url(./img/${array[i-1]}.png)`;
                back.style.backgroundSize = "cover";
                back.style.backgroundRepeat = "no-repeat"
            }
        }
    })
}

function flip(arr){
    let temp = [];
    let hold1 = "";
    let hash = new Map();
    let hold2 = "";
    let box = document.querySelectorAll(".outer");
    box.forEach(back=>{
        for(let i=1;i<=16;i++){
            hash.set(`o${i}`,0);
        }
        back.addEventListener("click", () => {
            for (let i = 0; i < arr.length; i++) {
                    if (back.id == `o${i + 1}` && hash.get(`o${i + 1}`) == 0) {
                        hash.set(`o${i + 1}`, 1);
                        back.style.transform = "rotateY(180deg)";
                        temp.push(arr[i]);
                        if (temp.length == 1) {
                            hold1 = back;
                        } else if (temp.length == 2) {
                            hold2 = back;
                        }
                        break;
                    }
                }
                if (temp.length >= 2 && temp[0] == temp[1]) {
                    temp = [];
                      hold1 = "";
                      hold2 = "";
                      move++;
                      moves.innerHTML = `moves : ${move}`
                    } else if (temp.length >= 2 && temp[0] != temp[1]) {
                        move++;
                        moves.innerHTML = `moves : ${move}`;
                        setTimeout(function () {
                            hold1.style.transform = "rotateY(0deg)";
                            hold2.style.transform = "rotateY(0deg)";
                        }, 600);
                        hash.set(hold1.id, 0);
                        hash.set(hold2.id, 0);
                        temp = [];
                        setTimeout(function(){
                            hold1 = "";
                            hold2 = "";
                        },700)
                    }
                    let cnt = 0;
                    for (let i = 1; i <= 16; i++) {
                        if (hash.get(`o${i}`) == 1) {
                            cnt++;
                        }
                    }
                    if (cnt == 16) {
                        winner();
                    }
                })
            })
        }
        function winner(){
                final.innerHTML = `Time(sec) = ${time} and Moves = ${move}`
                stopp();
                win.innerHTML = "WINNER";
                win.style.fontSize = "12em"
                win.style.visibility = "visible";
                win.style.opacity = "0";
                start.style.top = "70%";
                setTimeout(function(){
                        win.style.opacity = "1";
                        final.style.visibility = "visible";
                },1000)
                main.style.filter = "blur(5px)";
                start.innerHTML = "Again?"
}
