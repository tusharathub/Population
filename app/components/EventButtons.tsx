"use client"

interface Props {
    setBirthRate: (v: (prev : number) => number ) => void;
    setDeathRate: (v: (prev : number) => number ) => void;
    setMigrationRate: (v: (prev : number) => number ) => void;
    setPopulation: (v: (prev : number) => number ) => void;
}

interface ButtonProps {
    label : string;
    onClick: () => void;
}

export default function EventButtons ({setBirthRate, setDeathRate, setMigrationRate, setPopulation} : Props) {
    const HanldeBabyBoom = () => setBirthRate((p) => p + 100000);
    const HanldePandemic = () => setDeathRate((d) => d + 1000);
    const HanldeColonizeMars = () => setMigrationRate((m) => m - 100000);
    const HandleDisaster = () => setPopulation((p) => p* 0.9);

    return (
        <div className="grid grid-cols-2 gap-3">
            <Button onClick={HanldeBabyBoom} label="Boom the babies"/>
            <Button onClick={HanldePandemic} label="Make a Pandemic"/>
            <Button onClick={HanldeColonizeMars} label="Colonie the Mars"/>
            <Button onClick={HandleDisaster} label="A huge Disaster"/>
        </div>
    )
}

function Button({label, onClick} : ButtonProps) {
    return (
        <div>
            <button 
            onClick={onClick}
            className="bg-gray-200 text-gray-800 hover:bg-zinc-300 rounded-xl px-3 py-2 text-sm font-medium transition">
                {label}
            </button>
        </div>
    )
}