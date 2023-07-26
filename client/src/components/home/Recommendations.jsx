

export default function Recommendations({ resultsdata, showbuttons=false, buttonfunc }) {
    console.log("resultsdata passed to Recommendations:", resultsdata);
    return (
        <div id="recdiv" className="comments-container flex flex-row justify-center gap-8 text-black">
            {resultsdata &&
                Object.keys(resultsdata).map((singleRecommendation, index) => {
                    console.log("singleRecommendation:", singleRecommendation);
                    return (
                        <div className="recommendation-border border" key={index}>
                            <div className="recommendation-body p-5">
                                <div className="recommendation-name text-[1.25rem] font-bold underline">{singleRecommendation}</div>
                                <div className="recommendation-text text-left text-[1rem]">
                                    <ul>
                                        {resultsdata[singleRecommendation].split("\n").map((singleRecommendationText, index) => {
                                            console.log("singleRecommendationText:", singleRecommendationText);
                                            return (
                                                <li key={index} style={{marginTop: index === 4 && '2vh'}}>
                                                    {/* {index === resultsdata[singleRecommendation].split("- ").length - 1 ? */}
                                                    {/* singleRecommendationText */}
                                                    {index < 4 ?
                                                            // find '$' then capture it and the number after it, ex: $1000, then replace it with the same thing but with a <span> around it
                                                            <div dangerouslySetInnerHTML={{ __html: singleRecommendationText.replace(/\$\d+/g, (match) => {
                                                                return `<span class="underline text-green-700">${match}</span>`;
                                                            })}}></div>
                                                        :
                                                            singleRecommendationText
                                                    }
                                                    {/* : 
                                                    <>
                                                        <div style={{ textDecoration: 'underline' }}>Activities:</div>
                                                        {singleRecommendationText.replace("Activities: ", "").match(/\d+\)\s*[^0-9]+/g) && 
                                                        singleRecommendationText.replace("Activities: ", "").match(/\d+\)\s*[^0-9]+/g).map((activity, index) => {
                                                            return (
                                                                <div key={index}>{activity}</div>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                    } */}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            {/* if showbuttons is true, show "Generate Itinerary" button,
                                and when pressed, call buttonfunc with the recommendation object */}
                            {showbuttons && (
                                <button className="recommendation-button" onClick={() => buttonfunc(resultsdata[singleRecommendation])}>
                                    Generate Itinerary
                                </button>
                            )}
                        </div>
                    );
                })
            }
        </div>
    )
}