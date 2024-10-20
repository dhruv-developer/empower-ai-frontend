import React from 'react';

const ResourceCard = ({ title, description, link }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>{description}</p>
      </div>
    </div>
    <div className="px-4 py-4 sm:px-6">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Learn More <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </div>
);

const Resources = () => {
  const resources = [
    {
      title: "UN Women",
      description: "The United Nations entity dedicated to gender equality and the empowerment of women.",
      link: "https://www.unwomen.org/en"
    },
    {
      title: "Women's Economic Empowerment",
      description: "OECD's work on women's economic empowerment and gender equality in the economy.",
      link: "https://www.oecd.org/gender/womens-economic-empowerment.htm"
    },
    {
      title: "Women in Leadership",
      description: "McKinsey & Company's research on women in the workplace and leadership roles.",
      link: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/women-in-the-workplace"
    },
    // Add more resources as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Resources</h1>
      <p className="text-xl text-gray-500 mb-8">
        Explore these valuable resources to learn more about women's economic equality and leadership.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;