import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.scss';
import App from './components/App/App';
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div className="reset-styles">
                <App/>
            </div>
        </PersistGate>
    </Provider>
);