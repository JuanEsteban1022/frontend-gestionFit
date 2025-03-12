import React, { useCallback, useState } from "react";
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
import FontAwesome from "@expo/vector-icons/FontAwesome5";

const places = [
  {
    id: 1,
    img: "https://akroscenter.com/wp-content/uploads/2023/05/Entrenamiento-funcional-Descubre-sus-beneficios.jpg",
    name: "Desafíos de acondicionamiento físico funcional",
    dates: "Apr 23 - May 5",
    price: 20000,
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfyDeYkSScKla31r3Uy9WU12kyXRPsWRVcPQ&s",
    name: "Desafío levantamiento de pesas",
    dates: "Apr 25 - May 5",
    price: 15000,
  },
  {
    id: 3,
    img: "https://healthylifegym.com/public/img/galeria/internas/rumba/_(2).JPG",
    name: "Rumba Terapia",
    dates: "Apr 22 - May 4",
    price: 10000,
  },
];

export default function ViewEvents() {
  const [saved, setSaved] = useState<number[]>([]); // Type the saved array as an array of numbers
  const currency = new Intl.NumberFormat("es-CO");
  const { width } = useWindowDimensions();
  const handleSave = useCallback(
    (id: number) => {
      // Use number, not Number
      if (saved.includes(id)) {
        setSaved(saved.filter((val) => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved]
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View style={styles.header}>
        {/* <View style={styles.headerTop}>
          <View style={styles.headerAction} />
          <View style={styles.headerAction}></View>
        </View> */}
      </View>
      <ScrollView
        contentContainerStyle={width > 768 ? styles.contentWeb : styles.content}
      >
        {places.map(({ id, img, name, dates, price }, index) => {
          const isSaved = saved.includes(id);

          return (
            <TouchableOpacity
              className={`${width > 768 ? "w-1/2" : ""}`}
              key={id}
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={isSaved ? "#ea266d" : "#222"}
                        name="heart"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardTop}>
                  <Image
                    alt=""
                    resizeMethod="auto"
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={{ uri: img }}
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>
                  </View>

                  <Text style={styles.cardDates}>Fecha: {dates}</Text>

                  <Text style={styles.cardPrice}>
                    <Text>
                      Inscripción: ${currency.format(price)} / 10 am, 4 pm , 7
                      pm
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
  cardLikeWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
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
    color: "#000",
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
    fontWeight: 600,
    color: "#232425",
  },
});
