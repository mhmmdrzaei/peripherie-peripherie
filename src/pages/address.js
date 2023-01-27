import React from "react"
import { useEffect } from "react"

const Address = () => {
  useEffect(() => {
    const sectionId = window.location.pathname.split("/")[1];
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
    }
  }, []);

  return <div>
    
    <h1>
        test
    </h1>
    <br>
    </br>
    <section id="contributors">
        <h2>Cont</h2>
    </section>
  </div>;
}

export default Address