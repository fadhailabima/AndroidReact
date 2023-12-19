import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { getShift } from "../../../axios";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

const Shift = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const handleShiftButtonPress = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (token) {
        const shiftResponse = await getShift(token);

        console.log("Shift Response:", shiftResponse);

        if (shiftResponse && shiftResponse.message) {
          Alert.alert("Informasi Shift", shiftResponse.message);
          navigation.navigate("Home");

          // Navigasi ke halaman Home setelah mendapatkan respons shift
          // Ubah 'Home' sesuai dengan nama rute halaman Home Anda
        } else {
          Alert.alert("Error", "Gagal mendapatkan informasi shift");
        }
      } else {
        Alert.alert("Error", "Token tidak ditemukan");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Terjadi kesalahan saat mengambil informasi shift");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/koki3.png")} style={styles.img} />
      <Text style={styles.title}>Warmindo Nusantara</Text>
      <Text style={styles.detail}>
        {" "}
        Silahkan Masuk Shift Sebelum Mulai Bekerja
      </Text>
      <TouchableOpacity onPress={handleShiftButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Masuk Shift</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    height: "40%",
    width: "120%",
    resizeMode: "contain",
    marginLeft: 30,
  },
  title: {
    color: "black",
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    marginTop: 10,
  },
  detail: {
    color: "black",
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
    marginTop: 20,
  },
});

export default Shift;
