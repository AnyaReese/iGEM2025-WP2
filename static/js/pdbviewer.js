// PDB Viewer initialization
document.addEventListener('DOMContentLoaded', function() {
    const viewerElement = document.getElementById('viewport');
    if (viewerElement) {
        // Create NGL Stage with disabled default tooltip
        const stage = new NGL.Stage('viewport', { 
            backgroundColor: 'white',
            tooltip: false
        });

        // Set global display parameters
        stage.setParameters({
            impostor: true,
            quality: 'medium',
            showTooltip: false
        });

        // handle window size change
        window.addEventListener('resize', function() {
            stage.handleResize();
        });

        // get all structure data
        const structures = Array.from(viewerElement.dataset.structures ? JSON.parse(viewerElement.dataset.structures) : []);

        // load and display all structures
        Promise.all(structures.map(struct => {
            return stage.loadFile(struct.path).then(component => {
                // add cartoon representation
                component.addRepresentation('cartoon', {
                    color: struct.color,
                    opacity: 0.9,
                    quality: 'high'
                });
                
                // add ball+stick representation (only for abnormal residues)
                const ballStickRepr = component.addRepresentation('ball+stick', {
                    sele: 'hetero and not water',
                    opacity: 0.9
                });

                // Create custom tooltip
                let tooltip = document.querySelector('.molecule-tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'molecule-tooltip';
                    document.body.appendChild(tooltip);
                }

                // Handle mousemove event
                stage.viewer.container.addEventListener('mousemove', function(event) {
                    const rect = stage.viewer.container.getBoundingClientRect();
                    const pickingData = stage.pickingControls.pick(
                        event.clientX - rect.left,
                        event.clientY - rect.top
                    );

                    if (pickingData && pickingData.atom) {
                        const atom = pickingData.atom;
                        const residue = atom.resname;
                        const chain = atom.chainname;
                        const resno = atom.resno;
                        const atomname = atom.atomname;
                        
                        tooltip.innerHTML = `
                            <div class="tooltip-content">
                                <div>${residue}${resno}:${chain}</div>
                                <div class="atom-name">${atomname}</div>
                            </div>
                        `;
                        tooltip.style.display = 'block';
                        tooltip.style.left = (event.clientX + 15) + 'px';  // Increased offset from cursor
                        tooltip.style.top = (event.clientY - 15) + 'px';   // Increased offset from cursor
                    } else {
                        tooltip.style.display = 'none';
                    }
                });

                // Hide tooltip when mouse leaves viewer
                stage.viewer.container.addEventListener('mouseleave', function() {
                    tooltip.style.display = 'none';
                });

                return component;
            });
        })).then(components => {
            // all structures loaded, adjust view
            stage.autoView();
            
            // add legend
            const legendContainer = document.createElement('div');
            legendContainer.style.position = 'absolute';
            legendContainer.style.top = '10px';
            legendContainer.style.left = '10px';
            legendContainer.style.padding = '10px';
            legendContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            legendContainer.style.borderRadius = '5px';
            legendContainer.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            legendContainer.style.zIndex = '10';
            legendContainer.style.fontSize = '12px';

            // add legend items
            structures.forEach(struct => {
                const item = document.createElement('div');
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.marginBottom = '5px';

                const colorBox = document.createElement('div');
                colorBox.style.width = '12px';
                colorBox.style.height = '12px';
                colorBox.style.backgroundColor = struct.color;
                colorBox.style.marginRight = '8px';
                colorBox.style.borderRadius = '2px';

                const text = document.createElement('span');
                text.textContent = struct.name;

                item.appendChild(colorBox);
                item.appendChild(text);
                legendContainer.appendChild(item);
            });

            viewerElement.appendChild(legendContainer);
        }).catch(error => {
            console.error('Error loading structure files:', error);
            const errorText = document.createElement('div');
            errorText.style.padding = '20px';
            errorText.style.color = 'red';
            errorText.innerHTML = `Cannot load protein structure file, please check if the file path is correct.<br>Error message: ${error.message}`;
            viewerElement.appendChild(errorText);
        });

        // add mouse control hint
        const helpText = document.createElement('div');
        helpText.className = 'pdb-controls';
        helpText.innerHTML = 'left click to rotate | middle click/scroll to zoom | right click to pan';
        viewerElement.appendChild(helpText);
    }
});
