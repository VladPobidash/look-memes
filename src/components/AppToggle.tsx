export default function AppToggle({enabled, onChange}: { enabled: boolean, onChange: () => void }) {
    const color = enabled ? '#07D41B' : '#9B9D9F'

    return <label className="flex items-center cursor-pointer select-none">
        <span className="relative flex items-center w-[47px] h-[26px] rounded-full bg-[#272934]">
            <input checked={enabled} onChange={onChange} type="checkbox" className="sr-only"/>
            <div
                style={{background: color}}
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white ${
                    enabled ? 'right-[7px]' : 'left-[7px]'
                }`}
            />
        <span
            style={{color}}
            className={`absolute font-bold text-xxs text-[${color}] ${enabled ? 'left-[7px]' : 'right-[7px]'}`}>
            {enabled ? 'On' : 'Off'}
        </span>
        </span>
    </label>
}