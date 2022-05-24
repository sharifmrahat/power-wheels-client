import React from "react";
import Loading from "../../components/Loading";
import useReviews from "../../hooks/useReviews";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews] = useReviews();
  return (
    <>
      {!reviews ? (
        <Loading></Loading>
      ) : (
        <div>
          <section>
            <h2 className="text-xl lg:text-2xl font-primary my-10">
              Clients Feedbacks
            </h2>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-y-10 gap-x-20 w-fit mx-auto mt-10">
            {reviews.map((review) => (
              <ReviewCard key={review} review={review}></ReviewCard>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Reviews;
