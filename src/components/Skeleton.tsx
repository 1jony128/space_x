import { FC, useState } from "react";
import Column from "../components/Column";
import Notification from "../components/Notification";
import { columns, IColumn } from "../helpers/columns";
import { ILaunch } from "../models/ILaunch";

interface ISkeleton {
}

const Skeleton: FC<ISkeleton> = () => {

    const [currentCard, setCurrentCard] = useState<ILaunch>();

    return (  
        <div className="kanban">
            <div className="column"></div>
            <div className="column"></div>
            <div className="column"></div>
        </div>

    );
}

export default Skeleton;