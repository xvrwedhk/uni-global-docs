// Function to fetch Swagger JSON from file
async function fetchSwaggerJson() {
    try {
        const response = await fetch('swagger.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch swagger.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading swagger.json:', error);
        // Show error message in the UI
        document.getElementById('swagger-ui').innerHTML = `
            <div style="padding: 20px; color: #ff6b6b; background: rgba(255, 0, 0, 0.1); border-radius: 4px; border: 1px solid rgba(255, 0, 0, 0.2);">
                <h3 style="margin-bottom: 10px;">Error Loading API Documentation</h3>
                <p>Could not load the swagger.json file. Please ensure it exists in the root directory.</p>
                <p style="font-size: 0.9em; margin-top: 10px; color: #aaa;">Error details: ${error.message}</p>
            </div>
        `;
        return null;
    }
}

// Initialize Swagger UI
function initSwaggerUI(spec) {
    if (!spec) return;

    SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
        filter: true,
        docExpansion: "list",
        syntaxHighlight: {
            theme: "monokai"
        },
        responseInterceptor: (response) => {
            return response;
        }
    });
}

// Add interactive effects for sidebar items
function setupSidebarInteractions() {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.sidebar-item').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');

            // Smooth animation and subtle feedback when clicked
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Add subtle animation to the page elements
function addVisualEffects() {
    // Animate in the content header
    const header = document.querySelector('.content-header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    // Animate in the info cards
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s ease ${0.2 + index * 0.1}s, transform 0.8s ease ${0.2 + index * 0.1}s`;
    });

    // Animate in the swagger section
    const swaggerSection = document.querySelector('.swagger-section');
    swaggerSection.style.opacity = '0';
    swaggerSection.style.transform = 'translateY(40px)';
    swaggerSection.style.transition = 'opacity 1s ease 0.4s, transform 1s ease 0.4s';

    // Trigger the animations after a small delay
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';

        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });

        swaggerSection.style.opacity = '1';
        swaggerSection.style.transform = 'translateY(0)';
    }, 100);
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function () {
    // Add animations and effects
    addVisualEffects();

    // Setup sidebar interactions
    setupSidebarInteractions();

    // Load the swagger.json file and initialize Swagger UI
    const swaggerJson = await fetchSwaggerJson();
    if (swaggerJson) {
        initSwaggerUI(swaggerJson);
    }
});