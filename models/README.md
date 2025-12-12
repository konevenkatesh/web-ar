# 3D Models Directory

This directory is for storing 3D models in GLB/GLTF format for the WebXR AR application.

## Current Implementation

The application currently uses **procedural geometric models** created with Three.js:
- **Building**: Box geometry with window details
- **Floor Plan**: Plane geometry with grid and wall outlines
- **Equipment**: Cylinder and sphere combination

## Adding Custom GLB Models

To use custom 3D models instead of the procedural ones:

### 1. Prepare Your Models

- Export models in GLB format (preferred) or GLTF format
- Recommended file sizes: Under 2MB per model for optimal mobile performance
- Optimize meshes and textures before exporting
- Use tools like [glTF-Pipeline](https://github.com/CesiumGS/gltf-pipeline) to compress models

### 2. Add Models to This Directory

Place your GLB files here:
```
models/
├── building.glb
├── floorplan.glb
├── equipment.glb
└── README.md (this file)
```

### 3. Update app.js

Replace the procedural model creation in the `loadModels()` function with GLTFLoader:

```javascript
function loadModels() {
    console.log('📦 Loading 3D models...');

    const loader = new GLTFLoader();
    const modelPaths = {
        building: './models/building.glb',
        floorplan: './models/floorplan.glb',
        equipment: './models/equipment.glb'
    };

    Object.keys(modelPaths).forEach(key => {
        loader.load(
            modelPaths[key],
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
                models[key] = model;
                console.log(`✅ ${key} model loaded`);
            },
            (progress) => {
                console.log(`Loading ${key}: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
            },
            (error) => {
                console.error(`❌ Error loading ${key}:`, error);
            }
        );
    });
}
```

## Model Requirements

### Scale
- Models should be appropriately sized for AR (typically 0.1 to 2 meters)
- The app applies 0.1 scale by default - adjust as needed

### Orientation
- Models should face forward (-Z axis) by default
- Up direction should be +Y axis

### Performance
- **Triangles**: Aim for under 50,000 triangles per model for mobile
- **Textures**: Use compressed textures (JPEG for color, PNG for transparency)
- **Texture Size**: 1024x1024 or smaller for mobile devices
- **Materials**: Use PBR materials for realistic lighting

## Free 3D Model Resources

Download free models from:
- [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount) (Download as GLB)
- [Poly Haven](https://polyhaven.com/models) (Download as GLB)
- [Google Poly Archive](https://poly.pizza/) (Community archive)
- [Quaternius](http://quaternius.com/) (Free low-poly models)
- [Kenney.nl](https://kenney.nl/assets?q=3d) (Free game assets)

## Model Creation Tools

- [Blender](https://www.blender.org/) - Free 3D modeling software
- [SketchUp Free](https://www.sketchup.com/plans-and-pricing/sketchup-free) - Web-based 3D modeling
- [Tinkercad](https://www.tinkercad.com/) - Simple 3D design tool

## Exporting from Blender

1. File → Export → glTF 2.0 (.glb/.gltf)
2. Export settings:
   - Format: glTF Binary (.glb)
   - Include: Selected Objects
   - Transform: +Y Up
   - Geometry: Apply Modifiers
   - Compression: Enabled (if available)

## Testing Models

After adding models:
1. Test on desktop Chrome first
2. Check console for loading errors
3. Verify scale in AR mode
4. Test on target Android device
5. Monitor performance (should maintain 30+ FPS)

## Notes

- The current procedural models are sufficient for demonstration purposes
- Custom models will provide more realistic architectural visualization
- Remember to optimize models for mobile performance
- Test thoroughly before deploying to production
