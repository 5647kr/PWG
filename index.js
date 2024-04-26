const pwTxt = document.querySelector(".pwScreen");
const btnContainer = document.querySelector(".btnWrap");
const countNumIpt = document.querySelector(".countIpt");
const genBtn = document.querySelector(".genBtn");

const btnList = `
  <ul>
    <li>
      <button class="number">
        Number<br>
        (0 to 9)
      </button>
    </li>
    <li>
      <button class="lower">
        LowerCase<br>
        (a to z)
      </button>
    </li>
    <li>
      <button class="special">
        SPECIAL<br>
        (!@#$%^&*)
      </button>
    </li>
    <li>
      <button class="upper">
        UpperCase<br>
        (A to Z)
      </button>
    </li>
  </ul>
  `
  btnContainer.innerHTML = btnList;

const settingBtn = document.querySelectorAll(".btnWrap button");
const btnStates = {};

settingBtn.forEach((btn) => {
  btnStates[btn.id] = false;

  btn.addEventListener("click", (e) => {
    btnStates[btn.id] = !btnStates[btn.id];

    if(btnStates[btn.id]) {
      btn.classList.add("activeBtn");
    } else {
      btn.classList.remove("activeBtn");
    }
  })
})

