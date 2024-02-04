import Banner from "Components/Main/Banner";
import Gender from "Components/Main/Gender";
import MostSell from "Components/Main/MostSell";
import TwoBanners from "Components/Main/TwoBanners";
import DailyOffer from "Components/Slider/DailyOffer";
import Slider from "Components/Slider/Slider";

export default function Home() {
  return (
    <>
      <main>
        <Slider />

        <DailyOffer />

        <Banner />

        <Gender />

        <MostSell />

        <TwoBanners />
      </main>
    </>
  )
}
