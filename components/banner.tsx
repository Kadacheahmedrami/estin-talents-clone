import Image from "next/image"
import Link from "next/link"

export default function Banner() {
  return (
    <div className="relative w-full p-2  mx-auto">
      <div className="flex justify-between items-center">
      <Link href="/" className="z-10">
        <div className="relative w-[240px] h-[120px]">
        <Image src="/estin.png" alt="ESTIN Logo" fill className="object-contain" />
        </div>
      </Link>
      <div className="relative w-full max-w-[1000px] h-[140px] hidden md:block">
        <Image src="/banniere_estin.png" alt="ESTIN Campus" fill className="object-cover" />
      </div>
      <Link href="/" className="z-10">
        <div className="relative w-[140px] h-[140px]">
        <Image src="/talents.png" alt="ESTIN Talents Logo" fill className="object-contain" />
        </div>
      </Link>
      </div>
    </div>
  )
}
