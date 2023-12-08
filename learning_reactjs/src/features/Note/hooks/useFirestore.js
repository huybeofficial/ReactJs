// import React, { useEffect, useState } from "react";
// import { db } from "../firebase/config";
// import { getDocs, collection } from "firebase/firestore";

// const useFirestore = (collect, condition) => {
//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     let collectionRef = collection(db, collect);
//     if (condition) {
//       if (!condition.compareValue || !condition.compareValue.length) {
//         // reset documents data
//         setDocuments([]);
//         return;
//       }

//       collectionRef = collectionRef.where(
//         condition.fieldName,
//         condition.operator,
//         condition.compareValue
//       );
//     }
//     const unsubscribe = getDocs(collectionRef);
//     unsubscribe.forEach((doc) => {
//       const documents = doc.data();
//       setDocuments(documents);
//     });
//     //   console.log(JSON.stringify(data));
//     // const unsubscribe = collectionRef.onSnapshot((snapshot) => {
//     //   const documents = snapshot.docs.map((doc) => ({
//     //     ...doc.data(),
//     //     id: doc.id,
//     //   }));

//     //   setDocuments(documents);
//     // });

//     return unsubscribe;
//   }, [collect, condition]);
//   return documents;
// };
// export default useFirestore;

import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const useFirestore = (collect, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collect);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      const queryRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDocuments(documentsData);
      });

      return unsubscribe;
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documentsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documentsData);
    });

    return unsubscribe;
  }, [db, collect, condition]);

  return documents;
};

export default useFirestore;
