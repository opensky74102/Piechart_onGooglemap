import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPieDetail } from '../../type';
import { getLocalStorage } from '../../utils/storageUtil';

export const pieSlice = createSlice({
  name: "pie",
  initialState: {
    project_name: '',
    pieDetail: [],
    projectList: [],
    isLoading: false,
    isOpenFixedModal: false,
    isOpenSidePopup: false,
  },
  reducers: {
    addPieData: (state: any, pieData: any) => {
      state.pieDetail.push(pieData.payload)
    },
    setPiesData: (state: any, action: PayloadAction<IPieDetail[]>) => {
      state.pieDetail = action.payload;
    },
    removePieData: (state: any, action: PayloadAction) => {
      let tempPies = state.pies;
      tempPies.splice(action.payload, 1);
      state.pieDetail = tempPies;
    },
    savePiesDetail: (state: any) => {
      state.isLoading = true;
      setTimeout(() => {
        state.isLoading = false;
      }, 3000)
    },
    openFixedModal: (state: any) => {
      state.isOpenFixedModal = true;
    },
    closeFixedModal: (state: any) => {
      state.isOpenFixedModal = false;
    },
    setProjectName: (state: any, action: PayloadAction<String>) => {
      state.project_name = action.payload;
    },
    setLoading: (state: any) => {
      state.isLoading = true;
    },
    clearLoading: (state: any) => {
      state.isLoading = false;
    },
    clearState: (state: any) => {
      state.project_name = '';
      state.pieDetail = [];
      state.isLoading = false;
      state.isOpenFixedModal = false;
    },
    setProjectList: (state: any, action: PayloadAction<any[]>) => {
      state.projectList = action.payload;
    },
    setIsOpenSidePopup: (state: any, action: PayloadAction<boolean>) => {
      state.isOpenSidePopup = action.payload;
    }
  }
})
export const isOpenFixedModal = (state: any) => state.pie.isOpenFixedModal;
export const isLoading = (state: any) => state.pie.isLoading;
export const getProjectName = (state: any) => state.pie.project_name;
export const getProjectList = (state: any) => state.pie.projectList;
export const getPies = (state: any) => state.pie.pieDetail;
export const isOpenSidePopup = (state:any) => state.pie.isOpenSidePopup;
export const getPieDetail = (state: any) => {
  let user_id = getLocalStorage('user_id');
  return {
    user_id: user_id,
    project_name: state.pie.project_name,
    pies: state.pie.pieDetail
  }
}
export const {
  setProjectName,
  setLoading,
  clearLoading,
  addPieData,
  removePieData,
  savePiesDetail,
  setPiesData,
  openFixedModal,
  closeFixedModal,
  clearState,
  setProjectList,
  setIsOpenSidePopup
} = pieSlice.actions;

export default pieSlice.reducer;