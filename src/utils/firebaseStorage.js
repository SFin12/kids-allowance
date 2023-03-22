// import { db } from "../utils/firebaseConfig"
// import firebase from "firebase/compat/app"
import { storage } from "../utils/firebaseConfig"
// import { store } from "../app/store"

// Create a storage reference from our storage service
const storageRef = storage.ref()
const store_images_ref = storageRef.child("store_images")
// Create a child reference

export async function uploadImageToBucket(fileName, file) {
  return store_images_ref
    .child(fileName)
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL()
    })
    .then((url) => {
      console.log(url)
      return url
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function findImageByUrl(imageUrl) {
  let imageRef = storage.refFromURL(imageUrl)
  console.log(imageRef.name)
}
