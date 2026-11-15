# Tile layers (NASA Mars Trek WMTS, equirectangular)

Pattern: https://trek.nasa.gov/tiles/Mars/EQ/<LAYER>/1.0.0/default/default028mm/{z}/{y}/{x}.<ext>
(order: zoom, then row, then column. Zoom 0 has 2 columns x 1 row. Top-left corner is lon -180, lat 90.)

1. Base map (overview): msss_atlas_simp_clon
   Ext: png   Zoom: 0 to 6   Status: tested, works
   https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0/default/default028mm/{z}/{y}/{x}.png

2. Jezero HiRISE detail: JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd
   Ext: png   Style: default   Tile set: default028mm   Zoom: 0 to 17
   Coverage: lon 77.22 to 77.58, lat 18.31 to 18.67 (tiles exist only inside this box)
   Status: capabilities page checked; tile not tested yet
   https://trek.nasa.gov/tiles/Mars/EQ/JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd/1.0.0/default/default028mm/{z}/{y}/{x}.png

Tile numbers: column = floor((lon + 180) / (180 / 2^z)), row = floor((90 - lat) / (180 / 2^z)).

Note for Ayesha: these tiles are equirectangular (EPSG:104905), not Web Mercator.
Leaflet's default projection will not line up unless a matching CRS is set. Please test early.
