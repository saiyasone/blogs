const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} = require("firebase/storage");

const firebaseConfig = require("../configs/firebase.config");
const { randomFileNewName } = require("../utils/function");

initializeApp(firebaseConfig);

const storage = getStorage();

const  uploadToFirebase = async ({ dataFile, path }) => {
  try {
    const newName = randomFileNewName(dataFile);

    const bufferStream = dataFile.buffer;
    const metadata = {
      contentType: dataFile.mimetype,
    };

    const storageRef = await ref(storage, `${path}/${newName}`);
    const snapshot = await uploadBytesResumable(
      storageRef,
      bufferStream,
      metadata
    );

    const imageUrl = await getDownloadURL(snapshot.ref);
    return { imageUrl, newName };
  } catch (error) {
    throw error;
  }
};

const downloadFileDataAsZip = async ({ filename }) => {
  try {
    const storageRef = await ref(storage, `public/${filename}`);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    throw error;
  }
};

const downloadFilesDataAsStream = async ({ filename }) => {
  try {
    const storageRef = await ref(storage, `public/${filename}`);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async ({ filename, path }) => {
  try {
    const storageRef = await ref(storage, `${path}/${filename}`);
    await deleteObject(storageRef);
    return await storageRef;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadToFirebase,
  downloadFileDataAsZip,
  downloadFilesDataAsStream,
  deleteFile,
};
