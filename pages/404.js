import Image from "next/image";
import Link from "next/link";
import img from 'public/Images/404Notfound.svg'
export default function Custom404() {
  return (
    <>
      <div className="p404">
        <div className="container">
          <div className="p404_box">
            <div className="p404_text">
              <p>!صفحه مورد نظر پیدا نشد</p>
              <Link href='/'>صفحه اصلی</Link>
            </div>
            <div className="p404_image">
              <Image src={img.src} width={100} height={100} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}