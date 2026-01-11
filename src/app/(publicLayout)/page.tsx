import Banner from '@/component/home/Banner';
import OurStory from '@/component/home/OurStory';
import Specialties from '@/component/home/Specialties';
import WhyChooseUs from '@/component/home/WhyChoseUs';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner></Banner>
            <Specialties></Specialties>
            <OurStory></OurStory>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default page;