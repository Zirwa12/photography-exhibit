
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

const photos = [
  {
    id: 1,
    title: "The Eternal City",
    location: "Rome, Italy",
    category: "Architecture",
    image: "https://cdn.freecodecamp.org/curriculum/labs/colosseo.jpg",
    description:
      "A glimpse into the past. The Colosseum stands as a remarkable reminder of ancient Roman architecture, history and culture.",
    photographer: "Exhibition Collection",
  },
  {
    id: 2,
    title: "Above the Clouds",
    location: "The Alps",
    category: "Nature",
    image: "https://cdn.freecodecamp.org/curriculum/labs/alps.jpg",
    description:
      "The mountains rise above the clouds, creating a beautiful landscape that captures the quiet power of nature.",
    photographer: "Exhibition Collection",
  },
  {
    id: 3,
    title: "Beyond the Shore",
    location: "Open Sea",
    category: "Landscape",
    image: "https://cdn.freecodecamp.org/curriculum/labs/sea.jpg",
    description:
      "A peaceful view of the sea. The endless horizon reminds us of the beauty and scale of the natural world.",
    photographer: "Exhibition Collection",
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        FRAME<span>.</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Gallery</Link>
        <a href="#about">About</a>
      </div>

      <span className="nav-label">A PHOTOGRAPHY EXHIBITION</span>
    </nav>
  );
}

function Gallery() {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  function toggleLike(id) {
    setLikedPhotos((previous) =>
      previous.includes(id)
        ? previous.filter((photoId) => photoId !== id)
        : [...previous, id]
    );
  }

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(search.toLowerCase()) ||
      photo.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || photo.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="hero">
        <p className="eyebrow">A COLLECTION OF MOMENTS</p>
        <h1>Photography is the art of <em>seeing.</em></h1>
        <p className="hero-description">
          A collection of places, perspectives and moments worth remembering.
        </p>
        <a href="#gallery" className="explore-button">
          Explore Collection <span>↓</span>
        </a>
      </header>

      <main className="gallery-section" id="gallery">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Selected Works</h2>
          </div>
          <p>{filteredPhotos.length} photographs</p>
        </div>

        <div className="gallery-controls">
          <input
            type="search"
            placeholder="Search photographs or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Architecture">Architecture</option>
            <option value="Nature">Nature</option>
            <option value="Landscape">Landscape</option>
          </select>
        </div>

        <div className="photo-grid">
          {filteredPhotos.map((photo) => (
            <article className="photo-card" key={photo.id}>
              <div className="photo-image">
                <img src={photo.image} alt={photo.title} />

                <button
                  className={`like-button ${
                    likedPhotos.includes(photo.id) ? "liked" : ""
                  }`}
                  onClick={() => toggleLike(photo.id)}
                  aria-label="Like photograph"
                >
                  {likedPhotos.includes(photo.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="photo-info">
                <p className="photo-category">{photo.category}</p>
                <h3>{photo.title}</h3>
                <p className="photo-location">{photo.location}</p>

                <div className="card-footer">
                  <span>
                    ♥ {likedPhotos.includes(photo.id) ? 1 : 0} likes
                  </span>

                  <Link to={`/photo/${photo.id}`} className="details-link">
                    View Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <p className="empty-message">
            No photographs found. Try another search.
          </p>
        )}
      </main>

      <section className="about-section" id="about">
        <p className="eyebrow">ABOUT THE EXHIBITION</p>
        <h2>Every photograph tells a story.</h2>
        <p>
          FRAME is a small photography exhibition celebrating architecture,
          landscapes and the beauty of the world around us.
        </p>
      </section>
    </>
  );
}

function PhotoDetails() {
  const { id } = useParams();
  const photo = photos.find((item) => item.id === Number(id));

  if (!photo) {
    return (
      <main className="not-found">
        <h1>Photograph not found</h1>
        <Link to="/">Return to Gallery</Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/" className="back-link">← Back to Gallery</Link>

      <div className="details-layout">
        <img src={photo.image} alt={photo.title} />

        <div className="details-content">
          <p className="eyebrow">{photo.category}</p>
          <h1>{photo.title}</h1>
          <p className="details-location">{photo.location}</p>

          <div className="details-divider"></div>

          <h3>About this photograph</h3>
          <p>{photo.description}</p>

          <div className="details-divider"></div>

          <p className="detail-label">COLLECTION</p>
          <p>{photo.photographer}</p>

          <Link to="/" className="explore-button">
            Explore More Photographs →
          </Link>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
        </Routes>

        <footer className="footer">
          <p>FRAME. © 2026 Photography Exhibition</p>
          <p>Made with an appreciation for photography.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
