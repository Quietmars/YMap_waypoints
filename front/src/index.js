import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import { initialState } from './store';
import { ctx } from './store';

import { IndexPage } from './pages/index';
import './css/style.sass';

/* console.log(process.env.SUB_FOLDER) */
/* console.log(process.env.BACKEND_HOST) */

const App = () => {

    const [store, updStore] = useState(initialState)

    return <ctx.Provider value={{ store, updStore }}>
        <IndexPage />
    </ctx.Provider>
}

ReactDOM.render(<App />, document.getElementById("app"));
