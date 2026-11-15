
# Data Sources

## Map tiles

- Service: NASA Mars Trek WMTS
- Accessed: 14 November 2026
- Credit: NASA/JPL, Mars Trek

## Elevation grid

- Dataset: Mars HRSC-MOLA Blend DEM Global 200 m v2
- Original source: USGS Astrogeology
- Data bounds: 77.0°E–78.0°E, 18.0°N–19.0°N
- Grid: 296 rows × 296 columns
- Nominal cell size: 200 m
- Missing cells: 0
- Source mirror used for raster access:
  https://huggingface.co/datasets/Biscut4Biscuit/mola-hrsc-baseline-cog/resolve/main/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2_cog.tif

## Slope hazards

- File: hazards.geojson
- Derived from the Mars elevation grid above.
- Hazard threshold: slope greater than 20 degrees.
- These are terrain-slope hazards, not confirmed physical obstacles.

## SHARAD radar coverage

- Dataset: MRO-M-SHARAD-5-RADARGRAM-V2.0
- Instrument: Shallow Radar (SHARAD)
- Spacecraft: Mars Reconnaissance Orbiter
- Archive:
  https://pds-geosciences.wustl.edu/mro/mro-m-sharad-5-radargram-v2/
- PDS dataset profile:
  https://pds.nasa.gov/ds-view/pds/viewProfile.jsp?dsid=MRO-M-SHARAD-5-RADARGRAM-V2.0

Observation IDs:
- S_04138501
- S_05626601
- S_06626202

File: sharad_coverage.geojson

The GeoJSON contains radar footprint tracks. Radar coverage does not independently confirm subsurface water ice.

## Important interpretation note

Do not present simulated terrain as real elevation data or SHARAD radar coverage as confirmed water ice detection. Clearly distinguish measured data from simulated or derived data in the application and project write-up.


Do not describe simulated terrain as real elevation or radar coverage as confirmed ice detection.

Data sources for Mars Navigator. All data from NASA Mars Trek.
Tiles: NASA Mars Trek WMTS. Accessed 14 Nov 2026. Credit: NASA/JPL, Mars Trek
