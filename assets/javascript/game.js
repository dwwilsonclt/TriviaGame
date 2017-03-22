$(document).ready(function(){
    // $("#hide").click(function(){
    //     $("#start-button").hide();
    // });
    // $("#show").click(function(){
    //     $("#start-button").show();
    // });
	// $("#start-button").text("Press to start another game")
var triviaQuestions = [
{question:'This western show featured Ben Cartwright and his three sons on their ranch.  What was the name of the show?',choiceOne:'The Cartwright Clan',choiceTwo:'Ponderosa',choiceThree:'Bonanaza',choiceFour:'Gunsmoke',questAns:3},
{question:'On Bewitched, Elizabeth Mongomery was married to a character named Darrin.  What was her characters name?',choiceOne:'Jeannie',choiceTwo:'Samantha',choiceThree:'Tabitha',choiceFour:'Loraine',questAns:2},
{question:'Which of these shows was a spin-off of the Andy Griffith Show?',choiceOne:'Gomer Pyle, USMC',choiceTwo:'Green Acres',choiceThree:'My Three Sons',choiceFour:'Petticoat Junction',questAns:1},
{question:'Which of these cartoons was not on TV during the 1960s?',choiceOne:'The Alvin show',choiceTwo:'The Rocky and Bullwinkle show',choiceThree:'The Flintstones',choiceFour:'Josie and the Pussycats',questAns:4},
{question:'What show featured characters named Morticia, Wednesday, Lurch and Cousin Itt?',choiceOne:'The Munsters',choiceTwo:'The Addams Family',choiceThree:'The Outer Limits',choiceFour:'Hullabaloo',questAns:2},
{question:'His family lived in Mayfield.  His father was Ward, his mother was June, and is brother was Wally.  What was this characters nickname?',choiceOne:'Theodore',choiceTwo:'Beaver',choiceThree:'Otter',choiceFour:'Lumpy',questAns:2},
{question:'The IMF was a top secret government organization.  Their assignments were dangerous and covert.  What show was this team featured on?',choiceOne:'Mission: Impossible',choiceTwo:'Mannix',choiceThree:'The Invaders',choiceFour:'77 Sunset Strip',questAns:1},
{question:'This series, which began in the late 1950s, continued its successful depiction of courtroom scenes well into the 1960s.  Raymond Burr played its lead character.  What was the shows name?',choiceOne:'Paul Drake',choiceTwo:'The Lawman',choiceThree:'Perry Mason',choiceFour:'Yogi Bear',questAns:3},
{question:'John Wayne turned down the role of Marshall Dillon because he didnt want to do a weekly television show.  What show was this character from?',choiceOne:'Maverick',choiceTwo:'Green Acres',choiceThree:'Gunsmoke',choiceFour:'Rawhide',questAns:3},
{question:'Who did NOT live in the same house with Herman Munster?',choiceOne:'Lily',choiceTwo:'Eddie',choiceThree:'Morticia',choiceFour:'Marilyn',questAns:3}
]
// console.log(triviaQuestions[3].question);
//global variable declarations
var correctAnswers =0;
var incorrectAnswers = 0;
var questionCount = 0;
var questionTimer =0;
var intervalId;
var theCorrectAnswer;
var choiceArray = [];



$("#start-button").on("click",function(){
	$("#start-button").hide();
	questionCount = 0;
	$("#jpg-render").attr("src", "assets/images/blackbackground.jpg")
	loadQuestion();
});
$("a").on("click",function() {
	var $pickedButton = $(this);
    var pickedButtonValue = $pickedButton.attr("value");
    clearInterval(intervalId);
    $("#status-message2").text("");

    if (pickedButtonValue == triviaQuestions[questionCount].questAns) {
		correctAnswers++;
		$("#status-jumbotron").css("visibility","visible");
		$("#status-message").text("You Picked The Correct Answer!")
		$("#jpg-render").attr("src", "assets/images/image" + questionCount + ".jpg")
		setTimeout(gameManager, 1000*3,"correct");


    } else{
    	incorrectAnswers++;
    	$("#status-jumbotron").css("visibility","visible");
		$("#status-message").text("That Answer Was Incorrect!")
		$("#status-message2").text("The correct answer was " + theCorrectAnswer )
		$("#jpg-render").attr("src", "assets/images/image" + questionCount + ".jpg")
		setTimeout(gameManager, 1000*3,"incorrect");


    }

})
function loadQuestion(){
	questionTimer = 30;
	var thisQuestion = triviaQuestions[questionCount].question;
	choiceArray[0] = triviaQuestions[questionCount].choiceOne;
	choiceArray[1] = triviaQuestions[questionCount].choiceTwo;
	choiceArray[2] = triviaQuestions[questionCount].choiceThree;
	choiceArray[3] = triviaQuestions[questionCount].choiceFour;
	theCorrectAnswer = choiceArray[triviaQuestions[questionCount].questAns -1]

	$("#question-panel").css("visibility","visible");
	$("#question-display").text("QUESTION: " + thisQuestion);
	$("#q1").text(choiceArray[0]);
	$("#q2").text(choiceArray[1]);
	$("#q3").text(choiceArray[2]);
	$("#q4").text(choiceArray[3]);
	$("#countdown").text(questionTimer);
    intervalId = setInterval(gameTimer, 1000);
}

function gameTimer(){
	questionTimer--;
	$("#countdown").text(questionTimer);
	if(questionTimer===0){
		clearInterval(intervalId);
		$("#status-jumbotron").css("visibility","visible");
		$("#status-message").text("Times Up!")
		$("#status-message2").text("The correct answer was " + theCorrectAnswer )		
		$("#jpg-render").attr("src", "assets/images/image" + questionCount + ".jpg")
		setTimeout(gameManager, 1000*3,"delay");


	}
	
}

function gameManager(gameStatus){


	switch(gameStatus){
		case "correct":
			$("#question-panel").css("visibility","hidden");
			$("#status-jumbotron").css("visibility","hidden");
			break;
		case "incorrect":
			$("#question-panel").css("visibility","hidden");
			$("#status-jumbotron").css("visibility","hidden");
		case "delay":
			$("#question-panel").css("visibility","hidden");
			$("#status-jumbotron").css("visibility","hidden");			
	}
    questionCount++;
    if (questionCount > 9){
    	$("#status-jumbotron").css("visibility","visible");
		$("#status-message").text("Game Over!");
		$("#status-message2").text("You picked " + correctAnswers + " correct and " + incorrectAnswers + " incorrect")
		$("#jpg-render").attr("src", "assets/images/nixon.jpg")		
		setTimeout(gameOver, 1000*5);
		correctAnswers=0;
		incorrectAnswers=0;
		questionCount = 0;
    } else{
    	loadQuestion();
    }

}
function gameOver(){
		$("#start-button").show();
		$("#question-panel").css("visibility","hidden");
		$("#status-message2").text("");
		$("#status-jumbotron").css("visibility","hidden");
}
});