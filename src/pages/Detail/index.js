import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  showDetailTransaksi,
  updateStatusTransaksi,
  updateStatusDetailTransaksi,
  getStatusOptions,
} from "../../../axios"; // Pastikan Anda memiliki fungsi getStatusOptions dari axios

import SelectDropdown from "react-native-select-dropdown";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaksi: {},
      detailTransaksi: [],
      token: "",
      selectedStatus: "", // State untuk menyimpan status yang dipilih
      selectedDetailId: "", // State untuk menyimpan ID detail transaksi yang dipilih
      statusOptions: [], // State untuk menyimpan opsi status dari server
    };
  }

  async componentDidMount() {
    await this.loadToken();
    await this.getStatusOptions();
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

  async getStatusOptions() {
    try {
      const { token } = this.state;
      const idtransaksi = this.props.route.params.id;

      const options = await getStatusOptions(idtransaksi, token);

      if (
        options &&
        options.transaksi_status &&
        options.detail_transaksi_status
      ) {
        this.setState({
          statusOptions: {
            transaksi: options.transaksi_status,
            detailTransaksi: options.detail_transaksi_status,
          },
        });
      }
    } catch (error) {
      console.error("Error getting status options: ", error);
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
        });
      }
    } catch (error) {
      console.error("Error loading detail transaksi: ", error);
    }
  }

  async changeStatusTransaksi() {
    try {
      const { token, selectedStatus } = this.state;
      const idtransaksi = this.props.route.params.id;

      await updateStatusTransaksi(token, idtransaksi, selectedStatus);
      // Lakukan sesuatu setelah status transaksi berhasil diubah
    } catch (error) {
      console.error("Error changing status transaksi: ", error);
    }
  }

  async changeStatusDetailTransaksi() {
    try {
      const { token, selectedStatus, selectedDetailId } = this.state;

      await updateStatusDetailTransaksi(
        token,
        selectedDetailId,
        selectedStatus
      );
      // Lakukan sesuatu setelah status detail transaksi berhasil diubah
    } catch (error) {
      console.error("Error changing status detail transaksi: ", error);
    }
  }

  render() {
    const { detailTransaksi, selectedStatus, statusOptions, transaksi } =
      this.state;
    return (
      <View style={styles.pages}>
        {/* Dropdown untuk memilih status transaksi */}
        <SelectDropdown
          data={statusOptions.transaksi}
          onSelect={(selectedItem, index) =>
            this.setState({ selectedStatus: selectedItem })
          }
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
        />
        {/* Tombol untuk mengubah status transaksi */}
        <TouchableOpacity onPress={() => this.changeStatusTransaksi()}>
          <Text>Ubah Status Transaksi</Text>
        </TouchableOpacity>
        {/* Menampilkan detail transaksi */}
        {detailTransaksi &&
          detailTransaksi.map((detail, index) => (
            <View key={index}>
              <Text>Nama Menu: {detail.namamenu}</Text>
              <Text>Harga: {detail.harga}</Text>
              <Text>Jumlah: {detail.jumlah}</Text>
              {/* Mengakses properti total dan metode_pembayaran dari objek transaksi */}
              <Text>Metode Pembayaran: {transaksi.metode_pembayaran}</Text>
              <Text>Total: {transaksi.total}</Text>
              {/* Dropdown untuk memilih status pesanan */}
              <SelectDropdown
                data={statusOptions.detailTransaksi}
                onSelect={(selectedItem, index) =>
                  this.setState({
                    selectedStatus: selectedItem,
                    selectedDetailId: detail.id,
                  })
                }
                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
              />
              {/* Tombol untuk mengubah status pesanan */}
              <TouchableOpacity
                onPress={() => this.changeStatusDetailTransaksi()}
              >
                <Text>Ubah Status Pesanan</Text>
              </TouchableOpacity>
            </View>
          ))}
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
});
