/* global chrome */
import React from 'react';
import {action, makeObservable, observable} from 'mobx';

export const StoreContext = React.createContext(null);

export class Store
{
	@observable wordsList = [];
	@observable enable;

	constructor()
	{
		makeObservable(this);
		this.init();
	}

	@action.bound
	init()
	{
		chrome.storage.local.get(['youtube_muted_words', 'enable_youtube_muted_words'], ({youtube_muted_words: list, enable_youtube_muted_words: enable}) =>
		{
			if (!list)
				list = [];
			else
				list = JSON.parse(list);
			this.wordsList = list;
			this.enable = parseInt(enable);
			console.log(enable);
		});
	}

	@action.bound
	addWord(word)
	{
		this.wordsList.push(word);
		chrome.storage.local.set({'youtube_muted_words': JSON.stringify(this.wordsList)}, () => {});
	}

	@action.bound
	removeWord(word)
	{

		this.wordsList = this.wordsList.filter(current => current !== word);
		chrome.storage.local.set({'youtube_muted_words': JSON.stringify(this.wordsList)}, () => {});
	}

	@action.bound
	toggle()
	{
		this.enable = !this.enable;
		chrome.storage.local.set({'enable_youtube_muted_words': this.enable ? 1 : 0}, () => {});
	}
}