const { reviewService } = require("../services");

const createReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = await reviewService.createReview(reviewData);
    res.status(201).json({ review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateReviewProfile = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewInfo = req.body;
    const updatedReview = await reviewService.updateReviewInfo(
      reviewId,
      reviewInfo
    );
    res.status(200).json({ review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    await reviewService.deleteReview(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProfessionalReviews = async (req, res) => {
  try {
    const professionalId = req.params.id;
    const { reviews, totalReviews } = await reviewService.getAllUserReviews(
      professionalId
    );
    res.status(200).json({ reviews, totalReviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  updateReviewProfile,
  deleteReview,
  getReviewById,
  getAllProfessionalReviews,
};
