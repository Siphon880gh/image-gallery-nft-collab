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

            <p>
                Instead, we provide their digital dopplegangers. Aka NoFTs.
            </p>

            <h2> Like that example above? </h2>
            <p>
                Exactly! You catch on fast. 
            </p>
            <p>
                NoFT allows users to share, favorite, download, and discuss all of their favorite NFT works without actually interacting with real non-fungible tokens. 
                All of the assets you see on this website are NoFTs, which are literally the publicly-available files. 
            </p>

            <h2>So a NoFT is just a non-unique mimic of an NFT?</h2>
            <p>
                Sort of! NoFT posts retain whatever file structure the asset is posted in and are NOT connected to an Ethereum blockchain asset. When you post a jpeg of an NFT you created/found/bought, you are posting the actual jpeg file, not a non-fungible token. 
                When someone downloads this post, they are downloading the jpeg file, not a non-fungible token. At no point is the user directly interacting with an NFT when they are on our website. 
                No changes to the chain-of-title, no interaction with cryptocurrency wallets, no financial transactions of any kind.
            </p>

        </Container>
    </React.Fragment>);
};

export default About;