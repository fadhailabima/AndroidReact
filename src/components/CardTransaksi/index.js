import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CardTransaksi = ({ transaction, navigation }) => {
  const { idtransaksi, kode_meja, status } = transaction;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { id: idtransaksi })}
    >
      <View>
        <Text style={styles.id}>{idtransaksi}</Text>
        <Text style={styles.kodeMeja}>{kode_meja}</Text>
        <Text style={styles.kodeMeja}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardTransaksi;

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
  id: {
    fontWeight: "bold",
    fontSize: 16,
  },
  kodeMeja: {
    fontSize: 14,
    color: "gray",
  },
});
