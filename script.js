document.addEventListener('DOMContentLoaded', () => {
    const appState = {
        diameter: 140,
        velocity: 20,
        location: { name: 'Ocean', type: 'oceanic', regionCode: 'OCEAN' },
        mitigation: 'none',
        impactEnergy: 0,
        isAudioEnabled: true,
    };

    const dom = {
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
    
    let map, impactMarker;
    let energyChart;
    const ASTEROID_DENSITY = 3000;
    const NASA_API_KEY = 'aORJuyPR46Rb3kIpjSZJPDtZEZtos9OTBPTAqt5i';

    // --- 3D Scene State ---
    let scene, camera, renderer, earth, meteor, stars, trajectoryCurve, meteorTime = 0;
    const clock = new THREE.Clock(); // For frame-rate independent animation

    const GRID_COLS = 12;
    const GRID_ROWS = 6;
    const regionLookup = [
        ['OCEAN', 'NA', 'NA', 'NA', 'OCEAN', 'EU', 'EU', 'RU', 'RU', 'RU', 'OCEAN', 'OCEAN'],
        ['OCEAN', 'NA', 'NA', 'NA', 'OCEAN', 'EU', 'AF', 'SAS', 'EAS', 'EAS', 'OCEAN', 'OCEAN'],
        ['OCEAN', 'OCEAN', 'NA', 'SA', 'SA', 'AF', 'AF', 'AF', 'SAS', 'OCEAN', 'OC', 'OCEAN'],
        ['OCEAN', 'OCEAN', 'SA', 'SA', 'SA', 'OCEAN', 'AF', 'AF', 'OCEAN', 'OC', 'OC', 'OCEAN'],
        ['OCEAN', 'OCEAN', 'OCEAN', 'SA', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OC', 'OCEAN', 'OCEAN'],
        ['OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN', 'OCEAN']
    ];
    const regionData = {
        "NA": { name: "North America", popDensity: 2, devIndex: 3, type: 'inland' },
        "EU": { name: "Western Europe", popDensity: 3, devIndex: 3, type: 'coastal' },
        "RU": { name: "Northern Eurasia", popDensity: 1, devIndex: 2, type: 'inland' },
        "EAS": { name: "East Asia", popDensity: 3, devIndex: 2, type: 'coastal' },
        "SAS": { name: "South Asia", popDensity: 3, devIndex: 1, type: 'coastal' },
        "AF": { name: "Africa", popDensity: 2, devIndex: 1, type: 'inland' },
        "SA": { name: "South America", popDensity: 1, devIndex: 2, type: 'inland' },
        "OC": { name: "Oceania", popDensity: 1, devIndex: 3, type: 'coastal' },
        "OCEAN": { name: "Ocean", popDensity: 0, devIndex: 0, type: 'oceanic' },
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
            description: "A high-speed projectile strikes the asteroid to alter its trajectory through momentum transfer.",
            details: `<p class="mt-2"><strong>Real-World Example:</strong> NASA's DART mission (2022).</p><ul><li><strong>Pros:</strong> Technology is proven.</li><li><strong>Cons:</strong> Requires precise targeting years in advance.</li></ul>`
        },
        gravity_tractor: {
            title: "Gravity Tractor",
            description: "A massive spacecraft's subtle gravitational pull gently tugs the asteroid onto a new course over a long period.",
            details: `<p class="mt-2"><strong>Concept Status:</strong> Well-studied but not yet tested.</p><ul><li><strong>Pros:</strong> Highly precise and controllable.</li><li><strong>Cons:</strong> Extremely slow; only effective on smaller asteroids.</li></ul>`
        },
        laser_ablation: {
            title: "Laser Ablation",
            description: "A powerful laser vaporizes the asteroid's surface, creating a jet of gas that acts like a small rocket engine.",
            details: `<p class="mt-2"><strong>Concept Status:</strong> A promising future technology.</p><ul><li><strong>Pros:</strong> No physical contact required.</li><li><strong>Cons:</strong> Requires an immense power source.</li></ul>`
        }
    };
    
    function generateImpactBriefing() {
        soundEngine.playClick();
        const { location, mitigation } = appState;
        
        let briefingHTML;
        if (mitigation !== 'none') {
            const mitigationData = mitigationBriefings[mitigation];
            briefingHTML = `
                <h3>Threat Averted</h3>
                <p>The <strong>${mitigationData.title}</strong> mitigation strategy was successfully deployed.</p>
                <h3>Outcome Analysis</h3>
                <p>The asteroid's trajectory was altered, preventing impact with Earth. This action successfully averted a potential catastrophe in the <strong>${location.name}</strong> region.</p>
                <p class="text-green-400 font-bold mt-4">MISSION STATUS: SUCCESSFUL</p>
            `;
        } else {
            const { impactEnergy } = appState;
            const { crater, seismic } = calculateConsequences();
            let environmentalDetail = '';
            switch(location.type) {
                case 'inland': environmentalDetail = 'Primary threat is a powerful atmospheric shockwave and widespread ejecta.'; break;
                case 'coastal': environmentalDetail = 'A significant tsunami is the most severe threat, capable of inundating low-lying coastal regions.'; break;
                case 'oceanic': environmentalDetail = 'A deep-ocean impact will generate a mega-tsunami with potential for trans-oceanic devastation.'; break;
            }
            briefingHTML = `
                <h3>Threat Summary</h3>
                <p>Analysis of a simulated impact event targeting the <strong>${location.name}</strong> region.</p>
                <h3>Calculated Physical Consequences</h3>
                <ul>
                    <li><strong>Impact Energy:</strong> ${Number(impactEnergy).toLocaleString()} Megatons (MT).</li>
                    <li><strong>Estimated Crater Diameter:</strong> ${Number(crater).toLocaleString()} km.</li>
                    <li><strong>Equivalent Seismic Magnitude:</strong> ${seismic}.</li>
                </ul>
                <h3>Environmental Impact Analysis</h3>
                <p>${environmentalDetail}</p>
                <p class="text-red-400 font-bold mt-4">MISSION STATUS: FAILURE</p>
            `;
        }
        
        dom.modalContent.innerHTML = briefingHTML;
        dom.briefingModal.classList.remove('hidden');
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

    function init3DScene() {
        const canvas = dom.trajectoryCanvas;
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 12;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // Earth
        const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
        const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x4d94ff });
        earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.position.x = 5;
        scene.add(earth);

        // Stars
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Meteor
        const meteorGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316 });
        meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
        scene.add(meteor);

        updateTrajectoryPath();
        animate3D();
    }

    function updateTrajectoryPath() {
        const mitigationEffect = { none: 0, kinetic_impactor: 1, gravity_tractor: 0.8, laser_ablation: 1.2 };
        const deflection = mitigationEffect[appState.mitigation];

        const startPoint = new THREE.Vector3(-15, 0, 0);
        const controlPoint = new THREE.Vector3(0, 0, 0);
        let endPoint;

        if (deflection > 0) {
            // Miss
            controlPoint.y = -8 / deflection;
            endPoint = new THREE.Vector3(earth.position.x, earth.position.y + 5 + (deflection * 0.5), 0);
        } else {
            // Hit
            controlPoint.y = -2;
            endPoint = new THREE.Vector3(earth.position.x - 2.5, earth.position.y, 0);
        }

        trajectoryCurve = new THREE.QuadraticBezierCurve3(startPoint, controlPoint, endPoint);
        meteorTime = 0;
    }

    function animate3D() {
        requestAnimationFrame(animate3D);
        
        // Use the clock to get the time elapsed since the last frame
        const deltaTime = clock.getDelta();

        // Animate meteor along the path at a consistent speed
        // The value (0.2) means the animation takes 5 seconds (1 / 0.2) to complete.
        meteorTime += 0.2 * deltaTime;
        if (meteorTime > 1) {
            meteorTime = 0; // Reset animation
            if (appState.mitigation === 'none') soundEngine.playImpact();
        }

        trajectoryCurve.getPointAt(meteorTime, meteor.position);

        // Make rotations frame-rate independent
        earth.rotation.y += 0.05 * deltaTime;
        stars.rotation.y += 0.01 * deltaTime;

        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const canvas = dom.trajectoryCanvas;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    function createChart() {
        energyChart = new Chart(dom.energyChartCanvas.getContext('2d'), {
            type: 'bar',
            data: { labels: ['Simulation', 'Tunguska (~15 MT)'], datasets: [{ data: [0, 15], backgroundColor: ['#f97316', '#3b82f6'], borderRadius: 4 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { type: 'logarithmic', title: { display: true, text: 'Energy (Megatons TNT) - Log Scale', color: '#9ca3af' }, grid: { color: 'rgba(156, 163, 175, 0.2)' }, ticks: { color: '#9ca3af' } }, y: { grid: { color: 'rgba(156, 163, 175, 0.2)' }, ticks: { color: '#9ca3af' } } }, plugins: { legend: { display: false }, title: { display: true, text: 'Impact Energy Comparison', color: '#e5e7eb', font: { size: 16 } } } }
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
        const today = new Date('2025-10-04');
        const endDate = new Date('2025-10-11');
        const formatDate = (d) => d.toISOString().split('T')[0];
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(today)}&end_date=${formatDate(endDate)}&api_key=${NASA_API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok. NASA API limit may be reached.');
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
            dom.nasaDataList.innerHTML = `<li>Error loading data. Try again later.</li>`;
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

    function initMap() {
        map = L.map('map', { zoomControl: false, attributionControl: false }).setView([20, 0], 2);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 10,
            minZoom: 2
        }).addTo(map);
        map.on('click', onMapClick);
    }

    function onMapClick(e) {
        if(impactMarker) { map.removeLayer(impactMarker); }
        const impactRadius = Math.max(20000, Math.min(appState.diameter * 1000, 500000));
        impactMarker = L.circle(e.latlng, { color: '#f97316', fillColor: '#f97316', fillOpacity: 0.5, radius: impactRadius }).addTo(map);

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        const col = Math.floor(((lng + 180) / 360) * GRID_COLS);
        const row = Math.floor(((-lat + 90) / 180) * GRID_ROWS);
        const safeRow = Math.max(0, Math.min(row, GRID_ROWS - 1));
        const safeCol = Math.max(0, Math.min(col, GRID_COLS - 1));
        const regionCode = regionLookup[safeRow][safeCol];
        const region = regionData[regionCode];

        appState.location = {
            name: region.name,
            type: region.type,
            regionCode: regionCode
        };
        
        soundEngine.playClick();
        updateUI();
    }

    function calculateConsequences() {
        if (appState.mitigation !== 'none') {
            appState.impactEnergy = 0;
            return { energy: 0, socioImpact: 'NONE', crater: 0, seismic: '0.0' };
        }
        
        const radius = appState.diameter / 2;
        const volume = (4/3) * Math.PI * Math.pow(radius, 3);
        const mass = volume * ASTEROID_DENSITY;
        const velocityMetersPerSecond = appState.velocity * 1000;
        const kineticEnergyJoules = 0.5 * mass * Math.pow(velocityMetersPerSecond, 2);
        const energyMegatons = kineticEnergyJoules / (4.184 * Math.pow(10, 15));
        appState.impactEnergy = energyMegatons;
        
        const craterDiameterKm = 0.02 * Math.pow(kineticEnergyJoules, 1/3.4) / 1000;
        const seismicMagnitude = 0.67 * (Math.log10(kineticEnergyJoules)) - 5.87;

        const geoData = regionData[appState.location.regionCode];
        const baseImpact = Math.log10(appState.impactEnergy + 1);
        const socioEconomicScore = baseImpact * geoData.popDensity * geoData.devIndex;
        
        let socioImpactLevel;
        if(socioEconomicScore > 15) socioImpactLevel = 'CATASTROPHIC';
        else if (socioEconomicScore > 10) socioImpactLevel = 'SEVERE';
        else if (socioEconomicScore > 5) socioImpactLevel = 'HIGH';
        else if (socioEconomicScore > 1) socioImpactLevel = 'MODERATE';
        else socioImpactLevel = 'LOW';
        
        if(appState.location.type === 'oceanic' && socioEconomicScore < 15) socioImpactLevel = 'LOW';

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
            dom.impactStatus.classList.remove('text-red-400', 'animate-pulse');
            dom.impactStatus.classList.add('text-green-400');
        } else {
            dom.mitigationStatus.classList.add('text-gray-400');
            dom.mitigationStatus.classList.remove('text-green-400');
            dom.impactStatus.textContent = 'IMPACT IMMINENT';
            dom.impactStatus.classList.add('text-red-400', 'animate-pulse');
            dom.impactStatus.classList.remove('text-green-400');
        }
        
        updateTrajectoryPath();
        updateChart();
    }
    
    function main() {
        // A one-time function to initialize audio on the first user interaction.
        const initAudio = () => {
            Tone.start();
            console.log('Audio context started.');
            // Remove the event listener after it has run once.
            document.body.removeEventListener('click', initAudio);
            document.body.removeEventListener('keydown', initAudio);
        };
        document.body.addEventListener('click', initAudio);
        document.body.addEventListener('keydown', initAudio);

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
            dom.clipboardHelper.value = `☄️ GeoThreat Simulator Report ☄️\n\n${text}`;
            dom.clipboardHelper.select();
            document.execCommand('copy');
            soundEngine.playSuccess();
        });
        window.addEventListener('resize', onWindowResize);
        
        initMap();
        createChart();
        init3DScene();
        updateUI();
    }

    main();
});

