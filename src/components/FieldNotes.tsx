export default function FieldNotes() {
  return (
    <section className="blk">
      <h2 className="eyebrow">Field Notes</h2>
      <h3 className="headline" style={{ fontSize: '20px' }}>A photograph, with context</h3>
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80" alt="Mountains" className="photo-feature" />
      <div className="caption">Kashmir, Winter 2024. A quiet morning before the storm. <span className="lnk">Read the full piece &rarr;</span></div>
      <div className="thumbs">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80" alt="Thumb 1" />
        <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=200&q=80" alt="Thumb 2" />
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=80" alt="Thumb 3" />
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=200&q=80" alt="Thumb 4" />
      </div>
    </section>
  );
}
