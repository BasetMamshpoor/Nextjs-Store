import Gender from "Components/Main/Gender";
import MostSell from "Components/Main/MostSell";
import DailyOffer from "Components/Slider/DailyOffer";
import Slider from "Components/Slider/Slider";

export default function Home() {
  return (
    <>
      <main>
        <Slider />

        <DailyOffer />

        <Gender />

        <MostSell />
      </main>
    </>
  )
}
