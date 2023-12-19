import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/user/actions";
import { login } from "../../../axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
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
        Alert.alert(
          "Error",
          "Username atau password salah. Silakan coba lagi."
        );
      }
    } catch (err) {
      console.log("Error:", err);

      setError("Terjadi kesalahan saat melakukan login");
      Alert.alert("Error", "Terjadi kesalahan saat melakukan login");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#dbe4f3" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <Image
          source={require("../../../assets/mie.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          Warmindo<Text style={{ color: COLORS.primary }}> Nusantara</Text>
        </Text>
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 18 }}>
          Silahkan Login
        </Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputstyles}>
            <FontAwesomeIcon icon={faUser} size={30} color="green" />
          </View>
          <TextInput
            onChangeText={(text) => setForm({ ...form, username: text })}
            style={styles.input}
          />
        </View>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputstyles}>
            <FontAwesomeIcon icon={faLock} size={30} color="green" />
          </View>
          <TextInput
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
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
  inputstyles: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 2,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 18,
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 15,
    elevation: 2,
    paddingLeft: 10,
  },
  // buttonContainer: {
  //   marginTop: 15,
  // },
  button: {
    backgroundColor: COLORS.primary,
    // width: "50%",
    // padding: 10,
    borderRadius: 6,
    paddingVertical: 14,
    marginTop: 20,
    marginHorizontal: 25,
    borderRadius: 50,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Login;
