// import { db } from "../utils/firebaseConfig"
import firebase from "firebase/compat/app"
import { storage } from "../utils/firebaseConfig"
// import { store } from "../app/store"

// Create a storage reference from our storage service
let currentUser = firebase.auth().currentUser
console.log(currentUser)
const storageRef = storage.ref()

export async function uploadImageToBucket(fileName, file) {
  let currentUser = firebase.auth().currentUser
  let randomId = Date.now()
  const userImagesRef = storageRef.child(currentUser.uid)
  return userImagesRef
    .child(fileName + randomId)
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

export async function deleteImageFromBucket(imageUrl) {
  let imageRef = storage.refFromURL(imageUrl)

  console.log(imageRef.name)
  return imageRef
    .delete()
    .then(() => {
      console.log("image deleted")
    })
    .catch((error) => {
      console.log(error)
    })
}
