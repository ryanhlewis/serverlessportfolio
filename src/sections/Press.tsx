import React from 'react';

const Press: React.FC = () => {
  const pressData = [
    {
      category: "First Project",
      articles: [
        {
          title: "News article about the first project",
          publisher: "Publisher Name",
          date: "4 June 2024",
          link: "#",
          image: "https://placecats.com/300/300",
        },
        {
            title: "Second news article about the first project",
            publisher: "Publisher Name",
            date: "23 June 2024",
            link: "#",
            image: "https://placecats.com/200/300",
          },
      ],
    },
    {
      category: "Second Project",
      articles: [
        {
          title: "News article about the second project",
          publisher: "Publisher Name",
          date: "16 April 2024",
          link: "#",
          image: "https://placecats.com/300/200",
        },
      ],
    },
  ];

  return (
    <section id="press" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10">Press</h1>

        {pressData.map((project) => (
          <div key={project.category} className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              {project.category}
            </h2>
            <ul className="space-y-6">
              {project.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 group"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {article.publisher} • {article.date}
                    </p>
                  </div>
                </a>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Press;