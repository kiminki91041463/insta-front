import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';
import AuthHome from "../screens/Auth/AuthHome"
import Signup from "../screens/Auth/Signup"
import Login from "../screens/Auth/Login"
import Confirm from "../screens/Auth/Confirm"

const AuthNavigation = createStackNavigator({
    Login,
    AuthHome,
    Signup,
    Confirm
},
    {
        headerMode: "none"
    }
);

export default createAppContainer(AuthNavigation)