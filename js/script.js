var user_name, time, x, y, fish_code, z, score, ochk, animFish, fish_number, fish_n = 10;
var record=[];

var
    block_start = document.getElementById("start"),
    block_game = document.getElementById("game"),
    block_result = document.getElementById("result"),
    intervalID, idButtonStart,
    fish_img = document.getElementById("fish"),
    idButtonStart = document.getElementById("startbutton"),
    pause_state = true;
idButtonStart.addEventListener("click", play);
document.getElementById("play_again").addEventListener("click", game_info)
document.body.addEventListener("click", function (a) {
    if (a.target.className == "fish") {
        play_click_fish(a.target);

    }
});
document.getElementById("start_return").addEventListener("click",return_start);
function return_start(){
    block_game.style.display="none";
    block_result.style.display="none";
    block_start.style.display="block";
    document.getElementById("input_name").value="";
    document.getElementById("startbutton").style.display="none";
}
//var clas = querySelectorAll(".fish").addEventListener("mousedown", play_click_fish);
//Enter play
window.addEventListener("keydown", function (key) {
    if (key.keyCode == 13 
    && getComputedStyle(document.getElementById("start")).display == "block" 
    && document.getElementById("input_name").value.length >= 3) {
        play();
    }
});
//Ввод в input
document.getElementById("input_name").addEventListener("input", function () {
    // console.log(document.getElementById("input_name"));
    if (document.getElementById("input_name").value.length < 3)
        idButtonStart.style.display = "none";
    else
        idButtonStart.style.display = "block";


});

//проверка имени
var timeset;
function play() {
    if (isFinite(document.getElementById("start_fish").value)
    && isFinite(document.getElementById("start_time").value)){
        user_name = document.getElementById("input_name").value;
        timeset=document.getElementById("start_time").value;
        fish_n=document.getElementById("start_fish").value;
        game_info(); //Следующая функция
    }
    else {
        document.getElementById("no_auth").style.display = "block";
    }

}
//пауза
window.addEventListener("keydown", pause_space);
document.getElementById("pause").addEventListener("mousedown", pause);
function pause_space(key) {
    if (key.keyCode == 32 && getComputedStyle(document.getElementById("game")).display == "block") {
        pause();
    }
}
function pause() {
    var class_fish = document.getElementsByClassName("fish");
    if (pause_state) {
        clearInterval(intervalID);
        // console.log(class_fish.length);
        for (i = 0; i < class_fish.length; i++) {
            class_fish[i].style.animationPlayState = "paused";
            // console.log(class_fish[i]);
        }
        pause_state = false;
    }
    else {
        intervalID = setInterval(fish_info, 1000);
        for (i = 0; i < class_fish.length; i++) {
            class_fish[i].style.animationPlayState = "running";
            // console.log(class_fish[i]);
        }
        pause_state = true;
    }
}
//начало игры
function game_info() {
    fish_number = 0;
    document.getElementById("fish").innerHTML = "";
    document.getElementById("score").innerHTML = "Cчёт игрока:";
    document.getElementById("name_player").innerHTML = 0;
    score = 0;
    document.getElementById("result_score").innerHTML = "Ваш счёт:"
    block_result.style.display = "none";
    block_start.style.display = "none";
    block_game.style.display = "block";
    document.getElementById("user_name").innerHTML = "Имя игрока: " + user_name;
    intervalID = setInterval(fish_info, 1000);
    time=timeset;
}
var new_div;
function create_fish() {
    if (fish_number <= fish_n) {
        new_div = document.createElement("div");
        new_div.className = "fish";
        var div = document.getElementById("fish").appendChild(new_div);
        fish_click(div);
        fish_number++;
        if(fish_number <5){
            new_div = document.createElement("div");
        new_div.className = "fish";
        var div = document.getElementById("fish").appendChild(new_div);
        fish_click(div);
        fish_number++;
        }
    }
}
//прогонка таймера
function fish_info() {
    if (time <= 0) {
        document.getElementById("timer").innerHTML = '';
        clearInterval(intervalID);
        finish_player();
    }
    else {
        if (time <= 9)
            document.getElementById("timer").innerHTML = "Таймер:00:0" + time;
        else
            document.getElementById("timer").innerHTML = "Таймер:00:" + time;
        time--;
        create_fish();
    }
}
function fish_click(a) {
    fish_code = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    animFish = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    a.style.animationName = "anime" + animFish;
    a.style.backgroundImage = "url('image/" + fish_code + ".png')";
    a.style.backgroundSize = "cover";

}
var fish_number;
function play_click_fish(fish_score) {
    fish_code = +window.getComputedStyle(fish_score).backgroundImage.match(/image\/([0-9]+)\.png/)[1];
    if (pause_state) {  
        ochk = 0;
        console.log(fish_code);

        switch (fish_code) {
            case 1:
                ochk = 10;
                score = score + ochk;
                break;
            case 2:
                ochk = 20;
                score = score + ochk;
                break;
            case 3:
                ochk = 30;
                score = score + ochk;
                break;
            case 4:
                ochk = 50;
                score = score + ochk;
                break;
            case 5:
                ochk = 40;
                score = score + ochk;
                break;
            case 6:
                ochk = 15;
                score = score + ochk;
                break;
        }
        document.getElementById("score").innerHTML = "Cчёт игрока: " + score;
        fish_score.remove();
        fish_number--;
    
    }
}
function finish_player() {
    block_start.style.display = "none";
    block_game.style.display = "none";
    block_result.style.display = "block";
    document.getElementById("time").innerHTML="Время: "+timeset+ " секунд"; 
    document.getElementById("result_score").innerHTML = document.getElementById("result_score").innerHTML + score;
    document.getElementById("name_player").innerHTML = "Ник:" + user_name;
    /*record.unshift(score);
    for (i = 0; i < record.length; i++) {
        document.getElementById("record").innerHTML=document.getElementById("record")+ record[i] +"<br>";
    }/*/
    
}

