
export default function FAQ() {
  return (
    <div className="bg-gray-800 py-12" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Find answers to the most commonly asked questions about our website
            monitoring service.
          </p>
        </div>
        <div className="mx-auto max-w-lg divide-y divide-gray-100">
          <details className="group bg-gray-700 rounded-lg shadow-md mb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 px-6 text-lg font-medium text-white">
              How does the website monitoring tool work?
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 px-6 text-gray-400">
              Our tool continuously monitors your website and alerts you in
              real-time via email notification if any issues are detected, ensuring minimal downtime.
            </div>
          </details>
          <details className="group bg-gray-700 rounded-lg shadow-md mb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 px-6 text-lg font-medium text-white">
              Is the monitoring service completely free?
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 px-6 text-gray-400">
              Yes, our service is completely free to use. You can monitor your
              websites without any cost.
            </div>
          </details>
          <details className="group bg-gray-700 rounded-lg shadow-md mb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 px-6 text-lg font-medium text-white">
              How will I be notified of any issues?
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 px-6 text-gray-400">
              You will receive instant notifications via email whenever an issue
              is detected with your website.
            </div>
          </details>
          <details className="group bg-gray-700 rounded-lg shadow-md mb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 px-6 text-lg font-medium text-white">
              Can I monitor multiple websites?
              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 px-6 text-gray-400">
              Yes, you can monitor multiple websites with our tool and receive
              notifications for each one.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
