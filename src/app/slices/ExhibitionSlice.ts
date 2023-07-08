import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface FilterExhibtionState {
  rooms: Array<string>;
  requestBody: bodyRequest;
}

export interface bodyRequest {
  itemList: Array<string>;
  operator: string;
  order: string;
}

const initialState: FilterExhibtionState = {
  rooms: [
    "Todas las salas",
    "FLEXI",
    "Don Roberto González Barrera",
    "Santander",
    "Temporal de Biblioteca",
    "Andador cultural",
  ],
  requestBody: {
    itemList: [
      "FLEXI",
      "Don Roberto González Barrera",
      "Santander",
      "Temporal de Biblioteca",
      "Andador cultural",
    ],
    operator: "",
    //Más reciente
    order: "DESC",
  },
};

export const filterExhibtionSlice = createSlice({
  name: "ExhibitionFilter",
  initialState,
  reducers: {
    //Cambio de estado en redux
    handleRooms: (state, action: PayloadAction<string>) => {
      let updatedRooms = state.requestBody.itemList.slice(); // Crear una copia del arreglo
      //Revisa si estba seleccionado "Todos" para limpiarlo
      if (state.requestBody.itemList.length == state.rooms.length - 1) {
        updatedRooms = [];
      }
      if (updatedRooms.includes(action.payload)) {
        // El checkbox ya estaba seleccionado, se deselecciona
        const index = updatedRooms.indexOf(action.payload);
        updatedRooms.splice(index, 1);
      } else {
        // El checkbox se selecciona y es "nuevo" de modo que pasa
        updatedRooms.push(action.payload);
      }
      state.requestBody.itemList = updatedRooms;
    },
    //Actuakiza los itemList a todos los existentes
    allRooms: (state, action: PayloadAction<Array<string>>) => {
      state.requestBody.itemList = action.payload.slice(1);
    },
    //Se encarga de manejar orden ASC || DESC
    handleOrder: (state, action: PayloadAction<string>) => {
      state.requestBody.order = action.payload;
    },
  },
});

export const { handleRooms, allRooms, handleOrder } =
  filterExhibtionSlice.actions;

//Para obtener la información
export default filterExhibtionSlice.reducer;
