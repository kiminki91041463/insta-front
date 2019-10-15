import './global'
import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { AppLoading } from "expo"
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'
import { InMemoryCache } from "apollo-cache-inmemory"
import { persistCache } from "apollo-cache-persist"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"
import options from "./apollo"
import { ThemeProvider } from "styled-components"
import styles from "./styles"
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';
import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1795685dff9748fd9604b08d14b75b69')
);
web3.eth.getBlockNumber().then(console.log)


export default function App() {



  const [loaded, setloaded] = useState(false);
  const [client, setClient] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      })
      await Asset.loadAsync([require("./assets/logo.png")])
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      })
      const client = new ApolloClient({
        cache,
        ...options
      })
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }
      setloaded(true);
      setClient(client)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    preLoad();
  }, [])



  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
      <AppLoading />
    );
}
