const Example = () => {
  return (
    <div className="bg-gray-900 py-12" id="testimonal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl text-red-200 font-semibold">Testimonials</h3>
          <div className="mt-4 text-white">
            <h2 className="text-5xl font-extrabold">What they say</h2>
            <p className="mt-4 text-lg">
              We are thrilled to hear how our website monitoring tool has helped
              so many users.
            </p>
            <p className="mt-2 text-lg">
              A big thank you to all who share their experiences and support us!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
            <div className="quote mb-4">
              <blockquote className="text-gray-800 italic">
                "The best monitoring tool I have ever used! It's easy to set up
                and provides timely alerts. It has saved me from so many
                potential downtimes. Highly recommend!"
              </blockquote>
            </div>
            <div className="name text-right">
              <b className="text-gray-900">Alex from UK</b>
            </div>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
            <div className="quote mb-4">
              <blockquote className="text-gray-800 italic">
                "I love how simple and effective this tool is. The real-time
                notifications are a game-changer for managing my website's
                uptime. Excellent service and completely free!"
              </blockquote>
            </div>
            <div className="name text-right">
              <b className="text-gray-900">Sam from USA</b>
            </div>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
            <div className="quote mb-4">
              <blockquote className="text-gray-800 italic">
                "This website monitoring service is fantastic! It's incredibly
                user-friendly and has helped me stay ahead of any issues. Thank
                you for offering such a reliable tool!"
              </blockquote>
            </div>
            <div className="name text-right">
              <b className="text-gray-900">Jordan from Canada</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
