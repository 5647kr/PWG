const btnContainer = document.querySelector(".btnWrap");

// 버튼 생성
const btnList = `
  <ul>
    <li>
      <button id="number">
        Number<br>
        (0 to 9)
      </button>
    </li>
    <li>
      <button id="lower">
        LowerCase<br>
        (a to z)
      </button>
    </li>
    <li>
      <button id="special">
        SPECIAL<br>
        (!@#$%^&*)
      </button>
    </li>
    <li>
      <button id="upper">
        UpperCase<br>
        (A to Z)
      </button>
    </li>
  </ul>
  `
  btnContainer.innerHTML = btnList;
  const genBtn = document.querySelector(".genBtn");

  // input 숫자 이벤트 처리
  
  const countIpt = document.querySelector("#count");
  let count = 0;

  countIpt.addEventListener("input", () => {
    const numCheck = /[^0-9]/g;
  
    // 숫자 이외의 문자열 처리
    let iptNum = countIpt.value.replace(numCheck, "");
  
    //1~20까지만 받도록 처리
    iptNum = Math.min(parseInt(iptNum, 10), 20);

    // 입력된 값 갱신
    countIpt.value = iptNum.toString();

    // 값 업데이트
    count = parseInt(iptNum, 10);
    updateGenBtnState();
  })

  // 버튼 이벤트 처리
  const conditionBtns = document.querySelectorAll(".btnWrap button");
  let activeBtnList = [];
  
  conditionBtns.forEach((btn) => {
    // 버튼 상태
    btn.state = "false";
    
    btn.addEventListener("click", (e) => {
      btn.state === "false" ? e.target.state = "true" : e.target.state = "false"
      if(btn.state === "true") {
        btn.classList.add("activeBtn");
        activeBtnList.push(btn.id);
      } else {
        btn.classList.remove("activeBtn");
        activeBtnList = activeBtnList.filter((id) => id !== btn.id);
      }
      updateGenBtnState();
    })
  })
  
  // 생성버튼 상태관리
  function updateGenBtnState() {
    const genBtn = document.querySelector(".genBtn");
    if (count >= 1 && count <= 20 && activeBtnList.length > 0) {
      genBtn.classList.add("activeBtn");
      genBtn.removeAttribute("disabled");
    } else {
      genBtn.classList.remove("activeBtn");
      genBtn.setAttribute("disabled", "");
    }
  }
  
  const pwShow = document.querySelector(".pwScreen");
  const password = document.querySelector(".password");

  // pw생성함수
  function pwGenerator() {
    // 이전 pw 초기화
    while (pwShow.firstChild) {
      pwShow.removeChild(pwShow.firstChild);
    }

    const pattern = [
      {"number": "0123456789"},
      {"lower": "abcdefghijklmnopqrstuvwxyz"},
      {"upper": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"},
      {"special": "!@#$%^&*"}
    ]
    let pwOption = "";
    let pw = "";

    for (let item of pattern) {
      for (let key in item) {
        const value = item[key];

        activeBtnList.forEach((btn) => {
          if(key.includes(btn)) {
            pwOption += value;
          }
        })
      }
    }
    
    for (let i = 0; i < count; i++) {
      pw += pwOption.charAt(Math.floor(Math.random() * pwOption.length));
    };

    password.innerText = pw;
    pwShow.appendChild(password);
  }
  
  // 모든 버튼과 input값 초기화
  function resetInputs() {
    countIpt.value = "";
    count = 0;
    activeBtnList = [];
    conditionBtns.forEach((btn) => {
      btn.state = "false";
      btn.classList.remove("activeBtn");
    });
    updateGenBtnState();
  }
  
  // pw list 생성 및 복사 삭제 기능
  function createPwList() {
    const pwList = document.querySelector(".pwList");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const copyBtn = document.createElement("button");
    const delBtn = document.createElement("button");
  
    span.innerText = password.innerText;
  
    copyBtn.classList.add("copyBtn");
    copyBtn.innerText = "Copy";

    // 클립보드에 복사 기능 추가
    copyBtn.addEventListener("click", () => {
      const textToCopy = span.innerText;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert("복사 되었습니다!")
        })
    });
  
    delBtn.innerText = "Delete";
    delBtn.classList.add("delBtn");
    // 삭제 기능 추가
    delBtn.addEventListener("click", () => {
      li.remove();
    });
  
    li.appendChild(span);
    li.appendChild(copyBtn);
    li.appendChild(delBtn);

    // li가 10개 초과일 경우 아래부터 li 삭제
    if (pwList.children.length > 8) {
      pwList.lastChild.remove();
    }

    // 내림차순
    if (pwList.firstChild) {
      pwList.insertBefore(li, pwList.firstChild);
    } else {
      pwList.appendChild(li);
    }
  }
  

  genBtn.addEventListener("click", () => {
    pwGenerator()
    resetInputs()
    createPwList()
  })



