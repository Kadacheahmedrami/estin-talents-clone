import Image from "next/image"
import Link from "next/link"

export default function Banner() {
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center">
        <Link href="/" className="z-10">
          <div className="relative w-[180px] h-[80px]">
            <Image src="/images/estin-logo.png" alt="ESTIN Logo" fill className="object-contain" />
          </div>
        </Link>
        <div className="flex-1 relative h-[140px]">
          <Image src="/images/campus-banner.jpg" alt="ESTIN Campus" fill className="object-cover" />
        </div>
        <Link href="/" className="z-10">
          <div className="relative w-[180px] h-[80px]">
            <Image src="/images/estin-talents-logo.png" alt="ESTIN Talents Logo" fill className="object-contain" />
          </div>
        </Link>
      </div>
    </div>
  )
}
