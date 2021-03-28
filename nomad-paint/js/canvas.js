// pixel 을 다룰 수 있는 element 로서 만드는 것이므로 높이와 너비를 지정
const canvas = document.getElementById("jsCanvas");

// 실제 pixel 사이즈를 주어야 작동 (pixel modifier) // 픽셀을 다루는 윈도우의 크기를 알려준다.
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// canvas 는 context 를 갖음
// 요소 안에서 픽셀에 접근할 수 있는 방법
const ctx = canvas.getContext("2d"); // 이 안에서 픽셀들을 컨트롤
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INIT_COLOR = "#2c2c2c";

// canvas 가 pixel 을 다뤄서 이미지를 만들어주기 때문에 우클릭으로 이미지 저장 가능
// canvas 의 배경색을 설정하지 않아서 배경색이 투명하게 저장된다.
// 하얀 배경 넣기
ctx.fillStyle = "white"; // 하얀 배경
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INIT_COLOR; // 선의 기본 색상 설정
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5; // 선의 너비(굵기)

let painting = false;
let filling = false;

// HTMLCanvasElement.toDataURL()
// 지정된 포맷의 이미지 표현을 포함한 data URI를 반환
function saveBtnClick(event){
    const image = canvas.toDataURL(); // default png
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]"; // download = anchor("a") 태그의 속성 // 저장되는 이미지의 이름
    link.click(); // fakeClick
}

function rightClick(event){
    // context menu
    event.preventDefault();
}

function canvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function modeBtnClick(event){
    if(filling === true){
        filling = false;
        modeBtn.innerText = "Fill";
    } else {
        filling = true;
        modeBtn.innerText = "Paint";
        // width 와 height 에 의해 결정된 사이즈로 (x, y) 위치에 색칠된 사각형을 그린다.
    }
}

function rangeChange(event){
    // console.log(event) check
    const size = event.target.value;
    ctx.lineWidth = size;
}

function colorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // override
    ctx.fillStyle = color;
}

function startPainting(){
    if(filling === false){ // filling 상태에서 드래그 시 선이 그려지는 현상 해결
        painting = true;
    }
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){ // 모든 움직임을 감지 // 마우스를 움직이는 내내 발생
    // offset - 캔버스와 관련있는 값
    // client X,Y - 윈도우 전체의 범위 내에서 마우스 위치값(좌표)을 나타냄
    const x = event.offsetX; // console.log(event)
    const y = event.offsetY;
    if(!painting){ // 클릭하지 않았을 때 → 그림을 그리고 있지 않을 때
        ctx.beginPath(); // 선을 그리기 전까지 계속 path를 초기화 해주는 기능
        ctx.moveTo(x, y); // 선의 시작 좌표 // 선을 그리려할 때 시작점을 선택해주는 역할
    } else { // 클릭했을 때
        ctx.lineTo(x, y); // 선의 끝 좌표 // 선의 마지막 지점을 이전 좌표에 이어 연결 → 계속 그리는 것 처럼 표현
        ctx.stroke(); // 선을 그리기
    }
}

if(saveBtn){
    saveBtn.addEventListener("click", saveBtnClick);
}

if(modeBtn){
    modeBtn.addEventListener("click", modeBtnClick);
}

if(range){
    range.addEventListener("input", rangeChange);
}

// HTMLcollection
// array.from 메소드는 객체로부터 배열을 만든다.
// 배열 값을 forEach 문을 이용해 color 값을 가질 수 있다.
Array.from(colors).forEach(color =>
    color.addEventListener("click", colorClick)
);

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // 움직임을 감지
    canvas.addEventListener("mousedown", startPainting); // 클릭했을 때 발생하는 이벤트
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", rightClick); // 오른쪽 클릭
}