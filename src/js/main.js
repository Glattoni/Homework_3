const btn = document.querySelector('.form__btn');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const result = document.querySelector('.result__content');

// Preventing form's defalt behaviour
form.addEventListener('submit', function (e) {
	e.preventDefault();
});

// Displaying the result
btn.addEventListener('click', function () {
	let age = input.value;
	result.innerText = `Your age is: ${age}`;
	let chunks = age.split('');
	let i = parseInt(chunks[chunks.length - 1]);
	if (age > 10 && age < 20) {
		result.innerText += ` лет`;
	} else if (chunks.length > 2) {
		let j = chunks[chunks.length - 2] + i;
		if (j == 11 || 12 || 13 || 14 || 15 || 16 || 17 || 18 || 19) {
			result.innerText += ` лет`;
		}
	} else {
		switch (i) {
			case 0:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				result.innerText += ` лет`;
				break;
			case 2:
			case 3:
			case 4:
				result.innerText += ` года`;
				break;
			case 1:
				result.innerText += ` год`;
		}
	}
});
