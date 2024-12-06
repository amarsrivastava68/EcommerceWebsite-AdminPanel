 import React, { Fragment, useState } from 'react'
 import { Button } from '@/components/ui/button'
import { Sheet, SheetHeader, SheetTitle , SheetContent } from '@/components/ui/sheet'
import CommonForm from '@/components/common/form'
import { addProductFormElements } from '@/config'
import ImageUpload from './image-upload'
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

function onSubmit () {

}
  return (
     <Fragment>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick = {()=> setOpenCreateProductsDialog(true)}>
Add new Product
        </Button>

      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
        <Sheet open={openCreateProductsDialog} onOpenChange = {()=> setOpenCreateProductsDialog(false)}>
          <SheetContent side = "right" className="overflow-auto ">
              <SheetHeader>
                <SheetTitle>
                  Add New Product 
                </SheetTitle>
              </SheetHeader>
              <ImageUpload file={imageFile} setFile = {setimageFile} uploadImageurl = {uploadImageurl} setUploadImageUrl = {setUploadImageUrl}/>
      <div className='py-6'>
        <CommonForm
        formControls={addProductFormElements}
        formData={formData}
        setFormData={setFormData}
        buttonText='Add Product'

        >

        </CommonForm>
      </div>
          </SheetContent>
        </Sheet>
      
     </Fragment>
   )
 }
 
 export default AdminProducts