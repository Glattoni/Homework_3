const btn = document.querySelector('.form__btn');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const result = document.querySelector('.result__content');

// Preventing form's default behaviour
form.addEventListener('submit', function (e) {
	e.preventDefault();
});


// Checking the age value
function ageChecker(){
	let age = input.value;
	result.textContent = `Your age is: ${age}`;
	if (age%100 > 10 && age%100 < 20){
		result.textContent += ` лет`;
	}else if(age%10 > 1 && age%10 < 5){
		result.textContent += ` года`;
	}
	else if(age%10 == 1){
		result.textContent += ` год`;
	}
	else{
		result.textContent += ` лет`;
	}
}

// Displaying the result
btn.addEventListener('click', function () {
	ageChecker();
});
