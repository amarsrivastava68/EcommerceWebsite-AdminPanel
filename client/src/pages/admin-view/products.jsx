 import React, { Fragment, useState  , useEffect} from 'react'
 import { Button } from '@/components/ui/button'
import { Sheet, SheetHeader, SheetTitle , SheetContent } from '@/components/ui/sheet'
import CommonForm from '@/components/common/form'
import { addProductFormElements } from '@/config'
import ImageUpload from './image-upload'
import { useDispatch , useSelector } from 'react-redux'
import { AddNewProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductTile from '../../components/admin-view/product-tile'
 const AdminProducts = () => {
  const initialFormData = {
    image : null , 
    title :  '', 
    description : '' , 
    category : '' , 
    brand : '' , 
    price : '' , 
    salePrice : '' ,
    totalStock : ''
  }
const [openCreateProductsDialog , setOpenCreateProductsDialog] = useState(false)
const [formData , setFormData] = useState(initialFormData)
const [imageFile , setimageFile ] = useState (null)
const [uploadImageurl , setUploadImageUrl ] = useState('')
const [ImageLoading , setImageLoading] = useState(false)
const [currentEditedId , setcurrentEditedId] = useState(null)
const dispatch = useDispatch()
const {toast} = useToast()
const {productList} = useSelector(state => state.adminProducts)
function onSubmit (event) {
  event.preventDefault ()
  dispatch(AddNewProduct({
    ...formData , 
    image : uploadImageurl
  })).then(data => {
    if(data?.payload?.success ){
      dispatch(fetchAllProducts())
      setOpenCreateProductsDialog(false)
      setimageFile(null)
      setFormData(initialFormData)
      toast({
        title :'product is added succssfully .'

      })
    }
  })

}
useEffect(()=> { 
  dispatch(fetchAllProducts())
  console.log('inside useeffect')
} , [dispatch])
console.log(productList , uploadImageurl)

  return (
     <Fragment>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick = {()=> setOpenCreateProductsDialog(true)}>
Add new Product
        </Button>

      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {productList && productList.length >0 ?
          
          productList.map(product=> (
             
              <AdminProductTile product={product}/>
          )):null
        }
      </div>
        <Sheet open={openCreateProductsDialog} onOpenChange = {()=> setOpenCreateProductsDialog(false)}>
          <SheetContent side = "right" className="overflow-auto ">
              <SheetHeader>
                <SheetTitle>
                  Add New Product 
                </SheetTitle>
              </SheetHeader>
              <ImageUpload file={imageFile} setFile = {setimageFile} uploadImageurl = {uploadImageurl} setUploadImageUrl = {setUploadImageUrl} ImageLoading={ImageLoading} setImageLoading = {setImageLoading}/>
      <div className='py-6'>
        <CommonForm
        formControls={addProductFormElements}
        formData={formData}
        setFormData={setFormData}
        buttonText='Add Product'
        onSubmit={onSubmit}           
        >

        </CommonForm>
      </div>
          </SheetContent>
        </Sheet>
      
     </Fragment>
   )
 }
 
 export default AdminProducts