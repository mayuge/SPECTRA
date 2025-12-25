from fastapi import APIRouter, Request
from infrastructure.request.osm.osm_repository import OsmRepository
from urllib.parse import unquote

router = APIRouter()
osm_repository = OsmRepository()

@router.get("/osm/{tag}/prefecture/{prefecture}",operation_id="getOsmTagByPrefecture",tags=["osm"])
async def get_osm_tag_by_prefecture(tag: str, prefecture: str, request: Request):
    """
    都道府県を基準に、コンビニエンスストア、駐車場、公衆トイレ、駐車などを取得します。その他にも最も近いOSMのタグを組み合わせることでいろいろなものを取得できます。
    場所が指定されていないがOSMのタグをもとにデータ取得したいと思われる場合には東京都を指定してください。

    ## 🔍 tag に指定する値（OSM キー＝値）
    - コンビニエンスストア: `shop=convenience`
    - 駐車場: `amenity=parking`
    - 公衆トイレ: `amenity=toilets`
    - 集合住宅: `building=apartments`

    上記以外にも、任意の OSM タグ（例: `amenity=school`, `building=yes`）を指定できます。

    ## 🗾 prefecture（都道府県名）
    日本語名をそのまま指定してください。
    - 例: `"東京都"`, `"埼玉県"`, `"北海道"`

    ## 📌 処理概要
    - Overpass の `area` 機能で都道府県境界を取得
    - 指定されたタグを area 内で検索
    - node / way / relation をまとめて GeoJSON として返却

    """
    prefecture = unquote(prefecture)
    return await osm_repository.get_osm_tag_by_prefecture(tag, prefecture, request)


@router.get("/osm/{tag}/city/{city}",operation_id="getOsmTagByCity",tags=["osm"])
async def get_osm_tag_by_city(tag: str, city: str, request: Request):
    """
    市区町村を基準に、コンビニエンスストア、駐車場、公衆トイレ、駐車などを取得します。その他にも最も近いOSMのタグを組み合わせることでいろいろなものを取得できます。

    ## 🔍 tag に指定する値（OSM キー＝値）
    - コンビニエンスストア: `shop=convenience`
    - 駐車場: `amenity=parking`
    - 公衆トイレ: `amenity=toilets`
    - 集合住宅: `building=apartments`

    上記以外にも、任意の OSM タグ（例: `amenity=school`, `building=yes`）を指定できます。

    ## city（市区町村名）
    日本語名をそのまま指定してください。
    - 例: `"横浜市"`, `"杉並区"`, `"楢葉町"`

    ## 📌 処理概要
    - Overpass の `area` 機能で都道府県境界を取得
    - 指定されたタグを area 内で検索
    - node / way / relation をまとめて GeoJSON として返却

    """
    city = unquote(city)
    return await osm_repository.get_osm_tag_by_city(tag, city, request)