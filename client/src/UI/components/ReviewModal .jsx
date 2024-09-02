import React from 'react'; 

const ReviewModal = ({ isOpen, onCloseReviewModal, reviews }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onCloseReviewModal}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{width:'80%'}}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto relative" style={{width:'100%'}}>
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onCloseReviewModal}
          >
            &times;
          </button>
          <h2 className="text-lg font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {reviews.map((review, index) => (
                <li key={index} className="border-b py-2">
                  <p className="font-semibold">Anonymous</p>
                  <p>Comment: {review.Comment}</p>
                  <p>Rating: {review.Rating}</p>
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={onCloseReviewModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

 

export default ReviewModal;
