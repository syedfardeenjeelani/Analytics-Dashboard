
import React, { useEffect, useState } from "react";
import { useGetNewsSourcesQuery } from "../../services/news/newsApi";

const categories = [
  "technology",
  "sports",
  "business",
  "health",
  "entertainment",
];

const NewsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { data: newsData, isLoading, error } = useGetNewsSourcesQuery();

  const filteredNews = newsData?.sources.filter((source: any) =>
    selectedCategory === "all" ? true : source.category === selectedCategory
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards =
    filteredNews?.slice(indexOfFirstCard, indexOfLastCard) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-500 rounded-full animate-spin border-b-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading news sources</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md capitalize ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((article: any) => (
          <div
            key={article.id}
            className="rounded-2xl hover:bg-blue-50 shadow-lg transform border-2 p-8 transition duration-500 hover:scale-105 bg-white"
          >
            <div className="space-y-4">
              <h3 className="font-bold text-xl">
                {article.name.length > 48
                  ? `${article.name.slice(0, 48)}...`
                  : article.name}
              </h3>
              <p className="text-gray-700">
                {article.description.length > 55
                  ? `${article.description.slice(0, 55)}...`
                  : article.description}
              </p>
              <div className="space-y-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 hover:text-black hover:border-2 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                >
                  Read More
                </a>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    Language:{" "}
                    <span className="text-black">{article.language}</span>
                  </p>
                  <p>
                    Country:{" "}
                    <span className="text-black">{article.country}</span>
                  </p>
                  <p>
                    Category:{" "}
                    <span className="text-black capitalize">
                      {article.category}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews && (
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil((filteredNews?.length || 0) / cardsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 ${
                  currentPage === i + 1 ? "bg-gray-200" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NewsDashboard;
