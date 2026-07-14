export default function Writing() {
  return (
    <section className="blk">
      <h2 className="eyebrow">Writing</h2>
      <h3 className="headline" style={{ fontSize: '20px' }}>Latest from Substack &amp; Medium</h3>
      
      <article className="write-item">
        <img src="https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=150&q=80" alt="Article 1" />
        <div>
          <div className="t">The Architecture of a Modern Brand</div>
          <div className="m">Substack &middot; 3 days ago</div>
        </div>
      </article>
      
      <article className="write-item">
        <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=150&q=80" alt="Article 2" />
        <div>
          <div className="t">Why Geopolitics Matters for Marketers</div>
          <div className="m">Medium &middot; 1 week ago</div>
        </div>
      </article>
      
      <article className="write-item">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=150&q=80" alt="Article 3" />
        <div>
          <div className="t">Finding Signal in the Noise</div>
          <div className="m">Substack &middot; 2 weeks ago</div>
        </div>
      </article>
    </section>
  );
}
