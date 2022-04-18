import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import './accept/scss/app.scss'
import { useAppSelector } from './hooks/redux';
import TableLaunhes from './pages/TableLaunhes';
import { launchFetching } from './store/reducers/LaunchSlice';



function App() {

  const dispatch = useDispatch()

  const {launches, isLoading, error} = useAppSelector(state => state.launchReducer)

  useEffect(() => {
    console.log("dsa")
    dispatch(launchFetching())
    console.log("first")
  }, [dispatch])

  if(isLoading){
    return <div className="App">
      Loading
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
        <TableLaunhes launches={launches}/>
      </div>
  );
  
}

export default App;
