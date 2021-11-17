import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {StoreContext} from "./store";
import {css} from "@emotion/css";

const styleWord = css`
	> * {
		margin: 5px;
	}
`;
export const Word = observer(({word}) =>
{
	const {removeWord} = useContext(StoreContext);

	return <li className={`list-group-item ${styleWord}`}>
		<button type="button" className="btn btn-danger btn-sm me-1" onClick={() => removeWord(word)}>
			<i className="fa fa-trash" />
		</button>
		<span>{word}</span>
	</li>;
});