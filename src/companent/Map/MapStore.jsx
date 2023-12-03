import { useState, useEffect } from "react";
import "./Map.scss";


const MapStore = () => {

  return (
    <div className="map-lealet">
      <div>
        <h1>Nos Position</h1>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d564.9274060632197!2d10.090410702748773!3d36.777475977060156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3176c8f21a15%3A0x424adcd8ad1c9f2b!2sD%C3%A9p%C3%B4t%20transtu%20zahrouni!5e0!3m2!1sen!2stn!4v1699746663125!5m2!1sen!2stn"
          width="100%"
          height="550"
          // style="border:0;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapStore;
