import React from 'react';
import { Container } from 'react-bootstrap';
import AboutLogo from '../assets/aboutTitle.png';
const About = () => {

    return (<React.Fragment>
        <Container>
            <img src={AboutLogo}
                alt="Noft Custom Icon" />
            <p>                With the emergence of NFTs, there is a whole new digital-niche for us to explore. One that takes into account creativity, supply and demand, blockchain, and like a million other things. So how would one capitalize on it? Think of Nifty, a new marketplace for NFT’s. They’re killing it! Why don’t we do that? Probably because we’re not backed by a large software company with staff and money and better fin-tech than us. What can we do instead? An NFT Reprint Library! Where users can download Reprints of NFTs and share them with one another! Like Instagram -people +NFTs.
</p>
        </Container>
    </React.Fragment>);
};

export default About;