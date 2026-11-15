
# Data Sources

## Map tiles

- Service: NASA Mars Trek WMTS
- Accessed: 14 November 2026
- Credit: NASA/JPL, Mars Trek

### Base map

- Layer: msss_atlas_simp_clon
- URL:
  https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0/default/default028mm/{z}/{y}/{x}.png
- Test status: Tested; Mars image displayed successfully.

### HiRISE imagery overlay

- Layer: JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd
- URL:
  https://trek.nasa.gov/tiles/Mars/EQ/JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd/1.0.0/default/default028mm/{z}/{y}/{x}.png
- Format: PNG
- Projection: Equirectangular (EPSG:104905)
- Coverage: 77.22°E–77.58°E, 18.31°N–18.67°N
- Zoom levels: 0–17
- Test status: Tile returned a Mars surface image with two white areas visible.
- Caveat: Partial imagery coverage. The cause of the white areas has not been confirmed.
- Display: Optional overlay, off by default.
- UI label: HiRISE imagery (partial coverage)
- Credit: NASA/JPL, Mars Trek.

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

### Observation IDs

- S_04138501
- S_05626601
- S_06626202

- File: sharad_coverage.geojson
- The GeoJSON contains radar footprint tracks.
- Radar coverage does not independently confirm subsurface water ice.

## Important interpretation note

Do not present simulated terrain as real elevation data or SHARAD radar coverage as confirmed water ice detection. Clearly distinguish measured data from simulated or derived data in the application and project write-up.
