
GeoThreat Simulator ☄️
Live Demo: https://geothreatsimulator.us/

GeoThreat Simulator is an interactive web application that allows users to model the potential consequences of a near-Earth object (NEO) impact. Users can adjust parameters such as asteroid size and velocity, select an impact location on an interactive world map, and explore various mitigation strategies. The simulator provides a detailed analysis of the physical, environmental, and socio-economic effects of the selected scenario.

This project was inspired by the NASA Space Apps Challenge and utilizes real-world data to create an educational and engaging experience in planetary defense.

Features
Interactive World Map: Select a precise impact location anywhere on the globe using Leaflet.js.
Dynamic Impact Parameters: Use sliders to adjust the asteroid's diameter (10m - 1000m) and impact velocity (10 km/s - 70 km/s).
Real-World Data: Load close-approach data for the next 7 days directly from the NASA Near-Earth Object API.
Consequence Analysis: Instantly view calculated outcomes, including:
   -   Impact Energy (Megatons of TNT)
   -   Crater Diameter (km)
   -   Seismic Magnitude (Richter Scale)

Socio-Economic Modeling: See a simplified geopolitical impact rating (Low to Catastrophic) based on population density and development index of the target region.
Mitigation Scenarios: Explore three different planetary defense strategies (Kinetic Impactor, Gravity Tractor, Laser Ablation) and see how they avert the threat.
Data Visualization: Compare the simulated impact energy to historical events like the Tunguska event using a Chart.js logarithmic scale bar chart.
Shareable Reports: Generate and copy a concise "Impact Report Card" to your clipboard to share the results of your simulation.

Tech Stack
This project is built with modern web technologies and leverages several powerful APIs and libraries:
- Frontend: HTML5, CSS3, JavaScript (ES6)
- Styling: Tailwind CSS(https://tailwindcss.com/)
- Mapping: Leaflet.js(https://leafletjs.com/)
- Charting: Chart.js(https://www.chartjs.org/)
- Web Audio: Tone.js(https://tonejs.github.io/)
- Data Source: NASA NEO Feed API(https://api.nasa.gov/)

Project Structure
The codebase is organized into a clean three-file structure for better maintainability and scalability:
index.html: Contains the core HTML structure and layout of the application.
style.css: Includes all custom styling, animations, and theme enhancements.
script.js: Houses all the application logic, including calculations, API calls, and DOM manipulation.

Deployment
The live version of this project is hosted on Netlify and is configured for Continuous Deployment. Any push to the main branch of the GitHub repository will automatically trigger a new build and deploy the latest version of the site.

Team
This project was proudly created by members of Team Cosmic:
- Harsh Patel
- Anirudh Sharma
- Arfa Shurur
- Komal Choubey 

Acknowledgements
NASA for providing the invaluable Near-Earth Object web service.
OpenStreetMap & CARTO for the map tiles.
Team Cosmic for the project concept and development.
