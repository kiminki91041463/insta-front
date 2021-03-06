
import React from "react"
import { createAppContainer } from "react-navigation"
import { View } from "react-native"
import { createBottomTabNavigator } from "react-navigation-tabs"
import Home from "../screens/Tabs/Home"
import Notifications from "../screens/Tabs/Notifications"
import Search from "../screens/Tabs/Search"
import Profile from "../screens/Tabs/Profile"
import { createStackNavigator } from 'react-navigation-stack';
import MessagesLink from "../components/MessagesLink"
const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        initialRoute: {
            screen: initialRoute,
            navigationOptions: { ...customConfig }
        }
    })

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
            title: "Home",
            headerRight: () => <MessagesLink />
        })
    },
    Search: {
        screen: stackFactory(Search, {
            title: "Search"
        })
    },
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
        }
    },
    Notifications: {
        screen: stackFactory(Notifications, {
            title: "Notifications"
        })
    },
    Profile: {
        screen: stackFactory(Profile, {
            title: "Profile"
        })
    }
})
