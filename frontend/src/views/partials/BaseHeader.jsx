import React, { useContext, useState,useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { CartContext } from "../plugin/Context";
import { useAuthStore } from "../../store/auth";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import apiInstance from "../../utils/axios";
import { userId } from "../../utils/constants"

function BaseHeader() {
    const [cartCount, setCartCount] = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        navigate(`/search/?search=${searchQuery}`);
    };

    const [isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);

    const [role, setRole] = useState(null);
    useEffect(() => {
        const token = Cookie.get("access_token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setRole(decodedToken.role); // Assuming 'role' exists in your JWT payload
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
        const fetchCartCount = async () => {
            if (isLoggedIn && userId) {
                try {
                    const { data } = await apiInstance.get(`course/cart-list/${userId}/`);
                    setCartCount(data?.length || 0);
                } catch (error) {
                    console.error("Error fetching cart count:", error);
                }
            }
        };

        fetchCartCount();
      }, [isLoggedIn, userId, setCartCount]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Desphixs
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/pages/contact-us/">
                                    {" "}
                                    <i className="fas fa-phone"></i> Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pages/about-us/">
                                    <i className="fas fa-address-card"></i> About Us
                                </Link>
                            </li>
                        {Cookie.get("access_token") && role === "Teacher" && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chalkboard-user"></i> Instructor
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/dashboard/`}
                                        >
                                            <i className="bi bi-grid-fill"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/courses/`}>
                                            <i className="fas fa-shopping-cart"></i> My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/create-course/`}
                                        >
                                            <i className="fas fa-plus"></i> Create Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/reviews/`}>
                                            <i className="fas fa-star"></i> Reviews{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/question-answer/`}
                                        >
                                            <i className="fas fa-envelope"></i> Q/A{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/students/`}
                                        >
                                            <i className="fas fa-users"></i> Students{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/earning/`}>
                                            <i className="fas fa-dollar-sign"></i> Earning{" "}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/profile/`}>
                                            <i className="fas fa-gear"></i> Settings & Profile{" "}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {Cookie.get("access_token") && role === "Student" &&(
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-graduation-cap"></i> Student
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                        isActive ? "dropdown-item active" : "dropdown-item"
                                        }
                                        to="/student/dashboard/"
                                    >
                                        <i className="bi bi-grid-fill"></i> Dashboard
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                        isActive ? "dropdown-item active" : "dropdown-item"
                                        }
                                        to="/student/courses/"
                                    >
                                        <i className="fas fa-shopping-cart"></i> My Courses
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                        isActive ? "dropdown-item active" : "dropdown-item"
                                        }
                                        to="/student/wishlist/"
                                    >
                                        <i className="fas fa-heart"></i> Wishlist
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                        isActive ? "dropdown-item active" : "dropdown-item"
                                        }
                                        to="/student/question-answer/"
                                    >
                                        <i className="fas fa-envelope"></i> Q/A
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        className={({ isActive }) =>
                                        isActive ? "dropdown-item active" : "dropdown-item"
                                        }
                                        to="/student/profile/"
                                    >
                                        <i className="fas fa-gear"></i> Profile & Settings
                                    </NavLink>
                                    </li>
                                </ul>
                            </li>
                            )}
                        </ul>
                        <div className="d-flex" role="search">
                            <input
                                className="form-control me-2 w-100"
                                type="search"
                                placeholder="Search Courses"
                                aria-label="Search Courses"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                onClick={handleSearchSubmit}
                                className="btn btn-outline-success w-50"
                                type="submit"
                            >
                                Search <i className="fas fa-search"></i>
                            </button>
                        </div>
                        {isLoggedIn() === true ? (
                            <>
                                <Link to="/logout/" className="btn btn-primary ms-2" type="submit">
                                    Logout <i className="fas fa-usign-out-alt"></i>
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Login and register button */}
                                <Link to="/login/" className="btn btn-primary ms-2" type="submit">
                                    Login <i className="fas fa-sign-in-alt"></i>
                                </Link>
                                <Link
                                    to="/register/"
                                    className="btn btn-primary ms-2"
                                    type="submit"
                                >
                                    Register <i className="fas fa-user-plus"> </i>
                                </Link>
                            </>
                        )}
                        <Link className="btn btn-success ms-2" to="/cart/">
                            Cart ({cartCount}) <i className="fas fa-shopping-cart"> </i>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseHeader;
