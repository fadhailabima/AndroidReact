import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Tambah, Detail, Edit, Login} from "../pages";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tambah"
        component={Tambah}
        options={{ title: "Tambah Mahasiswa" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Detail Mahasiswa" }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ title: "Edit Mahasiswa" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
