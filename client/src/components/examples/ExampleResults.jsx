

export default function ExampleResults() {
    return (
        <div id="resultscontainer" class="container my-0 mx-auto flex flex-col items-center justify-center">
            <div class="results-page-title my-8 text-2xl font-medium text-black">Here are the three destinations you might like!</div>
            <div class="comments-container flex flex-row justify-center gap-8 text-black">
                <div class="recommendation-border border"><div class="recommendation-body p-5"><div class="recommendation-name text-[1.25rem] font-bold">Destination 1: Montreal, Canada</div><div class="recommendation-text text-left text-[1rem]"><ul><li>Transportation from NYC: $150 roundtrip by bus 
                    Hotel: $800 for 5 nights
                    Other expenses: $500  
                    Total cost: $1450
                    Activities:  
                    1. Explore Old Montreal and see Notre-Dame Basilica ($0) 
                    2. Visit Montreal Museum of Archeology and History ($15)  
                    3. Check out Montreal Botanical Garden ( $18.75)   
                    4. Walk around Mount Royal Park (free) 
                    5. Experience Montreal's underground city (free)</li></ul></div></div></div><div class="recommendation-border border"><div class="recommendation-body p-5"><div class="recommendation-name text-[1.25rem] font-bold">Destination 2: Boston, USA</div><div class="recommendation-text text-left text-[1rem]"><ul><li>Transportation from NYC: $100 roundtrip by bus  
                    Hotel: $700 for 5 nights   
                    Other expenses: $500     
                    Total cost: $1300
                    Activities:   
                    1. Follow the Freedom Trail to explore American Revolution history ($0)  
                    2. Visit Museum of Fine Arts (admission by donation) 
                    3. Check out the old Faneuil Hall Marketplace (free)
                    4. Tour Harvard University campus (free)
                    5. Catch a sports game at Fenway Park (around $30-$50)  </li></ul></div></div></div><div class="recommendation-border border"><div class="recommendation-body p-5"><div class="recommendation-name text-[1.25rem] font-bold">Destination 3: Quebec City, Canada</div><div class="recommendation-text text-left text-[1rem]"><ul><li>Transportation from NYC:  $300 roundtrip by bus  
                    Hotel: $600 for 5 nights 
                    Other expenses: $400 
                    Total cost: $1300     
                    Activities:
                    1. Explore Old Quebec, a UNESCO World Heritage Site ($0)
                    2. Visit Quebec National Museum of Fine Arts ($18)  
                    3. Check out the Quebec Citadel ($12.30)
                    4. Experience Quebec Winter Carnival (around $20 per activity)
                    5. Take in the view from Dufferin Terrace (free)</li></ul></div></div></div>
            </div>
            <button class="my-8 text-[1.25rem] px-8 text-black" id="find-people">Want a custom itinerary? Join us!</button>
        </div>
    )
}