import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
// import OrphanageMap from './pages/OrphanagesMap';
// import Orphanage from './pages/Orphanage';
// import CreateOrphanage from './pages/CreateOrphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/app" component={OrphanageMap} />
        <Route path="/orfanatos/criar" component={CreateOrphanage} />
        <Route path="/orfanatos/:id" component={Orphanage} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
