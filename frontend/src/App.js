// import React from 'react';
// import Header from './components/Header'
// import './styles/main.scss';
// import Table from './components/Table'
//
// function App() {
//   return (
//     <div className="app">
//       <Header/>
//         <div className="container">
//             <Table />
//         </div>
//     </div>
//   );
// }
//
// export default App;

import React from 'react';
import { useRedirect, useRoutes } from 'hookrouter';
import Header from "./components/Header";
import PageListView from './pages/ListView'
import PageNotFound from './pages/NotFound'
import PageThankYou from './pages/ThankYou'

import { AppProvider } from './state/AppContext';

const routes = {
    '/': () => <PageListView />,
    '/thankyou': () => <PageThankYou />
};

const App = () => {
    useRedirect('/', '/');

    const routeResult = useRoutes(routes);

    return (
        <AppProvider>
            <Header />
            <div className="">
                {routeResult || <PageNotFound />}
            </div>
        </AppProvider>
    );
};

export default App;
