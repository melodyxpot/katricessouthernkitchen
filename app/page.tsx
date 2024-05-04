import Explore from "./_sections/explore";
import Order from "./_sections/order";
import Service from "./_sections/service";

export default function Home() {
  return (
    <main>
      <Order />
      <Explore />
      <Service />
    </main>
  );
}
