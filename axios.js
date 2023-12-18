import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://10.0.2.2:8000/api/login", {
      username: username,
      password: password,
    });

    if (
      response.data &&
      response.data.message === "Login Berhasil" &&
      response.data.data &&
      response.data.data.user &&
      response.data.data.user.token
    ) {
      return response.data.data.user.token;
    } else {
      throw new Error("Token tidak ditemukan dalam respons server");
    }
  } catch (error) {
    throw new Error(`Terjadi kesalahan dalam proses login: ${error.message}`);
  }
};

export const getShift = async (token) => {
  try {
    const response = await axios.post(
      "http://10.0.2.2:8000/api/shift",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDaftarTransaksi = async (token) => {
  try {
    const response = await axios.get(
      "http://10.0.2.2:8000/api/daftarTransaksi",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  };  
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      "http://10.0.2.2:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.message === "Logout berhasil") {
      return true; // Berhasil logout
    } else {
      throw new Error("Gagal melakukan logout");
    }
  } catch (error) {
    throw new Error(`Terjadi kesalahan dalam proses logout: ${error.message}`);
  }
};

export const showDetailTransaksi = async (token, idtransaksi) => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/api/transaksi/${idtransaksi}`, // Sesuaikan dengan endpoint yang benar
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusTransaksi = async (token, idtransaksi, status) => {
  try {
    const response = await axios.put(
      `http://10.0.2.2:8000/api/transaksi/${idtransaksi}/updatestatus`, // Sesuaikan dengan endpoint yang benar
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusDetailTransaksi = async (token, id, status) => {
  try {
    const response = await axios.put(
      `http://10.0.2.2:8000/api/detailtransaksi/${id}/updatestatus`, // Sesuaikan dengan endpoint yang benar
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStatusOptions = async (idtransaksi, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/transaksi/${idtransaksi}/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};