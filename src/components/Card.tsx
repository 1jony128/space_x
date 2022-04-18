import React, { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { IColumn } from "../helpers/columns";
import { useAppSelector } from "../hooks/redux";
import { ILaunch } from "../models/ILaunch";
import { updateLaunches } from "../store/reducers/LaunchSlice";

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
        }

    })

    return (  
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
    );
}

export default Card;

// import { FC } from "react";
// // import { ICard } from "../helpers/Cards";



// const Card: FC<ICard> = ({name, draggable}) => {



//     return (  
//     <div className="card" draggable={draggable}>
//         <h3>Saocon 1a</h3>
//         <span>Falcon 9</span>
//     </div>
//     );
// }

// export default Card;