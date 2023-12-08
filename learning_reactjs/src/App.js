// import "./App.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./features/Note/components/Login";
import Post from "./features/Post";
import NoteHome from "./features/Note/components/NoteHome";
import AuthProvider from "./features/Note/contexts/AuthProvider";
import AppProvider from "./features/Note/contexts/AppProvider";
import AddNoteModal from "./features/Note/components/Modals/AddNoteModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element=<Login /> path="/login" />
            <Route element=<NoteHome /> path="/" />
          </Routes>
          <AddNoteModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
