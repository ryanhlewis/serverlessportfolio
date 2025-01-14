import React from 'react';

const Publications: React.FC = () => {
  const publicationsData = [
    {
      section: "Peer-Reviewed Publications",
      entries: [
        {
          title: "Lorem Ipsum Dolor Sit Amet",
          authors: "John Doe, Jane Smith, et al.",
          venue: "Journal of Placeholder Studies",
          date: "August 2024",
          links: [
            { label: "Under Review", href: "https://placeholder.com/under-review" },
          ],
          description: "A project leveraging AI to address placeholder challenges.",
        },
        {
          title: "Consectetur Adipiscing Elit",
          authors: "John Doe",
          venue: "Placeholder Conference 2024",
          date: "July 2024",
          links: [
            { label: "DOI", href: "https://doi.org/10.1234/placeholder.doi" },
          ],
          description: "Creating a pipeline to transform placeholder data into usable formats.",
        },
      ],
    },
    {
      section: "Workshop Publications",
      entries: [
        {
          title: "Sed Do Eiusmod Tempor",
          authors: "John Doe, Alex Johnson",
          venue: "ACM Placeholder Informatics Review (PIR), Volume 4, Issue 5; Presented at Placeholder Workshop 2024",
          date: "July 2024",
          links: [
            { label: "PDF", href: "https://placeholder.com/assets/2024/pdf/placeholder24-final81.pdf" },
          ],
          description: "Discussing the role of placeholder in reducing placeholder footprint with edge/cloud systems.",
        },
      ],
    },
  ];

  return (
    <section id="publications" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Publications
        </h1>

        {publicationsData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {section.section}
            </h2>
            <div className="space-y-3">
              {section.entries.map((entry, entryIndex) => (
                <div
                  key={entryIndex}
                  className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 italic">
                    {entry.venue}, {entry.date}
                  </p>
                  {entry.authors && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {entry.authors}
                    </p>
                  )}
                  {entry.description && (
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                      {entry.description}
                    </p>
                  )}
                  <div className="mt-1 space-x-2">
                    {entry.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
