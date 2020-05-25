import React from 'react';
import { useRedirect, useRoutes } from 'hookrouter';
import './styles/main.scss';
import Header from "./components/Header";
import PageListView from './pages/ListView'
import PageNotFound from './pages/NotFound'
import PageThankYou from './pages/ThankYou'
import PageCountdown from './pages/CountdownView'

import { AppProvider } from './state/AppContext';

const routes = {
    '/vote': () => <PageListView />,
    '/thankyou': () => <PageThankYou />,
    '/notfound': () => <PageNotFound />,
    '/countdown': () => <PageCountdown />
};

const App = () => {
    useRedirect('/', '/vote');

    const routeResult = useRoutes(routes);

    return (
        <AppProvider>
            <Header />
            <div className="app">
                {routeResult || <PageNotFound />}
            </div>
        </AppProvider>
    );
};

export default App;
