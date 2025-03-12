import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const imgBackground = require("../../../assets/login_gym.png");
const imgPlanning = require("../../../assets/planning.png")
const imgEvents = require("../../../assets/events.png")
const places = [
  {
    id: 2,
    img: imgEvents,
    name: "Eventos",
    icon: "today",
    redirect: "Eventos",
  },
  {
    id: 1,
    img: imgPlanning,
    name: "Mi Plan",
    icon: "playlist-add-check",
    redirect: "Mi Plan",
  },
];
let widthGlobal: number = 190;
export default function Welcome() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>(); // Usa el hook
  widthGlobal = width;
  console.log('widthGlobal: ', widthGlobal)
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center bg-slate-100">
        <ImageBackground
          className="flex-1 justify-center"
          source={imgBackground}
          resizeMode="cover"
        >
          <View>
            <View style={styles.header}></View>
            <ScrollView
              contentContainerStyle={
                width > 768 ? styles.contentWeb : styles.content
              }
            >
              {places.map(({ id, redirect, name, img }, index) => {
                return (
                  <TouchableOpacity
                    className={`${
                      width > 768 ? "w-1/5 justify-around" : "w-1/2"
                    }`}
                    key={id}
                    onPress={() => {
                      navigation.navigate(redirect); // Redirecciona a la pantalla correspondiente
                    }}
                  >
                    <View style={styles.card}>
                      <View style={styles.cardTop}>
                        <Image
                          alt="img"
                          resizeMethod="auto"
                          resizeMode="cover"
                          style={styles.cardImg}
                          source={img}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardTitle}>{name}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
  },
  contentWeb: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
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
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    backgroundColor: "#A9A197",
    display: "flex",
    justifyContent: "center",
    marginTop: 4,
    width: "70%",
    height: widthGlobal > 768 ? 190 : 140,
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    backgroundColor: "#A9A197",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    // width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginRight: "auto",
  },
});
