import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import clienteAxios from "../../../config/axios.conf";
import { useRoute } from "@react-navigation/native";

export default function ViewPlans() {
  const currency = new Intl.NumberFormat("es-CO");
  const [saved, setSaved] = useState<number[]>([]); // Type the saved array as an array of numbers
  const { width } = useWindowDimensions();
  const route = useRoute<any>();
  const customer = route.params.customer;
  const [plans, getPlans] = useState({
    _id: "",
    name: "",
    enabled: 0,
    price: 0,
    dateInit: "",
    dateEnd: "",
    dniUser: "",
  });

  const consultarPlanes = async () => {
    const plan = await clienteAxios.get(`/plans/dni/${customer.dni}`);
    getPlans(plan.data);
  };

  useEffect(() => {
    consultarPlanes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView
        contentContainerStyle={width > 768 ? styles.contentWeb : styles.content}
      >
        {plans && plans._id ? ( // Verifica si plans existe y tiene un _id
          <TouchableOpacity
            className={`${width > 768 ? "w-1/2" : ""}`}
            key={plans._id}
            onPress={() => {}}
          >
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.cardImg}
                  source={{
                    uri:
                      plans._id === "67a61e3d3a1d7bce66fb0db7"
                        ? "https://png.pngtree.com/thumb_back/fw800/background/20190903/pngtree-golden-gradient-texture-background-image_311290.jpg"
                        : plans._id === "67a61e3d3a1d7bce66fb0db8"
                        ? "https://i.pinimg.com/736x/3d/00/74/3d007482eb379adc43fe5705264389ae.jpg"
                        : "https://media.istockphoto.com/id/869998904/es/foto/fondo-de-textura-de-bronce-degradado-oscuro.jpg?s=612x612&w=0&k=20&c=G67lv9xuA9589XbVFDcSyQS52Ov11acRnjhAFJpnK3Q",
                  }}
                />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{plans.name}</Text>
                </View>
                <Text style={styles.cardDates}>
                  Fecha Inicial: {plans.dateInit}
                </Text>
                <Text style={styles.cardDates}>
                  Fecha Final: {plans.dateEnd}
                </Text>
                <Text style={styles.cardPrice}>
                  <Text className="font-semibold">
                    Inscripción: ${currency.format(plans.price)}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Text>No se encontraron planes</Text> // Mensaje si no hay planes
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  contentWeb: {
    display: "flex",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  /** Card */
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTop: {
    backgroundColor: "#A9A197",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    backgroundColor: "#A9A197",
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    backgroundColor: "#A9A197",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#232425",
    marginRight: "auto",
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#232425",
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: "#232425",
  },
});
