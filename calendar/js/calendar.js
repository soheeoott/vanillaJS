const calDate = new Date();

// 화살표
const prevArrow = document.querySelector(".prev");
const nextArrow = document.querySelector(".next");

const renderCalendar = () => {  
    calDate.setDate(1);    
    
    const calMonthDays = document.querySelector(".days");
    
    // 이번 달의 마지막 날
    const lastDay = new Date(
        calDate.getFullYear(),
        calDate.getMonth() + 1, 0
    ).getDate(); 

    // 이전 달 계산
    // 이전 달의 마지막 날
    const prevLastDay = new Date(
        calDate.getFullYear(),
        calDate.getMonth(), 0
    ).getDate();

    // 매월 1일의 인덱스 번호
    const firstDayIndex = calDate.getDay();
    
    // 다음 달 계산
    const lastDayIndex = new Date(
        calDate.getFullYear(),
        calDate.getMonth() + 1, 0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    // 인덱스 번호
    const calMonths = [
        "1월", "2월", "3월", "4월", "5월",
        "6월", "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    const calMonthBigText = document.querySelector(".date h1");
    calMonthBigText.innerHTML = calMonths[calDate.getMonth()];
    
    // 현재 날짜를 읽을 수 있는 형식으로 반환
    // new Date 하여 정확한 날짜를 받아온다.
    const calMonthSubText = document.querySelector(".date p");
    calMonthSubText.innerHTML = new Date().toDateString();

    let days = "";

    // 이전 달
    for (let x = firstDayIndex; x > 0; x--){
        days += `<div class="prev-date">
        ${prevLastDay - x + 1}</div>`;
    }

    // (1~31)일 출력 
    for (let i = 1; i <= lastDay; i++){
        // 현재 날짜 강조
        if(i === new Date().getDate() && calDate.getMonth()
            === new Date().getMonth()){
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    // 다음 달
    for (let j = 1; j <= nextDays; j++){
        days += `<div class="next-date">${j}</div>`;
        calMonthDays.innerHTML = days;
    }
};

// 클릭할 때 달력을 생성해주어야 하므로 renderCalendar 함수를 호출
function prevClick(){
    calDate.setMonth(calDate.getMonth()-1); // -1 : 이전 달
    renderCalendar();    
}

function nextClick(){
    calDate.setMonth(calDate.getMonth()+1); // +1 : 다음 달
    renderCalendar();
}

prevArrow.addEventListener("click", prevClick);
nextArrow.addEventListener("click", nextClick);

renderCalendar();