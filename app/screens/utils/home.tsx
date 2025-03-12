import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ViewPlans from "../customers/ViewPlans";
import ViewEvents from "../customers/ViewEvents";
import Icon from "react-native-vector-icons/MaterialIcons";
import ViewAccount from "../customers/ViewAccount";
import Welcome from "./welcome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { UserResponse } from "../interfaces/userResponse";

function Home() {
  const Drawer = createDrawerNavigator();
  const route = useRoute<any>();
  const params = route.params;

  const LogoutScreen = () => {
    const navigation = useNavigation<any>(); // Usa el hook

    const handleLogout = async () => {
      Alert.alert(
        "¿Deseas salir?",
        "¿Estás seguro de que quieres cerrar sesión?",
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => navigation.navigate('Bienvenido') // Redirecciona a la pantalla correspondiente
          },
          {
            text: "Salir",
            onPress: () => navigation.replace("LoginForm"),
          },
        ],
        { cancelable: false }
      );
    };

    React.useEffect(() => {
      handleLogout(); // ejecuta el logout automaticamente al entrar en la pantalla.
    }, []);

    return null; // El componente no necesita renderizar nada, ya que la lógica está en useEffect.
  };

  return (
    <Drawer.Navigator initialRouteName="Bienvenido" screenOptions={{headerStyle: {backgroundColor: '#A9A197', borderBottomColor: '#A9A197'}}}>
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: "#f9d8c5",
          drawerActiveTintColor: "gray",
          drawerLabelStyle: { fontWeight: "bold" },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="supervised-user-circle" // Example icon name
              size={size}
              color={focused ? "#e46116" : "gray"} // Customize colors
            />
          ),
        }}
        name="Mi Cuenta"
        component={ViewAccount}
        initialParams={params}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: "#f9d8c5",
          drawerActiveTintColor: "gray",
          drawerLabelStyle: { fontWeight: "bold" },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home-filled" // Example icon name
              size={size}
              color={focused ? "#e46116" : "gray"} // Customize colors
            />
          ),
        }}
        name="Bienvenido"
        component={Welcome}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: "#f9d8c5",
          drawerActiveTintColor: "gray",
          drawerLabelStyle: { fontWeight: "bold" },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="today" // Example icon name
              size={size}
              color={focused ? "#e46116" : "gray"} // Customize colors
            />
          ),
        }}
        name="Eventos"
        component={ViewEvents}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: "#f9d8c5",
          drawerActiveTintColor: "gray",
          drawerLabelStyle: { fontWeight: "bold" },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="playlist-add-check" // Example icon name
              size={size}
              color={focused ? "#e46116" : "gray"} // Customize colors
            />
          ),
        }}
        name="Mi Plan"
        component={ViewPlans}
        initialParams={params}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: "#f9d8c5",
          drawerActiveTintColor: "gray",
          drawerLabelStyle: { fontWeight: "bold" },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="logout"
              size={size}
              color={focused ? "#e46116" : "gray"} // Customize colors
            />
          ),
        }}
        name="Salir"
        component={LogoutScreen}
      />
    </Drawer.Navigator>
  );
}

export default Home;
