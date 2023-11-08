import SvgIcon from '@/components/SvgIcon'

interface AppButtonProps {
    text?: string
    color?: string
    outlined?: boolean
    height?: string
    icon?: {
        name: string
        width?: number
        height?: number
    }
    iconPath?: string
    className?: string
    onClick: () => void
}

export default function AppButton({text, color, outlined, height, icon, className, onClick}: AppButtonProps) {
    return (
        <button
            className={`flex justify-center items-center font-bold rounded shadow-button ${className} ${!color && outlined ? 'border-[3px]  border-[#424454]' : ''}`}
            style={{
                background: !outlined ? color : 'inherit',
                height: height || 64,
            }}
            onClick={onClick}>
            {icon
                ? <SvgIcon width={icon.width || 20} height={icon.height || 20} name={icon.name}
                           alt="btn-icon"
                           className="mr-2.5"/>
                : null
            }
            {text}
        </button>
    )
}