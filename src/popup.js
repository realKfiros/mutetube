require("font-awesome/scss/font-awesome.scss");

const listItem = (text) =>
{
	const item = document.createElement("p");
	const textContent = document.createTextNode(text);
	item.appendChild(textContent);
	return item;
};

const addWord = () =>
{
	if (event.key === 'Enter')
	{
		const input = event.target;
		const list = document.getElementById("words-list");
		list.appendChild(listItem(input.value));
	}
};

window.onload = () =>
{
	const input = document.getElementById("word-input");

	input.addEventListener('keypress', () => addWord(input));
};