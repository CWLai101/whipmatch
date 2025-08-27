console.log("JavaScript is working!");

let currentCar = null; 
let correctCount = 0;
let totalCount = 0;
let remainingCars = [];

function getPerformanceRating() {
    const accuracy = (correctCount / totalCount) * 100;
    if (accuracy === 100) return "Perfect Score 🌟🌟🌟";
    if (accuracy >= 80) return "Excellent! 🌟🌟";
    if (accuracy >= 60) return "Good Job! 🌟";
    return "Keep Practicing! 💪";
}


function hideAllSections() {
    document.querySelector(".menubuttons").style.display = "none";
    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("flagSection").style.display = "none";
    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("finalScorePage").style.display = "none";
    document.querySelector(".titleScreen").style.display = "none";
    document.getElementById("gameCompleteTitle").style.display = "none";


}
function showFinalScore() {
    hideAllSections();
    document.getElementById('gameCompleteTitle').style.display = "block";
    document.getElementById('finalScorePage').style.display = "block";

    document.getElementById('finalscoretext').textContent = `Your Score: ${correctCount}/${totalCount}`;
    document.getElementById('accuracyText').textContent = `Accuracy: ${Math.round((correctCount/totalCount)*100)}%`;
    document.getElementById('ratingText').textContent = getPerformanceRating();
}
function playagain() {
    hideAllSections();
    document.getElementById('flagSection').style.display = "block";
}
function gotoMainMenu() {
    hideAllSections();
    document.querySelector('.titleScreen').style.display = "block";
    document.querySelector('.menubuttons').style.display = "block";
}
function showAbout () 
{
    hideAllSections();
    document.getElementById("aboutSection").style.display = "block";
}


function startGame(mode) {

    document.querySelector(".menubuttons").style.display = "none";
    document.getElementById("gameSection").style.display = "block";

    //mode to set up game logic
    if (mode === 'country') {
        document.querySelector('.countryRandomContainer').style.display = 'none';
        document.getElementById('flagSection').style.display = 'block';
        document.getElementById('countryTitle').style.display = 'block'; // Add this line


    } else  //random mode
    {
        document.querySelector('.countryRandomContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        document.getElementById('countryTitle').style.display = 'none';

        correctCount = 0;
        totalCount = 0;
        remainingCars = [...allCars()];
        startRound();

        document.getElementById('goBackCountryBtn').onclick = selectaModeScreen;

    }
}
function shuffle(array)
{
    for (let i=array.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function selectCountry(country) //
{
    document.getElementById('flagSection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    
    
    // Reset scores for new game
    correctCount = 0;
    totalCount = 0;
    
    remainingCars = [...carData[country]];
    document.getElementById('countryTitle').textContent = countrytitleCars[country]; //where we set the content of countryTitle
    document.getElementById('goBackCountryBtn').onclick = function() {
        hideAllSections();
        document.getElementById('flagSection').style.display = 'block';
    };

    startRound();
    // const cars = carData[country];
    // const randomIndex = Math.floor(Math.random() * cars.length);
    // const randomCar = cars[randomIndex];
    // currentCar = randomCar;
    // document.getElementById('carPrompt').innerText = `Select: ${randomCar.name}`;
    // showCars(carData[country]);


    function backtoCountry() {
        hideAllSections();
        document.getElementById('flagSection').style.display = 'block';
        document.getElementById('gameBoard').style.display = 'none';
    }
}

function startRound () 
{ 
    if (remainingCars.length === 0) {
        showFinalScore();
        return;
    }
    const randomIndex = Math.floor(Math.random() * remainingCars.length);
    currentCar = remainingCars[randomIndex];



    // let distractorArray = [];
    // for (i=0; i<cars.length; i++) {
    //     if (cars[i].name !== currentCar.name)
    //         distractorArray.push(cars[i]);
    //     }
    // }


    document.getElementById('carPrompt').innerText = `Select: ${currentCar.name}`;
    showCars(remainingCars);
}



function showCars(carArray) {
    const board = document.querySelector('.carGrid');
    board.innerHTML = ''; //removes any existing content inside gameBoard
    const shuffledCars = shuffle([...carArray]); //...carArray is a spread operator, creating copy of the carArray
    //const is a constant variable, one thaat cannot be reassigned after creation
    //the copy is passed down to the shuffle function
    shuffledCars.forEach(car => { //loop through every item in shuffledCars with car representing the current car object in the loop
//         //The Flow:
// Take original car list

// Make a copy so we don't mess up the original

// Shuffle the copy randomly

// Loop through each car in the shuffled list

// Create a button for each car
    const btn = document.createElement('button');
        btn.className = 'car-card';
        btn.innerHTML = `<img src="${car.img}" alt =$"{car.name}" ><p></p>`;
        btn.addEventListener('click', function () {
            totalCount++;
            console.log('Image clicked:', car.name, 'Current car:', currentCar?.name);
                if (car.name === currentCar.name) {
                    Swal.fire({
                        icon: "success",
                        confirmButtonColor: '#4CAF50'
                    });
          
                    correctCount++;
                    // Remove the guessed car from remaining cars
                    remainingCars = remainingCars.filter(c => c.name !== car.name);
                    startRound();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... try again!",
                        confirmButtonColor: '#f44336'
                    })
                }
            

            console.log("correct count:", correctCount);
            console.log("total count:", totalCount);

        });
        board.appendChild(btn);
    });
}
function allCars () {
    const allCars = [];
    Object.values(carData).forEach(countryCars => {
        allCars.push(...countryCars);
    });
    return allCars
}
function Previous() //on select a mode screen to go back to main menu, and about to main menu
{
    
    document.querySelector(".menubuttons").style.display = "flex";
    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("gameSection").style.display = "none";
    document.querySelector(".titleScreen").style.display = "flex";  



}

function selectaModeScreen()
{
    hideAllSections();
    document.getElementById('flagSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'flex';
    document.querySelector('.countryRandomContainer').style.display = 'flex';
}

const countrytitleCars = {
    japan: 'JDM'
    ,
    germany: 'GERMAN CARS'
    ,
    unitedkingdom: 'BRITISH CARS'
    ,
    france: 'FRENCH CARS'
    ,
    unitedstates: 'AMERICAN CARS'
};

const carData  = {
    japan: [
    { name: 'Toyota Supra', img: 'images/supra.png'},
    { name: 'Mazda RX-7', img: 'images/mazdarx7.png'},
    { name: 'Lexus LC500', img: 'images/lexuslc500.png'},
    { name: 'Lexus IS350', img: 'images/lexusis350.png'},
    { name: 'Honda NSX', img: 'images/hondansx.png'},
    { name: 'Mitsubishi Evo', img: 'images/mitsubishievo.png'},
    ],
    germany: [
    { name: 'BMW M4', img: 'images/bmwm4.png'},
    { name: 'Porsche Carerra GT', img: 'images/carrera.png'},
    { name: 'Mercedes Benz AMG GT63', img: 'images/amg63.png'},
    { name: 'Audi R8', img: 'images/r8.png'},
    { name: 'BMW E92 M3', img: 'images/e92.png'},
    { name: 'Porsche 911', img: 'images/911.png'},
    ],
    unitedkingdom: [
        { name: 'Mclaren P1', img: 'images/mclarenp1.png'},
        { name: 'Rolls Royce Phantom', img: 'images/phantom.png'},
        { name: 'Aston Martin Vantage', img: 'images/vantage.png'},
        { name: 'Jaguar F Type', img: 'images/ftype.png'},
        { name: 'Jensen FF', img: 'images/jensenff.png'},
        { name: 'Lotus Elise', img: 'images/lotuselise.png'},
    ],
    france: [
        { name: 'Bugatti Chiron', img: 'images/chiron.png'},
        { name: 'Renault Alpine', img: 'images/alpine.png'},
        { name: 'Renault 5 Turbo', img: 'images/r5.png'},
        { name: 'Dacia Duster', img: 'images/duster.png'},
        { name: 'Citroen DS3', img: 'images/ds3.png'},
        { name: 'Citroen DS', img: 'images/DS.png'},
    ],
    unitedstates: [
        { name: 'Corvette Stingray', img: 'images/stingray.jpg'},
        { name: 'Dodge Challenger SRT Hellcat', img: 'images/hellcat.png'},
        { name: '67 Ford Shelby', img: 'images/shelby.png'},
        { name: 'Ford GT', img: 'images/GT.png'},
        { name: 'Chevrolet Chevelle', img: 'images/chevelle.png'},
        { name: 'Dodge Viper', img: 'images/viper.png'},
    ],
}