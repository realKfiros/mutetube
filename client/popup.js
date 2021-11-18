import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "./store";
import {css} from "@emotion/css";
import {Word} from "./word";

const popupStyle = css`
	min-width: 500px;
	padding: 15px;
`;
export const Popup = observer(() =>
{
	const {wordsList, addWord, enable, toggle} = useContext(StoreContext);
	const [input, setInput] = useState('');

	const onKeyDown = (event) =>
	{
		if (event.key === 'Enter')
		{
			addWord(input);
			setInput('');
		}
	}

	return <div className={popupStyle}>
		<h2>MuteTube</h2>
		<div className="form-check form-switch">
			<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={enable} onClick={() => toggle()} />
			<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable extension</label>
		</div>
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