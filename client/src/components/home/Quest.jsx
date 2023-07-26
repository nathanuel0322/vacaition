import React, {useContext, useState, useEffect, useRef} from 'react';
import Select from 'react-select'
import '../../assets/css/quest.css'
import { useTransition, animated } from 'react-spring';

export default function Quest({ questfunc }) {
    const [time, setTime] = useState('');
    const [budget, setBudget] = useState(2500);
    const [durationTime, setDurationTime] = useState(0);
    const [duration, setDuration] = useState('days'); 
    const [weather, setWeather] = useState('cold');
    const [departFrom, setDepartFrom] = useState('');
    const [avoid, setAvoid] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [countries, setCountries] = useState([]);
    const [finalobj, setfinalobj] = useState({
        time: [],
        budget: 2500,
        durationTime: 0,
        duration: '0 days',
        weather: 'cold',
        departFrom: '',
        avoid: [],
        additionalInfo: '',
        countries: []
    });
    const [transitionDirection, setTransitionDirection] = useState('next');
    const questions = [
        { question: '1. How do you want to spend your time?', qterm: 'time' },
        { question: '2. What is your desired budget?', qterm: 'budget' },
        { question: '3. For how long do you want to travel?', qterm: 'durationTime' },
        { question: '4. What is your preferred weather?', qterm: 'weather' },
        { question: '5. Where do you want to depart from?', qterm: 'departFrom' },
        { question: '6. What places do you want to avoid?', qterm: 'avoid' },
        { question: '7. What countries do you want to visit?', qterm: 'countries' },
        { question: '8. Any additional information?', qterm: 'additionalInfo' }
    ]
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // Initialize a flag variable to track Enter key presses
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [containerHeight, setContainerHeight] = useState('auto');


    const transitions = useTransition(currentQuestion, {
        from: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(200%,0,0)' : 'translate3d(-200%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: transitionDirection === 'next' ? 'translate3d(-200%,0,0)' : 'translate3d(200%,0,0)' },
        // config: { duration: 5000 },
    })

    const options = [
        { value: 'Explore historical sites', label: 'Explore historical sites' }, { value: 'Get adrenaline rush', label: 'Get adrenaline rush' }, { value: 'Connect with nature', label: 'Connect with nature' }, { value: 'Meditate', label: 'Meditate' }, { value: 'Skiing', label: 'Skiing' }, { value: 'Surfing', label: 'Surfing' }, { value: 'Being near the beach and ocean', label: 'Being near the beach and ocean' }, { value: 'Being near the beach and sea', label: 'Being near the beach and sea' }, { value: 'Being near the lake', label: 'Being near the lake' }, { value: 'Being in the mountains', label: 'Being in the mountains' }, { value: 'Spending time in the city', label: 'Spending time in the city' }, { value: 'Immerse into new culture', label: 'Immerse into new culture' }, { value: 'Active nightlife', label: 'Active nightlife' }, { value: 'Other', label: 'Other' }
    ]

    // if enter is pressed, go to next question
    useEffect(() => {
        const nexttextarea = document.getElementsByTagName('textarea')[document.getElementsByTagName('textarea').length - 1];
        const timeoutId = setTimeout(() => {
            if (currentQuestion >= 5) {
                nexttextarea.focus();
            }
        }, 300);

        const handleEnter = (e) => {
            setIsEnterPressed(true);
            // if the current tag is not a textarea and enter is pressed... 
            if (currentQuestion < 5) {
                if (e.key === 'Enter') {
                    if (currentQuestion === questions.length - 1) {
                        questfunc({...finalobj, time: finalobj.time.map(val => val.value)});
                    } else {
                        setTransitionDirection('next');
                        setCurrentQuestion(currentQuestion + 1);
                    }
                }
            }
        }

        if (currentQuestion < 5) {
            window.addEventListener('keydown', handleEnter);
        }
        
        return () => {
            if (currentQuestion < 5) {
                window.removeEventListener('keydown', handleEnter);
            }
            clearTimeout(timeoutId);
        };
    }, [currentQuestion])

    return (
        <div id='questform' className='flex flex-row items-center justify-center text-black absolute top-1/2 left-1/2 w-screen'>
            {transitions((style, item) => {
                return (
                    <animated.div style={style} className='absolute'>
                        <p>{questions[item].question}</p>
                        {questions[item].qterm === 'time' && (
                            <Select
                                isMulti
                                name="howToSpendTime"
                                options={options}
                                value={time}
                                onChange={(val) => {
                                    setTime(val);
                                    setfinalobj({...finalobj, time: val});
                                }}
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        width: '50%',
                                        margin: 'auto',
                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'black',
                                        fontSize: '1rem',
                                    }),
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (currentQuestion === questions.length - 1) {
                                            questfunc({...finalobj, time: finalobj.time.map(val => val.value)});
                                        } else {
                                            setTransitionDirection('next');
                                            setCurrentQuestion(currentQuestion + 1);
                                        }
                                    }
                                }}
                            />
                        )}
                        {questions[item].qterm === 'budget' && (
                            <div className='flex flex-col items-center justify-center'>
                                <input
                                    className='!w-full !my-4'
                                    type="range" min="200" max="5000" step="50"
                                    value={budget} onChange={(e) => {
                                        setBudget(e.target.value);
                                        setfinalobj({...finalobj, budget: e.target.value});
                                    }}
                                />
                                <input className='shadows !w-full' value={budget} onChange={(e) => setBudget(e.target.value)} />
                            </div>
                        )}
                        {questions[item].qterm === 'durationTime' && (
                            <div id='formlength' className='flex items-center justify-center my-4'>
                                <input className='shadows !w-1/5 !mr-4 !mb-0' value={durationTime} onChange={(e) => {
                                    setDurationTime(e.target.value);
                                    setfinalobj({...finalobj, duration: e.target.value + ' ' + duration});
                                }} />  
                                <select className='ingroupselect mb-0' value={duration} onChange={(e) => {
                                    console.log("duration is: ", e.target.value)
                                    setDuration(e.target.value);
                                }}>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                </select>  
                            </div>
                        )} 
                        {questions[item].qterm === 'weather' && (
                            <select
                                value={weather}
                                onChange={(e) => {
                                    setWeather(e.target.value);
                                    setfinalobj({...finalobj, weather: e.target.value});
                                }}
                            >
                                <option value="cold">Cold (less than 45 degrees Fahrenheit)</option>
                                <option value="warm">
                                    Warm (45 degrees Fahrenheit to 65 degrees Fahrenheit)
                                </option>
                                <option value="hot">Hot (more than 65 degrees Fahrenheit)</option>
                            </select>
                        )}
                        {/* Where do you want to depart from? */}
                        {questions[item].qterm === 'departFrom' && (
                            <input
                                className='shadows !mt-4 min-w-fit !w-auto'
                                type="text"
                                value={departFrom}
                                onChange={(e) => {
                                    setDepartFrom(e.target.value);
                                    setfinalobj({...finalobj, departFrom: e.target.value});
                                }}
                            />
                        )}
                        {questions[item].qterm === 'avoid' && (
                            <textarea
                                id='avoid'
                                className='shadows'
                                value={avoid.join('\n')}
                                onChange={(e) => {
                                    // Skip onChange if Enter key was pressed
                                    if (isEnterPressed) {
                                        setIsEnterPressed(false);
                                        return;
                                    }
                                    const placesToAvoid = e.target.value.split('\n').filter(place => place.trim() !== '');
                                    console.log("avoid in onChange: ", placesToAvoid)
                                    setAvoid(placesToAvoid);
                                    setfinalobj({...finalobj, avoid: placesToAvoid});
                                }}
                                // if enter is pressed, add a new line
                                onKeyDown={(e) => {
                                    console.log("key down in avoid")
                                    console.log("key pressed: ", e.key)
                                    const placesToAvoid = [...avoid]; // Create a new array
                                    if (e.key === 'Enter') {
                                        console.log("avoid in onkeydown:", placesToAvoid)
                                        placesToAvoid.push(''); // Add a new line as an empty element
                                        setAvoid(placesToAvoid);
                                        setfinalobj({ ...finalobj, avoid: placesToAvoid });
                                        setIsEnterPressed(true); // Set the flag to true
                                    }
                                    const curta = document.getElementById('avoid');
                                    console.log("scroll height:", curta.scrollHeight + 'px')
                                    console.log("client height:", curta.clientHeight + 'px')
                                    if (curta.scrollHeight > curta.clientHeight) {
                                        console.log("new container height:", curta.scrollHeight + 'px')
                                        setContainerHeight(curta.scrollHeight + 'px');
                                    }
                                }}
                                style={{ height: containerHeight}}
                            />
                        )}
                        {questions[item].qterm === 'countries' && (
                            <textarea
                                id='countries'
                                className='shadows'
                                value={countries.join('\n')}
                                onChange={(e) => {
                                    const countriesToVisit = e.target.value.split('\n').filter(country => country.trim() !== '');
                                    setCountries(countriesToVisit);
                                    setfinalobj({...finalobj, countries: countriesToVisit});
                                }}
                                // if enter is pressed, add a new line
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const countriesToVisit = [...countries]; // Create a new array
                                        countriesToVisit.push(''); // Add a new line as an empty element
                                        setCountries(countriesToVisit);
                                        setfinalobj({...finalobj, countries: countriesToVisit});
                                        setIsEnterPressed(true); // Set the flag to true
                                    }
                                    const curta = document.getElementById('countries');
                                    if (curta.scrollHeight > curta.clientHeight) {
                                        setContainerHeight(curta.scrollHeight + 'px');
                                    }
                                }}
                                style={{ height: containerHeight}}
                            />
                        )}
                        {questions[item].qterm === 'additionalInfo' && (
                            <div className='flex flex-col items-center justify-center'>
                                <textarea
                                    id='additionalInfo'
                                    className='shadows'
                                    value={additionalInfo}
                                    onChange={(e) => {
                                        setAdditionalInfo(e.target.value);
                                        setfinalobj({...finalobj, additionalInfo: e.target.value});
                                    }}
                                    // if enter is pressed, add a new line
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const additionalI = [...additionalInfo]; // Create a new array
                                            additionalI.push(''); // Add a new line as an empty element
                                            setAdditionalInfo(additionalI);
                                            setfinalobj({...finalobj, additionalInfo: additionalI});
                                            setIsEnterPressed(true); // Set the flag to true
                                        }
                                        const curta = document.getElementById('additionalInfo');
                                        if (curta.scrollHeight > curta.clientHeight) {
                                            setContainerHeight(curta.scrollHeight + 'px');
                                        }
                                    }}
                                    style={{ height: containerHeight}}
                                />
                            </div>
                        )}
                        {questions[item].qterm === 'additionalInfo' ? (
                                <div className='flex flex-col items-center justify-center'>
                                <button id='prevq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTransitionDirection('prev');
                                        setCurrentQuestion(currentQuestion - 1);
                                    }}
                                >
                                    Last Question
                                </button>
                                <button id='questsubmit' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        questfunc({...finalobj, time: finalobj.time.map(val => val.value)})
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        ) : questions[item].qterm === 'time' ? (
                            <button id='nextq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white' onClick={(e) => {
                                e.preventDefault();
                                setTransitionDirection('next');
                                setCurrentQuestion(currentQuestion + 1);
                            }}>
                                Next Question
                            </button>
                        ) : (
                            <div className='flex flex-col items-center justify-center'>
                                <button id='prevq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTransitionDirection('prev');
                                    setCurrentQuestion(currentQuestion - 1);
                                }}>
                                    Last Question
                                </button>
                                <button id='nextq' className='mb-4 mt-8 text-[1.25rem] shadow-2xl shadow-cyan-500/50 px-4 py-1 text-white' onClick={(e) => {
                                    e.preventDefault();
                                    setTransitionDirection('next');
                                    setCurrentQuestion(currentQuestion + 1);
                                }}>
                                    Next Question
                                </button>
                            </div>
                        )}
                    </animated.div>
                )
            })}
        </div>
    );
};