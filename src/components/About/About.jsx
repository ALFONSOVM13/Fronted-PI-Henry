import React from 'react';
import '../../sass/About.scss'
import aboutImage from '../../assets/about.svg';

const About = () => {
    return (
        <div class="about-wrapper">
            <div class="about-image">
                <img src={aboutImage} alt="about" />
            </div>
            <div className="about-container">
                <h1>About Me</h1>
                <p >
                    <span className='intro'>Hello!</span> I'm a passionate software developer with experience in both Front-End and Back-End solutions. I specialize in creating websites that offer a unique and satisfying user experience.
                </p>
                <p>
                    In my work, I always implement the best practices, architectures, and programming patterns to ensure the quality and efficiency of my projects. I take pride in meticulously analyzing requirements and estimating the time needed to complete tasks accurately.
                </p>
                <p>
                    I am a self-taught individual, responsible, and dedicated to my work. I'm always seeking to learn new technologies and tools to continuously enhance my skills and stay updated in the field of software development.
                </p>
                <p>
                    If you have any questions or comments, feel free to<a href="https://www.linkedin.com/in/alfonsovengoechea1301/" className="intro"><span>CONTACT ME</span>
                    </a>
                </p>
            </div>
        </div>
    );
};

export default About;