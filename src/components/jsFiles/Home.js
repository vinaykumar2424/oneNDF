import '../cssFiles/Home.css'
import '../cssFiles/HomeResponsive.css'
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { AuthContext } from "./firebase/AuthContext";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import loader from "../images/loader.gif"
import { PieChart, Pie, Cell } from "recharts";

const Home = () => {
    // const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [activeLoan, setActiveLoan] = useState('home');
    const handleClick = (loan) => {
        setActiveLoan(loan);
    };
    useEffect(()=>{
        setTimeout((e)=>{
            setIsLoading(false)
        },1000)
    },[])

    // const [data, setData] = useState()
    // useEffect(() => {
    //     const currentUserUid = currentUser && currentUser.uid
    //     console.log('Fetching data for user:', currentUserUid);

    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true);

    //             const DataRef = doc(db, 'Users', currentUserUid);
    //             console.log('DataRef:', DataRef);

    //             const DataSnap = await getDoc(DataRef);
    //             console.log('DataSnap:', DataSnap);

    //             if (DataSnap.exists()) {
    //                 const Data = DataSnap.data();
    //                 console.log('Data:', Data);
    //                 setData(Data);
    //             } else {
    //                 console.log('No data found for the current user');
    //             }

    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Error getting doctor data:', error);
    //             setIsLoading(false);
    //         }
    //     };

    //     if (currentUserUid) {
    //         fetchData();
    //     }
    // }, [currentUser]);


    // console.log(data)

    
    const [value1, setValue1] = useState(50000);
    const [value2, setValue2] = useState(8);
    const [value3, setValue3] = useState(10);

    const updateTrackColor = (inputNumber, event) => {
        const inputRange = event.target;
        const value = inputRange.value;

        switch (inputNumber) {
            case 1:
                setValue1(value);
                // change the color of input range bar accordingly
                inputRange.style.background = `linear-gradient(to right, #fc8403 0%, #fc8403 ${value / 10000}%, #ddd ${value / 10000}%, #ddd 100%)`;
                break;
            case 2:
                setValue2(value);
                inputRange.style.background = `linear-gradient(to right, #fc8403 0%, #fc8403 ${value}%, #ddd ${value}%, #ddd 100%)`;
                break;
            case 3:
                setValue3(value);
                inputRange.style.background = `linear-gradient(to right, #fc8403 0%, #fc8403 ${value * 2}%, #ddd ${value * 2}%, #ddd 100%)`;
                break;
            default:
                break;
        }
    };



    // calculation for which will show on chart 
    const [principal, setPrincipal] = useState(5000000);
    const [interestRate, setInterestRate] = useState(5);
    const [loanTenure, setLoanTenure] = useState(10);
    const [Data, setAmoutData] = useState([
        { name: "P.A.", value: 40 },
        { name: "T.I.A", value: 60 },
    ]);

    useEffect(() => {
        setPrincipal(value1);
    }, [value1]);

    useEffect(() => {
        setInterestRate(value2);
    }, [value2]);

    useEffect(() => {
        setLoanTenure(value3);
    }, [value3]);

    useEffect(() => {
        const totalAmount = parseFloat(principal) + parseFloat(calculateTotalInterest());
        const principalPercentage = (parseFloat(principal) / totalAmount) * 100;
        const interestPercentage = (parseFloat(calculateTotalInterest()) / totalAmount) * 100;

        setAmoutData([
            { name: "P.A.", value: Math.round(principalPercentage) },
            { name: "T.I.A", value: Math.round(interestPercentage) },
        ]);
    }, [principal, interestRate, loanTenure]);


    const calculateEMI = () => {
        const monthlyInterestRate = interestRate / (12 * 100);
        const numberOfPayments = loanTenure * 12;

        const emi =
            (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        return emi.toFixed(2);
    };

    const calculateTotalRepayment = () => {
        const emi = calculateEMI();
        const numberOfPayments = loanTenure * 12;

        const totalRepayment = emi * numberOfPayments;

        return totalRepayment.toFixed(2);
    };

    const calculateTotalInterest = () => {
        const totalRepayment = calculateTotalRepayment();

        const totalInterest = totalRepayment - principal;

        return totalInterest.toFixed(2);
    };
    return (
        <>
            {isLoading ? (
                <img className='loader' src={loader} alt='' />
            ) : (
                <div className="home">
                    <button className="sign-out-btn" onClick={() => { signOut(auth) }}><span>Log Out</span></button>
                    <div className="heading">Calculate the Loan</div>
                    <div className="type-of-loans">
                        <span
                            className={`loan ${activeLoan === 'home' ? 'active' : ''}`}
                            onClick={() => handleClick('home')}
                        >
                            <span className="material-symbols-outlined">house</span>
                            <span>Home Loan</span>
                        </span>

                        <span
                            className={`loan ${activeLoan === 'personal' ? 'active' : ''}`}
                            onClick={() => handleClick('personal')}
                        >
                            <span className="material-symbols-outlined">person</span>
                            <span>Personal Loan</span>
                        </span>

                        <span
                            className={`loan ${activeLoan === 'auto' ? 'active' : ''}`}
                            onClick={() => handleClick('auto')}
                        >
                            <span className="material-symbols-outlined">directions_car</span>
                            <span>Auto Loan</span>
                        </span>

                        <span
                            className={`loan ${activeLoan === 'business' ? 'active' : ''}`}
                            onClick={() => handleClick('business')}
                        >
                            <span className="material-symbols-outlined">work</span>
                            <span>Business Loan</span>
                        </span>
                    </div>
                    <div className="calculation-part">
                        <div className="set-value">
                            <div className="loan-detail loan-amount">
                                <div className="values">
                                    <span>Loan Amount</span>
                                    <span><span>Rs.</span>&nbsp;&nbsp;<span>&nbsp;&nbsp;{value1}&nbsp;&nbsp;</span></span>
                                </div>
                                <input type="range" className="first-input" id="vol1" name="vol1" min="0" max="1000000" step="10000" value={value1} onChange={(e) => updateTrackColor(1, e)} />
                            </div>
                            <div className="loan-detail loan-rate">
                                <div className="values">
                                    <span>Rate of interest</span>
                                    <span><span>%</span>&nbsp;&nbsp;<span>&nbsp;&nbsp;{value2}&nbsp;&nbsp;</span></span>
                                </div>
                                <input type="range" className="second-input" id="vol2" name="vol2" min="0" max="100" step="0.1" value={value2} onChange={(e) => updateTrackColor(2, e)} />
                            </div>
                            <div className="loan-detail loan-amount">
                                <div className="values">
                                    <span>Loan tenure</span>
                                    <span><span>Years</span>&nbsp;&nbsp;<span>&nbsp;&nbsp;{value3}&nbsp;&nbsp;</span></span>
                                </div>
                                <input type="range" className="third-input" id="vol3" name="vol3" min="0" max="50" step="0.5" value={value3} onChange={(e) => updateTrackColor(3, e)} />
                            </div>
                        </div>
                        <div className="show-result">
                            <PieChart width={700} height={700}>
                                <Pie
                                    data={Data}
                                    dataKey="value"
                                    outerRadius={250}
                                    innerRadius={220}
                                    label={({ name, value }) =>
                                        `${name}: ${value}`
                                    }
                                >
                                    {Data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === "P.A." ? "#1d78aa" : "#fc8403"} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="pie-chart-values">
                                <div className="pie-chart-value">
                                    <span><span></span>Total repayment amount</span>
                                    <span>Rs. {calculateTotalRepayment()}</span>
                                </div>
                                <div className="pie-chart-value">
                                    <span><span></span>Total interest amount</span>
                                    <span>Rs. {calculateTotalInterest()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="emi-value">
                        <span>EMI</span>
                        <span>Rs. {calculateEMI()}</span>
                    </div>
                    <div className="take-loans-options">
                        <button>Take Loan</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Home;