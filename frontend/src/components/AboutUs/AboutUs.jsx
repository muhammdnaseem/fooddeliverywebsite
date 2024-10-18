import React, { useContext } from 'react';
import './AboutUs.css';
import { Container } from 'react-bootstrap';
import { StoreContext } from '../context/StoreContext'; // Import StoreContext

const AboutUs = () => {
  const { category_list = [] } = useContext(StoreContext); // Get category list from context
  const url = "http://localhost:4000"; // Base URL for the images

  return (
    <Container fluid className='p-lg-5 bg-transparent'>
    <Container className='mx-lg-5'>
      <h2 className='mx-lg-5'>ABOUT US</h2>
      {/* About Us Section */}
      <section className="about-us-info m-lg-5 my-sm-5">
        
      <div class="container contact-info">
  <div class="row w-100">
    <div class="col-sm-4 text-lg-start">
      <h3>Phone Number</h3>
      <p>05827964531</p>
    </div>
    <div class="col-sm-4 text-lg-center">
      <h3>Location</h3>
      <p>Muslim Colony</p>
    </div>
    <div class="col-sm-4 text-lg-end">
      <h3>Pickup Address</h3>
      <p>Muslim Colony</p>
    </div>
  </div>
</div>
        <div className='container'>

        
        <div className="location-map">
          <h3 className='text-start py-lg-5'>Location</h3>
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d872432.3037398454!2d73.06203700000001!3d34.2456073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de310aa9158357%3A0x87571c629c9a6149!2sUniversity%20Town%20%2C%20Mandian%2C%20Abbottabad!5e0!3m2!1sen!2s!4v1697456486821!5m2!1sen!2s"
  width="100%"
            height="400"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        </div>


      </section>

      {/* History Section */}
      <section className="row history m-lg-5 text-center">
  <h2 className="col-12">HISTORY</h2>
  <p className="col-12">Our journey starts way back in 1975</p>
  <div className="row justify-content-center history-details">
  <div className="col-md-5 col-lg-4 history-item">
    <h3>ORIGIN</h3>
    <p className="text-justify">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
  </div>
  <div className="col-md-1 d-none d-md-block text-center">
    <div className="vertical-line"></div> 
  </div>
  <div className="col-md-5 col-lg-4 history-item">
    <h3>STORY</h3>
    <p className="text-justify">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
  </div>
</div>

</section>


      
    </Container>

    {/* Insights Section */}
    <section className="insights pt-5">
          <h2 className="text-center">INSIGHTS</h2>
          <div className="row justify-content-center insight-images">
            {/* Loop through the first 3 categories to display their images */}
            {category_list.slice(0, 3).map((category, index) => (
              <div key={index} className="col-md-4 col-sm-6 col-lg-3">
                <img 
                  src={`${url}/categoryimages/${category.categoryimage}`} 
                  alt={category.categoryname} 
                  className="img-fluid rounded" 
                />
               
              </div>
            ))}
          </div>
        </section>
    </Container>
  );
};

export default AboutUs;
