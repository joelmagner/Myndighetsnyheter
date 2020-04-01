import { createStackNavigator } from "react-navigation-stack";

import Feed from "../screens/Feed";
import Article from "../screens/Article";

export default createStackNavigator(
    {
        Article,
        Feed
    },
    {
        initialRouteName: "Feed",
        defaultNavigationOptions: {
            header: null
        }
    }

);