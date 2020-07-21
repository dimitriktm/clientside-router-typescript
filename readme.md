# Description

Client side router that allows to navigate links with dynamic parameters without reload.
This project was made as practice of OOP.

## API

    import {routerjs} from 'path-to-routerjs';

    const router = routerjs();

#### Register routes

    const routes = [
        {name: 'home', path: '/', invoke: function({params, path}) {}},
        {name: 'article', path: '/article/:id', invoke: function({params, path}) {}}
    ];
    router.registerRoutes(routes);

#### Navigate to route with params

###### Note you can leave params empty if link does not contains any dynamic params

    // router.navigate(routeName, params);
    router.navigate('article', {id: 'web-components'});
