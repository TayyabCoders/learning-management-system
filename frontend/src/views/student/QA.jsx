import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";

function QA() {
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);
  
  const fetchData = () => {
    setFetching(true);
    useAxios()
      .get(`student/course-list/${UserData()?.user_id}/`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
        setFetching(false);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);  
  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <h4 className="mb-0 mb-4"> <i className='fas fa-envelope'></i> Question and Answer</h4>

              {fetching === true && <p className="mt-3 p-3">Loading...</p>}
              {fetching === false && (
              <div className="card mb-4">
                <div className="card-header">
                  <span>All Questions and Answers are listed here</span>
                </div>
                <div className="table-responsive overflow-y-hidden">
                  <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Courses</th>
                        <th>Questions</th>
                        <th>Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                    {courses?.map((c, index) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <a href="#">
                                <img
                                  src={c.course?.image}
                                  alt="course"
                                  className="rounded img-4by3-lg"
                                  style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                                />
                              </a>
                            </div>
                            <div className="ms-3">
                              <h4 className="mb-1 h5">
                                <a href="#" className="text-inherit text-decoration-none text-dark">
                                {c.course?.title}
                                </a>
                              </h4>
                            </div>
                          </div>
                        </td>
                        <td><p className='mt-3'>5</p></td>
                        <td>
                          <Link to={`/student/question-answer/course_id/`} className='btn btn-primary btn-sm mt-3'>Join Conversation <i className='fas fa-arrow-right'></i></Link>
                        </td>
                      </tr>
                      ))}
                      {/* <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <a href="#">
                                <img
                                  src="https://geeksui.codescandy.com/geeks/assets/images/course/course-react.jpg"
                                  alt="course"
                                  className="rounded img-4by3-lg"
                                  style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                                />
                              </a>
                            </div>
                            <div className="ms-3">
                              <h4 className="mb-1 h5">
                                <a href="#" className="text-inherit text-decoration-none text-dark">
                                  Learn React for Beginners
                                </a>
                              </h4>
                            </div>
                          </div>
                        </td>
                        <td><p className='mt-3'>5</p></td>
                        <td>
                          <Link to={`/student/question-answer/course_id/`} className='btn btn-primary btn-sm mt-3'>Join Conversation <i className='fas fa-arrow-right'></i></Link>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default QA