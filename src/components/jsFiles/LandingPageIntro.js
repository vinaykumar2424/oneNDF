import React, { useState, useEffect } from 'react';
import '../cssFiles/LandingPageResponsiveness.css';
import '../cssFiles/LandingPageIntro.css';

const LandingPageIntro = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ['Loan Eligibility', 'Matched Lenders', 'Best Offers'];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 4000);

        return () => clearInterval(intervalId);

    }, [textIndex]);

    return (
        <div className="landingpageintro">
            <div className='name'>OneNDF</div>
            <div className='details'>
                <span className='fixed-text'>Provides</span>&nbsp;
                <span className='variable-text'>{texts[textIndex]}</span>
            </div>
            <div className='bottomPart-heading'>Get the best business loan terms in three easy steps.</div>
            <div className='bottomPart-cards'>
                <div className='card'>
                    <p><span>1.</span> Generate your Financial Health Card (FHC)</p>
                    <div>We create a Financial Health Card for each Borrower. Our Financial Score Card keeps the Borrowers appraised of their Financial Health and gives them a complete snapshot of the financial ratios & their Business health, while offering recommendations & suggestions to improve the overall Financial health.</div>
                </div>
                <div className='card'>
                    <p><span>2.</span> Match-making with India’s Leading Lenders</p>
                    <div>Creating the FHC and making it available to the Borrower & the Lenders eliminates duplication of effort for the SMEs. The Lender Matching Algorithm extrapolates the lenders (per the product policies), and the borrowers receive E-sanctions from the Lenders. On accepting the offer, the loan is out for delivery.</div>
                </div>
                <div className='card'>
                    <p><span>3.</span> 5X Loan Execution and Fulfillment</p>
                    <div>The SMEs today have a preference of digital-led, simpler and faster lending. At OneNDF, we have enabled just that along with offering wide range of credit options, both from Traditional Lenders and the New age Fintechs.</div>
                </div>
            </div>
            
        </div>
    );
};

export default LandingPageIntro;
