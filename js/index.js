let index = 0;
let attempts = 0;
let timer;
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

    const youWin = () => {
        const div = document.createElement("div");
        div.innerText = "You are genius!";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.position = "fixed";
        div.style.width = "30vw";          
        div.style.height = "30vh";         
        div.style.backgroundColor = "#F6D7E5"; 
        div.style.borderRadius = "15px";
        div.style.color = "#9F6580";          
        div.style.fontSize = "24px";
        div.style.fontWeight = "bold";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)"; // 요소의 절반 크기만큼 이동
        document.body.appendChild(div);
    }

    const nextLine = () => {
        if (attempts === 6) return gameOver();
        attempts += 1;
        index = 0;
    };

    const updateKeyboardColor = (key, color) => {
        const keyBlock = document.querySelector(`.keyboard-column[data-key='${key.toUpperCase()}']`);
        if (keyBlock) {
            keyBlock.style.backgroundColor = color;
            keyBlock.style.color = "white"; // 키보드 글자색도 변경
        }
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
                block.style.background = "#6AAA64"; // 초록색
                updateKeyboardColor(입력한_글자, "#6AAA64"); // 키보드도 초록색
            } 
            else if (정답.includes(입력한_글자)) {
                block.style.background = "#C9B458"; // 노란색
                updateKeyboardColor(입력한_글자, "#C9B458"); // 키보드도 노란색
            } 
            else {
                block.style.background = "#787C7E"; // 회색
                updateKeyboardColor(입력한_글자, "#787C7E"); // 키보드도 회색
            }
            block.style.color = "white";
        }

        if ((맞은_갯수 === 5) || (attempts === 5)) youWin();
        else nextLine();
    };

    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(
                `.board-block[data-index='${attempts}${index - 1}']`
            );
            preBlock.innerText = "";
            index -= 1;
        }
    };

    const handleKeydown = (key) => {
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        
        if (key === "BACKSPACE") handleBackspace();
        else if (index === 5) {
            if (key === 'ENTER') handleEnterKey();
            else return;
        } else if (key.length === 1 && /^[A-Z]$/.test(key)) {
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
        
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", (event) => handleKeydown(event.key.toUpperCase()));

    // 클릭 이벤트 추가
    const keyboardColumns = document.querySelectorAll(".keyboard-column");
    keyboardColumns.forEach((key) => {
        key.addEventListener("click", () => {
            const keyValue = key.dataset.key.toUpperCase();
            handleKeydown(keyValue);
        });
    });
}

appStart();
