import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Testimonials = ({productId}) => {
  const [reviewData, setReviewData]=useState([]);

    const fetchReviewProduct = async ()=> {
        try {
          const response = await axios.get(`http://localhost:8080/reviews/Product/${productId}`);
          setReviewData(response.data);

        } catch (error) {
          alert(error.response.data);
        }
      };

      useEffect(()=>{
        fetchReviewProduct();
      },[]);

  return (
    <div className="testimonials">
      <h2>Customer Reviews</h2>
      <div className="testimonial-list">
        {reviewData.map((review) => (
          <div key={review.id} className="testimonial-card">
            {/*   <img src={testimonial.imageUrl} alt={testimonial.name} /> */}
            <h3>{review.user.username} gcfg</h3>
            <p>"{review.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
