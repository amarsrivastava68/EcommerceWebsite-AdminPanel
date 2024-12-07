import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    isLoading : true , 
    productList : [] , 

}
export const AddNewProduct  = createAsyncThunk('/products/addnewproduct' ,async (formData)=> {
    const response  =await axios.post('http://localhost:5000/api/admin/products/add' , formData , {
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response?.data
})
export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {try {
        const result = await axios.get(
            "http://localhost:5000/api/admin/products/get"
          );
      
          return result?.data;
    } catch (error) {
        return error
    }
    
    }
  );
export const EditProduct  = createAsyncThunk('/products/editproduct' ,async ({id , formData})=> {
    const response  =await axios.put(`http://localhost:5000/api/admin/products/edit/${id}` , formData , {
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response?.data
})
export const DeleteProduct  = createAsyncThunk('/products/delete' ,async ({id , formData})=> {
    const response  =await axios.delete(`http://localhost:5000/api/admin/products/add/${id}` , formData , {
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response?.data
})
const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });
export default AdminProductsSlice.reducer