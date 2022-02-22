import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDq-GmqQhue84eCNFUWG-9kRbHng-CNPWI",
  authDomain: "binar-chapter9-7db1d.firebaseapp.com",
  databaseURL: "https://binar-chapter9-7db1d-default-rtdb.firebaseio.com"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth