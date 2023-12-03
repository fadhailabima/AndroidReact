import { StyleSheet, Text, TouchableOpacity, View, Pressable} from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const CardMahasiswa = ({ id, MahasiswaItem, navigation, removeData }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { id: id })}
    >
      <View>
        <Text style={styles.nama}>{MahasiswaItem.nama}</Text>
        <Text style={styles.nim}>{MahasiswaItem.nim}</Text>
      </View>
      <View style={styles.icon}>
        <Pressable
          onPress={() => navigation.navigate("Edit", { id: id })}
        >
          <FontAwesomeIcon icon={faEdit} color={"orange"} size={25} />
        </Pressable>
        <Pressable onPress={() => removeData(id)}>
          <FontAwesomeIcon icon={faTimes} color={"red"} size={25} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default CardMahasiswa;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nama: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nomorHP: {
    fontSize: 12,
    color: "gray",
  },
  icon: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center", 
    gap: 22
  },
});
