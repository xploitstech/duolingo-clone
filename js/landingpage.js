
const headerPath = '../assets/json-animations/header.json';
const floatingPhone = '../assets/json-animations/floating-phone.json';
const stayMotivated = '../assets/json-animations/stay-motivated.json';
const personalisedLearning = '../assets/json-animations/personalised-learning.json';
const backedByScience = '../assets/json-animations/backed-by-science.json';
const freeFunEffective = '../assets/json-animations/free-fun-effective.json';

const alreadyAccountButtonAnimation = () => {
    document.getElementById("already-have-account-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("already-have-account-button").classList.toggle('clicked'), 300)
    window.location.href = "/html/loginpage.html";
}

const getStartedButtonAnimation = () => {
    document.getElementById("get-started-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("get-started-button").classList.toggle('clicked'), 300);
    animationLoader()
    window.location.href = "/html/languages-select-page.html";
}


const animationLoader = (id, path, autoplays = false) => {
    bodymovin.loadAnimation({
        container: document.getElementById(id),
        renderer: 'svg',
        loop: true,
        autoplay: autoplays,
        path: path
    });

}


// setSiteLanguage();

animationLoader("left-logging-header", headerPath, true)
animationLoader("phone-animation", floatingPhone, true)
animationLoader("duolingo-feature-animation-stay-motivated", stayMotivated, true)
animationLoader("duolingo-feature-animation-personalised-learning", personalisedLearning, true)
animationLoader("duolingo-feature-animation-backed-by-science", backedByScience, true)
animationLoader("duolingo-feature-animation-free-fun-effective", freeFunEffective, true)


const setIndexSiteLanguage = (path, language) => {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            document.getElementById('header-text').textContent = data['header-text'];
            document.getElementById('get-started-text').textContent = data['get-started-text'];
            document.getElementById('already-have-account-text').textContent = data['already-have-account-text'];
            document.getElementById('feature-head-1').textContent = data['feature-head-1'];
            document.getElementById('feature-body-1').textContent = data['feature-body-1'];
            document.getElementById('feature-head-2').textContent = data['feature-head-2'];
            document.getElementById('feature-body-2').textContent = data['feature-body-2'];
            document.getElementById('feature-head-3').textContent = data['feature-head-3'];
            document.getElementById('feature-body-3').textContent = data['feature-body-3'];
            document.getElementById('feature-head-4').textContent = data['feature-head-4'];
            document.getElementById('feature-body-4').textContent = data['feature-body-4'];
            document.getElementById('float-heading').textContent = data['float-heading'];
            document.getElementById('bottom-get-started-text').textContent = data['bottom-get-started-text'];
            document.getElementById('site-language').textContent = data['site-language']
            localStorage.setItem("translateLanguage", language)

        })
        .catch(error => console.error('Error fetching JSON:', error));


}

translateLanguage = localStorage.getItem("translateLanguage")
if (translateLanguage != undefined) {
    setIndexSiteLanguage(`../assets/JSON/landing-${translateLanguage}.json`, translateLanguage)
}
else {
    setIndexSiteLanguage(`../assets/JSON/landing-english.json`, 'english')
}

const selectLanguage = (event) =>{
    let button = event.target.closest("button");
    selectedLang = button.querySelector("span").id;
    localStorage.setItem('selectedLang', selectedLang);

    window.location.href = "../html/signup.html";
}
