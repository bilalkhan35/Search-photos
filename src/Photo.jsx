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
  return (
    <article className="h-80 relative overflow-hidden rounded-2xl shadow-lg group transition-transform duration-300 hover:scale-105 bg-white">
      <img
        src={regular}
        alt={alt_description}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
      />
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
