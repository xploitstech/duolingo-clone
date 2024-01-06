const openSuperDuolingoPage = () => {
  document.getElementById("try-super-button").classList.toggle('clicked');
  setTimeout(() => document.getElementById("try-super-button").classList.toggle('clicked'), 200)
  location.href = "../html/superduolingo.html"
}
const closeOtherOpenDialogBoxes = (event) => {

  let currentButton = event.target.closest(".alignment-div").querySelector(".floating-start-box-bottom")
  document.querySelectorAll(".floating-start-box-bottom").forEach((dialog) => {
    if (dialog != currentButton) { dialog.classList.add("hidden") }
  });
}
const openDialogBoxes = (event) => {
  closeOtherOpenDialogBoxes(event);
  let parentDiv = event.target.closest(".alignment-div");
  parentDiv.querySelector(".lesson-button").classList.toggle('clicked')
  parentDiv.querySelector(".floating-start-box-bottom").classList.toggle("hidden");
  setTimeout(() => parentDiv.querySelector(".lesson-button").classList.toggle('clicked'), 150)
  parentDiv.querySelector(".floating-start-box")?.classList.toggle("hidden");
}
let sectionData;
async function fetchSectionData(lang, sectionId) {
  try {
    let response = await fetch(`https://duolingo-serverless-endpoint.vercel.app/api/section-details?lang=${lang}&section=${sectionId}`);
    sectionData = await response.json();
    localStorage.setItem("sectionData", JSON.stringify(sectionData));
    showLessonsInSection();

  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
}
// This should be replaced with value from local storage ========================
fetchSectionData("es", 1);
//======================End of JSON==============================

const placeSectionList = () => {
  let sectionList = `<div class="section-container">
  <div class="middle-dev">
    <h1 class="section-name">Section&nbsp;1:&nbsp;Rookie</h1>
    <div class="status-badge">
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/ee32b843ba0258510aa3d7d4a887cfa8.svg"
      />
      <p >On Progress!</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button" onclick="showLessonsInSection(1)">
        <span class="_1fHYG">Continue</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/rookie-section-banner.svg"
  />
</div>
<div class="section-container locked-section">
  <div class="middle-dev">
    <h1 class="section-name">Section&nbsp;2:&nbsp;Explorer</h1>
    <div class="status-badge">
      <img
        src="../assets/svg/locked-button-grey.svg"
      />
      <p >Locked</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button">
        <span class="_1fHYG">Locked</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/explorer-section-banner.svg"
  />
</div>
<div class="section-container locked-section">
  <div class="middle-dev">
    <h1 class="section-name">Section&nbsp;3:&nbsp;Champion</h1>
    <div class="status-badge">
      <img
        src="../assets/svg/locked-button-grey.svg"
      />
      <p >Locked</p>
    </div>
    <div class="_2n0sJ">
      <button class="section-button">
        <span class="_1fHYG">Locked</span>
      </button>
    </div>
  </div>
  <img
    class="section-banner-image"
    src="../assets/svg/section-images/champion-section-banner.svg"
  />
</div>`
  scrollableContainer = document.querySelector(".scrollable-lesson-div");
  scrollableContainer.innerHTML = ''
  scrollableContainer.insertAdjacentHTML("beforeend", sectionList);
}

const getUserDataFromSessionStorage = () => {
  return JSON.parse(sessionStorage.getItem("user-info"))
}

const placeuserStatistics = () => {
  let userData = getUserDataFromSessionStorage();
  document.querySelectorAll(".fire-text").forEach(item => item.textContent = userData.xp);
  document.querySelectorAll(".heart-text").forEach(item => item.textContent = userData.hearts);
  document.querySelectorAll(".gem-text").forEach(item => item.textContent = userData.gems);
}
const placeUnitsandLessons = (sectionData,userData) => {
  console.log("userdata is ",userData);
  let completedChapters = userData.completedChapters;
  let completedUnits = userData.completedUnits
  let totalChaptersInUnit = sectionData.section.totalChaptersInUnit
  let totalUnitsInSection = sectionData.section.totalUnitsInSection

  console.log(completedChapters,"bulubulu",completedUnits)

  let lockedUnits = totalUnitsInSection - completedUnits - 1;
  let lockedLessons = totalChaptersInUnit - completedChapters - 1;
  let finishedUnitHeader = `
  <header class="unit unit-colorful">
    <h1 class="unit-number">Unit 2</h1>
    <span class="unit-description">
    Introduce yourself, order food and drink</span>
  </header>`

  let incompleteUnitHeader = `
<header class="unit unit-unfinished">
  <h1 class="unit-number">Unit 3</h1>
  <span class="unit-description">
  Talk about countries, ask for directions
  </span>
</header>
`

  let onProgressHtml = `
<div class="circle_box">
  <button class="lesson-button" onclick="openDialogBoxes(event);">
    <img src="../assets/svg/star-in-lesson-white.svg" alt="star" class="star-image">
    <circle-progress value="0" max="100" text-format="none" ></circle-progress>
  </button>
  <div class="floating-start-box">
    <div class="text">
      START
    </div>
    <div class="triangle"></div>
  </div>
</div>
<div class="floating-start-box-bottom hidden">
  <div class="triangle-top"></div>
  <div class="text-container">
    <h1>Form basic sentences</h1>
    <p>Lesson ${sectionData.section.currentLesson + 1} of 4</p>
    <button onclick="startLesson()">Start +10 XP</button>
  </div>
</div>`

  let lockedDiv = `<div class="circle_box locked">
<button class="lesson-button inactive" onclick="openDialogBoxes(event);">
  <img src="../assets/svg/locked-button-grey.svg" alt="locked-button" class="star-image">
</button>
</div>
<div class="floating-start-box-bottom hidden locked">
<div class="triangle-top"></div>
<div class="text-container">
  <h1>Form basic sentences</h1>
  <p>Complete all the levels above to<br>unlock this</p>
  <button>Locked</button>
</div>
</div>`
  let completedDiv = `
<div class="circle_box completed">
  <button
    class="lesson-button inactive"
    onclick="openDialogBoxes(event);"
  >
    <img
      src="../assets/svg/completed-lesson-background.svg"
      alt="finsished-tick"
      class="star-image bg"
    />
    <img
      src="../assets/svg/correct-tick-unit-completed.svg"
      alt="finsished-tick"
      class="star-image"
    />
  </button>
</div>
<div class="floating-start-box-bottom hidden completed">
  <div class="triangle-top"></div>
  <div class="text-container">
    <h1>Form basic sentences</h1>
    <p>You completed this level!</p>
    <button>Practice +5 XP</button>
  </div>
</div>`

  let sectionHeader = `
<div class="sticky">
<div class="right-sidebar-header top-stats-mobile">
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/ja-flag.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/lesson-xp.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button fire-text"></span>
  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/gems-icon.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button gem-text"></span>
  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/svg/heart-filled-red.svg"
        alt="home-icon"
        class="profile"
      />
    </div>
    <span class="text-in-button heart-text"></span>
  </span>
</a>
</div>
<div class="section-name-header">
<div class="arrow" onclick="placeSectionList();"
  ><img alt="" src="../assets/svg/back-button-white.svg"
/>
<img alt="" src="../assets/svg/up-arrow-section.svg"
/></div>
<h2 class="_1Msxm">Section&nbsp;1:&nbsp;Rookie</h2>
</div>
</div>
<div class="unit-placing-div">
<div>
`

  let bottomNavBar = `<div class="sidebar-buttons bottom-nav">
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap selected">
    <div class="icon-in-button">
      <img src="../assets/svg/home-in-sidebar.svg" alt="home-icon" />
    </div>

  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img src="../assets/svg/badge-in-sidebar.svg" alt="home-icon" />
    </div>

  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img
        src="../assets/profile-icon-male.png"
        alt="home-icon"
        class="profile"
      />
    </div>

  </span>
</a>
<a href="" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img src="../assets/svg/more-in-sidebar.svg" alt="home-icon" />
    </div>

  </span>
</a>
<a href="./faq.html" class="button-in-sidebar">
  <span class="icon-and-text-wrap">
    <div class="icon-in-button">
      <img src="../assets/sidebar-icon-faq.png" alt="home-icon" />
    </div>

  </span>
</a>
</div>
`

  let paddingArr = [0, 3, 5, 3, 0, -3, -5, -3, 0];
  let index = 0;

  const calculateTranslate = () => {
    if (paddingArr[index] < 0) {
      return `0 0 0 ${-60 * paddingArr[index++]}px`
    }
    return `0 ${60 * paddingArr[index++]}px 0 0`
  }
  let i = 0;
  const placecompletedChapters = (lessonCount, sectionRef, unitRef, start = 0) => {
    for (i = start; i < lessonCount + start; i++) {
      let circleNode = document.createElement("div");
      circleNode.setAttribute("class", "alignment-div");
      circleNode.style.padding = calculateTranslate();
      circleNode.innerHTML = completedDiv;
      circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[i];
      sectionRef.appendChild(circleNode);
    }
  }

  const placeOngoingLessons = (sectionRef, unitRef, start = 0) => {
    let circleNode = document.createElement("div");
    circleNode.setAttribute("class", "alignment-div");
    circleNode.style.padding = calculateTranslate();
    circleNode.innerHTML = onProgressHtml;
    circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[start];
    sectionRef.appendChild(circleNode);

  }


  const placeLockedLessons = (lessonCount, sectionRef, unitRef, start = 0) => {
    for (let i = start; i < lessonCount + start; i++) {
      let circleNode = document.createElement("div");
      circleNode.setAttribute("class", "alignment-div");
      circleNode.style.padding = calculateTranslate();
      circleNode.innerHTML = lockedDiv;
      circleNode.querySelector("h1").textContent = sectionData.section.units[unitRef].chapters[i];
      sectionRef.appendChild(circleNode);
    }
  }

  let unitCounter = 1;
  scrollableContainer = document.querySelector(".scrollable-lesson-div");
  scrollableContainer.innerHTML = ''
  scrollableContainer.insertAdjacentHTML("beforeend", sectionHeader);
  let lessonContainer = document.querySelector(".unit-placing-div");

  for (i = 0; i < completedUnits; i++) {
    index = 0
    let section = document.createElement("section");
    section.setAttribute("id", `section-${unitCounter++}`);
    section.innerHTML = finishedUnitHeader;
    placecompletedChapters(totalChaptersInUnit, section, unitCounter - 2);
    section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
    section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;

    let firstanimatedSpriteInLesson = document.createElement("div")
    firstanimatedSpriteInLesson.setAttribute("class","animated-sprite-in-lesson-1")
    let animationPath = '../assets/json-animations/duo-unit-one-one.json';

    const animation = bodymovin.loadAnimation({
      container: firstanimatedSpriteInLesson,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationPath
    });

    section.append(firstanimatedSpriteInLesson);

    let secondanimatedSpriteInLesson = document.createElement("div")
    secondanimatedSpriteInLesson.setAttribute("class","animated-sprite-in-lesson-2")
    animationPath = '../assets/json-animations/duo-unit-one-two.json';

    const animation2 = bodymovin.loadAnimation({
      container: secondanimatedSpriteInLesson,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationPath
    });

    section.append(secondanimatedSpriteInLesson);
    lessonContainer.append(section);
  }

  index = 0;
  let section = document.createElement("section");
  section.setAttribute("id", `section-${unitCounter++}`);
  section.innerHTML = incompleteUnitHeader;
  placecompletedChapters(completedChapters, section, unitCounter - 2);
  placeOngoingLessons(section, unitCounter - 2, 3);
  placeLockedLessons(lockedLessons, section, unitCounter - 2, 4);
  section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
  section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;
  lessonContainer.append(section);

  for (i = 0; i < lockedUnits; i++) {
    index = 0;
    let section = document.createElement("section");
    section.setAttribute("id", `section-${unitCounter++}`);
    section.innerHTML = incompleteUnitHeader;
    placeLockedLessons(totalChaptersInUnit, section, unitCounter - 2);
    section.querySelector("h1").textContent = sectionData.section.units[unitCounter - 2].name;
    section.querySelector("span").textContent = sectionData.section.units[unitCounter - 2].description;
    lessonContainer.append(section);
  }

  scrollableContainer.insertAdjacentHTML("beforeend", bottomNavBar);
  placeuserStatistics();
  updateStatistics();
}

const showLessonsInSection = () => {
  let sectionData = JSON.parse(localStorage.getItem("sectionData"));
  let userData=getUserDataFromSessionStorage();
  placeUnitsandLessons(sectionData,userData);
}
// const startNewChapter = () => {
//   console.log("Entering new chapter");
//   let sectionData = JSON.parse(localStorage.getItem("sectionData"));
//   let userData=
//   console.log(sectionData.section.currentLesson)
//   if (sectionData.section.completedChapters + 1 == sectionData.section.totalChaptersInUnit) {
//     sectionData.section.completedUnits += 1;
//     sectionData.section.completedChapters = 0;
//     sectionData.section.currentLesson = 0;
//   } else {
//     sectionData.section.completedChapters += 1;
//     sectionData.section.currentLesson = 0;
//   }
//   localStorage.setItem("sectionData", JSON.stringify(sectionData));
//   setTimeout(() => placeUnitsandLessons(sectionData), 1000);
// }
const updateStatistics = () => {
  console.log("calling updateStatistics");
  let xpFromLesson = parseInt(localStorage.getItem("xpCount"));
  isNaN(xpFromLesson) ? xpFromLesson = 0 : 0
  // console.log(xpFromLesson);
  let sectionData = JSON.parse(localStorage.getItem("sectionData"));
  let userData = getUserDataFromSessionStorage();
  if (xpFromLesson != 0) {
    // // localStorage.removeItem("xpCount");
    // if (sectionData.section.currentLesson >= 3) {
    //   startNewChapter()
    // } else {
    //   sectionData.section.currentLesson += 1;
    //   localStorage.setItem("sectionData", JSON.stringify(sectionData));
      // setTimeout(() => placeUnitsandLessons(sectionData,userData), 1000);
    }
    // userData.xp += xpFromLesson;
    // sessionStorage.setItem("user-info", JSON.stringify(userData));
  
  console.log(sectionData.section.currentLesson);
  setTimeout(() => document.querySelector("circle-progress").value = (25 * (userData.currentLesson-1)), 200);
}

const startLesson = () => {
  document.querySelector(".loading-screen").classList.toggle("hidden");
  setTimeout(() => {
    // document.querySelector(".loading-screen").classList.toggle("hidden");
    window.location.href = "questionarie.html"
  }, 2500);

}

let animationPath = '../assets/json-animations/duo-walking.json';

const animation = bodymovin.loadAnimation({
  container: document.getElementById('owl-walk-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: animationPath
});
