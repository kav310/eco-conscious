import React from "react";
import "./styles/index.css";
import {
    BrowserRouter,
    Route,
    RouteComponentProps,
    Switch
} from "react-router-dom";
import NavBarComponent from "./components/navBar/NavBarComponent";

interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
}

const App = () => {
    const routes: IRoute[] = [
        {
            path: "/",
            name: "Home Page",
            component: "HomePage",
            exact: true
        },
        {
            path: "/about",
            name: "About Page",
            component: "AboutPage",
            exact: true
        }
    ];

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <>
                                <NavBarComponent/>
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(props: RouteComponentProps<any>) => (
                                        <route.component
                                            name={route.name}
                                            {...props}
                                            {...route.props}
                                        />

                                    )}
                                />
                            </>
                        );
                    })}
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
