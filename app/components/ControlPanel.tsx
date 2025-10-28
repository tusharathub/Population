

interface Props {
    birthRate: number,
    deathRate: number,
    migrationRate: number,
    setBirthRate : (v : number) => void,
    setDeathRate : (v : number) => void,
    setMigrationRate : (v : number) => void,
}

interface RateInputProps {
    label: string,
    value: number,
    onChange: (v: number) => void,
}

export default function ControlPanel ({birthRate, deathRate, migrationRate, setBirthRate, setDeathRate, setMigrationRate}: Props) {

}

function RateInput({label, value, onChange} : RateInputProps) {
    return(
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1"> {label} </label>
                <input 
                type="number" 
                step="0.1"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="border-gray-800 text-white rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                />
        </div>
    )
}