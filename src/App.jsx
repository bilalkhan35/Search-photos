import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import { useState, useEffect } from "react";

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    const urlPerPage = `&per_page=12`;
    if (query) {
      url = `${searchUrl}?client_id=${
        import.meta.env.VITE_API_URL
      }${urlPage}${urlQuery}${urlPerPage}`;
    } else {
      url = `${mainUrl}?client_id=${
        import.meta.env.VITE_API_URL
      }${urlPage}${urlPerPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    setPage(1);
    setPhotos([]); // Clear previous photos on new search
    fetchImages();
  };
  return (
    <main>
      <section className="w-[80vw] m-auto max-w-7xl md:max-w-5xl ">
        <div className="px-4 sm:px-10 w-full max-w-3xl mx-auto mt-12">
          <form
            className="flex gap-3 sm:gap-6 items-center bg-white rounded-full shadow-lg p-2 sm:p-3 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-300"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search high-quality photos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none px-4 py-2 text-lg text-gray-700 placeholder-gray-400 rounded-full"
              autoFocus
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200 px-5 py-3 rounded-full shadow-md text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </section>
      <section className="py-20 ">
        <div className="w-[80vw] max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center mt-12">
            <svg
              className="animate-spin h-12 w-12 text-indigo-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <h2 className="text-xl text-indigo-500 font-semibold animate-pulse">
              Loading beautiful photos...
            </h2>
          </div>
        )}
        {!loading && photos.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage((oldPage) => oldPage + 1)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full shadow-lg text-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Show More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
