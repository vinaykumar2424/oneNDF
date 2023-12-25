import '../cssFiles/LandingPage.css'
import LandingPageIntro from './LandingPageIntro';
import Navbar from './Navbar';

const LandingPage = () => {
    return (
        <div className="landingpage">
            <Navbar />
            <LandingPageIntro />
        </div>
    )
}
export default LandingPage;