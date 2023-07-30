import { db, storage } from "./FirebaseConf";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";

// upload image and get url
export const uploadImageAndGetUrl = async (dataMaterialId, image) => {
  try {
    const imageRef = ref(storage, `materiel/${dataMaterialId}/${image.path}`);
    await uploadBytes(imageRef, image, "data_url");
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  } catch (error) {
    throw error; // Rethrow the error to signify failure
  }
};

export const createNewMaterial = async (dataMaterial, files) => {
  try {
    // Create new document in Firebase
    const docRef = await addDoc(collection(db, "materiel"), dataMaterial);

    const filePromises = files.map((image) =>
      uploadImageAndGetUrl(dataMaterial.id, image)
    );

    const fileUrls = await Promise.all(filePromises);
    const mainImageUrl = fileUrls[0];

    // Add images and imageMain fields to docData
    dataMaterial.images = fileUrls.filter((url) => url !== null);
    dataMaterial.imageMain = mainImageUrl;

    // Update the document in Firebase with the images and imageMain fields
    await updateDoc(doc(db, "materiel", docRef.id), {
      images: dataMaterial.images,
      imageMain: dataMaterial.imageMain,
    });

    return dataMaterial; // Return the created object
  } catch (error) {
    console.log("Error creating material:", error);
    throw error; // Rethrow the error to signify failure
  }
};

export const getAllMateriel = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "materiel"));
    const materiels = [];
    querySnapshot.forEach((doc) => {
      materiels.push(doc.data());
    });
    return materiels;
  } catch (error) {
    return error;
  }
};

export const deleteMatarial = async (id) => {
  const materialCollection = collection(db, "materiel");
  const q = query(materialCollection, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return "erreur";
  } else {
    const docToDelete = querySnapshot.docs[0];

    try {
      // Supprimer le document de la collection "materiel" dans Firestore
      await deleteDoc(docToDelete.ref);

      // Supprimer les fichiers associés dans le stockage Firebase
      const storageFolderRef = ref(storage, `materiel/${id}`);
      const filesList = await listAll(storageFolderRef);

      await Promise.all(
        filesList.items.map((itemRef) => deleteObject(itemRef))
      );
    } catch (error) {
      return error;
    }
  }
};
export const editMaterial = async (newData, files, id) => {
  const materialCollection = collection(db, "materiel");
  const querySnapshot = await getDocs(
    query(materialCollection, where("id", "==", id))
  );

  if (querySnapshot.empty) {
    throw new Error("Le document n'a pas été trouvé !");
  } else {
    try {
      const docRef = doc(db, "materiel", querySnapshot.docs[0].id);

      // Filter out already uploaded images
      const newImages = files.filter((image) => !image.path.includes("https"));

      // Download URL image for newImages array
      const filePromises = newImages.map((image) => {
        console.log(image);
        return uploadImageAndGetUrl(newData.id, image); // Return the promise
      });

      const fileUrls = await Promise.all(filePromises);

      // Combine new URLs with already uploaded images
      const allImageUrls = files.map((image) => {
        if (image.path.includes("https")) {
          return image.path; // Use the existing URL for already uploaded images
        }
        return fileUrls.shift(); // Use the new URL for newly uploaded images
      });

      // Add images and imageMain fields to docData
      newData.images = allImageUrls.filter((url) => url !== null);
      newData.imageMain = allImageUrls[0];

      // Update the document in Firebase with the new data
      await updateDoc(docRef, newData);

      return newData; // Return the updated object
    } catch (error) {
      throw error;
    }
  }
};
