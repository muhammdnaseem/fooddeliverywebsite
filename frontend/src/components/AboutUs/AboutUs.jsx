import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* About Us Section */}
      <section className="about-us-info">
        <h2>About Us</h2>
        <div className="contact-info">
          <div className="info-item">
            <h3>Phone Number</h3>
            <p>05827964531</p>
          </div>
          <div className="info-item">
            <h3>Location</h3>
            <p>Muslim Colony</p>
          </div>
          <div className="info-item">
            <h3>Pickup Address</h3>
            <p>Muslim Colony</p>
          </div>
        </div>
        <div className="location-map">
          <h3>Location</h3>
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* History Section */}
      <section className="history">
        <h2>History</h2>
        <p>Our journey starts way back in 1975</p>
        <div className="history-details">
          <div className="history-item">
            <h3>Origin</h3>
            <p>Here you can add the story of the origin, how it all began.</p>
          </div>
          <div className="history-item">
            <h3>Story</h3>
            <p>Here you can add more details about the story behind the business.</p>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="insights">
        <h2>Insights</h2>
        <div className="insight-images">
          <img src="https://example.com/image1.jpg" alt="Insight 1" />
          <img src="https://example.com/image2.jpg" alt="Insight 2" />
          <img src="https://example.com/image3.jpg" alt="Insight 3" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
