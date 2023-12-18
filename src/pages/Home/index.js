import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import COLORS from "../../../constants/colors";
// import { withNavigation } from "@react-navigation/compat";
import { CardTransaksi } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDaftarTransaksi, logout } from "../../../axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      error: "", // Menambahkan state untuk menyimpan pesan error
    };
  }

  handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const logoutResponse = await logout(token); // Menggunakan fungsi logout dari axios

      if (logoutResponse) {
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate("Login");
      } else {
        // Tangani jika proses logout gagal
        // Tampilkan pesan atau lakukan aksi yang sesuai dengan kebutuhan aplikasi Anda
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await getDaftarTransaksi(token);

      if (response.error) {
        // Jika ada pesan error dari respons
        this.setState({ error: response.error });
      } else {
        // Jika respons sukses, update data transaksi
        this.setState({ transactions: response.daftar_transaksi });
      }
    } catch (error) {
      // Tangani kesalahan koneksi atau lainnya
      this.setState({ error: "Terjadi kesalahan dalam mengambil data." });
      console.error("Error getting data: ", error);
    }
  }

  render() {
    const { transactions, error } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Transaksi</Text>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={this.handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.garis} />
        </View>
        {error ? ( // Tampilkan pesan error jika ada
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.listTransaksi}>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <CardTransaksi
                  key={index}
                  transaction={transaction}
                  navigation={this.props.navigation}
                />
              ))
            ) : (
              <Text>Tidak ada Transaksi</Text>
            )}
          </View>
        )}
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

  // export default withNavigation(Home);
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
    backgroundColor: COLORS.primary,
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
  listTransaksi: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  errorContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  btnLogout: {
    position: "absolute",
    right: 30,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sesuaikan jarak dari atas jika diperlukan
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
