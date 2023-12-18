import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/user/actions";
import { login } from "../../../axios";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const token = await login(form.username, form.password);

      if (token) {
        await AsyncStorage.setItem("userToken", token);
        dispatch(setToken(token));
        navigation.navigate("Shift");
      } else {
        setError("Username atau password salah. Silakan coba lagi.");
      }
    } catch (err) {
      console.log("Error:", err);

      if (err.message === "Username atau password tidak valid.") {
        setError("Username atau password salah. Silakan coba lagi.");
      } else {
        setError("Terjadi kesalahan saat melakukan login: " + err.message);
        // Jika ingin menampilkan keseluruhan objek kesalahan
        // setError("Terjadi kesalahan saat melakukan login: " + JSON.stringify(err));
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login Page</Text>
          <Text style={styles.errorText}>{error}</Text>

          <View style={styles.inputContainer}>
            <Text>Username</Text>
            <TextInput
              onChangeText={(text) => setForm({ ...form, username: text })}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 18,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.primary,
    padding: 7,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "20%",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Login;
