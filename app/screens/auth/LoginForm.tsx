import "../../_layout";
import ViewPlans from "../customers/ViewPlans";
import clienteAxios from "../../../config/axios.conf";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { loginResponse, UserResponse } from "../interfaces/userResponse";
const imgBackground = require("../../../assets/login_gym.png");
const logo = require("../../../assets/logo.png");

function LoginForm() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>(); // Usa el hook
  const toast = useToast();
  const styles = StyleSheet.create({
    // Crea un objeto de estilos
    image: {
      width: width > 768 ? width * 0.25 : width * 0.8, // 30% del ancho en web, 75% en móvil
      height: width > 768 ? width * 0.15 : width * 0.35, // Ajusta la proporción para el alto
      resizeMode: "contain",
      opacity: 0.6,
      backgroundColor: "#d3d3d3", // Color gris claro
      borderRadius: 8, // Ajusta el radio de borde
    },
    label: {
      position: "absolute",
      top: -10, // Ajusta este valor para la posición vertical del label
      left: 8, // Ajusta este valor para la posición horizontal del label
      paddingHorizontal: 4, // Ajusta el relleno horizontal del label
      fontSize: 12, // Ajusta el tamaño de la fuente del label
      color: "white", // Ajusta el color del texto del label
      fontWeight: "600",
    },
  });

  useEffect(() => {
    // Simula un tiempo de carga para la imagen y el formulario
    const timer = setTimeout(() => {
      setIsLoading(false); // Ocultar el indicador después de un tiempo
    }, 2000); // 2 segundos (ajusta este valor según sea necesario)

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const [isLoading, setIsLoading] = useState(true);

  const [login, getUser] = useState({
    usuario: "",
    password: "",
  });

  // Leer los datos del formulario
  const actualizarState = (name: string, value: string) => {
    // Almacenas los datos ingresados en el state
    getUser({
      ...login,
      [name]: value,
    });
  };

  // Validacion del formulario
  const validarUsr = () => {
    // Destructuring
    const { usuario, password } = login;
    // Validación que el objeto tenga contenido
    let valido = !usuario.length || password.length < 3;
    return valido;
  };

  const limpiarLogin = () => {
    getUser({ usuario: "", password: "" });
  };

  const mostrarToast = () => {
    toast.show("Credenciales incorrectas", {
      animationDuration: 100,
      duration: 2000,
      animationType: "slide-in",
      placement: "bottom",
      warningColor: "orange",
      type: "warning",
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await clienteAxios.post("/auth", login); // Usa await directamente
      if (response.status === 200) {
        // Inicio de sesión exitoso. Redirige o realiza alguna acción tras el login exitoso
        const loginResponse: loginResponse = response.data;
        if (loginResponse.enabled === 1) {
          const customer: UserResponse = await getCustomers(
            login.usuario,
            loginResponse.token
          );
          const jsonUser = { login: loginResponse, customer: customer };
          navigation.navigate("Home", jsonUser);
        } else {
          toast.show("El usuario no está habilitado", {
            animationDuration: 100,
            duration: 5000,
            animationType: "slide-in",
            placement: "bottom",
            warningColor: "orange",
            type: "warning",
          });
          limpiarLogin();
        }
      } else {
        // Error del servidor (código de estado diferente de 200)
        limpiarLogin();
        mostrarToast();
      }
    } catch (error) {
      // Error de conexión u otro error
      limpiarLogin();
      mostrarToast();
    }
  };

  const getCustomers = async (idUser: string, token: string) => {
    const response = await clienteAxios.get(`/customer/${idUser}`, {
      headers: { Authorization: `${token}` },
    }); // Usa await directamente
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        {isLoading ? (
          <View className="flex-1 justify-center items-center bg-gray-600">
            <ActivityIndicator size="large" color="#e46116" />
          </View>
        ) : (
          <ImageBackground
            className="flex-1 justify-center items-center align-middle"
            source={imgBackground}
            resizeMode="cover"
          >
            <Image source={logo} style={styles.image} alt="logo" />
            <View className="items-center pt-8">
              <View className="flex-col justify-center pb-2">
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                  placeholderTextColor="white"
                  className="h-14 border-white color-white font-semibold border-2 rounded-2xl m-2 p-4 w-96 outline-none"
                  onChangeText={(usuario) =>
                    actualizarState("usuario", usuario)
                  }
                  placeholder="Usuario"
                  value={login.usuario}
                />
              </View>
              <View className="flex-col justify-center pb-2">
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  placeholderTextColor="white"
                  className="h-14 border-white color-white font-semibold pla border-2 rounded-2xl m-2 p-4 w-96 outline-none"
                  onChangeText={(pwd) => actualizarState("password", pwd)}
                  value={login.password}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "Enter" ? handleSubmit() : ""
                  }
                  placeholder="Contraseña"
                  secureTextEntry={true}
                />
              </View>
              <TouchableHighlight
                onPress={handleSubmit}
                disabled={validarUsr()}
                className="bg-[#e46116] disabled:bg-gray-500 p-3 rounded items-center w-40"
              >
                <Text className="text-white font-bold">Ingresar</Text>
              </TouchableHighlight>
            </View>
          </ImageBackground>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default LoginForm;
