import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "./store";

export const Popup = observer(() =>
{
	const {wordsList, addWord, removeWord} = useContext(StoreContext);
	const [input, setInput] = useState('');

	const onKeyDown = (event) =>
	{
		if (event.key === 'Enter')
		{
			addWord(input);
		}
	}

	return <>
		<div className="mb-3">
			<label htmlFor="wordsInput" className="form-label">Enter words to mute from YouTube</label>
			<input
				type="text"
				className="form-control"
				id="wordsInput"
				placeholder="Words to mute"
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={onKeyDown}/>
		</div>
		<ul className="list-group">
			{wordsList.map((word, index) => <li className="list-group-item" key={index} onClick={() => removeWord(word)}>{word}</li>)}
		</ul>
	</>;
});