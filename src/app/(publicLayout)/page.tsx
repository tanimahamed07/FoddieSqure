import Banner from '@/component/home/Banner';
import ContactLocation from '@/component/home/ContactLocation';
import OurStory from '@/component/home/OurStory';
import Specialties from '@/component/home/Specialties';
import Testimonials from '@/component/home/Testimonials';
import WhyChooseUs from '@/component/home/WhyChoseUs';
import Footer from '@/component/shared/Footer';
import React from 'react';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Specialties></Specialties>
            <OurStory></OurStory>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </div>
    );
};

export default Home;