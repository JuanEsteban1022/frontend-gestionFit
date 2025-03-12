import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./app/_layout";
import React from "react";
import LoginForm from "./app/screens/auth/LoginForm";
import ViewPlans from "./app/screens/customers/ViewPlans";
import ViewEvents from "./app/screens/customers/ViewEvents";
import { ToastProvider } from "react-native-toast-notifications";
import Home from "./app/screens/utils/home";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginForm"
            component={LoginForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewPlans"
            component={ViewPlans}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewEvents"
            component={ViewEvents}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <LoginForm/> */}
      {/* <Home/> */}
      {/* <ViewEvents/> */}
      {/* <ViewPlans/> */}
      <StatusBar style="dark" />
    </ToastProvider>
  );
}
