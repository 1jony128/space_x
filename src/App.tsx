import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import './accept/scss/app.scss'
import { useAppSelector } from './hooks/redux';
import TableLaunhes from './pages/TableLaunhes';
import { launchFetching } from './store/reducers/LaunchSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleLaunch from './pages/SingleLaunch';
import Skeleton from './components/Skeleton';



function App() {

  const dispatch = useDispatch()

  const {launches, isLoading, error} = useAppSelector(state => state.launchReducer)

  useEffect(() => {
    dispatch(launchFetching())
  }, [dispatch])

  if(isLoading){
    return <div className='container'>
              <div className='header'>
                <h1>Loading</h1>   
              </div>
              <Skeleton />
            </div>
  }

  if(error){
    return (
 
      <div className="App">
        {error}
      </div>
  );
  }

  return (

    <div className='container'>
        <div className='header'>
         <h1>Expore the space</h1>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path='/'element={<TableLaunhes launches={launches}/>}/>
            <Route path='/:id'element={<SingleLaunch />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
  
}

export default App;
