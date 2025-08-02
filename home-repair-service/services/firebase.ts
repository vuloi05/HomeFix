import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Cấu hình Firebase - Project demo mẫu
const firebaseConfig = {
  apiKey: "AIzaSyD-EXAMPLEKEY1234567890abcdefg",
  authDomain: "homefix-demo.firebaseapp.com",
  projectId: "homefix-demo",
  storageBucket: "homefix-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Khởi tạo Authentication
export const auth = getAuth(app);

export default app;
