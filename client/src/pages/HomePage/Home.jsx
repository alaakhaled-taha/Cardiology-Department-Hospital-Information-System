import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";
import bannerImage from "../../assets/banner5.jpg";

function Homepage() {
  return (
    <div>
      <Header />
      <main className="homepage-main">
        <section className="banner-section">
          <img src={bannerImage} alt="Hospital Banner" className="banner-image" />
        </section>

        <section className="testimonials">
          <h3>Testimonials</h3>
          <div className="testimonial-slider">
            <div className="testimonial-card">
              <p>"The doctors truly care about your wellbeing. I felt heard and supported throughout."</p>
              <span>- Mai Soliman</span>
            </div>
            <div className="testimonial-card">
              <p>"Modern facilities and kind staff—everything I needed in one place."</p>
              <span>- Salma Mansour</span>
            </div>
            <div className="testimonial-card">
              <p>"They saved my father's life. I will always be grateful for their dedication."</p>
              <span>- Omar Alaa</span>
            </div>
            <div className="testimonial-card">
              <p>"Fast service, top-notch diagnostics. Highly recommended!"</p>
              <span>- Mohamed Ahmed</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
