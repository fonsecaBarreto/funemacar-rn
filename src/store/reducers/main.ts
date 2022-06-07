import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  user: null,
   /* {
    id: "MY_USER_ID",
    name: "Lucas Fonseca Barreto",
    email: "lucasfonsecab@hotmail.com",
    price: "300",
    phone: "22997836256"
  }, */
  loading: false
}

const mainSlice = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    }
  }
})

export const { setLoading, setUser } = mainSlice.actions
export default mainSlice.reducer
