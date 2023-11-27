// 현재 날짜를 가져옴
let date = new Date();

// 캘린더를 렌더링하는 함수
const renderCalender = () => {
  // 현재 보고 있는 연도와 월
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 년도와 월을 화면에 표시
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 이전 달의 마지막 날과 이번 달의 마지막 날
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  // 이전 달의 마지막 날짜와 요일
  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  // 이번 달의 마지막 날짜와 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // 이전 달, 이번 달, 다음 달 날짜 배열
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // 이전 달 날짜 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // 다음 달 날짜 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // 모든 날짜를 하나의 배열로 결합
  const dates = prevDates.concat(thisDates, nextDates);
  // 이번 달 날짜 시작과 끝 인덱스
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  // 날짜를 HTML 요소로 변환
  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  // 날짜를 화면에 렌더링
  document.querySelector('.dates').innerHTML = dates.join('');

  // 오늘 날짜 강조
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

// 캘린더 최초 렌더링
renderCalender();

// 이전 달로 이동하는 함수
const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

// 다음 달로 이동하는 함수
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

// 오늘 날짜로 돌아가는 함수
const goToday = () => {
  date = new Date();
  renderCalender();
};
