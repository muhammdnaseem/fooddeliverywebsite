const StarRating = ({ rating }) => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <span 
          key={index} 
          className="mx-2 mb-2"
          style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '30px', }}>
            ★
          </span>
        ))}
      </div>
    );
  };
  export default StarRating;