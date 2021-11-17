import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "./store";
import {css} from "@emotion/css";
import {Word} from "./word";

const popupStyle = css`
	min-width: 500px;
	padding: 20px;
`;
export const Popup = observer(() =>
{
	const {wordsList, addWord} = useContext(StoreContext);
	const [input, setInput] = useState('');

	const onKeyDown = (event) =>
	{
		if (event.key === 'Enter')
		{
			addWord(input);
		}
	}

	return <div className={popupStyle}>
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
			{wordsList.map((word, index) => <Word word={word} key={index} />)}
		</ul>
	</div>;
});