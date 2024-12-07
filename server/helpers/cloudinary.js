const cloudinary = require ('cloudinary').v2
const multer = require ('multer')


    cloudinary.config({ 
        cloud_name: 'youtube-backend68', 
        api_key: '195698549454921', 
        api_secret: '6yFI8ETs8_kkNUmAaySBTqP8J4I'
    })
const storage = new multer.memoryStorage()

async function handleImageUploadUtils(file)
{
    const result = await cloudinary.uploader.upload(file , {
        resource_type : 'auto'
    })
    return result 
}

const upload = multer ({storage })
module.exports = {upload , handleImageUploadUtils}