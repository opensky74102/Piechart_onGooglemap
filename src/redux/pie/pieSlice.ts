import { createSlice } from '@reduxjs/toolkit';


export const pieSlice = createSlice({
  name: "pie",
  initialState: {
    pieDetail: [],
    isLoading: false,
  },
  reducers: {
    addPieData: (state: any, pieData: any) => {
      state.pieDetail.push(pieData.payload)
    },
    removePieData: (state: any, pieID: any) => {
      let tempPies = state.pies;
      tempPies.splice(pieID, 1);
      state.pieDetail = tempPies;
    },
    savePiesDetail: (state: any) => {
      state.isLoading = true;
      setTimeout(() => {
        state.isLoading = false;
      }, 3000)
    }
  }
})

export const { addPieData, removePieData, savePiesDetail } = pieSlice.actions;
export default pieSlice.reducer;