import Image from 'next/image'

export default function SvgIcon({name, width, height, className, alt, onClick}: {
    name: string
    width: number
    height: number
    className?: string
    alt?: string
    onClick?: () => void
}) {
    return <Image width={width} height={height} src={`../../icons/${name}.svg`} alt={alt || 'icon'}
                  className={`cursor-pointer ${className}`} onClick={onClick}/>
}