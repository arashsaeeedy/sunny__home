
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

const furnitureModels = [
  {
    id: 1,
    name: 'Modern Sofa',
    price: '$499',
    images: [
      '/sofa/sofa1.jpg'
    ],
    description: 'A stylish and comfortable modern sofa for your living room.'
  },
  {
    id: 2,
    name: 'Wooden Dining Table',
    price: '$799',
    images: [
      '/sofa/sofa2.jpg'
    ],
    description: 'Elegant wooden dining table perfect for family gatherings.'
  },
  {
    id: 3,
    name: 'Minimalist Chair',
    price: '$199',
    images: [
      '/sofa/sofa3.jpg'
    ],
    description: 'Minimalist chair with ergonomic design.'
  }
];


function Home({ comments, input, handleInputChange, handleCommentSubmit, search, handleSearchChange }) {
  const navigate = useNavigate();
  const filteredModels = furnitureModels.filter(model =>
    model.name.toLowerCase().includes(search.toLowerCase()) ||
    model.description.toLowerCase().includes(search.toLowerCase())
  );
  const featured = furnitureModels[0];
  return (
    <>
      <header className="sunnyhome-header">
        <h1>sunnyhome</h1>
        <p>Your destination for beautiful furniture</p>
        <div className="hero-banner" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', minHeight: '220px', height: '320px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(255,136,0,0.10)' }}>
          <img src="/sofa/welcome.jpg" alt="Welcome" style={{ width: '50%', height: '100%', borderRadius: '24px 0 0 24px', objectFit: 'cover', border: 'none', background: '#222', boxShadow: 'none' }} onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/450x320?text=No+Image';}} />
          <div className="hero-content" style={{ borderRadius: '0 24px 24px 0', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: '#ff8800', color: '#181818', padding: '2rem 2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.7rem', fontWeight: 'bold' }}>Welcome to Sunnyhome!</h2>
            <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>Discover stylish, modern, and comfortable furniture for every room.</p>
            <button className="hero-btn" onClick={() => navigate(`/post/${featured.id}`)}>See Featured: {featured.name}</button>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              const value = search.trim().toLowerCase();
              if (value.length > 0) {
                const found = furnitureModels.find(model =>
                  model.name.toLowerCase().includes(value) ||
                  model.description.toLowerCase().includes(value)
                );
                if (found) {
                  navigate(`/post/${found.id}`);
                }
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}
          >
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for furniture..."
              className="search-bar"
              style={{
                padding: '0.7rem 1.2rem',
                borderRadius: '8px',
                border: '2px solid #ff8800',
                fontSize: '1.1rem',
                width: '320px',
                background: '#222',
                color: '#fff',
                outline: 'none',
                marginBottom: '0.5rem'
              }}
            />
            <button
              type="submit"
              className="hero-btn"
              style={{ background: '#ff8800', color: '#181818', fontWeight: 'bold', border: '2px solid #181818', borderRadius: '8px', padding: '0.7rem 1.5rem', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '0.5rem' }}
            >
              Enter
            </button>
          </form>
          <button
            className="hero-btn"
            style={{ background: '#ff8800', color: '#181818', fontWeight: 'bold', border: '2px solid #181818', borderRadius: '8px', padding: '0.7rem 1.5rem', fontSize: '1.1rem', cursor: 'pointer' }}
            onClick={() => window.location.href = 'mailto:info@sunnyhome.com'}
          >
            Contact With Us
          </button>
        </div>
      </header>
      <main>
        <section style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', margin: '2.5rem 0' }}>
          <div style={{ background: 'rgba(255,136,0,0.08)', borderRadius: '24px', boxShadow: '0 2px 16px rgba(255,136,0,0.10)', padding: '2rem 2.5rem', minWidth: '320px', maxWidth: '420px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{ color: '#ff8800', marginBottom: '1rem' }}>Why Choose Sunnyhome?</h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.2rem', paddingLeft: '1rem' }}>
              <li>Unique, modern furniture designs</li>
              <li>Premium quality materials</li>
              <li>Fast and reliable delivery</li>
              <li>Excellent customer support</li>
            </ul>
            <button className="hero-btn" style={{ marginTop: '0.5rem' }} onClick={() => window.location.href = 'mailto:info@sunnyhome.com'}>Get In Touch</button>
          </div>
          <div style={{ background: 'rgba(34,34,34,0.85)', borderRadius: '24px', boxShadow: '0 2px 16px rgba(255,136,0,0.10)', padding: '2rem 2.5rem', minWidth: '320px', maxWidth: '420px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{ color: '#ff8800', marginBottom: '1rem' }}>How To Order?</h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: '2', marginBottom: '1.2rem', paddingLeft: '1rem' }}>
              <li>Browse our latest models</li>
              <li>Click on a post for details</li>
              <li>Contact us for purchase or questions</li>
              <li>Leave a comment or feedback</li>
            </ul>
            <button className="hero-btn" style={{ marginTop: '0.5rem' }} onClick={() => window.location.href = 'mailto:info@sunnyhome.com'}>Order Now</button>
          </div>
        </section>
        <div className="slider-container">
          {filteredModels.length === 0 ? (
            <div style={{ color: '#ff8800', fontSize: '1.2rem', marginTop: '2rem' }}>No furniture found.</div>
          ) : (
            <div className="slider-list">
              {filteredModels.map(model => (
                <div
                  key={model.id}
                  className="slider-item"
                  onClick={() => navigate(`/post/${model.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={model.images[0]} alt={model.name} className="slider-image" onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/260x180?text=Image+Not+Found';}} />
                  <div className="slider-name">{model.name}</div>
                  {model.images.length > 1 && (
                    <div className="mini-gallery">
                      {model.images.slice(1).map((img, idx) => (
                        <img key={idx} src={img} alt={model.name + ' extra'} className="mini-img" onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/60x40?text=No+Image';}} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <section style={{ margin: '3rem auto 2rem auto', maxWidth: '700px', background: 'rgba(255,136,0,0.08)', borderRadius: '24px', boxShadow: '0 2px 16px rgba(255,136,0,0.10)', padding: '2rem 2.5rem', color: '#181818', textAlign: 'center' }}>
        <h2 style={{ color: '#ff8800', marginBottom: '1rem' }}>Contact With Us</h2>
        <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>Have questions, need help, or want to order? Reach out to our team and we’ll respond quickly!</p>
        <button className="hero-btn" style={{ background: '#ff8800', color: '#181818', fontWeight: 'bold', border: '2px solid #181818', borderRadius: '8px', padding: '0.7rem 1.5rem', fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => window.location.href = 'mailto:info@sunnyhome.com'}>Email Us</button>
        <div style={{ marginTop: '1.2rem', fontSize: '1.05rem', color: '#222' }}>
          Or call: <span style={{ color: '#ff8800', fontWeight: 'bold' }}>+1-800-SUNNYHOME</span>
        </div>
      </section>
    </>
  );
}

function PostDetails({ comments, input, handleInputChange, handleCommentSubmit }) {
  const { id } = useParams();
  const model = furnitureModels.find(m => m.id === Number(id));
  if (!model) {
    return <div style={{ color: '#ff8800', fontSize: '1.2rem', marginTop: '2rem', textAlign: 'center' }}>Furniture not found.</div>;
  }
  return (
    <div className="post-details-modern">
      <div className="post-details-image-wrap">
        <img
          src={model.images[0]}
          alt={model.name + ' gallery'}
          className="post-details-image-full"
          onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/900x500?text=No+Image';}}
        />
      </div>
      <div className="post-details-info">
        <h2>{model.name}</h2>
        <span className="post-price">{model.price}</span>
        <p className="post-desc">{model.description}</p>
        <ul className="post-features">
          <li>High quality materials</li>
          <li>Modern design</li>
          <li>Fast delivery available</li>
        </ul>
        <button className="post-contact-btn" onClick={() => window.location.href = 'mailto:info@sunnyhome.com'}>Contact for Purchase</button>
      </div>
      <div className="comments-section" style={{ width: '100%', marginTop: '2rem' }}>
        <h3>Comments</h3>
        <ul>
          {(comments[model.id] || []).map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
        <input
          type="text"
          value={input[model.id] || ''}
          onChange={e => handleInputChange(model.id, e.target.value)}
          className="comment-input"
        />
        <button onClick={() => handleCommentSubmit(model.id)} className="comment-btn">Post</button>
      </div>
    </div>
  );
}

function App() {
  const [comments, setComments] = useState({});
  const [input, setInput] = useState({});
  const [search, setSearch] = useState("");

  const handleInputChange = (id, value) => {
    setInput({ ...input, [id]: value });
  };

  const handleCommentSubmit = (id) => {
    if (input[id]) {
      setComments({
        ...comments,
        [id]: [...(comments[id] || []), input[id]]
      });
      setInput({ ...input, [id]: '' });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Router>
      <div className="sunnyhome-container">
        <Routes>
          <Route path="/" element={
            <Home
              comments={comments}
              input={input}
              handleInputChange={handleInputChange}
              handleCommentSubmit={handleCommentSubmit}
              search={search}
              handleSearchChange={handleSearchChange}
            />
          } />
          <Route path="/post/:id" element={
            <PostDetails
              comments={comments}
              input={input}
              handleInputChange={handleInputChange}
              handleCommentSubmit={handleCommentSubmit}
            />
          } />
        </Routes>
        <footer className="sunnyhome-footer">
          &copy; {new Date().getFullYear()} sunnyhome. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
