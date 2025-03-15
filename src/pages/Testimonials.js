import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO, TechCorp',
      feedback: 'The AI Policy Generator has been a game-changer for our organization. It streamlined our policy creation process and ensured compliance with industry standards.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Head of AI, InnovateAI',
      feedback: 'We were able to customize policies to fit our unique needs. The templates are comprehensive and easy to use.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'CTO, FutureTech',
      feedback: 'The AI Policy Generator saved us months of work. The intuitive interface and robust templates are unmatched.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Customer Testimonials</h1>
      <p className="text-lg text-gray-600 mb-8">
        Hear what our customers have to say about the AI Policy Generator.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-gray-600">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
