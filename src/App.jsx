import {createHashRouter, HashRouter, RouterProvider, useLocation} from 'react-router';
import Box from "@mui/material/Box";
import Navbar from "./blocks/navbar/Navbar";
import NavbarContent from "./blocks/navbar/NavbarContent";
import Hero from "./blocks/Hero";
import Reasons from "./blocks/Reasons";
import {about} from "./data/about";
import About from "./blocks/About";
import {reasons} from "./data/reasons";
import {hero} from "./data/hero";
import Pricing from "./blocks/Pricing";
import {pricing} from "./data/pricing";
import Testimonial from "./blocks/Testimonial";
import {testimonial} from "./data/testimonial";
import Faq from "./blocks/Faq";
import {faq} from "./data/faq";
import {navbar} from "./data/navbar";
import AppThemeProvider from "./components/AppThemeProvider";
import Outcomes from "./blocks/Outcomes";
import {outcomeSection} from "./data/outcomes";
import Footer from "./blocks/Footer";
import {footer} from "./data/footer";

export default function App() {
  return (
    <AppThemeProvider>
      <HashRouter>
        <Navbar>
          <NavbarContent {...navbar} />
        </Navbar>

        <Hero {...hero} />
        <Reasons {...reasons} />
        <About {...about} />
        <Pricing {...pricing} />
        <Outcomes {...outcomeSection} />
        <Testimonial {...testimonial} />
        <Faq {...faq} />
        <Footer footer={footer}/>
      </HashRouter>
    </AppThemeProvider>);
}