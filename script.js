'use strict';

// === КОНВЕРТЕРЫ ===
document.getElementById('inch-input').addEventListener('input', () => {
	const inch = parseFloat(document.getElementById('inch-input').value);
	if (!isNaN(inch)) {
		document.getElementById('cm-input').value = (inch * 2.54).toFixed(2);
	}
});
document.getElementById('cm-input').addEventListener('input', () => {
	const cm = parseFloat(document.getElementById('cm-input').value);
	if (!isNaN(cm)) {
		document.getElementById('inch-input').value = (cm / 2.54).toFixed(2);
	}
});
document.getElementById('inch-cm-clear').addEventListener('click', () => {
	document.getElementById('inch-input').value = '';
	document.getElementById('cm-input').value = '';
});

document.getElementById('kg-input').addEventListener('input', () => {
	const kg = parseFloat(document.getElementById('kg-input').value);
	if (!isNaN(kg)) {
		document.getElementById('lb-input').value = (kg * 2.20462).toFixed(2);
	}
});
document.getElementById('lb-input').addEventListener('input', () => {
	const lb = parseFloat(document.getElementById('lb-input').value);
	if (!isNaN(lb)) {
		document.getElementById('kg-input').value = (lb / 2.20462).toFixed(2);
	}
});
document.getElementById('kg-lb-clear').addEventListener('click', () => {
	document.getElementById('kg-input').value = '';
	document.getElementById('lb-input').value = '';
});

document.getElementById('c-input').addEventListener('input', () => {
	const c = parseFloat(document.getElementById('c-input').value);
	if (!isNaN(c)) {
		document.getElementById('f-input').value = (c * 9/5 + 32).toFixed(2);
	}
});
document.getElementById('f-input').addEventListener('input', () => {
	const f = parseFloat(document.getElementById('f-input').value);
	if (!isNaN(f)) {
		document.getElementById('c-input').value = ((f - 32) * 5/9).toFixed(2);
	}
});
document.getElementById('temp-clear').addEventListener('click', () => {
	document.getElementById('c-input').value = '';
	document.getElementById('f-input').value = '';
});

document.getElementById('unix-input').addEventListener('input', () => {
	const unix = parseInt(document.getElementById('unix-input').value);
	if (!isNaN(unix) && unix > 0) {
		const date = new Date(unix * 1000);
		document.getElementById('date-input').value = date.toISOString().slice(0, 19).replace('T', ' ');
	}
});
document.getElementById('date-input').addEventListener('input', () => {
	const str = document.getElementById('date-input').value;
	const date = new Date(str);
	if (!isNaN(date.getTime())) {
		document.getElementById('unix-input').value = Math.floor(date.getTime() / 1000);
	}
});
document.getElementById('unix-date-clear').addEventListener('click', () => {
	document.getElementById('unix-input').value = '';
	document.getElementById('date-input').value = '';
});

// === ГЕНЕРАТОРЫ ===
function generatePassword() {
	const useSymbols = document.getElementById('use-symbols').checked;
	const useDigits = document.getElementById('use-digits').checked;
	const useUpper = document.getElementById('use-uppercase').checked;

	let charset = 'abcdefghijklmnopqrstuvwxyz';
	if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (useDigits) charset += '0123456789';
	if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

	let password = '';
	for (let i = 0; i < 12; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	document.getElementById('password-output').value = password;
}
document.getElementById('generate-password').addEventListener('click', generatePassword);

function generateRandomNumber() {
	const from = parseInt(document.getElementById('rand-from').value);
	const to = parseInt(document.getElementById('rand-to').value);
	if (isNaN(from) || isNaN(to) || from > to) {
		document.getElementById('rand-output').value = 'Ошибка: проверьте диапазон';
		return;
	}
	const random = Math.floor(Math.random() * (to - from + 1)) + from;
	document.getElementById('rand-output').value = random;
}
document.getElementById('generate-random').addEventListener('click', generateRandomNumber);

function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
document.getElementById('generate-uuid').addEventListener('click', () => {
	document.getElementById('uuid-output').value = generateUUID();
});

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
function generateLorem() {
	const count = parseInt(document.getElementById('lorem-paragraphs').value);
	if (isNaN(count) || count < 1 || count > 10) return;
	const paragraphs = [];
	for (let i = 0; i < count; i++) {
		paragraphs.push(loremText);
	}
	document.getElementById('lorem-output').value = paragraphs.join('\n\n');
}
document.getElementById('generate-lorem').addEventListener('click', generateLorem);

// === КАЛЬКУЛЯТОРЫ ===
function calculateBMI() {
	const height = parseFloat(document.getElementById('bmi-height').value);
	const weight = parseFloat(document.getElementById('bmi-weight').value);
	if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
		document.getElementById('bmi-result').textContent = 'Введите корректные значения.';
		return;
	}
	const bmi = weight / Math.pow(height / 100, 2);
	let interpretation = '';
	if (bmi < 18.5) interpretation = 'Недостаточный вес';
	else if (bmi < 25) interpretation = 'Нормальный вес';
	else if (bmi < 30) interpretation = 'Избыточный вес';
	else interpretation = 'Ожирение';
	document.getElementById('bmi-result').textContent = `Ваш ИМТ: ${bmi.toFixed(1)} (${interpretation})`;
}
document.getElementById('calculate-bmi').addEventListener('click', calculateBMI);

function calculateWalkCalories() {
	const weight = parseFloat(document.getElementById('walk-weight').value);
	const steps = parseInt(document.getElementById('walk-steps').value);
	if (isNaN(weight) || isNaN(steps) || weight <= 0 || steps < 0) {
		document.getElementById('walk-result').textContent = 'Введите корректные данные.';
		return;
	}
	const km = steps * 0.000762; // avg step ~0.762m
	const kcal = km * weight * 0.75; // approx
	document.getElementById('walk-result').textContent = `Сожжено калорий: ${Math.round(kcal)}`;
}
document.getElementById('calculate-walk').addEventListener('click', calculateWalkCalories);

function calculateFutureDate() {
	const days = parseInt(document.getElementById('days-ahead').value);
	if (isNaN(days)) {
		document.getElementById('future-date-result').textContent = 'Введите количество дней.';
		return;
	}
	const date = new Date();
	date.setDate(date.getDate() + days);
	const formatted = date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		weekday: 'long'
	});
	document.getElementById('future-date-result').textContent = `Дата: ${formatted}`;
}
document.getElementById('calculate-future-date').addEventListener('click', calculateFutureDate);

function analyzeText() {
	const text = document.getElementById('text-input').value;
	if (text.trim() === '') {
		document.getElementById('text-stats').textContent = '';
		return;
	}
	const words = text.trim().split(/\s+/).length;
	const charsWithSpaces = text.length;
	const charsWithoutSpaces = text.replace(/\s/g, '').length;
	document.getElementById('text-stats').textContent = `Слов: ${words} | Символов: ${charsWithSpaces} (без пробелов: ${charsWithoutSpaces})`;
}
document.getElementById('text-input').addEventListener('input', analyzeText);