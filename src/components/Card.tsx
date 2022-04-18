import React, { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IColumn } from "../helpers/columns";
import { useAppSelector } from "../hooks/redux";
import { ILaunch } from "../models/ILaunch";
import { fetchSingleLaunch, updatedLaunches, updateLaunches } from "../store/reducers/LaunchSlice";


interface ICard {
    draggable: boolean;
    launch: ILaunch;
    setCurrentCard: Dispatch<SetStateAction<ILaunch | undefined>>;
    currentCard: ILaunch | undefined;
    name: IColumn["name"],
}

const Card: FC<ICard> = ({draggable, launch, setCurrentCard, currentCard, name }) => {


    const dispatch = useDispatch();

    const {launches} = useAppSelector(state => state.launchReducer)

    const dragStartHundler = (e: React.DragEvent<HTMLDivElement>, launch: ILaunch) => {
        setCurrentCard(launch)
    }

    const dragDropHundler = ((e: React.DragEvent<HTMLDivElement>, launch: ILaunch) => {
        e.preventDefault()
        if(currentCard){
            const currentIndex = launches.indexOf(currentCard);
            const updateLaunch = { currentIndex, name, currentCard }
            dispatch(updateLaunches(updateLaunch))
            setTimeout(() => dispatch(updatedLaunches()), 2000)
        }

    })

    const showCard = () => {
        dispatch(fetchSingleLaunch(`${launch.id}`))
    }

    return (
    <Link to={`/${launch.id}`} onClick={showCard}>
        <div 
            className={`card ${draggable && "draggable"}`} 
            draggable={draggable}
            onDragStart={(e) => dragStartHundler(e, launch)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dragDropHundler(e, launch)}
        >
            <h3>{launch.name}</h3>
            <span>Falcon 9</span>
        </div>
    </Link>
    );
}

export default Card;
