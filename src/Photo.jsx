function Photo({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) {
  // Helper for download
  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = regular;
    link.download = `${alt_description || "photo"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <article className="h-80 relative overflow-hidden rounded-2xl shadow-lg group transition-transform duration-300 hover:scale-105 bg-white cursor-pointer">
      <a
        href={regular}
        target="_blank"
        rel="noopener noreferrer"
        title="Open full image in new tab"
      >
        <img
          src={regular}
          alt={alt_description}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
      </a>
      <button
        onClick={handleDownload}
        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-indigo-600 font-bold px-3 py-1 rounded-full shadow-md text-xs transition-colors duration-200 border border-indigo-200"
        title="Download image"
      >
        Download
      </button>
      <div className="absolute w-full p-4 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center rounded-b-2xl">
        <div>
          <h4 className="mb-1 font-semibold text-lg">{name}</h4>
          <p className="mb-0 text-sm text-gray-200">❤️ {likes}</p>
        </div>
        <a
          href={portfolio_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4"
        >
          <img
            src={medium}
            alt={name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
        </a>
      </div>
    </article>
  );
}

export default Photo;
