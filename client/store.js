import React from 'react';
import {action, makeObservable, observable} from 'mobx';
import {storage} from "./storage";

export const StoreContext = React.createContext(null);

export class Store
{
	@observable wordsList = [];

	constructor()
	{
		makeObservable(this);
		this.init();
	}

	@action.bound
	init()
	{
		storage.get('youtube_muted_words', '[]', 'mutetube').then(list =>
		{
			if (!list)
				list = [];
			else
				list = JSON.parse(list);
			this.wordsList = list;
		});
	}

	@action.bound
	addWord(word)
	{
		this.wordsList.push(word);
		storage.set('youtube_muted_words', JSON.stringify(this.wordsList), '');
	}

	@action.bound
	removeWord(word)
	{
		this.wordsList = this.wordsList.filter(current => current !== word);
		storage.set('youtube_muted_words', JSON.stringify(this.wordsList), '');
	}
}