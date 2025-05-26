const { Review } = require("../models");

const createReview = async (reviewData) => {
  const {
    name,
    description,
    price,
    duration,
    category,
    image,
    professional,
  } = reviewData;
  
  // Create the review
  const newReview = await Review.create({
    name,
    description,
    price,
    duration,
    category,
    image,
    professional,
  });
  return newReview;
};

const getReviewById = async (id) => {
  const review = await Review.findById(id);
  return review;
};

const updateReviewInfo = async (reviewId, reviewInfo) => {
  const {
    bio,
    rating,
    reviews,
    bookings,
    notifications,
    availability,
    workingHours,
    earnings,
    isVerified,
  } = reviewInfo;
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
        bio,
        rating,
        reviews,
        bookings,
        notifications,
        availability,
        workingHours,
        earnings,
        isVerified,
    },
    { new: true }
  );
  return updatedReview;
};

const deleteReview = async (reviewId) => {
  const deletedReview = await Review.findByIdAndDelete(reviewId);
  return deletedReview;
}

const getAllProfessionalReviews = async (professionalId) => {
  const reviews = await Review.find({ professional: professionalId });
  const totalReviews = await Review.countDocuments({ professional: professionalId });
  return { reviews, totalReviews };
}

module.exports = {
  createReview,
  getReviewById,
  updateReviewInfo,
  deleteReview,
  getAllProfessionalReviews,
};
