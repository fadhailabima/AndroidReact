import React, { Component } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  showDetailTransaksi,
  updateStatusTransaksi,
  updateStatusDetailTransaksi,
} from "../../../axios";

import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaksi: {},
      detailTransaksi: [],
      token: "",
      selectedStatus: "",
      selectedDetailId: "",
      statusOptions: {
        transaksiStatusOptions: [],
        detailTransaksiStatusOptions: [],
      },
    };
  }

  async componentDidMount() {
    await this.loadToken();
    this.loadDetailTransaksi();
  }

  async loadToken() {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        this.setState({ token });
      }
    } catch (error) {
      console.error("Error loading token: ", error);
    }
  }

  async loadDetailTransaksi() {
    try {
      const { token } = this.state;
      const idtransaksi = this.props.route.params.id;

      const response = await showDetailTransaksi(token, idtransaksi);

      if (response.transaksi && response.transaksi.detail_transaksi) {
        this.setState({
          transaksi: response.transaksi,
          detailTransaksi: response.transaksi.detail_transaksi,
          statusOptions: {
            transaksiStatusOptions: response.transaksiStatusOptions,
            detailTransaksiStatusOptions: response.detailTransaksiStatusOptions,
          },
        });
      }
    } catch (error) {
      console.error("Error loading detail transaksi: ", error);
    }
  }

  async changeStatusTransaksi(selectedStatus) {
    try {
      const { token } = this.state;
      const idtransaksi = this.props.route.params.id;

      await updateStatusTransaksi(token, idtransaksi, selectedStatus);
      Alert.alert("Success", "Status updated successfully");

      this.setState({ selectedStatus });
    } catch (error) {
      console.error("Error changing status transaksi: ", error);
    }
  }

  async changeStatusDetailTransaksi(selectedStatus, selectedDetailId) {
    try {
      const { token } = this.state;

      await updateStatusDetailTransaksi(
        token,
        selectedDetailId,
        selectedStatus
      );

      Alert.alert("Success", "Status updated successfully");

      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error changing status detail transaksi: ", error);
    }
  }

  render() {
    const { detailTransaksi, statusOptions, transaksi } = this.state;
    return (
      <View style={styles.pages}>
        {detailTransaksi &&
          detailTransaksi.map((detail, index) => (
            <View key={index} style={styles.menuContainer}>
              <Text>Nama Menu: {detail.namamenu}</Text>
              <Text>Harga: {detail.harga}</Text>
              <Text>Jumlah: {detail.jumlah}</Text>
              <Text style={styles.status}>Status </Text>
              <SelectDropdown
                data={statusOptions.detailTransaksiStatusOptions}
                defaultButtonText={detail.status}
                onSelect={(selectedItem) =>
                  this.changeStatusDetailTransaksi(selectedItem, detail.id)
                }
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                style={styles.selectDropdown}
              />
              {index !== detailTransaksi.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}

        {transaksi && (
          <View style={styles.totalContainer}>
            <Text>Metode Pembayaran: {transaksi.metode_pembayaran}</Text>
            <Text>Total: {transaksi.total}</Text>
            <Text style={styles.status}>Status Transaksi </Text>
            <SelectDropdown
              data={statusOptions.transaksiStatusOptions}
              defaultButtonText={transaksi.status}
              onSelect={(selectedItem) =>
                this.changeStatusTransaksi(selectedItem)
              }
              buttonTextAfterSelection={(selectedItem) => selectedItem}
              rowTextForSelection={(item) => item}
              style={styles.selectDropdown}
            />
          </View>
        )}
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
  menuContainer: {
    marginBottom: 0,
    paddingBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
  },
  totalContainer: {
    marginTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  selectDropdown: {
    width: 10, // Atur lebar minimum yang diinginkan di sini
  },
  status : {
    marginBottom : 10,
  }
});


