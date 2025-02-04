<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: flex-start;
        background-color: #f9f9f9;
        flex-direction: column; 
    }
    .container {
        padding: 0 10px;
        overflow-y: auto;
        /* max-height: 70vh; */
        /* flex: 1; */
    }
    .section {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        padding: 5px 0;
    }
    h2 {
        position: relative;
        margin: 0;
        background-color: #f0f8ff;
        color: #333;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1em;
        border-radius: 4px;
        display: flex;
        width: 150px
    }
    .section ul {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 0;
        margin: 0;
        list-style-type: none;
        flex: 1;
    }
    .section li {
        background-color: #007BFF;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.85em;
    }
    .section li a:hover {
        text-decoration: underline;
    }
    .active {
        text-decoration: none;
        color: white;
    }
    .inactive {
        text-decoration: none;
        color: black;
        pointer-events: none;
        cursor: not-allowed;
    }
    /* a:visited {
        text-decoration: none;
        color: white;
    } */
</style>
<h1>Inquirita Services in {locality_proper}, {region_proper}</h1>
<div class="container">
    <div class="section">
        <h2>Automotive</h2>
        <ul>
            <li><a class="inactive" id="automotive-body" href="/{country}/{region}/{locality}/automotive-body">Body</a></li>
            <li><a class="inactive" id="automotive-brakes" href="/{country}/{region}/{locality}/automotive-brakes">Brakes</a></li>
            <li><a class="inactive" id="automotive-transmission" href="/{country}/{region}/{locality}/automotive-transmission">Transmission</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Beauty</h2>
        <ul>
            <li><a class="inactive" id="barber" href="/{country}/{region}/{locality}/barber">Barber</a></li>
            <li><a class="inactive" id="nail-care" href="/{country}/{region}/{locality}/nail-care">Nail Care</a></li>
            <li><a class="inactive" id="tattoos" href="/{country}/{region}/{locality}/tattoos">Tattoos</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Children</h2>
        <ul>
            <li><a class="inactive" id="daycare" href="/{country}/{region}/{locality}/daycare">Daycare</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Domestic</h2>
        <ul>
            <li><a class="inactive" id="housekeeping" href="/{country}/{region}/{locality}/housekeeping">Housekeeping</a></li>
            <li><a class="inactive" id="locksmith" href="/{country}/{region}/{locality}/locksmith">Locksmith</a></li>
            <li><a class="inactive" id="mover" href="/{country}/{region}/{locality}/mover">Mover</a></li>
            <li><a class="inactive" id="pest-control" href="/{country}/{region}/{locality}/pest-control">Pest Control</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Events</h2>
        <ul>
            <li><a class="inactive" id="event-planning" href="/{country}/{region}/{locality}/event-planning">Event Planning</a></li>
            <li><a class="inactive" id="funeral" href="/{country}/{region}/{locality}/funeral">Funeral</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Finance</h2>
        <ul>
            <li><a class="inactive" id="cpa" href="/{country}/{region}/{locality}/cpa">CPA</a></li>
            <li><a class="inactive" id="credit-counseling" href="/{country}/{region}/{locality}/credit-counseling">Credit Counseling</a></li>
            <li><a class="inactive" id="estate-liquidation" href="/{country}/{region}/{locality}/estate-liquidation">Estate Liquidation</a></li>
            <li><a class="inactive" id="mortgage" href="/{country}/{region}/{locality}/mortgage">Mortgage</a></li>
            <li><a class="inactive" id="real-estate-agents" href="/{country}/{region}/{locality}/real-estate-agents">Real Estate Agents</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Health</h2>
        <ul>
            <li><a class="inactive" id="chiropractic" href="/{country}/{region}/{locality}/chiropractic">Chiropractic</a></li>
            <li><a class="inactive" id="dentistry" href="/{country}/{region}/{locality}/dentistry">Dentistry</a></li>
            <li><a class="inactive" id="optometry" href="/{country}/{region}/{locality}/optometry">Optometry</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Home</h2>
        <ul>
            <li><a class="inactive" id="air-duct-cleaning" href="/{country}/{region}/{locality}/air-duct-cleaning">Air Duct Cleaning</a></li>
            <li><a class="inactive" id="bathroom-contractor" href="/{country}/{region}/{locality}/bathroom-contractor">Bathroom Contractor</a></li>
            <li><a class="inactive" id="cabinet" href="/{country}/{region}/{locality}/cabinet">Cabinet</a></li>
            <li><a class="inactive" id="concrete" href="/{country}/{region}/{locality}/concrete">Concrete</a></li>
            <li><a class="inactive" id="drywall" href="/{country}/{region}/{locality}/drywall">Drywall</a></li>
            <li><a class="inactive" id="electrician" href="/{country}/{region}/{locality}/electrician">Electrician</a></li>
            <li><a class="inactive" id="garage-door" href="/{country}/{region}/{locality}/garage-door">Garage Door</a></li>
            <li><a class="inactive" id="gutter" href="/{country}/{region}/{locality}/gutter">Gutter</a></li>
            <li><a class="inactive" id="hvac" href="/{country}/{region}/{locality}/hvac">HVAC</a></li>
            <li><a class="inactive" id="kitchen-contractor" href="/{country}/{region}/{locality}/kitchen-contractor">Kitchen Contractor</a></li>
            <li><a class="inactive" id="roofing" href="/{country}/{region}/{locality}/roofing">Roofing</a></li>
            <li><a class="inactive" id="flooring" href="/{country}/{region}/{locality}/flooring">Flooring</a></li>
            <li><a class="inactive" id="masonry" href="/{country}/{region}/{locality}/masonry">Masonry</a></li>
            <li><a class="inactive" id="paint" href="/{country}/{region}/{locality}/paint">Paint</a></li>
            <li><a class="inactive" id="plumbing" href="/{country}/{region}/{locality}/plumbing">Plumbing</a></li>
            <li><a class="inactive" id="siding" href="/{country}/{region}/{locality}/siding">Siding</a></li>
            <li><a class="inactive" id="solar" href="/{country}/{region}/{locality}/solar">Solar</a></li>
            <li><a class="inactive" id="stucco" href="/{country}/{region}/{locality}/stucco">Stucco</a></li>
            <li><a class="inactive" id="window" href="/{country}/{region}/{locality}/window">Window</a></li>
            <li><a class="inactive" id="well" href="/{country}/{region}/{locality}/well">Wells</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Legal</h2>
        <ul>
            <li><a class="inactive" id="attorney-criminal-defense" href="/{country}/{region}/{locality}/attorney-criminal-defense">Criminal Defense Attorney</a></li>
            <li><a class="inactive" id="attorney-divorce" href="/{country}/{region}/{locality}/attorney-divorce">Divorce Attorney</a></li>
            <li><a class="inactive" id="attorney-personal-injury" href="/{country}/{region}/{locality}/attorney-personal-injury">Personal Injury Attorney</a></li>
            <li><a class="inactive" id="bailbond" href="/{country}/{region}/{locality}/bailbond">Bailbonds</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Pets</h2>
        <ul>
            <li><a class="inactive" id="pet-grooming" href="/{country}/{region}/{locality}/pet-grooming">Pet Grooming</a></li>
            <li><a class="inactive" id="veterinary" href="/{country}/{region}/{locality}/veterinary">Veterinary</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Transportation</h2>
        <ul>
            <li><a class="inactive" id="limousine" href="/{country}/{region}/{locality}/limousine">Limousine</a></li>
        </ul>
    </div>
    <div class="section">
        <h2>Yard</h2>
        <ul>
            <li><a class="inactive" id="fencing" href="/{country}/{region}/{locality}/fencing">Fencing</a></li>
            <li><a class="inactive" id="landscaping" href="/{country}/{region}/{locality}/landscaping">Landscaping</a></li>
            <li><a class="inactive" id="lawn" href="/{country}/{region}/{locality}/lawn">Lawn</a></li>
            <li><a class="inactive" id="tree-service" href="/{country}/{region}/{locality}/tree-service">Tree Service</a></li>
        </ul>
    </div>
</div>
