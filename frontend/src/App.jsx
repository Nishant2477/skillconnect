import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./component/navjar";

import Home from "./pages/home";
import Courses from "./pages/course";
import CourseDetails from "./pages/CourseDetails";
import LoginPage from "./pages/login_page";
import Register from "./pages/register";
import MyCourses from "./pages/my_courses";
import Profile from "./pages/profile";
import ApiCourses from "./pages/Apicourse";
import CrudDemo from "./pages/CrudDemo";
import CourseManagement from "./pages/CourseManagement";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/courses"
                    element={<Courses />}
                />

                <Route
                    path="/courses/:courseId"
                    element={<CourseDetails />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/my-courses"
                    element={<MyCourses />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
    path="/api-courses"
    element={<ApiCourses />}
/>
<Route
    path="/crud"
    element={<CrudDemo />}
/>

     <Route
    path="/course-management"
    element={<CourseManagement />}
/>  
 </Routes>

        </BrowserRouter>
    );
}

export default App;