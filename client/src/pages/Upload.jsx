/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Upload = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls1: [],
    imageUrls2: [],
    name: '',
    phone: '',
    address: '',
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageSubmit1 = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls1.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      console.log('Hello')
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls1: formData.imageUrls1.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError(`Image Upload failed (2 mb max per image)`)
          setUploading(false)
        })
    } else {
      setImageUploadError(`You can only upload 6 images per listing`)
      setUploading(false)
    }
  }
  const handleImageSubmit2 = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls2.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      console.log('Hello')
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls2: formData.imageUrls2.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError(`Image Upload failed (2 mb max per image)`)
          setUploading(false)
        })
    } else {
      setImageUploadError(`You can only upload 6 images per listing`)
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls1: formData.imageUrls1.filter((_, i) => i !== index),
      imageUrls2: formData.imageUrls2.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (formData.imageUrls1.length < 1)
        return setError('You must upload at least one image')

      setLoading(true)
      setError(false)
      console.log(formData)
      const res = await fetch('/api/user/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id: currentUser._id }),
      })

      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/profile`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className="p-3 max-w-4xl mt-20 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Upload Docs</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:f ex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          {/* <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          /> */}

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            id="phone"
            required
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              {/* The first image will be the cover (max 6) */}
            </span>
          </p>
          <div className="flex gap-4">
            <div>
              Upload Aadhar
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 w-full"
                type="file"
                id="images"
                accept="image/*"
              />
            </div>
            <button
              type="button"
              onClick={handleImageSubmit1}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Uploading' : 'Upload'}
            </button>
          </div>
          <div className="flex gap-4">
            <div>
              Upload Driving License
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 w-full"
                type="file"
                id="images"
                accept="image/*"
              />
            </div>
            <button
              type="button"
              onClick={handleImageSubmit2}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Uploading' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls1.length > 0 &&
            formData.imageUrls1.map((url, index) => {
              return (
                <div
                  className="flex justify-between p-3 border items-center"
                  key={index}
                >
                  <img
                    src={url}
                    alt="Listing Image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg hover:opacity-75 uppercase"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          {formData.imageUrls2.length > 0 &&
            formData.imageUrls2.map((url, index) => {
              return (
                <div
                  className="flex justify-between p-3 border items-center"
                  key={index}
                >
                  <img
                    src={url}
                    alt="Listing Image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg hover:opacity-75 uppercase"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Uploading..' : 'Upload Details'}
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default Upload
