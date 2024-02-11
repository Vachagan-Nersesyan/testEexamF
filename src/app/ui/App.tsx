import React, { lazy, useEffect, useState } from 'react';
import styles from './App.module.css';
import { OwnProps } from './AppTs.interface';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from 'entities/store/redux-store';
import HeaderComp from 'pages/header';
import { getInstituteInfoFunc, getTeacherInfoFunc } from 'entities/adminR/adminThunk';
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface';
import { changeStudentNumInfo } from 'entities/adminR/adminReducer';

const TestComp = lazy(() => import('pages/test'))
const MakeTestComp = lazy(() => import('pages/makeTest'))

const FinalTestComp = lazy(() => import('pages/finalTest'))
const WorkspaceComp = lazy(() => import('pages/exams'))
const LoginComp = lazy(() => import('pages/login'))
const FinalTestWithAnseComp = lazy(() => import('pages/finalTestWithAns'))
const WriteTestComp = lazy(() => import('pages/writeTest'))

const AdminComp = lazy(() => import('pages/admin'))

const StudentComp = lazy(() => import('pages/student'))
const StudentExistsTestsComp = lazy(() => import('pages/studentExistsTests'))
const StudentTestComp = lazy(() => import('pages/studentTest'))

const HomePage = lazy(() => import('pages/homePage'))

const LayoutComp = lazy(() => import('pages/layoutContent'))
const UserPage = lazy(() => import('pages/userPage'))
const SubjectExamComp = lazy(() => import('feautures/subjectExam'))

const NotFound = lazy(() => import('pages/notFound'))
const NotFoundSComp = lazy(() => import('pages/notFoundS'))
const FinalTestWithOutAnswerComp = lazy(() => import('pages/examSlfTest'))




const App: React.FC<OwnProps> = () => {

  const aDispatch = useAppDispatch()
  const dispatch = useDispatch()

  useEffect(() => {
    aDispatch(getTeacherInfoFunc())
    aDispatch(getInstituteInfoFunc())
  }, [])

  const isAdmin = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)
  console.log(isAdmin, 'isAdmin')
  const [isAdminHk, setIsAdminHk] = useState<AllTeacherInfoType | boolean | undefined>(isAdmin?.isAuth)

  useEffect(() => {
    setIsAdminHk(isAdmin?.isAuth)
  }, [isAdmin])


  // const params = useParams()
  const location = useLocation();

  console.log(location, 'params')
  // console.log('app', isAdmin)

  // const navigate = useNavigate();

  // if (!isAdmin) {
  //   navigate('/');
  // }



  const allTeacherInfo = useSelector((state: AppStateType) => state.adminR.allTeacherInfo)
  const [allTeacherInfoHk, setAllTeacherInfoHk] = useState<Array<AllTeacherInfoType>>(allTeacherInfo)

  useEffect(() => {
    setAllTeacherInfoHk(allTeacherInfo)
  }, [allTeacherInfo])

  useEffect(() => {
    for (let i in allTeacherInfoHk) {
      if (allTeacherInfoHk[i].isAuth) {
        dispatch(changeStudentNumInfo({ info: allTeacherInfoHk[i] }))
      }
    }
  }, [allTeacherInfoHk])


  const currentClassNamefh = useSelector((state: AppStateType) => state.studentR.classCrntName)
  // console.log(isAdmin, 'isAdmin')
  const [currentClassNamefhHk, setCurrentClassNamefhHk] = useState<string>(currentClassNamefh)

  useEffect(() => {
    setCurrentClassNamefhHk(currentClassNamefh)
  }, [currentClassNamefh])

  console.log(currentClassNamefhHk, 'currentClassNamefhHk')


  return (
    <div className={styles.App}>
      {
        isAdminHk
          ?
          <>
            {
              location.pathname !== '/test' && location.pathname !== '/test-without-anwers-exams' && location.pathname !== '/test-answers-exams' && location.pathname !== '/student-test-st'
                ?
                <HeaderComp />
                :
                null
            }
            <Routes>



              <Route path='/admin' element={<LayoutComp />} />



              <Route path='/test-items' element={<TestComp />} />
              <Route path='/test' element={<FinalTestComp />} />
              <Route path='/new-test' element={<MakeTestComp />} />

              <Route path='/workspace' element={<LayoutComp />} />

              <Route path='/user-page' element={<LayoutComp />} />
              <Route path='/all-exams' element={<LayoutComp />} />
              <Route path='/exams/:id' element={<LayoutComp />} />
              <Route path='/table-subjects' element={<LayoutComp />} />
              <Route path='/table-subjects/type/:id' element={<LayoutComp />} />



              <Route path='/test-answers-exams' element={<FinalTestWithAnseComp />} />
              <Route path='/test-without-anwers-exams' element={<FinalTestWithOutAnswerComp />} />
              <Route path='*' element={<NotFound />} />



            </Routes>
          </>
          :
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginComp />} />
            <Route path='/student' element={<StudentComp />} />

            <Route path='/exists-tests' element={<StudentExistsTestsComp />} />
            <Route path='/student-test-st' element={<StudentTestComp />} />
            <Route path='/write-new-test' element={<WriteTestComp />} />

            <Route path='*' element={<NotFoundSComp />} />


          </Routes>
      }

      {/* <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginComp />} />
        <Route path='/student' element={<StudentComp />} />

        <Route path='/exists-tests' element={<StudentExistsTestsComp />} />
        <Route path='/student-test-st' element={<StudentTestComp />} />
        <Route path='/write-new-test' element={<WriteTestComp />} />



        <Route path='/admin' element={<LayoutComp />} />



        <Route path='/test-items' element={<TestComp />} />
        <Route path='/test' element={<FinalTestComp />} />
        <Route path='/new-test' element={<MakeTestComp />} />

        <Route path='/workspace' element={<LayoutComp />} />

        <Route path='/user-page' element={<LayoutComp />} />
        <Route path='/all-exams' element={<LayoutComp />} />
        <Route path='/exams/:id' element={<LayoutComp />} />


        <Route path='/test-answers-exams' element={<FinalTestWithAnseComp />} />



      </Routes> */}

    </div>
  );
}

export default App;
