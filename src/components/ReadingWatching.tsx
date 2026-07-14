export default function ReadingWatching() {
  return (
    <section className="blk">
      <h2 className="eyebrow">Currently</h2>
      <h3 className="headline" style={{ fontSize: '20px' }}>Reading &amp; watching</h3>
      <div className="rw-row">
        <div className="rw-col">
          <div className="lbl">Goodreads</div>
          <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&q=80" alt="Book cover" />
          <div className="t">The Silk Roads</div>
        </div>
        <div className="rw-col">
          <div className="lbl">IMDb</div>
          <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=200&q=80" alt="Movie poster" />
          <div className="t">Succession</div>
        </div>
      </div>
    </section>
  );
}
