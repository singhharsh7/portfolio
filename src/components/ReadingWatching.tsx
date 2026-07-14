export default function ReadingWatching() {
  return (
    <div className="blk">
      <div className="eyebrow">Currently</div>
      <div className="headline" style={{ fontSize: '14px' }}>Reading &amp; watching</div>
      <div className="rw-row">
        <div className="rw-col"><div className="lbl">Goodreads</div><div className="imgbox">cover</div><div className="t">Book title placeholder</div></div>
        <div className="rw-col"><div className="lbl">IMDb</div><div className="imgbox">poster</div><div className="t">Show / film placeholder</div></div>
      </div>
    </div>
  );
}
