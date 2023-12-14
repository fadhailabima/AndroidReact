import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 12,
            color: COLORS.black,
            // alignItems: "center",
            // justifyContent: "center",
            // backgroundColor: COLORS.primary,
          }}
        >
          Warmindo Nusantara
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: COLORS.black,
          }}
        >
          Silahkan Login
        </Text>
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          Username
        </Text>
        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Isi Username"
            placeholderTextColor={COLORS.black}
            keyboardType="default"
            style={{ width: "100%," }}
          />
        </View>
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          Password
        </Text>
        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Isi Password"
            placeholderTextColor={COLORS.black}
            secureTextEntry={isPasswordShown}
            style={{
              width: "100%",
            }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 6,
        }}
      ></View>
    </SafeAreaView>
  );
};

export default Login;
