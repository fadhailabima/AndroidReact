import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import firebase from '../../config/FIREBASE'

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mahasiswa: {},
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("Mahasiswa/" + this.props.route.params.id)
      .once("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let MahasiswaItem = { ...data };

        this.setState({
          mahasiswa: MahasiswaItem,
        });
      });
  }

  render() {
    const {mahasiswa} = this.state
    return (
      <View style={styles.pages}>
        <Text>Nama :</Text>
        <Text style={styles.text}>{mahasiswa.nama}</Text>
        <Text>NIM :</Text>
        <Text style={styles.text}>{mahasiswa.nim}</Text>
        <Text>Angkatan :</Text>
        <Text style={styles.text}>{mahasiswa.angkatan}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text : {
    fontSize : 15,
    fontWeight: 'bold',
    marginBottom : 10,
  }
});
