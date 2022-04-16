import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import './accept/scss/app.scss'
import { useAppSelector } from './hooks/redux';
import TableLaunhes from './pages/TableLaunhes';
import { fetchLaunch } from './store/reducers/actionCreator';



function App() {

  const dispatch = useDispatch()

  const {launches, isLoading, error} = useAppSelector(state => state.launchReducer)

  console.log(launches)

  useEffect(() => {
    dispatch(fetchLaunch())
  }, [])

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
        <button onClick={() => console.log(launches)}></button>
        <TableLaunhes launches={launches}/>
      </div>
  );


  // return (
 
  //     <div className="App">
  //       {
  //         launches && launches.map(item => {
  //           return <div>
  //             {item.name}
  //           </div>
  //         })
  //       }
  //     </div>
  // );

  
  
}

export default App;
