let index = 0;
let attempts = 0;
let timer
const 정답 = "APPLE";

function appStart() {

    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.position = "fixed";       
        div.style.top = "0";
        div.style.left = "0";
        div.style.width = "100vw";          
        div.style.height = "100vh";         
        div.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
        div.style.color = "white";          
        div.style.fontSize = "24px";
        document.body.appendChild(div);
    };

    const gameOver = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    };

    const nextLine = () => {
        if (attempts === 6) return gameOver();
        attempts += 1;
        index = 0;
    };

    const handleEnterKey = () => {
        let 맞은_갯수 = 0;
        for(let i = 0; i < 5; i++){
            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );

            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자) {
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";
            } 
            else if (정답.includes(입력한_글자)) block.style.background = "#C9B458"; 
            else block.style.background = "#787C7E";
            block.style.color = "white";
        }

        if ((맞은_갯수 === 5) || (attempts === 5)) gameOver();
        else nextLine();
    };

    const handleBackspace = () => {
        if (index > 0) {
        const preBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index - 1}']`);
        preBlock.innerText = "";
        }
        if (index !==0) index -= 1;
    }
    // handleKeydown을 외부에 선언하여 동일한 참조 유지
    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        
        if (event.key === "Backspace") handleBackspace();
        else if (index === 5) {
            if (event.key === 'Enter') handleEnterKey();
            else return;
        } else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index += 1;
            if (index === 5) return;
        }
    };

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2,"0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `time: ${분}:${초}`;
        }
        
        timer = setInterval(setTime,1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
}

appStart();
