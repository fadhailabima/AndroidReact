import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { InputData } from "../../components";
import firebase from "../../config/FIREBASE";
import SelectDropdown from "react-native-select-dropdown";

export default class Tambah extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      nim: "",
      angkatan: "",
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.nama && this.state.nim && this.state.angkatan) {
      const mahasiswaReferensi = firebase.database().ref("Mahasiswa");
      const Mahasiswa = {
        nama: this.state.nama,
        nim: this.state.nim,
        angkatan: this.state.angkatan,
      };
      mahasiswaReferensi
        .push(Mahasiswa)
        .then((data) => {
          Alert.alert("Sukses", "Mahasiswa Tersimpan");
          this.props.navigation.replace("Home");
        })
        .catch((error) => {
          console.log("Error :", error);
        });
    } else {
      Alert.alert("Error", "Nama, Nim dan angkatan wajib diisi");
    }
  };

  render() {
    const angkatan = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama"
          placeholder="Masukkan Nama"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="NIM"
          placeholder="Masukkan Nim"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.nim}
          namaState="nim"
        />
        <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>
          Angkatan
        </Text>
        <SelectDropdown
          data={angkatan}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index)
            this.onChangeText("angkatan", selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          defaultValue={this.state.angkatan}
          buttonStyle={{
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 5,
            padding: 10,
            width: "100%",
          }}
          defaultButtonText="Pilih Angkatan"
          buttonTextStyle={{ textAlign: "flex-start" }}
          dropdownIconPosition={"right"}
        />
        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombol: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
