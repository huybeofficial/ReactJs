import React, { useState } from "react";
import { Button, CardImg, Col, Row } from "reactstrap";
import { auth, db, fbProvider, ggProvider } from "../../firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const handleFBLogin = async () => {
    const { user, providerId } = await signInWithPopup(auth, fbProvider);
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(userRef, where("uid", "==", user.uid))
      );

      if (querySnapshot.empty) {
        const docRef = await addDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: providerId,
        });

        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("User already exists, no new data added");
      }
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const handleGoogleLogin = async () => {
    const { user, providerId } = await signInWithPopup(auth, ggProvider);
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(userRef, where("uid", "==", user.uid))
      );

      if (querySnapshot.empty) {
        const docRef = await addDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: providerId,
        });

        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("User already exists, no new data added");
      }
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        style={{ width: "40%", justifyContent: "center", alignItems: "center" }}
      >
        <Col className="text-center">
          <h1>Note App</h1>
          <Button
            onClick={handleGoogleLogin}
            block
            color="primary"
            outline
            style={{ fontSize: 25, marginTop: 20 }}
          >
            Đăng nhập bằng Google
            <CardImg
              alt="Card image cap"
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              style={{
                height: 40,
                width: 40,
                marginLeft: 10,
              }}
              top
            />
          </Button>
          <Button
            onClick={handleFBLogin}
            block
            color="primary"
            outline
            style={{ fontSize: 25, marginTop: 20 }}
          >
            Đăng nhập bằng Facebok
            <CardImg
              alt="Card image cap"
              src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
              style={{
                height: 40,
                width: 40,
                marginLeft: 10,
              }}
            />
          </Button>
        </Col>
      </Row>
    </div>
  );
}
