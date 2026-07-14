export default function Hero() {
  return (
    <section className="hero">
      <img src="/avatar.png" alt="Harsh V Singh" className="avatar" />
      <h1 className="headline">Harsh <span className="v" style={{ fontStyle: 'italic' }}>V</span> Singh</h1>
      <p className="body-txt">
        Once a journalist, now building brands. Associate Director of Project Delivery at Rang Digitech, writing on marketing, geopolitics, and the long way round.
      </p>
      <div className="btn-row">
        <button className="btn p">Read my writing</button>
        <button className="btn s">Connect</button>
      </div>
    </section>
  );
}
