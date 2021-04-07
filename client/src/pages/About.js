import React from 'react';
import { Container } from 'react-bootstrap';
import AboutLogo from '../assets/aboutTitle.png';
const About = () => {

    return (<React.Fragment>
        <Container>
            <img src={AboutLogo}
                alt="Noft Custom Icon" 
            />
            <h2>What are NoFTs?</h2>
            <p>Before we explain what a NoFT is, let's describe what an NFT is first!</p>

            <h2>What are NFTs?</h2>
            <p>
                Non-Fungible-Tokens (NFTs) are unique digital assets that are stored as Etherum blockchain. 
                This means that every NFT is unique, thus making it non-fungible. 
                These assets can range from images, gifs, audio files, video game items, and a multitude of other forms of digital creativity.
                A caveat to this is that there is likely no tangible difference between an NFT of a digital asset and a copy of that NFT.
            </p>

            <p>
                This being said, some people might think, "NFTs are completely worthless", and people are entitled to that belief.
                But we aren't here to discuss the vast and nuanced potentials of NFTs. We are here to share free stuff.
            </p>

            <h2>I like free stuff!</h2>
            <p>
                Of course you do, we like free stuff too!
            </p>

            <h2>What kind of free stuff does NoFT offer?</h2>
            <p>
                We're glad you asked, esteemed and inquisitive. Here at NoFT we provide no NFTs. Zero.
            </p>
           
            <p>
                We'll repeat that for everyone
            </p>
            
            <h3>We do NOT provide NFTs</h3>

        </Container>
    </React.Fragment>);
};

export default About;