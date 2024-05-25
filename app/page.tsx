import Explore from "./_sections/explore";
import Order from "./_sections/order";
import Service from "./_sections/service";
import Slider from "./_sections/slider";

export default function Home() {
  return (
    <>
      <Slider />
      <Order />
      <Explore />
      <Service />
    </>
  );
}
