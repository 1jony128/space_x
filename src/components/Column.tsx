import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { IColumn } from "../helpers/columns";
import { ILaunch } from "../models/ILaunch";
import { updatedLaunches, updateLaunches } from "../store/reducers/LaunchSlice";
import Card from "./Card";

interface IColumnState {
    name: IColumn["name"],
    draggable: IColumn["draggable"],
    launches: ILaunch[],
    setCurrentCard: Dispatch<SetStateAction<ILaunch | undefined>>;
    currentCard: ILaunch | undefined;

}

const Column: FC<IColumnState> = ({name, draggable, launches, setCurrentCard, currentCard}) => {


    const dispatch = useDispatch();

    const dragDropHundler = ((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const isEmpty = launches.find(item => item.type === "launches")
        if(currentCard && !isEmpty && name === "launches"){
            const currentIndex = launches.indexOf(currentCard);
            const updateLaunch = { currentIndex, name, currentCard }
            dispatch(updateLaunches(updateLaunch))
            setTimeout(() => dispatch(updatedLaunches()), 2000)
        } else if(currentCard && name === "myLaunches"){
            const currentIndex = launches.indexOf(currentCard);
            const updateLaunch = { currentIndex, name, currentCard }
            dispatch(updateLaunches(updateLaunch))
            setTimeout(() => dispatch(updatedLaunches()), 2000)
        }
        
    })

    return (  
        <div 
            className="column"
            onDrop={(e) => dragDropHundler(e)}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className="header">
                <h2>{name}</h2>
            </div>
        {
            launches && launches.map((item: ILaunch) => {
                if(name === "myLaunches" && (item.booked === true)){
                    return <Card 
                                key={item.id}
                                draggable={draggable} 
                                launch={item} 
                                setCurrentCard={setCurrentCard} 
                                currentCard={currentCard}
                                name={name}
                            />
                } else if(name === item.type){
                    return <Card 
                                key={item.id}
                                draggable={draggable} 
                                launch={item} 
                                currentCard={currentCard} 
                                setCurrentCard={setCurrentCard} 
                                name={name}
                            />
                }
            })
        }

        </div>

    );
}

export default Column;

{/* <Card draggable={draggable} /> */}