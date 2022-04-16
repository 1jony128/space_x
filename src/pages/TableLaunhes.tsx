import { FC, useState } from "react";
import Column from "../components/Column";
import { columns, IColumn } from "../helpers/columns";
import { ILaunch } from "../models/ILaunch";

interface ITableLaunhes {
    launches: ILaunch[]
}

const TableLaunhes: FC<ITableLaunhes> = ({launches}) => {

    // console.log(launches)
    const [currentCard, setCurrentCard] = useState<ILaunch>();

    return (  
        <div className="kanban">
            {
                columns && columns.map((column: IColumn) => {
                    return <Column 
                        key={column.name}
                        name={column.name} 
                        draggable={column.draggable} 
                        launches={launches}
                        setCurrentCard={setCurrentCard} 
                        currentCard={currentCard}
                    />
                })
            }
        </div>

    );
}

export default TableLaunhes;