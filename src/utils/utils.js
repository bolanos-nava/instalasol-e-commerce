import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore';

export function parseErrors(errors, status) {
  if (Array.isArray(errors)) {
    return errors.map((err) => ({
      message: err.message,
      status,
    }));
  }

  return [{ message: 'Ha ocurrido un error inesperado', status }];
}

export function fetchCollection(
  collectionName,
  { errorMessage, filters = [] } = {},
) {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const collectionRef = query(collection(db, collectionName), ...filters);
    getDocs(collectionRef).then((snapshot) => {
      if (snapshot.empty) {
        const parsedErrors = parseErrors([{ message: errorMessage }], 404);
        reject(parsedErrors);
      }
      resolve(snapshot);
    });
  });
}

export function fetchDocument(collectionName, documentId, errorMessage) {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const documentRef = doc(db, collectionName, documentId);
    getDoc(documentRef).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot);
      }
      const parsedErrors = parseErrors([{ message: errorMessage }], 404);
      reject(parsedErrors);
    });
  });
}

export default {
  parseErrors,
  fetchCollection,
  fetchDocument,
};
