import React from "react";
import "./styles/index.css";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import NavBarComponent from "./components/navBar/NavBarComponent";
import HomePage from "./pages/HomePage";
import FooterComponent from "./components/footer/FooterComponent";
import TrendingNewsPage from "./pages/TrendingNewsPage";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import RecommendedPage from "./pages/RecommendedPage";
import RecipesListByRecommendation from "./pages/RecipesListByRecommendation";
import RecommendedRicpePage from "./pages/RecommendedRicpePage";

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
      component: HomePage,
      exact: true,
    },
    {
      path: "/trending",
      name: "Trending News",
      component: TrendingNewsPage,
      exact: true,
    },
    {
      path: "/recipes",
      name: "Recipes",
      component: RecipesPage,
      exact: true,
    },
    {
      path: "/recommended",
      name: "Recommended Recipes",
      component: RecommendedPage,
      exact: true,
    },
    {
      path: "/recipe/:id",
      name: "Recipe",
      component: RecipePage,
      exact: true,
    },
    {
      path: "/recommendList",
      name: "Recipe",
      component: RecipesListByRecommendation,
      exact: true,
    },
    {
      path: "/recommendedRecipe/:id",
      name: "Recipe",
      component: RecommendedRicpePage,
      exact: true,
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <>
                    <NavBarComponent />
                    <route.component
                      name={route.name}
                      {...props}
                      {...route.props}
                    />
                    <FooterComponent />
                  </>
                )}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
