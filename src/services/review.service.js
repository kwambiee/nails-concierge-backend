const { Review } = require("../models");

const createReview = async (reviewData) => {
  const {
    client,
    technician,
    rating,
    comment,
    service,
  } = reviewData;
  
  // Create the review
  const newReview = await Review.create({
    client,
    technician,
    rating,
    comment,
    service,
  });
  return newReview;
};

const getReviewById = async (id) => {
  const review = await Review.findById(id);
  return review;
};

const updateReviewInfo = async (reviewId, reviewInfo) => {
  const { client, technician, rating, comment, service } = reviewInfo;
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      client,
      technician,
      rating,
      comment,
      service,
    },
    { new: true }
  );
  return updatedReview;
};

const deleteReview = async (reviewId) => {
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  return deletedReview;
}

const getTechnicianReviews = async (technician) => {
  const reviews = await Review.find(technician);
  const totalReviews = await Review.countDocuments(technician);
  return { reviews, totalReviews };
}

module.exports = {
  createReview,
  getReviewById,
  updateReviewInfo,
  deleteReview,
  getTechnicianReviews,
};
