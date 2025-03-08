import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { CartContext, ProfileContext } from "./views/plugin/Context";
import apiInstance from "./utils/axios";
import CartId from "./views/plugin/CartId";

import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";

import Register from "../src/views/auth/Register";
import Login from "../src/views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";

import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";

import StudentDashboard from "./views/student/Dashboard";
import StudentCourses from "./views/student/Courses";
import StudentCourseDetail from "./views/student/CourseDetail";
import Wishlist from "./views/student/Wishlist";
import StudentProfile from "./views/student/Profile";
import useAxios from "./utils/useAxios";
import UserData from "./views/plugin/UserData";
import StudentChangePassword from "./views/student/ChangePassword";
import Dashboard from "./views/instructor/Dashboard";
import Courses from "./views/instructor/Courses";
import Review from "./views/instructor/Review";
import Students from "./views/instructor/Students";
import Earning from "./views/instructor/Earning";
import Orders from "./views/instructor/Orders";
import Coupon from "./views/instructor/Coupon";
import TeacherNotification from "./views/instructor/TeacherNotification";
import QA from "./views/instructor/QA";
import QAS from "./views/student/QA";
import ChangePassword from "./views/instructor/ChangePassword";
import Profile from "./views/instructor/Profile";
import CourseCreate from "./views/instructor/CourseCreate";
import CourseEdit from "./views/instructor/CourseEdit";
import { userId } from "./utils/constants";



function App() {
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState([]);
  

  useEffect(() => {
    if(userId){
    apiInstance.get(`course/cart-list/${userId}/`).then((res) => {
      setCartCount(res.data?.length);
    });
  }

    useAxios()
      .get(`user/profile/${UserData()?.user_id}/`)
      .then((res) => {
        setProfile(res.data);
      });
  }, [userId]);

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <ProfileContext.Provider value={[profile, setProfile]}>
        <BrowserRouter>
          <MainWrapper>
            <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/register/" element={<Register />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/forgot-password/" element={<ForgotPassword />} />
              <Route
                path="/create-new-password/"
                element={<CreateNewPassword />}
              />
            </Route>
            <Route path="/logout/" element={<Logout />} />

              {/* Base Routes */}
              <Route path="/" element={<Index />} />
              <Route element={<PrivateRoute />}>
                <Route path="/course-detail/:slug/" element={<CourseDetail />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/cart/" element={<Cart />} />
                  <Route path="/checkout/:order_oid/" element={<Checkout />} />
                  <Route
                    path="/payment-success/:order_oid/"
                    element={<Success />}
                  />
                </Route>
                <Route path="/search/" element={<Search />} />
              </Route> 
              {/* Student Routes */}
              {/* <Route
                path="/student/dashboard/"
                element={ <PrivateRoute> <StudentDashboard /> </PrivateRoute>}
              />
              <Route path="/student/courses/" element={<StudentCourses />} />
              <Route
                path="/student/courses/:enrollment_id/"
                element={<PrivateRoute> <StudentCourseDetail /> </PrivateRoute>}
              />
              <Route path="/student/wishlist/" element={<PrivateRoute> <Wishlist /> </PrivateRoute>} />
              <Route path="/student/profile/" element={<PrivateRoute> <StudentProfile /> </PrivateRoute>} />
              <Route
                path="/student/change-password/"
                element={<PrivateRoute> <StudentChangePassword /> </PrivateRoute>}
              /> */}
              <Route path="/student" element={<PrivateRoute />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="courses/:enrollment_id" element={<StudentCourseDetail />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="question-answer" element={<QAS />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="change-password" element={<StudentChangePassword />} />
              </Route>

              {/* Teacher Routes */}
              <Route path="/instructor" element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="reviews" element={<Review />} />
                <Route path="students" element={<Students />} />
                <Route path="earning" element={<Earning />} />
                <Route path="orders" element={<Orders />} />
                <Route path="coupon" element={<Coupon />} />
                <Route path="notifications" element={<TeacherNotification />} />
                <Route path="question-answer" element={<QA />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="profile" element={<Profile />} />
                <Route path="create-course" element={<CourseCreate />} />
                <Route path="edit-course/:course_id" element={<CourseEdit />} />
             </Route>

            </Routes>
          </MainWrapper>
        </BrowserRouter>
      </ProfileContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
