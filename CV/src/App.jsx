// App.jsx
import "./App.css";
import ViewCV from "./components/ViewCV";
import Home from "./components/dashboard/Home";
import Profile from "./components/dashboard/Profile";
import Contact from "./components/dashboard/Contact";
import Description from "./components/dashboard/Description";
import Skills from "./components/dashboard/Skills";
import Projects from "./components/dashboard/Projects";
import Experience from "./components/dashboard/Experience";
import Education from "./components/dashboard/Education";
import Acheivements from "./components/dashboard/Acheivements";
import Activities from "./components/dashboard/Activities";
import Reference from "./components/dashboard/Reference";
import AddNewSection from "./components/dashboard/AddNewSection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CVprovider } from "./context/UserCVContext";
import { SkillsProvider } from "./context/SkillsAddingContext";
import ProtectedRoute from "./context/ProtectedRoute";
import ViewFormalCV from "./components/ViewFormalCV";
import ViewFormalCV2 from "./components/ViewFormalCV2";

import './assets/customStyle.css'
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <div className="flex p-0 m-0 min-h-screen max-h-fit w-screen">
      <AuthProvider>
        <CVprovider>
          <SkillsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<AppLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="description" element={<Description />} />
                    <Route path="projects" element={<Projects />} />

                    <Route path="skills" element={<Skills />} />

                    <Route path="experience" element={<Experience />} />
                    <Route path="education" element={<Education />} />
                    <Route path="acheivements" element={<Acheivements />} />
                    <Route path="activities" element={<Activities />} />
                    <Route path="reference" element={<Reference />} />
                    <Route path="addSection" element={<AddNewSection />} />
                  </Route>
                </Route>
                <Route path="/viewFormalCV" element={<ViewFormalCV />} />
                <Route path="/viewFormalCV2" element={<ViewFormalCV2 />} />
                <Route path="/viewCV" element={<ViewCV />} />
                <Route
                  path="*"
                  element={
                    <div className="m-5 text-4xl font-bold">
                      No Page Found!!!
                    </div>
                  }
                />
              </Routes>
            </BrowserRouter>
          </SkillsProvider>
        </CVprovider>
      </AuthProvider>
    </div>
  );
}

export default App;
