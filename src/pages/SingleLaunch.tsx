import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from "../hooks/redux";
import { fetchSingleLaunch } from "../store/reducers/LaunchSlice";
interface ISingleLaunch {
   
}

const SingleLaunch: FC<ISingleLaunch> = () => {

    const {singleLaunch} = useAppSelector(state => state.launchReducer)

    
    return (  
        <div className="launch">
            <Link to={"/"} >
                <button>BACK TO LAUNCHES</button>
            </Link>
            <h2>{singleLaunch?.name}</h2>
            <div className="content">
                <div className="info">
                    <p>{singleLaunch?.details}</p>
                    <p>{singleLaunch?.date_utc}</p>
                    {singleLaunch?.success ? <p>success launch</p> : <p>no success launch</p>}
                </div>
                <div className="img_container">
                    <img src={singleLaunch?.links.patch.large} alt={singleLaunch?.name} />
                </div>   
            </div>
            
        </div>

    );
}

export default SingleLaunch;