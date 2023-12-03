import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import firebase from "../../config/FIREBASE";
import { CardMahasiswa } from "../../components";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mahasiswas: {},
      mahasiswasKey: [],
    };
  }

  componentDidMount() {
    this.ambilData();
  }

  ambilData = () => {
    firebase
      .database()
      .ref("Mahasiswa")
      .once("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let MahasiswaItem = { ...data };

        this.setState({
          mahasiswas: MahasiswaItem,
          mahasiswasKey: Object.keys(MahasiswaItem),
        });
      });
  };

  removeData = (id) => {
    Alert.alert(
      "Info",
      "Anda yakin akan menghapus data ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            firebase
              .database()
              .ref("Mahasiswa/" + id)
              .remove();
            this.ambilData();
            Alert.alert("Hapus", "Sukses menghapus data!");
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { mahasiswas, mahasiswasKey } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Mahasiswa</Text>
          <View style={styles.garis} />
        </View>
        <View style={styles.listMahasiswa}>
          {mahasiswasKey.length > 0 ? (
            mahasiswasKey.map((key) => (
              <CardMahasiswa
                key={key}
                MahasiswaItem={mahasiswas[key]}
                id={key}
                {...this.props}
                removeData={this.removeData}
              />
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate("Tambah")}
          >
            <FontAwesomeIcon icon={faPlus} size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 30,
  },
  wrapperButton: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: "skyblue",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listMahasiswa: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
});
