import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import { store } from './store';
//import Page from './pages/page';

import './css/style.sass';

const App = () => {
    return <>
        { console.log(process.env.SUB_FOLDER) }
        { console.log(process.env.BACKEND_HOST) }
        <div>Hello World</div>
        <div>Hello TS</div>
    </>;
}

ReactDOM.render(<App/>, document.getElementById("app"));
