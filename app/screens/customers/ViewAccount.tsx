import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { UserResponse } from "../interfaces/userResponse";
import { useRoute } from "@react-navigation/native";

export default function ViewAccount() {
  const { width } = useWindowDimensions();
  const route = useRoute<any>();
  const user = route.params.customer as UserResponse;
  const userName = user.firstName + " " + user.lastName;
  const [customer, getUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    idUser: "",
    dni: "",
  });

  useEffect(() => {
    if (user) {
      getUser(user);
    }
  }, [user]);

  // Leer los datos del formulario
  const updateStateForm = (name: string, value: string) => {
    getUser({
      ...customer,
      [name]: value,
    });
  };

  const updateCustomer = () => {};

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center">
        <View
          className="items-center"
          style={width > 768 ? styles.cardWeb : styles.cardPhone}
        >
          <FontAwesome
            name="user-circle"
            size={width > 768 ? 100 : 70}
            color="gray"
          />
          <Text className="text-gray-600 font-bold text-xl pb-4">
            {userName}
          </Text>
          <View>
            <View className="flex-row justify-center pb-2">
              <Text style={styles.label}>Nombre Completo</Text>
              <TextInput
                placeholderTextColor="gray"
                className="h-14 border-gray-600 text-gray-600 font-semibold border-2 rounded-2xl m-2 p-4 w-48 outline-none"
                placeholder="Nombre Completo"
                value={customer.firstName}
                onChangeText={(text) => updateStateForm("firstName", text)} // Corregido
              />
              <View className="container w-52">
                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                  placeholderTextColor="gray"
                  className="h-14 border-gray-600 text-gray-600 font-semibold border-2 rounded-2xl m-2 p-4 w-48 outline-none"
                  placeholder="Apellidos"
                  value={customer.lastName}
                  onChangeText={(text) => updateStateForm("lastName", text)}
                />
              </View>
            </View>
            <View className="flex-row justify-center pb-2">
              <Text style={styles.label}>Correo Electrónico</Text>
              <TextInput
                placeholderTextColor="gray"
                className="h-14 border-gray-600 text-gray-600 font-semibold border-2 rounded-2xl m-2 p-4 w-full outline-none"
                placeholder="Correo Electrónico"
                value={customer.email}
                onChangeText={(text) => updateStateForm("email", text)}
              />
            </View>
            <View className="flex-row justify-center pb-2">
              <Text style={styles.label}>Contacto</Text>
              <TextInput
                placeholderTextColor="gray"
                className="h-14 border-gray-600 text-gray-600 font-semibold border-2 rounded-2xl m-2 p-4 w-48 outline-none"
                placeholder="Contacto"
                value={customer.phone}
                onChangeText={(text) => updateStateForm("phone", text)}
              />
              <View className="container w-52">
                <Text style={styles.label}>Género</Text>
                <Picker
                  style={width > 768 ? styles.pickerStyles : null}
                  selectedValue={customer.gender}
                  onValueChange={(value) => updateStateForm("gender", value)}
                >
                  <Picker.Item label="Masculino" value="m" />
                  <Picker.Item label="Femenino" value="f" />
                  <Picker.Item label="Otro" value="o" />
                </Picker>
              </View>
            </View>
            <View className="flex-row justify-center pb-2">
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                placeholderTextColor="gray"
                className="h-14 border-gray-600 text-gray-600 font-semibold border-2 rounded-2xl m-2 p-4 outline-none w-full"
                placeholder="Dirección"
                value={customer.address}
                onChangeText={(text) => updateStateForm("address", text)}
              />
            </View>
            <View className="flex-row justify-center">
              <TouchableHighlight
                onPress={() => {}}
                className="bg-[#e46116] p-3 rounded items-center w-40 mr-2"
              >
                <Text className="text-white font-bold">Actualizar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {}}
                className="bg-gray-600 p-3 rounded items-center w-40"
              >
                <Text className="text-white font-bold">Regresar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  pickerStyles: {
    borderWidth: 2,
    borderColor: "#4B5563",
    borderRadius: 16,
    margin: 8,
    padding: 15,
    backgroundColor: "#0000",
  },
  cardWeb: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Para Android
    width: 500,
  },
  cardPhone: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Para Android
    width: 380,
  },
  label: {
    position: "absolute",
    top: -10, // Ajusta este valor para la posición vertical del label
    left: 8, // Ajusta este valor para la posición horizontal del label
    backgroundColor: "white", // Asegura que el fondo del label coincida con el fondo de tu app
    paddingHorizontal: 4, // Ajusta el relleno horizontal del label
    fontSize: 12, // Ajusta el tamaño de la fuente del label
    color: "#888", // Ajusta el color del texto del label
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
