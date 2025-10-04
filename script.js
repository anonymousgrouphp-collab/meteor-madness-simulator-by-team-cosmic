document.addEventListener('DOMContentLoaded', () => {
    const appState = {
        diameter: 140,
        velocity: 20,
        location: { name: 'Pacific Ocean', type: 'oceanic', countryCode: 'OCEAN' },
        mitigation: 'none',
        impactEnergy: 0,
        isAudioEnabled: false,
    };

    const dom = {
        audioModal: document.getElementById('audio-modal'),
        enableAudioBtn: document.getElementById('enable-audio'),
        briefingModal: document.getElementById('briefing-modal'),
        modalContent: document.getElementById('modal-content'),
        closeModalBtn: document.getElementById('close-modal'),
        reportCardModal: document.getElementById('report-card-modal'),
        reportCardContent: document.getElementById('report-card-content'),
        closeReportCardBtn: document.getElementById('close-report-card'),
        copyReportCardBtn: document.getElementById('copy-report-card'),
        clipboardHelper: document.getElementById('clipboard-helper'),
        loadNasaDataBtn: document.getElementById('load-nasa-data'),
        nasaDataContainer: document.getElementById('nasa-data-container'),
        nasaDataList: document.getElementById('nasa-data-list'),
        sizeSlider: document.getElementById('asteroid-size'),
        velocitySlider: document.getElementById('asteroid-velocity'),
        sizeValue: document.getElementById('size-value'),
        velocityValue: document.getElementById('velocity-value'),
        locationName: document.getElementById('location-name'),
        mitigationSelect: document.getElementById('mitigation-strategy'),
        mitigationStatus: document.getElementById('mitigation-status'),
        mitigationBriefingContainer: document.getElementById('mitigation-briefing-container'),
        mitigationTitle: document.getElementById('mitigation-title'),
        mitigationDescription: document.getElementById('mitigation-description'),
        mitigationDetails: document.getElementById('mitigation-details'),
        impactStatus: document.getElementById('impact-status'),
        energyValue: document.getElementById('energy-value'),
        craterValue: document.getElementById('crater-value'),
        seismicValue: document.getElementById('seismic-value'),
        socioImpactValue: document.getElementById('socio-impact-value'),
        generateBriefingBtn: document.getElementById('generate-briefing'),
        shareReportCardBtn: document.getElementById('share-report-card'),
        trajectoryCanvas: document.getElementById('trajectory-canvas'),
        energyChartCanvas: document.getElementById('energy-chart'),
    };
    
    let map, impactMarker, geojsonLayer;
    let energyChart;
    const t_ctx = dom.trajectoryCanvas.getContext('2d');
    const ASTEROID_DENSITY = 3000;
    const NASA_API_KEY = 'DEMO_KEY';

    const countryData = {
        "USA": { popDensity: 2, devIndex: 3, type: 'inland' }, "CAN": { popDensity: 1, devIndex: 3, type: 'inland' },
        "MEX": { popDensity: 2, devIndex: 2, type: 'coastal' }, "BRA": { popDensity: 2, devIndex: 2, type: 'inland' },
        "GBR": { popDensity: 3, devIndex: 3, type: 'coastal' }, "DEU": { popDensity: 3, devIndex: 3, type: 'inland' },
        "FRA": { popDensity: 2, devIndex: 3, type: 'coastal' }, "IND": { popDensity: 3, devIndex: 1, type: 'coastal' },
        "CHN": { popDensity: 3, devIndex: 2, type: 'coastal' }, "JPN": { popDensity: 3, devIndex: 3, type: 'coastal' },
        "AUS": { popDensity: 1, devIndex: 3, type: 'coastal' }, "RUS": { popDensity: 1, devIndex: 2, type: 'inland' },
        "ZAF": { popDensity: 2, devIndex: 2, type: 'coastal' }, "NGA": { popDensity: 3, devIndex: 1, type: 'coastal' },
        "DEFAULT": { popDensity: 1, devIndex: 1, type: 'inland' },
        "OCEAN": { popDensity: 0, devIndex: 0, type: 'oceanic' }
    };

    const soundEngine = {
        uiClick: new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.0, release: 0.1 } }).toDestination(),
        success: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 } }).toDestination(),
        impact: new Tone.NoiseSynth({ noise: { type: 'brown' }, envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.1 } }).toDestination(),
        playClick() { if(appState.isAudioEnabled) this.uiClick.triggerAttackRelease('C5', '8n'); },
        playSuccess() { if(appState.isAudioEnabled) this.success.triggerAttackRelease('G5', '4n'); },
        playImpact() { if(appState.isAudioEnabled) this.impact.triggerAttackRelease('1n'); },
    };
    
    const mitigationBriefings = {
        kinetic_impactor: {
            title: "Kinetic Impactor",
            description: "This strategy involves striking the asteroid with a high-speed projectile to alter its trajectory through momentum transfer. It's like a cosmic game of billiards.",
            details: `<p class="mt-2"><strong>Real-World Example:</strong> NASA's DART (Double Asteroid Redirection Test) mission successfully demonstrated this technology in 2022.</p><ul><li><strong>Pros:</strong> Technology is proven and relatively straightforward.</li><li><strong>Cons:</strong> Requires precise targeting years in advance; effectiveness depends on the asteroid's composition.</li></ul>`
        },
        gravity_tractor: {
            title: "Gravity Tractor",
            description: "A massive spacecraft is positioned near the asteroid. Over a long period (years to decades), its subtle gravitational pull gently tugs the asteroid onto a new, safe course.",
             details: `<p class="mt-2"><strong>Concept Status:</strong> This is a well-studied concept that relies on fundamental physics but has not yet been tested in a dedicated mission.</p><ul><li><strong>Pros:</strong> Highly precise and controllable, making it very safe.</li><li><strong>Cons:</strong> Extremely slow process; only effective on smaller asteroids (under 500m).</li></ul>`
        },
        laser_ablation: {
            title: "Laser Ablation",
            description: "A powerful laser is focused on the asteroid's surface, heating it until the rock vaporizes. This creates a jet of gas, which acts like a small rocket engine, pushing the asteroid.",
             details: `<p class="mt-2"><strong>Concept Status:</strong> A promising future technology currently in the conceptual and laboratory testing phase.</p><ul><li><strong>Pros:</strong> No physical contact required; thrust can be adjusted by varying laser power.</li><li><strong>Cons:</strong> Requires an immense power source; less effective on rapidly rotating asteroids.</li></ul>`
        }
    };
    
    function generateImpactBriefing() {
        const { diameter, velocity, location, impactEnergy } = appState;
        const { crater, seismic } = calculateConsequences();
        let environmentalDetail = '';
        switch(location.type) {
            case 'inland': environmentalDetail = 'The primary environmental concern is a powerful atmospheric shockwave and widespread ejecta, potentially triggering regional wildfires.'; break;
            case 'coastal': environmentalDetail = 'A significant tsunami is the most severe threat, capable of inundating low-lying coastal regions.'; break;
            case 'oceanic': environmentalDetail = 'A deep-ocean impact will generate a mega-tsunami with potential for trans-oceanic devastation.'; break;
        }
        const briefingHTML = `<h3>Threat Summary</h3><p>Analysis of a simulated impact event involving a NEO with a diameter of <strong>${diameter} m</strong> and a velocity of <strong>${velocity} km/s</strong> targeting the <strong>${location.name}</strong> region.</p><h3>Calculated Physical Consequences</h3><ul><li><strong>Impact Energy:</strong> ${Number(impactEnergy).toLocaleString()} Megatons (MT).</li><li><strong>Estimated Crater Diameter:</strong> ${Number(crater).toLocaleString()} km.</li><li><strong>Equivalent Seismic Magnitude:</strong> ${seismic}.</li></ul><h3>Environmental Impact Analysis</h3><p>${environmentalDetail}</p><h3>Scale Comparison</h3><p>The energy released is approximately <strong>${(impactEnergy / 15).toFixed(1)} times</strong> more powerful than the 1908 Tunguska event.</p>`;
        dom.modalContent.innerHTML = briefingHTML;
        dom.briefingModal.classList.remove('hidden');
        soundEngine.playClick();
    }
    
    function updateMitigationBriefing() {
        const selectedStrategy = appState.mitigation;
        const briefingData = mitigationBriefings[selectedStrategy];
        if (briefingData) {
            dom.mitigationTitle.textContent = briefingData.title;
            dom.mitigationDescription.textContent = briefingData.description;
            dom.mitigationDetails.innerHTML = briefingData.details;
            dom.mitigationBriefingContainer.classList.add('visible');
        } else {
            dom.mitigationBriefingContainer.classList.remove('visible');
        }
    }
    
    function drawTrajectory() {
        const w = dom.trajectoryCanvas.width = dom.trajectoryCanvas.clientWidth;
        const h = dom.trajectoryCanvas.height = dom.trajectoryCanvas.clientHeight;
        t_ctx.clearRect(0, 0, w, h);
        const earthRadius = Math.min(w, h) * 0.15;
        const earthX = w * 0.75, earthY = h / 2;
        t_ctx.fillStyle = '#3b82f6';
        t_ctx.beginPath();
        t_ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
        t_ctx.fill();
        const startX = -20, startY = h / 2;
        let controlY, endX, endY;
        const mitigationEffect = { none: 0, kinetic_impactor: 1, gravity_tractor: 0.8, laser_ablation: 1.2 };
        const deflection = mitigationEffect[appState.mitigation];
        if (deflection > 0) {
            controlY = h * (0.1 / deflection);
            endY = earthY - earthRadius * (1.5 + deflection * 0.2);
            endX = earthX;
        } else {
            controlY = h * 0.4;
            endX = earthX - earthRadius * 0.5;
            endY = earthY;
        }
        t_ctx.strokeStyle = '#f97316';
        t_ctx.lineWidth = 2;
        t_ctx.setLineDash([5, 5]);
        t_ctx.beginPath();
        t_ctx.moveTo(startX, startY);
        t_ctx.quadraticCurveTo(w * 0.3, controlY, endX, endY);
        t_ctx.stroke();
        if (deflection === 0) {
             t_ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
             t_ctx.beginPath();
             t_ctx.arc(endX, endY, 15, 0, Math.PI * 2);
             t_ctx.fill();
        }
    }
    
    function createChart() {
        energyChart = new Chart(dom.energyChartCanvas.getContext('2d'), {
            type: 'bar',
            data: { labels: ['Simulation', 'Tunguska (~15 MT)'], datasets: [{ data: [0, 15], backgroundColor: ['#f97316', '#3b82f6'] }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { type: 'logarithmic', title: { display: true, text: 'Energy (Megatons TNT) - Log Scale', color: '#9ca3af' } } }, plugins: { legend: { display: false }, title: { display: true, text: 'Impact Energy Comparison', color: '#e5e7eb' } } }
        });
    }

    function updateChart() {
        if(energyChart) {
            energyChart.data.datasets[0].data[0] = appState.impactEnergy > 0 ? appState.impactEnergy : 0.01;
            energyChart.update();
        }
    }

    async function fetchNasaData() {
        soundEngine.playClick();
        dom.nasaDataList.innerHTML = `<li>Loading...</li>`;
        dom.nasaDataContainer.classList.remove('hidden');
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 7);
        const formatDate = (d) => d.toISOString().split('T')[0];
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(today)}&end_date=${formatDate(endDate)}&api_key=${NASA_API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const asteroids = Object.values(data.near_earth_objects).flat();
            dom.nasaDataList.innerHTML = '';
            if (asteroids.length === 0) {
                dom.nasaDataList.innerHTML = `<li>No asteroids found in the next 7 days.</li>`;
            } else {
                asteroids.slice(0, 10).forEach(ast => {
                    const li = document.createElement('li');
                    li.className = 'p-2 rounded-md cursor-pointer nasa-item';
                    li.textContent = `${ast.name}`;
                    li.dataset.diameter = Math.round((ast.estimated_diameter.meters.estimated_diameter_min + ast.estimated_diameter.meters.estimated_diameter_max) / 2);
                    li.dataset.velocity = Math.round(ast.close_approach_data[0].relative_velocity.kilometers_per_second);
                    li.setAttribute('aria-label', `Load asteroid ${ast.name}`);
                    li.setAttribute('tabindex', '0');
                    dom.nasaDataList.appendChild(li);
                });
            }
        } catch (error) {
            console.error("Failed to fetch NASA data:", error);
            dom.nasaDataList.innerHTML = `<li>Error loading data.</li>`;
        }
    }
    
    function showReportCard() {
        soundEngine.playClick();
        const outcome = appState.mitigation !== 'none' ? 'SUCCESS: THREAT AVERTED' : 'FAILURE: CATASTROPHIC IMPACT';
        const color = outcome.startsWith('SUCCESS') ? 'text-green-400' : 'text-red-400';
        const { energy } = calculateConsequences();
        dom.reportCardContent.innerHTML = `<p class="text-xl font-bold ${color}">${outcome}</p><p><strong>Target Region:</strong> ${appState.location.name}</p><p><strong>Asteroid Size:</strong> ${appState.diameter} m</p><p><strong>Impact Velocity:</strong> ${appState.velocity} km/s</p><p><strong>Mitigation Used:</strong> ${appState.mitigation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p><p><strong>Resulting Energy:</strong> ${Number(energy).toLocaleString()} MT</p>`;
        dom.reportCardModal.classList.remove('hidden');
    }

    async function initMap() {
        map = L.map('map', { zoomControl: false }).setView([20, 0], 2);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 10,
            minZoom: 2
        }).addTo(map);

        try {
            const response = await fetch('/meteor-madness-simulator-by-team-cosmic/data/countries.geojson');
            if (!response.ok) throw new Error(`GeoJSON file not found: ${response.statusText}`);
            const data = await response.json();
            
            // Load the GeoJSON layer, but don't add it to the map. We only need it for the lookup.
            geojsonLayer = L.geoJson(data);
            
            map.on('click', onMapClick);

        } catch (error) {
            console.error("Could not load GeoJSON data. Please check file path.", error);
            // Fallback if the geojson fails to load for any reason
            map.on('click', (e) => {
                if(impactMarker) { map.removeLayer(impactMarker); }
                impactMarker = L.circle(e.latlng, { color: '#f97316', fillColor: '#f97316', fillOpacity: 0.5, radius: 50000 }).addTo(map);
                appState.location = { name: 'Ocean (Fallback)', type: 'oceanic', countryCode: 'OCEAN' };
                soundEngine.playClick();
                updateUI();
            }); 
        }
    }

    function onMapClick(e) {
        if(impactMarker) { map.removeLayer(impactMarker); }
        impactMarker = L.circle(e.latlng, { color: '#f97316', fillColor: '#f97316', fillOpacity: 0.5, radius: 50000 }).addTo(map);

        // Use the leafletPip library to find the country
        const results = leafletPip.pointInLayer(e.latlng, geojsonLayer, true);

        if (results.length > 0) {
            // A country was found
            const feature = results[0].feature;
            const countryName = feature.properties.ADMIN;
            const countryCode = feature.properties.ISO_A3;
            const geoData = countryData[countryCode] || countryData["DEFAULT"];
            appState.location = { name: countryName, type: geoData.type, countryCode: countryCode };
        } else {
            // No country found, must be ocean
            appState.location = { name: 'Ocean', type: 'oceanic', countryCode: 'OCEAN' };
        }
        
        soundEngine.playClick();
        updateUI();
    }

    function calculateConsequences() {
        if (appState.mitigation !== 'none') {
            appState.impactEnergy = 0;
            dom.generateBriefingBtn.disabled = true;
            return { energy: 0, socioImpact: 'NONE', crater: 0, seismic: '0.0' };
        }
        dom.generateBriefingBtn.disabled = false;
        const radius = appState.diameter / 2;
        const volume = (4/3) * Math.PI * Math.pow(radius, 3);
        const mass = volume * ASTEROID_DENSITY;
        const velocityMetersPerSecond = appState.velocity * 1000;
        const kineticEnergyJoules = 0.5 * mass * Math.pow(velocityMetersPerSecond, 2);
        const energyMegatons = kineticEnergyJoules / (4.184 * Math.pow(10, 15));
        appState.impactEnergy = energyMegatons;
        
        const craterDiameterKm = 0.02 * Math.pow(kineticEnergyJoules, 1/3.4) / 1000;
        const seismicMagnitude = 0.67 * (Math.log10(kineticEnergyJoules)) - 5.87;

        const geoData = countryData[appState.location.countryCode] || countryData["DEFAULT"];
        const baseImpact = Math.log10(appState.impactEnergy + 1);
        const socioEconomicScore = baseImpact * geoData.popDensity * geoData.devIndex;
        
        let socioImpactLevel;
        if(socioEconomicScore > 15) socioImpactLevel = 'CATASTROPHIC';
        else if (socioEconomicScore > 10) socioImpactLevel = 'SEVERE';
        else if (socioEconomicScore > 5) socioImpactLevel = 'HIGH';
        else if (socioEconomicScore > 1) socioImpactLevel = 'MODERATE';
        else socioImpactLevel = 'LOW';
        
        if(appState.location.type === 'oceanic') socioImpactLevel = 'LOW';

        return {
            energy: energyMegatons.toFixed(2),
            socioImpact: socioImpactLevel,
            crater: craterDiameterKm.toFixed(2),
            seismic: seismicMagnitude > 0 ? seismicMagnitude.toFixed(1) : "0.0"
        };
    }

    function updateUI() {
        const { energy, socioImpact, crater, seismic } = calculateConsequences();
        
        dom.locationName.textContent = appState.location.name;
        dom.energyValue.textContent = `${Number(energy).toLocaleString()} MT`;
        dom.craterValue.textContent = `${Number(crater).toLocaleString()} km`;
        dom.seismicValue.textContent = seismic;
        dom.socioImpactValue.textContent = socioImpact;
        
        const impactColorClasses = {
            'CATASTROPHIC': 'text-red-500', 'SEVERE': 'text-red-400', 'HIGH': 'text-orange-400',
            'MODERATE': 'text-yellow-400', 'LOW': 'text-green-400', 'NONE': 'text-gray-400'
        };
        dom.socioImpactValue.className = `text-2xl font-bold ${impactColorClasses[socioImpact] || 'text-gray-400'}`;
        
        dom.sizeSlider.value = appState.diameter;
        dom.velocitySlider.value = appState.velocity;
        dom.sizeValue.textContent = `${appState.diameter} m`;
        dom.velocityValue.textContent = `${appState.velocity} km/s`;
        dom.mitigationSelect.value = appState.mitigation;
        
        const mitigationText = {
            none: 'No mitigation strategy selected.',
            kinetic_impactor: 'Kinetic Impactor armed. Awaiting deployment.',
            gravity_tractor: 'Gravity Tractor engaged. Slowly altering trajectory.',
            laser_ablation: 'Laser Ablation system online. Vaporizing surface to create thrust.'
        };
        dom.mitigationStatus.textContent = mitigationText[appState.mitigation];

        if (appState.mitigation !== 'none') {
            dom.mitigationStatus.classList.remove('text-gray-400');
            dom.mitigationStatus.classList.add('text-green-400');
            dom.impactStatus.textContent = 'ASTEROID DEFLECTED';
            dom.impactStatus.classList.remove('text-red-400');
            dom.impactStatus.classList.add('text-green-400');
        } else {
            dom.mitigationStatus.classList.add('text-gray-400');
            dom.mitigationStatus.classList.remove('text-green-400');
            dom.impactStatus.textContent = 'IMPACT IMMINENT';
            dom.impactStatus.classList.add('text-red-400');
            dom.impactStatus.classList.remove('text-green-400');
        }
        
        drawTrajectory();
        updateChart();
    }
    
    // Main application entry point
    async function main() {
        dom.enableAudioBtn.addEventListener('click', () => {
            Tone.start();
            appState.isAudioEnabled = true;
            dom.audioModal.style.display = 'none';
            soundEngine.playSuccess();
        });
        dom.sizeSlider.addEventListener('input', (e) => { appState.diameter = parseInt(e.target.value); updateUI(); });
        dom.velocitySlider.addEventListener('input', (e) => { appState.velocity = parseInt(e.target.value); updateUI(); });
        dom.mitigationSelect.addEventListener('change', (e) => {
            appState.mitigation = e.target.value;
            soundEngine.playClick();
            if (appState.mitigation !== 'none') { soundEngine.playSuccess(); }
            updateUI();
            updateMitigationBriefing();
        });
        dom.loadNasaDataBtn.addEventListener('click', fetchNasaData);
        dom.nasaDataList.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI' && e.target.dataset.diameter) {
                appState.diameter = parseInt(e.target.dataset.diameter);
                appState.velocity = parseInt(e.target.dataset.velocity);
                soundEngine.playClick();
                dom.nasaDataContainer.classList.add('hidden');
                updateUI();
            }
        });
        dom.generateBriefingBtn.addEventListener('click', generateImpactBriefing);
        dom.closeModalBtn.addEventListener('click', () => dom.briefingModal.classList.add('hidden'));
        dom.shareReportCardBtn.addEventListener('click', showReportCard);
        dom.closeReportCardBtn.addEventListener('click', () => dom.reportCardModal.classList.add('hidden'));
        dom.copyReportCardBtn.addEventListener('click', () => {
            const text = dom.reportCardContent.innerText;
            dom.clipboardHelper.value = `☄️ Meteor Madness Simulation Report ☄️\n\n${text}`;
            dom.clipboardHelper.select();
            document.execCommand('copy');
            soundEngine.playSuccess();
        });
        window.addEventListener('resize', () => {
            drawTrajectory();
        });
        
        await initMap();
        createChart();
        updateUI();
    }

    main();
});

