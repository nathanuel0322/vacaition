import React, { useState, useEffect, useRef, useContext } from 'react';
import '../assets/css/people.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';

export default function People(){
    const location = useLocation();
    let buddies = {}
    if (location.state){
        buddies = location.state.buddies;
    }
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    // Assuming you have the user's UID available
    const userUid = user.uid;

    const dataCollectionRef = collection(db, 'data');

    // Fetch all documents in the 'quest' subcollection
    // const getQuestDocuments = async () => {
    // try {
    //     const querySnapshot = await getDocs(dataCollectionRef);
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // } catch (error) {
    //     console.log('Error fetching quest documents:', error);
    // }
    // };
    useEffect(() => {
        getQuestDocuments(buddies)
        .then((data) => {
            setPeople(data);
        })
    }, []);

    const getQuestDocuments = async (userIds) => {
        try {
            const promises = userIds.map(async (userId) => {
                // const userDocRef = doc(db, 'data', userId);
                // const userDocSnapshot = await getDoc(userDocRef);
                

            
            // Assuming you have the user's UID available
                const userUid = user.uid;

                // Create a reference to the parent document 'data/user/id'
                const parentDocRef = collection(db, `data/${userUid}/info`);
                const ourdoc = await getDocs(parentDocRef);
                const finalobj = ourdoc.docs.map(doc => doc.data());
                console.log(finalobj);
                // print data from the document

                // Create a reference to the 'quest' subcollection within the parent document
                // const questCollectionRef = collection(parentDocRef, 'quest');

                // await addDoc(questCollectionRef, finalobj);

                // if (userDocSnapshot.exists()) {
                //     const infoDocRef = doc(userDocRef, 'info');
                //     const infoDocSnapshot = await getDoc(infoDocRef);
            
                //     if (infoDocSnapshot.exists()) {
                //     return infoDocSnapshot.data();
                //     } else {
                //     return null;
                //     }
                // }
                // else {
                //     return null;
                // }
            });

            const results = await Promise.all(promises);
            return results.filter((data) => data !== null);
        } catch (error) {
            console.log('Error fetching quest documents:', error);
            return [];
        }
};

// Usage:
// const userIds = ['gjvj8KLRU4SWckjOtCU3FgFxxcQ2', 'anotherUserId']; // Replace with actual user IDs
// const questDocuments = await getQuestDocuments(userIds);
// console.log('Quest documents:', questDocuments);



    // const getQuestDocuments = async (passedarr) => {
    //     return passedarr.map((item) => {
    //         const infoDocRef = doc(db, 'data', item, 'info');
    //         const docSnapshot = getDoc(infoDocRef);
    //         return docSnapshot.data();
    //     });
        // const infoDocRef = doc(db, 'data', userUid, 'info');
        // const docSnapshot = await getDoc(infoDocRef);
        // return docSnapshot.data();
    // };

    // fetch(`https://localhost:8000/buddies/${user.uid}`)
    //     .then(response => response.json())
    //     .then(data => setPeople(data));
    // 
    return(
        // <div className='pcontainer'>
        //     <button id="backtohome" onClick={() => navigate('/')}>Back to Home</button>
        //     <div className='presults-page-title'>Here are the three potential travel buddies!</div>
        //     <div className='pcomments-container'>
        //         {/* {people.length > 0 && buddies.map((buddy, index) => ( */}
        //         {people.length > 0 && buddies.map((buddy, index) => (
        //             <div className='precommendation-border' key={index}>
        //                 <div className='precommendation-body'>
        //                     <div className='precommendation-name'>
        //                         {"User " + buddy}
        //                     </div>
        //                     <div className='precommendation-text'>
        //                         {people[index].age}
        //                         <br/>
        //                         <br/>
        //                         {people[index].description}
        //                         <br/>
        //                         <br/>
        //                         {people[index].hobbies}
        //                         <br/>
        //                         <br/>
        //                         {people[index].personType}
        //                         <br/>
        //                         <br/>
        //                         {people[index].vacationType}
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className='pcontainer'>
            <button id='signoutbutton' onClick={() => navigate('/home')}>Back to Home</button>
            <div className='presults-page-title'>Here are the three potential travel buddies!</div>
            <div className='pcomments-container'>
                <div className='precommendation-border'>
                    <div className='precommendation-body'>
                        <div className='precommendation-name'>
                            User ID 1
                        </div>
                        <div className='precommendation-text'>
                            I'm a 27-year old actor. I'm passionate, creative and love portraying different characters and stories. When I'm not on set filming, I enjoy escaping to the mountains to hike, ski and be in nature. The mountains are a peaceful contrast to my otherwise fast-paced lifestyle. Some of my biggest hobbies are hiking, skiing, and yoga. I aim to spend as much free time as possible in the mountains being active and enjoying the outdoors. I also have a love of cooking and trying out new restaurants in between work projects. My ideal vacations usually involve visiting mountain towns where I can spend days hiking or skiing. I've taken trips to Lake Tahoe, Park City, Aspen and Whistler where the access to nature is unparalleled. I like to balance out adventure in the mountains with relaxation, spas and vibrant food scenes. A combination of activity and nightlife is perfect. I am quite outgoing and extroverted, which serves me well in my line of work as an actor. I enjoy meeting new people, engaging in lively discussions, and going out most nights of the week whether for work events or socially. While I need some downtime to recharge in nature, I overwhelmingly prefer social interaction and being surrounded by others. My work also requires it. 
                        </div>
                        <button id='chat-button' onClick={() => navigate('/chat/8gHjSjzaEgbQ3w8rKZDWZuU8qRA2')}>
                            Chat!
                        </button>
                    </div>
                </div>
                <div className='precommendation-border'>
                    <div className='precommendation-body'>
                        <div className='precommendation-name'>
                            User ID 2
                        </div>
                        <div className='precommendation-text'>
                            I'm a 22-year old freelance photographer. I'm creative, patient and love capturing the beauty in the world around me. When I'm not working on a photoshoot, I spend as much time as possible outdoors immersing myself in nature. Natural light is my inspiration. My biggest hobbies are landscape and wildlife photography, hiking, camping and kayaking. I aim to spend all of my free time outside engaging in photography or adventure. I love the solitude and natural surroundings. Photography is my passion. I enjoy vacations where I can immerse myself in scenic natural surroundings. Some of my favorite trips have been camping in national parks like Yosemite and Banff, backpacking through the wilderness, and road tripping up the California coast. I like to go at my own pace and stop whenever there's a perfect shot. Low key and scenic is ideal. I am more of an introvert. I recharge by spending time alone in natural settings. While I enjoy meeting with other photographers or going out for dinner with close friends once in a while, I tend to socialize mostly while engaging in my hobbies. Otherwise I keep to myself and value my independence and solitude. My camera is my companion.
                        </div>
                        <button id='chat-button' onClick={() => navigate('/chat/8gHjSjzaEgbQ3w8rKZDWZuU8qRA2')}>
                            Chat!
                        </button>
                    </div>
                </div>
                <div className='precommendation-border'>
                    <div className='precommendation-body'>
                        <div className='precommendation-name'>
                            User ID 3
                        </div>
                        <div className='precommendation-text'>
                            I'm a 40-year old freelance writer and mixed media artist. I'm imaginative, spiritual and full of wanderlust. I thrive on creativity, adventure and serendipitous encounters with interesting people. After years living in the bustle of the city, I recently moved to a secluded cabin in the mountains where I can be immersed in nature and tap into my artistic flow. Some of my biggest hobbies are writing poetry and short stories, creating collages and mixed media art, hiking, and climbing. I'm an outdoor enthusiast and free spirit. I also love connecting with other artists and creatives, whether at a local gallery opening or while randomly exploring a new town. Meeting kindred spirits feeds my soul. I lead an eclectic bohemian lifestyle where each day is different. I start most mornings journaling or practicing yoga on my deck overlooking the mountains. Then I usually work on my writing or art for a few hours before heading out for an adventure, whether it's a mountain bike ride, checking out a new hiking trail, or spontaneously road tripping to another state on a whim. At night I often have bonfires and invite other artists from the area to connect over music, conversation and wine. I value independence, experience and living life on my own terms. I am a social extravert and free spirit through and through. While I enjoy and need time alone in nature, I get my energy from exploring with others and engaging in deep conversations about life, spirituality and creativity. I probably go to at least 3-4 social gatherings a week, and have made many connections in my local community of artists, healers and outdoor enthusiasts. Making new discoveries and friends is what life's about for me.
                        </div>
                    </div>
                    <button id='chat-button' onClick={() => navigate('/chat/8gHjSjzaEgbQ3w8rKZDWZuU8qRA2')}>
                        Chat!
                    </button>
                </div>
            </div>
        </div>
    )
}

{/* <div id="people">
                {buddies.map((person) => (
                    <div class="person">
                        <h2>{person.name}</h2>
                        <button onClick={() => navigate(`/contact/${person.uid}`)}>Contact</button>
                    </div>
                ))}
            </div> */}