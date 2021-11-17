import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import {Popup} from "./popup";
import {Store, StoreContext} from "./store";

ReactDOM.render(<StoreContext.Provider value={new Store()}>
	<Popup />
</StoreContext.Provider>, document.getElementById('root'));
