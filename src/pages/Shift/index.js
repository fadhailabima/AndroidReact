import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { getShift } from "../../../axios";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Shift = () => {
  const navigation = useNavigation();

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
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Shift;
